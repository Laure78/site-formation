'use client';

import { useCallback, useEffect, useRef, useState, type Dispatch, type SetStateAction } from 'react';

const OPEN_DELAY_MS = 150;
const CLOSE_DELAY_MS = 250;

function focusIsInItemZone(itemId: string): boolean {
  if (typeof document === 'undefined') return false;
  const active = document.activeElement;
  if (!active) return false;
  const selector = `[data-header-nav-zone="${itemId}"], [data-header-mega-for="${itemId}"]`;
  return Boolean(active.closest(selector));
}

export type HeaderNavDesktopHover = {
  enabled: boolean;
  onZoneEnter: (itemId: string) => void;
  onZoneLeave: (itemId: string) => void;
};

/** Survol desktop (fine pointer) — ouverture différée, fermeture avec grace period. */
export function useHeaderNavDesktopHover(
  openId: string | null,
  setOpenId: Dispatch<SetStateAction<string | null>>,
): HeaderNavDesktopHover {
  const [enabled, setEnabled] = useState(false);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openIdRef = useRef(openId);

  useEffect(() => {
    openIdRef.current = openId;
  }, [openId]);

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const clearOpenTimer = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const clearAllTimers = useCallback(() => {
    clearOpenTimer();
    clearCloseTimer();
  }, [clearCloseTimer, clearOpenTimer]);

  useEffect(() => () => clearAllTimers(), [clearAllTimers]);

  const scheduleClose = useCallback(
    (itemId: string) => {
      if (!enabled) return;
      clearCloseTimer();
      closeTimerRef.current = setTimeout(() => {
        closeTimerRef.current = null;
        if (focusIsInItemZone(itemId)) return;
        setOpenId((current) => (current === itemId ? null : current));
      }, CLOSE_DELAY_MS);
    },
    [clearCloseTimer, enabled, setOpenId],
  );

  const onZoneEnter = useCallback(
    (itemId: string) => {
      if (!enabled) return;
      clearCloseTimer();
      clearOpenTimer();

      if (openIdRef.current === itemId) return;

      if (openIdRef.current !== null) {
        setOpenId(itemId);
        return;
      }

      openTimerRef.current = setTimeout(() => {
        openTimerRef.current = null;
        setOpenId(itemId);
      }, OPEN_DELAY_MS);
    },
    [clearCloseTimer, clearOpenTimer, enabled, setOpenId],
  );

  const onZoneLeave = useCallback(
    (itemId: string) => {
      if (!enabled) return;
      clearOpenTimer();
      if (openIdRef.current === itemId) {
        scheduleClose(itemId);
      }
    },
    [clearOpenTimer, enabled, scheduleClose],
  );

  return { enabled, onZoneEnter, onZoneLeave };
}
