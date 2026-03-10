'use client';

import { useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface RealtimeMessagePayload {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

export function useRealtimeMessages(
  conversationId: string | null,
  onMessage: (payload: RealtimeMessagePayload) => void
) {
  const supabase = createClient();

  useEffect(() => {
    if (!conversationId) return;

    const channel = supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          const newRow = payload.new as RealtimeMessagePayload;
          if (newRow.deleted_at) return;
          onMessage(newRow);
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          // Optional: fetch any missed messages
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [conversationId, onMessage]);
}
