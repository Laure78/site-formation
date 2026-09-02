import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import type { RessourceCatalogEntry } from '@/lib/ressources-catalog';
import { getRessourcePrimaryCta } from '@/lib/ressources-catalog';

const FORMAT_BADGE: Record<string, string> = {
  guide: 'Guide',
  tutoriel: 'Tutoriel',
  'modele-fichier': 'Modèle',
  skill: 'Skill',
  outil: 'Outil',
  article: 'Article',
};

const AUDIENCE_LABELS: Record<string, string> = {
  dirigeant: 'dirigeant',
  'charge-affaires': 'chargé d’affaires',
  'conducteur-travaux': 'conducteur de travaux',
  'chef-chantier': 'chef de chantier',
  'assistant-travaux': 'assistant travaux',
  'maitrise-oeuvre': 'maîtrise d’œuvre',
  'rh-admin': 'RH / admin',
};

type RessourceCardProps = {
  resource: RessourceCatalogEntry;
  headingLevel?: 'h3' | 'h4';
};

export function RessourceCard({ resource, headingLevel = 'h3' }: RessourceCardProps) {
  const Heading = headingLevel;
  const primaryCta = getRessourcePrimaryCta(resource);
  const badgeLabel = FORMAT_BADGE[resource.resourceType] ?? resource.format;
  const isExternalView = resource.external;

  const titleLink = isExternalView ? (
    <ExternalLinkAnchor
      href={resource.viewUrl}
      title={`${primaryCta} — ${resource.title}`}
      className="hover:text-[#377CF3]"
    >
      {resource.title}
    </ExternalLinkAnchor>
  ) : (
    <Link href={resource.viewUrl} className="hover:text-[#377CF3]">
      {resource.title}
    </Link>
  );

  const primaryButton = isExternalView ? (
    <ExternalLinkAnchor
      href={resource.viewUrl}
      title={`${primaryCta} — ${resource.title}`}
      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
    >
      {primaryCta}
      <ExternalLink className="h-4 w-4 shrink-0" aria-hidden />
    </ExternalLinkAnchor>
  ) : (
    <Link
      href={resource.viewUrl}
      className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#377CF3] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#2d66d6]"
    >
      {primaryCta}
      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden />
    </Link>
  );

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-[#377CF3]/35 hover:shadow-md">
      {resource.image ? (
        <div className="relative aspect-video bg-[#F2F2F2]">
          <Image
            src={resource.image.src}
            alt={resource.image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            quality={70}
            loading="lazy"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-[#EFF6FF] px-2.5 py-0.5 text-xs font-semibold text-[#377CF3]">
            {badgeLabel}
          </span>
          <span className="text-xs text-slate-500">{resource.topic}</span>
          {resource.external ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500">
              <ExternalLink className="h-3 w-3" aria-hidden />
              Externe
            </span>
          ) : null}
          {resource.status === 'a_verifier' ? (
            <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-800">
              À vérifier
            </span>
          ) : null}
        </div>

        <Heading className="mt-3 font-display text-lg font-bold leading-snug text-slate-900 md:text-xl">
          {titleLink}
        </Heading>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-600">
          {resource.shortDescription}
        </p>

        {resource.audiences.length > 0 ? (
          <p className="mt-3 text-xs text-slate-500">
            Public : {resource.audiences.map((a) => AUDIENCE_LABELS[a] ?? a).join(', ')}
          </p>
        ) : null}

        {resource.useCases.length > 0 ? (
          <ul className="mt-3 space-y-1" aria-label="Cas d’usage">
            {resource.useCases.slice(0, 3).map((useCase) => (
              <li key={useCase} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#377CF3]" aria-hidden />
                {useCase}
              </li>
            ))}
          </ul>
        ) : null}

        {resource.safetyLevel === 'verification_professionnelle' ? (
          <p className="mt-3 inline-flex items-start gap-1.5 text-xs font-medium text-slate-700">
            <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#377CF3]" aria-hidden />
            Vérification professionnelle requise
          </p>
        ) : null}

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
          {resource.isFree ? <span>Gratuit</span> : <span>Accès payant / abonnement</span>}
          {resource.isFree && !resource.requiresRegistration ? <span aria-hidden>·</span> : null}
          {!resource.requiresRegistration && resource.isFree ? <span>Sans inscription</span> : null}
          {resource.requiresRegistration ? <span>Inscription requise</span> : null}
        </div>

        <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
          {primaryButton}
          {resource.downloadUrl && !resource.requiresRegistration ? (
            <a
              href={resource.downloadUrl}
              download
              className="inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-[#377CF3]/40 hover:text-[#377CF3]"
            >
              <Download className="h-4 w-4 shrink-0" aria-hidden />
              {resource.downloadLabel ?? 'Téléchargement direct'}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
