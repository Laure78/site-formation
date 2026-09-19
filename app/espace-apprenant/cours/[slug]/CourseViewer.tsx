'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Play,
  FileText,
  LayoutList,
  Menu,
  ExternalLink,
  Link2,
  BookOpen,
} from 'lucide-react';
import { YouTubeOrVideoEmbed } from '@/components/YouTubeOrVideoEmbed';
import { LessonMediaPreview } from '@/components/lms/LessonMediaPreview';
import { SatisfactionSurvey } from '@/components/SatisfactionSurvey';
import { QuestionnairePositionnementBanner } from '@/components/espace-apprenant/QuestionnairePositionnementBanner';
import { QuestionnaireSatisfactionBanner } from '@/components/espace-apprenant/QuestionnaireSatisfactionBanner';
import { AvisGoogleBanner } from '@/components/espace-apprenant/AvisGoogleBanner';

interface LessonResource {
  id: string;
  title: string;
  file_url: string;
  file_type: string | null;
}

interface Lesson {
  id: string;
  title: string;
  type: string;
  order_index: number;
  duration_minutes?: number;
  content_url?: string | null;
  content_text?: string | null;
}

interface Module {
  id: string;
  title: string;
  order_index: number;
  lessons: Lesson[];
}

interface Props {
  course: { id: string; slug: string; title: string; description?: string };
  modules: Module[];
  completedLessonIds: string[];
  enrollmentId?: string;
  userId: string;
  progressPercent: number;
  lessonResources?: Record<string, LessonResource[]>;
}

export function CourseViewer({
  course,
  modules,
  completedLessonIds,
  enrollmentId,
  progressPercent,
  lessonResources = {},
}: Props) {
  const router = useRouter();
  const allLessons = modules.flatMap((m) => m.lessons.map((l) => ({ ...l, moduleTitle: m.title })));
  const firstLesson = allLessons[0];
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(firstLesson?.id ?? null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPdfIndex, setSelectedPdfIndex] = useState(0);
  const selectedLesson = allLessons.find((l) => l.id === selectedLessonId);

  const resList = selectedLessonId ? (lessonResources[selectedLessonId] ?? []) : [];
  const pdfResources = resList.filter((r) => r.file_type === 'pdf');
  const linkResources = resList.filter(
    (r) => r.file_type === 'link' || (!r.file_type && r.file_url?.startsWith('http'))
  );

  useEffect(() => {
    setSelectedPdfIndex(0);
  }, [selectedLessonId]);

  const markCompleteQuietly = async (lessonId: string) => {
    if (!enrollmentId) return;
    try {
      await fetch('/api/lesson-progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId, completed: true }),
      });
      router.refresh();
    } catch {
      /* ignore */
    }
  };

  const currentIndex = allLessons.findIndex((l) => l.id === selectedLessonId);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex >= 0 && currentIndex < allLessons.length - 1
      ? allLessons[currentIndex + 1]
      : null;

  // Progression silencieuse : après 5 s de consultation (sans bouton)
  const viewedRef = useRef<Set<string>>(new Set());
  useEffect(() => {
    if (!selectedLessonId || !enrollmentId || completedLessonIds.includes(selectedLessonId)) {
      return;
    }
    if (viewedRef.current.has(selectedLessonId)) return;
    const t = setTimeout(() => {
      viewedRef.current.add(selectedLessonId);
      void markCompleteQuietly(selectedLessonId);
    }, 5000);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- mark on lesson change only
  }, [selectedLessonId, enrollmentId, completedLessonIds]);

  const icon = (type: string) => {
    switch (type) {
      case 'video':
        return <Play size={16} strokeWidth={1.5} />;
      case 'pdf':
        return <FileText size={16} strokeWidth={1.5} />;
      case 'lien':
        return <Link2 size={16} strokeWidth={1.5} />;
      case 'quiz':
        return <LayoutList size={16} strokeWidth={1.5} />;
      default:
        return <FileText size={16} strokeWidth={1.5} />;
    }
  };

  const goToLesson = (id: string) => {
    setSelectedLessonId(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex">
      <div className="fixed left-0 right-0 top-16 z-20 border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <select
          value={selectedLessonId ?? ''}
          onChange={(e) => setSelectedLessonId(e.target.value || null)}
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-900 focus:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]/20"
        >
          {allLessons.map((l) => (
            <option key={l.id} value={l.id}>
              {l.moduleTitle} — {l.title}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className="fixed bottom-6 right-6 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-lg lg:hidden"
        aria-label="Programme"
      >
        <Menu size={24} strokeWidth={1.5} />
      </button>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-72 overflow-y-auto border-r border-slate-200 bg-white transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-slate-200 p-4">
          <div className="flex items-center justify-between">
            <Link
              href="/espace-apprenant/mes-formations"
              className="text-sm text-[var(--accent)] hover:underline"
            >
              ← Mes formations
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded p-2 lg:hidden"
              aria-label="Fermer"
            >
              ×
            </button>
          </div>
          <h1 className="mt-2 font-display text-lg font-bold text-slate-900">{course.title}</h1>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className="h-full rounded-full bg-[var(--accent)]"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="mt-1 text-xs text-slate-500">{progressPercent}% consulté</p>
          <p className="mt-2 text-xs text-slate-500">
            Toutes les leçons sont accessibles librement.
          </p>
        </div>
        <nav className="p-2">
          {modules.map((m) => (
            <div key={m.id} className="mb-4">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {m.title}
              </p>
              <ul className="space-y-0.5">
                {(m.lessons ?? []).map((l) => {
                  const isCompleted = completedLessonIds.includes(l.id);
                  const isSelected = selectedLessonId === l.id;
                  return (
                    <li key={l.id}>
                      <button
                        type="button"
                        onClick={() => goToLesson(l.id)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                          isSelected
                            ? 'bg-[var(--accent-soft)] font-medium text-[var(--accent)]'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {isCompleted ? (
                          <Check size={18} strokeWidth={2} className="shrink-0 text-emerald-500" />
                        ) : (
                          <span className="flex h-[18px] w-[18px] shrink-0 items-center justify-center text-slate-400">
                            {icon(l.type)}
                          </span>
                        )}
                        <span className="truncate">{l.title}</span>
                        {l.duration_minutes ? (
                          <span className="ml-auto text-xs text-slate-400">
                            {l.duration_minutes} min
                          </span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-4 pt-24 lg:ml-72 lg:p-8 lg:pt-8">
        {selectedLesson ? (
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 space-y-3">
              <QuestionnairePositionnementBanner compact />
              {progressPercent >= 50 ? <QuestionnaireSatisfactionBanner compact /> : null}
              {progressPercent >= 50 ? <AvisGoogleBanner compact /> : null}
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-8">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <span>
                  {
                    (allLessons.find((l) => l.id === selectedLessonId) as { moduleTitle?: string })
                      ?.moduleTitle
                  }
                </span>
                <ChevronRight size={16} strokeWidth={1.5} />
                <span className="font-medium text-slate-700">{selectedLesson.title}</span>
              </div>
              <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">
                {selectedLesson.title}
              </h2>

              <div className="mt-8 min-h-[200px]">
                {selectedLesson.type === 'video' && selectedLesson.content_url ? (
                  <YouTubeOrVideoEmbed url={selectedLesson.content_url} />
                ) : selectedLesson.type === 'video' ? (
                  <div className="rounded-xl bg-slate-100 p-12 text-center">
                    <p className="text-slate-500">Aucune vidéo configurée pour cette leçon</p>
                  </div>
                ) : selectedLesson.type === 'texte' && selectedLesson.content_text ? (
                  <div
                    className="prose prose-slate max-w-none rounded-xl border border-slate-200 bg-white p-6"
                    dangerouslySetInnerHTML={{
                      __html: selectedLesson.content_text.replace(/\n/g, '<br />'),
                    }}
                  />
                ) : selectedLesson.type === 'texte' ? (
                  <div className="rounded-xl bg-slate-100 p-12 text-center">
                    <p className="text-slate-500">Aucun contenu texte pour cette leçon</p>
                  </div>
                ) : selectedLesson.type === 'pdf' &&
                  (selectedLesson.content_url || pdfResources.length > 0) ? (
                  (() => {
                    const mainPdfUrl =
                      selectedLesson.content_url ?? pdfResources[selectedPdfIndex]?.file_url;
                    return (
                      <div className="space-y-3">
                        {pdfResources.length > 1 && !selectedLesson.content_url && (
                          <div className="flex gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                            {pdfResources.map((r, i) => (
                              <button
                                key={r.id}
                                type="button"
                                onClick={() => setSelectedPdfIndex(i)}
                                className={`shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium ${
                                  i === selectedPdfIndex
                                    ? 'bg-[var(--accent)] text-white'
                                    : 'bg-white text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                {r.title}
                              </button>
                            ))}
                          </div>
                        )}
                        {mainPdfUrl ? (
                          <LessonMediaPreview
                            type="pdf"
                            contentUrl={mainPdfUrl}
                            title={selectedLesson.title}
                          />
                        ) : null}
                      </div>
                    );
                  })()
                ) : selectedLesson.type === 'pdf' ? (
                  <div className="rounded-xl bg-slate-100 p-12 text-center">
                    <p className="text-slate-500">Aucun PDF configuré pour cette leçon</p>
                  </div>
                ) : selectedLesson.type === 'lien' ? (
                  <LessonMediaPreview
                    type="lien"
                    contentUrl={selectedLesson.content_url}
                    contentText={selectedLesson.content_text}
                    title={selectedLesson.title}
                  />
                ) : selectedLesson.type === 'quiz' ? (
                  <div className="rounded-xl bg-slate-100 p-12 text-center">
                    <p className="text-slate-500">Quiz (à implémenter)</p>
                  </div>
                ) : (
                  <div className="rounded-xl bg-slate-100 p-12 text-center">
                    <p className="text-slate-500">Contenu non disponible</p>
                  </div>
                )}
              </div>

              {linkResources.length > 0 && (
                <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="mb-3 flex items-center gap-2 font-semibold text-slate-800">
                    <Link2 size={18} strokeWidth={1.5} />
                    Ressources pédagogiques
                  </h3>
                  <ul className="space-y-2">
                    {linkResources.map((r) => (
                      <li key={r.id}>
                        <a
                          href={r.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-[var(--accent)] hover:underline"
                        >
                          <ExternalLink size={14} strokeWidth={1.5} />
                          {r.title || new URL(r.file_url).hostname}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:mt-8">
                {prevLesson ? (
                  <button
                    type="button"
                    onClick={() => goToLesson(prevLesson.id)}
                    className="flex items-center gap-2 rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <ChevronLeft size={20} strokeWidth={1.5} />
                    Leçon précédente
                  </button>
                ) : (
                  <span />
                )}
                {nextLesson ? (
                  <button
                    type="button"
                    onClick={() => goToLesson(nextLesson.id)}
                    className="flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    Leçon suivante
                    <ChevronRight size={20} strokeWidth={1.5} />
                  </button>
                ) : null}
              </div>
            </div>

            {progressPercent >= 100 && (
              <div className="mx-auto mt-10 max-w-2xl space-y-6">
                <QuestionnaireSatisfactionBanner />
                <AvisGoogleBanner />
                <SatisfactionSurvey
                  courseId={course.id}
                  courseTitle={course.title}
                  onSubmitted={() => router.refresh()}
                />
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="font-semibold text-slate-900">Formation terminée</p>
                  <p className="mt-1 text-sm text-slate-600">
                    Téléchargez votre attestation de suivi.
                  </p>
                  <Link
                    href={`/espace-apprenant/attestation/${course.id}`}
                    className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-2.5 font-medium text-white hover:bg-[var(--accent)]/90"
                  >
                    Obtenir l&apos;attestation
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="mx-auto max-w-4xl space-y-4">
            <QuestionnairePositionnementBanner compact />
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white">
              <BookOpen size={48} strokeWidth={1} className="text-slate-300" />
              <p className="mt-4 font-medium text-slate-600">
                Sélectionnez une leçon dans le menu
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
