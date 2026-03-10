'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface Props {
  lesson: { id: string; title: string; type: string };
  courseId: string;
  moduleId: string;
}

export function LessonListItem({ lesson, courseId, moduleId }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Supprimer la leçon « ${lesson.title} » ?`)) return;

    const supabase = createClient();
    const { error } = await supabase.from('lessons').delete().eq('id', lesson.id);

    if (error) {
      alert(error.message);
      return;
    }
    router.refresh();
  };

  return (
    <li className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-xs">{lesson.type}</span>
        <span className="text-slate-900">{lesson.title}</span>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href={`/admin/formations/${courseId}/modules/${moduleId}/lecons/${lesson.id}`}
          className="flex items-center gap-1 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          <Pencil size={14} strokeWidth={1.5} />
          Modifier
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-1 text-sm font-medium text-red-600 hover:underline"
          title="Supprimer"
        >
          <Trash2 size={14} strokeWidth={1.5} />
          Supprimer
        </button>
      </div>
    </li>
  );
}
