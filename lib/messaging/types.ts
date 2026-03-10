/**
 * Types pour le module de messagerie
 */

export type ConversationType = 'course' | 'direct';

export interface Conversation {
  id: string;
  type: ConversationType;
  course_id: string | null;
  title: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  course?: { id: string; title: string; slug: string } | null;
  participants?: ParticipantWithProfile[];
  last_message?: Message | null;
  unread_count?: number;
}

export interface ParticipantWithProfile {
  id: string;
  user_id: string;
  role: string;
  joined_at: string;
  muted_until: string | null;
  banned: boolean;
  profile: {
    id: string;
    full_name: string | null;
    email: string | null;
  };
}

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content: string;
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'deleted';
  pinned_by: string | null;
  pinned_at: string | null;
  deleted_at: string | null;
  reply_to_id: string | null;
  created_at: string;
  updated_at: string;
  sender?: { id: string; full_name: string | null; email: string | null };
  attachments?: MessageAttachment[];
  reply_to?: Message | null;
}

export interface MessageAttachment {
  id: string;
  message_id: string;
  file_url: string;
  file_name: string | null;
  file_type: string | null;
  file_size: number | null;
}
