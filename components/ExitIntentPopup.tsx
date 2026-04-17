'use client';

import Image from 'next/image';
import { X } from 'lucide-react';
import { Poppins } from 'next/font/google';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const STORAGE_KEY = 'ofc-exit-intent-popup-shown';
/** Délai minimum sur la page avant d’activer la détection de sortie (desktop). */
const ENGAGEMENT_MS = 30_000;
const MIN_WIDTH = 768;
const TOP_THRESHOLD_PX = 12;

function hasBeenShown(): boolean {
  try {
    return typeof sessionStorage !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return true;
  }
}

function markShown(): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* navigation privée, etc. */
  }
}

export function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const handleClose = useCallback(() => {
    document.body.style.overflow = '';
    setFadeIn(false);
    setOpen(false);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    if (hasBeenShown()) return;

    let detachLeave: (() => void) | undefined;

    const tryAttach = () => {
      if (hasBeenShown()) return;
      if (window.innerWidth <= MIN_WIDTH) return;

      const el = document.documentElement;

      const onLeave = (e: MouseEvent) => {
        if (window.innerWidth <= MIN_WIDTH) return;
        if (e.clientY > TOP_THRESHOLD_PX) return;
        if (hasBeenShown()) return;
        markShown();
        detachLeave?.();
        detachLeave = undefined;
        setOpen(true);
      };

      el.addEventListener('mouseleave', onLeave);
      detachLeave = () => el.removeEventListener('mouseleave', onLeave);
    };

    const timer = window.setTimeout(tryAttach, ENGAGEMENT_MS);

    const onResize = () => {
      if (window.innerWidth <= MIN_WIDTH) detachLeave?.();
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(timer);
      detachLeave?.();
      window.removeEventListener('resize', onResize);
    };
  }, [mounted]);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const id = requestAnimationFrame(() => {
      setFadeIn(true);
      window.setTimeout(() => closeBtnRef.current?.focus(), 50);
    });
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, handleClose]);

  if (!mounted || typeof document === 'undefined') return null;

  if (!open) return null;

  const modal = (
    <div
      className={`fixed inset-0 z-[10001] flex items-center justify-center p-4 transition-opacity duration-300 ease-out ${
        fadeIn ? 'opacity-100' : 'opacity-0'
      }`}
      role="presentation"
    >
      <button
        type="button"
        aria-label="Fermer la fenêtre"
        className="absolute inset-0 bg-black/55 backdrop-blur-[1px]"
        onClick={handleClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-intent-title"
        className={`relative z-10 w-full max-w-md bg-white p-6 shadow-lg ${poppins.className}`}
        style={{ borderRadius: 16 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          type="button"
          onClick={handleClose}
          className="absolute right-3 top-3 rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" strokeWidth={2} aria-hidden />
        </button>

        <div className="mb-4 flex justify-center pr-8">
          <Image
            src="/logo-lo.svg"
            alt="OFC Création d'Entreprise — logo"
            width={140}
            height={48}
            className="h-10 w-auto object-contain"
            priority={false}
          />
        </div>

        <h2
          id="exit-intent-title"
          className="pr-6 text-[22px] font-semibold leading-tight text-[#377CF3]"
        >
          Avant de partir…
        </h2>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">
          Prenez 30 min avec Laure pour voir comment l&apos;IA peut faire gagner 5h/semaine à votre équipe BTP.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <a
            href={CALENDLY_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-calendly
            className="inline-flex w-full items-center justify-center rounded-lg bg-[#377CF3] px-4 py-3 text-center text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#2d66d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
          >
            Réservez votre visio gratuite
          </a>
          <button
            type="button"
            onClick={handleClose}
            className="text-center text-sm text-slate-500 underline-offset-2 transition-colors hover:text-slate-700 hover:underline"
          >
            Non merci, je vais y réfléchir
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
