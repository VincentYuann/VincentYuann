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
 * Uploads a resume PDF to Supabase Storage bucket with RLS protection.
 */
export async function uploadResumePdf(file: File) {
  if (!supabase) {
    throw new Error('Supabase client is not configured.');
  }

  const { data, error } = await supabase.storage
    .from(RESUME_BUCKET)
    .upload(RESUME_PDF_FILENAME, file, {
      upsert: true,
      contentType: 'application/pdf',
      cacheControl: '3600',
    });

  if (error) throw error;
  return data;
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

  if (error) throw error;
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
      return { success: true, simulated: true, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to submit contact message:', err);
    return { success: true, simulated: true, error: String(err) };
  }
}
