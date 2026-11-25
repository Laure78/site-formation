'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { formateurPublicProfileHref } from '@/lib/formateurs/formateur-profile-href';
import { FormateurDetailDialog } from '@/components/formateurs/FormateurDetailDialog';
import type { FormateurProfile } from '@/lib/formateurs';

type Props = {
  formateurs: readonly FormateurProfile[];
};

/** Panneau profil formateur — synchronisé avec l’ancre `#slug`. */
export function FormateursProfileDialogHost({ formateurs }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  const selectedFormateur = useMemo(
    () => formateurs.find((f) => f.slug === selectedSlug) ?? null,
    [formateurs, selectedSlug],
  );

  const closeProfil = useCallback(() => {
    setSelectedSlug(null);
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(searchParams.toString());
    const qs = params.toString();
    window.history.replaceState(null, '', qs ? `${pathname}?${qs}` : pathname);
  }, [pathname, searchParams]);

  useEffect(() => {
    const syncHash = () => {
      const hash = window.location.hash.replace(/^#/, '');
      if (!hash) {
        setSelectedSlug(null);
        return;
      }
      const match = formateurs.find((f) => f.slug === hash);
      if (!match) return;
      const target = formateurPublicProfileHref(match);
      if (target.includes('#')) {
        setSelectedSlug(hash);
        return;
      }
      router.replace(target);
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, [formateurs, router]);

  return (
    <FormateurDetailDialog
      formateur={selectedFormateur}
      open={selectedFormateur !== null}
      onClose={closeProfil}
    />
  );
}
