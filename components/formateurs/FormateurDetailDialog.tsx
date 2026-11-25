'use client';

import { useEffect, useId, useRef } from 'react';
import { X } from 'lucide-react';
import { FormateurProfileDetail } from '@/components/formateurs/FormateurProfileDetail';
import type { FormateurProfile } from '@/lib/formateurs';
import { cn } from '@/lib/cn';

type Props = {
  formateur: FormateurProfile | null;
  open: boolean;
  onClose: () => void;
};

/** Panneau latéral / bottom sheet — détail formateur (focus piégé, Échap). */
export function FormateurDetailDialog({ formateur, open, onClose }: Props) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;
      const node = panelRef.current;
      if (!node) return;
      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !formateur) return null;

  const fullName = `${formateur.prenom} ${formateur.nom}`;

  return (
    <>
      <button
        type="button"
        className="fixed inset-0 z-[70] bg-slate-900/45 motion-reduce:transition-none"
        aria-label="Fermer le profil"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'formateur-detail-dialog fixed z-[71] flex flex-col bg-white shadow-xl motion-reduce:transition-none',
          'inset-x-0 bottom-0 max-h-[min(92dvh,720px)] rounded-t-2xl',
          'md:inset-y-0 md:right-0 md:left-auto md:w-full md:max-w-lg md:rounded-none md:rounded-l-2xl md:max-h-none',
          'motion-safe:animate-[header-mobile-drawer-in_0.24s_var(--ofc-ease-out)_both] motion-reduce:animate-none',
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-ofc-border px-4 py-3 sm:px-5">
          <h2 id={titleId} className="font-display text-lg font-bold text-ofc-ink text-pretty">
            {fullName}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="flex min-h-11 min-w-11 items-center justify-center rounded-xl text-ofc-ink hover:bg-ofc-canvas focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5">
          <FormateurProfileDetail formateur={formateur} portraitPriority />
        </div>
      </div>
    </>
  );
}
