import { HardHat, MapPin, Sparkles } from 'lucide-react';
import { InPageAnchor } from '@/components/navigation/InPageAnchor';
import { EnBref } from '@/app/components/EnBref';
import {
  CONSULTANT_HERO_PILLS,
  CONSULTANT_HERO_SUBTITLE,
} from '@/lib/consultant-recruitment-content';
import { formateurRecruitmentMailtoHref, RECRUITMENT } from '@/lib/constants';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY, OFC_EYEBROW, OFC_TYPE_HERO } from '@/lib/ofc-interaction-classes';
import { ofcSectionClasses, OFC_SECTION_INNER } from '@/lib/ofc-section-classes';

const PILL_ICONS = [HardHat, Sparkles, MapPin] as const;

export function ConsultantRecruitmentHero() {
  return (
    <section className={ofcSectionClasses({ tone: 'white', size: 'compact', mesh: false })}>
      <div className={`${OFC_SECTION_INNER} max-w-4xl`}>
        <p className={OFC_EYEBROW}>Carrière</p>
        <h1 className={`${OFC_TYPE_HERO} mt-2`}>Devenez consultant-formateur en IA BTP</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ofc-ink-muted">
          {CONSULTANT_HERO_SUBTITLE}
        </p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <InPageAnchor
            href="#candidature"
            className={`${OFC_CTA_PRIMARY} inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
          >
            Proposer mon expertise
          </InPageAnchor>
          <InPageAnchor
            href="#parcours-selection"
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
          >
            Comment se déroule la sélection ?
          </InPageAnchor>
          <a
            href={formateurRecruitmentMailtoHref()}
            className={`${OFC_CTA_SECONDARY} inline-flex min-h-12 items-center justify-center rounded-lg px-6 py-3 text-base font-semibold`}
            aria-label={`Contacter le recrutement formateurs à ${RECRUITMENT.email}`}
          >
            {RECRUITMENT.email}
          </a>
        </div>

        <ul className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3" aria-label="Repères">
          {CONSULTANT_HERO_PILLS.map((pill, index) => {
            const Icon = PILL_ICONS[index] ?? Sparkles;
            return (
              <li
                key={pill.label}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-800"
              >
                <Icon className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                {pill.label}
              </li>
            );
          })}
        </ul>

        <EnBref className="mt-4 max-w-2xl">
          <p>
            Laure Olivié (Qualiopi) recueille les propositions de{' '}
            <strong>consultants-formateurs indépendants</strong> pour les{' '}
            <strong>7 parcours métiers</strong> du catalogue IA BTP — pas pour les modules isolés
            hors parcours. Sans promesse d&apos;emploi salarié ni de volume de missions. Contact
            recrutement :{' '}
            <a
              href={formateurRecruitmentMailtoHref()}
              className="font-medium text-[#377CF3] underline-offset-2 hover:underline"
            >
              {RECRUITMENT.email}
            </a>
            .
          </p>
        </EnBref>
      </div>
    </section>
  );
}
