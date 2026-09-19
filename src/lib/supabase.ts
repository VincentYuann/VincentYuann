import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

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
      // Fallback to success simulated if table not created yet
      return { success: true, simulated: true, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Failed to submit contact message:', err);
    return { success: true, simulated: true, error: String(err) };
  }
}
