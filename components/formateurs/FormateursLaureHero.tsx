'use client';

import Link from 'next/link';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { FormateurPortraitView } from '@/components/formateurs/FormateurPortrait';
import {
  getFormateurHubProgrammeLinks,
  type FormateurProfile,
} from '@/lib/formateurs';
import { formatAnneesExperienceBTP } from '@/lib/data/indicateurs-resultats';
import { SCHEMA_LINKEDIN_PROFILE_URL } from '@/lib/schema-constants';
import { OFC_CTA_SECONDARY, OFC_LINK } from '@/lib/ofc-interaction-classes';
import { cn } from '@/lib/cn';

type Props = {
  laure: FormateurProfile;
  onOpenProfil: () => void;
};

/** Mise en avant Laure Olivié — coordinatrice pédagogique, distincte de la grille. */
export function FormateursLaureHero({ laure, onOpenProfil }: Props) {
  const programmesCount = getFormateurHubProgrammeLinks(laure).length;
  const fullName = `${laure.prenom} ${laure.nom}`;

  return (
    <article
      id={laure.slug}
      className={cn(
        'formateurs-laure-hero scroll-mt-[var(--site-header-height)] rounded-xl border border-ofc-border bg-white p-5 sm:p-6',
      )}
      aria-labelledby="formateurs-laure-name"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <FormateurPortraitView portrait={laure.portrait} shape="portrait" priority />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-ofc-accent">
            Référente pédagogique
          </p>
          <h2 id="formateurs-laure-name" className="mt-1 font-display text-xl font-bold text-ofc-ink sm:text-2xl">
            {fullName}
          </h2>
          <p className="mt-2 text-base font-medium leading-snug text-ofc-accent text-pretty">
            Fondatrice d’OFC Création d’Entreprise, formatrice IA spécialisée BTP, coordinatrice
            pédagogique
          </p>
          <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted text-pretty">
            {formatAnneesExperienceBTP()} · {programmesCount} formation
            {programmesCount > 1 ? 's' : ''} animée{programmesCount > 1 ? 's' : ''} au catalogue IA
            ·{' '}
            <ExternalLinkAnchor href={SCHEMA_LINKEDIN_PROFILE_URL} className={OFC_LINK}>
              Profil LinkedIn
            </ExternalLinkAnchor>
          </p>
          <p className="mt-3 text-base leading-relaxed text-ofc-ink-muted text-pretty">
            Laure construit les programmes, sélectionne les intervenants métiers et assure le suivi
            qualité des sessions — organisme certifié Qualiopi.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              onClick={onOpenProfil}
              className={`${OFC_CTA_SECONDARY} inline-flex min-h-11 items-center justify-center px-5 py-2.5 text-sm font-semibold`}
              aria-label={`Voir le profil de ${fullName}`}
            >
              Voir le profil
            </button>
            <Link
              href={laure.profileHref ?? '/a-propos'}
              className={`${OFC_LINK} inline-flex min-h-11 items-center text-sm font-semibold text-ofc-accent`}
            >
              Parcours détaillé
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
