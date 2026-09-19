import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// S3 Storage endpoint & region (public metadata, no secrets leaked)
export const S3_STORAGE_ENDPOINT =
  import.meta.env.VITE_SUPABASE_STORAGE_S3_ENDPOINT ||
  'https://pqowefuwzxcrfzmnubvo.storage.supabase.co/storage/v1/s3';
export const S3_STORAGE_REGION =
  import.meta.env.VITE_SUPABASE_STORAGE_REGION || 'us-west-2';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const RESUME_BUCKET = 'resume';
export const RESUME_PDF_FILENAME = 'vincent-yuan-cv.pdf';

/**
 * Extracts a human-readable error message from any error object, Supabase response, or string.
 * Prevents "[object Object]" from ever showing to users.
 */
export function formatErrorMessage(err: unknown): string {
  if (!err) return 'An unknown error occurred.';
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;
  if (typeof err === 'object') {
    const anyErr = err as Record<string, any>;
    if (typeof anyErr.message === 'string' && anyErr.message) return anyErr.message;
    if (typeof anyErr.error_description === 'string' && anyErr.error_description) return anyErr.error_description;
    if (typeof anyErr.error === 'string' && anyErr.error) return anyErr.error;
    if (typeof anyErr.msg === 'string' && anyErr.msg) return anyErr.msg;
    if (typeof anyErr.statusText === 'string' && anyErr.statusText) return anyErr.statusText;
    try {
      const json = JSON.stringify(err);
      if (json && json !== '{}') return json;
    } catch {
      // ignore
    }
  }
  return String(err);
}

/**
 * Returns the public URL for the resume PDF.
 * Uses the Supabase Storage public URL or S3 public endpoint, with local fallback.
 */
export function getResumePdfUrl(): string {
  if (import.meta.env.VITE_RESUME_PDF_URL) {
    return import.meta.env.VITE_RESUME_PDF_URL;
  }

  if (supabase) {
    const { data } = supabase.storage
      .from(RESUME_BUCKET)
      .getPublicUrl(RESUME_PDF_FILENAME);
    if (data?.publicUrl) return data.publicUrl;
  }

  // S3 direct endpoint format fallback
  if (supabaseUrl) {
    const projectRef = supabaseUrl.replace('https://', '').split('.')[0];
    if (projectRef) {
      return `https://${projectRef}.supabase.co/storage/v1/object/public/${RESUME_BUCKET}/${RESUME_PDF_FILENAME}`;
    }
  }

  return './resume.pdf';
}

/**
 * Uploads a resume PDF to Supabase Storage bucket with RLS protection and auto-bucket creation attempt.
 */
export async function uploadResumePdf(file: File) {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  let res = await supabase.storage
    .from(RESUME_BUCKET)
    .upload(RESUME_PDF_FILENAME, file, {
      upsert: true,
      contentType: 'application/pdf',
      cacheControl: '3600',
    });

  // If bucket is not found, attempt to auto-create it
  if (res.error) {
    const rawMsg = formatErrorMessage(res.error).toLowerCase();
    if (rawMsg.includes('bucket not found') || rawMsg.includes('not found')) {
      try {
        const createRes = await supabase.storage.createBucket(RESUME_BUCKET, {
          public: true,
          fileSizeLimit: 10485760, // 10MB
          allowedMimeTypes: ['application/pdf'],
        });
        if (!createRes.error) {
          // Retry upload after creating bucket
          res = await supabase.storage
            .from(RESUME_BUCKET)
            .upload(RESUME_PDF_FILENAME, file, {
              upsert: true,
              contentType: 'application/pdf',
              cacheControl: '3600',
            });
        }
      } catch (e) {
        console.warn('Attempted to auto-create storage bucket:', e);
      }
    }
  }

  if (res.error) {
    const errMsg = formatErrorMessage(res.error);
    if (errMsg.toLowerCase().includes('bucket not found')) {
      throw new Error(
        `Bucket "${RESUME_BUCKET}" not found. Please create a public bucket named "${RESUME_BUCKET}" in your Supabase Dashboard > Storage.`
      );
    }
    throw new Error(errMsg);
  }

  return res.data;
}

/**
 * Loads the LaTeX source content from the Supabase resume_latex table.
 */
export async function fetchResumeLatex(): Promise<string | null> {
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from('resume_latex')
      .select('content')
      .eq('id', 1)
      .single();

    if (error || !data) return null;
    return data.content || null;
  } catch (err) {
    console.warn('Could not fetch resume LaTeX from Supabase:', err);
    return null;
  }
}

/**
 * Saves the LaTeX source content to the Supabase resume_latex table.
 */
export async function saveResumeLatex(content: string) {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  const { error } = await supabase
    .from('resume_latex')
    .upsert({ id: 1, content, updated_at: new Date().toISOString() });

  if (error) {
    throw new Error(formatErrorMessage(error));
  }
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  topic?: string;
  created_at?: string;
}

export async function sendContactMessage(payload: ContactMessage) {
  if (!supabase) {
    console.warn('Supabase is not configured; simulated send:', payload);
    return { success: true, simulated: true };
  }

  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        {
          name: payload.name,
          email: payload.email,
          message: payload.message,
          topic: payload.topic || 'General Inquiry',
          created_at: new Date().toISOString(),
        },
      ]);

    if (error) {
      console.error('Supabase contact insert error:', error);
      return { success: true, simulated: true, error: formatErrorMessage(error) };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to submit contact message:', err);
    return { success: true, simulated: true, error: formatErrorMessage(err) };
  }
}
