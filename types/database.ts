export type LessonType = 'video' | 'pdf' | 'texte' | 'quiz' | 'lien';

export type UserRole = 'apprenant' | 'formateur' | 'admin';

export interface Course {
  id: string;
  slug: string;
  title: string;
  description: string;
  image_url: string | null;
  price: number;
  published: boolean;
  created_at: string;
  updated_at: string;
  creator_id: string;
}

export interface Module {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  type: LessonType;
  content_url: string | null; // vidéo, PDF
  content_text: string | null; // texte
  order_index: number;
  duration_minutes: number | null;
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  lesson_id: string;
  question: string;
  options: string[];
  correct_index: number;
  order_index: number;
}

export interface Enrollment {
  id: string;
  user_id: string;
  course_id: string;
  progress_percent: number;
  created_at: string;
}

export interface LessonProgress {
  id: string;
  user_id: string;
  lesson_id: string;
  completed: boolean;
  completed_at: string | null;
}

export type AppointmentStatus = 'demande' | 'confirme' | 'annule';

export interface Appointment {
  id: string;
  start_at: string;
  end_at: string;
  client_name: string;
  client_email: string;
  client_phone: string | null;
  client_message: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}
