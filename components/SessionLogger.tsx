'use client';

import { useEffect, useRef } from 'react';

export function SessionLogger({ modulesConsulted = [] }: { modulesConsulted?: string[] }) {
  const logged = useRef(false);

  useEffect(() => {
    if (logged.current) return;
    logged.current = true;
    fetch('/api/session-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ modulesConsulted }),
    }).catch(() => {});
  }, [modulesConsulted]);

  return null;
}
