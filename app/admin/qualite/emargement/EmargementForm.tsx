'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

type Course = { id: string; title: string | null; duration_hours?: number | null };

export function EmargementForm({ courses }: { courses: Course[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [courseId, setCourseId] = useState(searchParams.get('course') ?? '');
  const [date, setDate] = useState(
    searchParams.get('date') ?? new Date().toISOString().slice(0, 10)
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (courseId) params.set('course', courseId);
    if (date) params.set('date', date);
    router.push(`/admin/qualite/emargement?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex flex-wrap items-end gap-4 rounded-xl border border-slate-200 bg-white p-6">
      <div>
        <label htmlFor="course" className="block text-sm font-medium text-slate-700">
          Formation
        </label>
        <select
          id="course"
          value={courseId}
          onChange={(e) => setCourseId(e.target.value)}
          className="mt-1 min-w-[200px] rounded-lg border border-slate-200 px-4 py-2 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        >
          <option value="">— Sélectionner une formation —</option>
          {courses.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title ?? 'Sans titre'}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-slate-700">
          Date de session
        </label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 rounded-lg border border-slate-200 px-4 py-2 focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-[var(--accent)] px-6 py-2.5 font-medium text-white hover:bg-blue-700"
      >
        Générer la feuille
      </button>
    </form>
  );
}
