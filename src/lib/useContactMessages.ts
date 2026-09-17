import { useState, useEffect, useCallback } from 'react';
import { supabase } from './supabase';
import type { ContactMessage } from './supabase';

export function useContactMessages(isAdmin: boolean) {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    if (!isAdmin) {
      setMessages([]);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchErr } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchErr) {
        throw fetchErr;
      }

      setMessages((data as ContactMessage[]) || []);
    } catch (err: any) {
      console.error('Error fetching contact messages:', err);
      setError(err.message || 'Failed to load contact messages');
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  const markAsRead = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'read' })
        .eq('id', id);

      if (error) throw error;
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: 'read' } : msg))
      );
    } catch (err: any) {
      console.error('Error marking message as read:', err);
    }
  };

  const markAsUnread = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ status: 'unread' })
        .eq('id', id);

      if (error) throw error;
      setMessages((prev) =>
        prev.map((msg) => (msg.id === id ? { ...msg, status: 'unread' } : msg))
      );
    } catch (err: any) {
      console.error('Error marking message as unread:', err);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    } catch (err: any) {
      console.error('Error deleting message:', err);
    }
  };

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  return {
    messages,
    loading,
    error,
    unreadCount,
    markAsRead,
    markAsUnread,
    deleteMessage,
    refresh: fetchMessages,
  };
}
