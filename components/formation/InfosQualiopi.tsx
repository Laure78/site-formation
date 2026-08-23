import Link from 'next/link';
import {
  Accessibility,
  Award,
  BookOpen,
  Calendar,
  ClipboardCheck,
  Clock,
  Euro,
  LineChart,
  Mail,
  Phone,
  Target,
  Users,
} from 'lucide-react';
import { IndicateursResultatsLink } from '@/components/formation/IndicateursResultatsLink';
import { getStatsFreshnessLabel, siteStats } from '@/lib/constants';
import {
  QUALIOPI_FICHE_META,
} from '@/config/qualiopi';
import {
  QUALIOPI_CONTACTS,
  QUALIOPI_REFERENT_HANDICAP,
  getInfosQualiopiForCatalogue,
  type InfosQualiopiProps,
} from '@/lib/qualiopi-info';
import { assertInfosReglementairesCompletes } from '@/lib/assert-infos-reglementaires';
import { LINKS } from '@/lib/internal-links';
import { QUALIOPI_INDICATEUR1_LABELS } from '@/lib/qualiopi-indicateur1-labels';
import { FormationPartenairesMention } from '@/components/formations/FormationPartenairesMention';
import { MentionTVA, MentionTvaAsterisque } from '@/components/MentionTVA';
import { MentionFinancement } from '@/components/MentionFinancement';

function asList(items: string | readonly string[]): readonly string[] {
  return typeof items === 'string' ? [items] : items;
}

type ItemProps = {
  icon: typeof Target;
  title: string;
  children: React.ReactNode;
};

function QualiopiItem({ icon: Icon, title, children }: ItemProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2 text-[#377CF3]">
        <Icon className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      <div className="mt-3 text-sm leading-relaxed text-slate-700">{children}</div>
    </div>
  );
}

/**
 * Bloc Qualiopi indicateur 1 — 11 sections obligatoires (grille audit).
 * Throw au build / SSR si une section manque (via assertInfosReglementairesCompletes).
 */
export function InformationsReglementaires(props: InfosQualiopiProps) {
  const validated = assertInfosReglementairesCompletes(props);
  const {
    dureeJours,
    version = QUALIOPI_FICHE_META.version,
    programmePdfHref,
  } = props;
  const methodesList = asList(validated.methodes);
  const evaluationList = asList(validated.evaluation);
  const labels = QUALIOPI_INDICATEUR1_LABELS;

  return (
    <section
      id="informations-qualiopi"
      aria-labelledby="infos-qualiopi-heading"
      className="scroll-mt-28 border-t border-slate-200 bg-[#F8FAFC] px-4 py-14 md:py-16"
    >
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#377CF3]">
            Indicateur 1 Qualiopi — information du public
          </p>
          <h2 id="infos-qualiopi-heading" className="mt-2 font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Informations réglementaires — {validated.formationTitle}
          </h2>
          <p className="mt-2 text-sm text-slate-500">Référence programme : {validated.programmeRef}</p>
          <p className="mt-1 text-sm font-medium text-slate-600">
            Dernière mise à jour du programme : {validated.lastUpdated}
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <QualiopiItem icon={Users} title={`1. ${labels.prerequis}`}>
            <ul className="list-disc space-y-1.5 pl-4">
              {asList(validated.prerequis).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </QualiopiItem>

          <QualiopiItem icon={Target} title={`2. ${labels.objectifs}`}>
            <p className="mb-2 text-slate-600">Objectifs opérationnels et évaluables :</p>
            <ul className="list-disc space-y-1.5 pl-4">
              {validated.objectifs.map((obj) => (
                <li key={obj}>{obj}</li>
              ))}
            </ul>
          </QualiopiItem>

          <QualiopiItem icon={BookOpen} title={`3. ${labels.contenu}`}>
            <ul className="list-disc space-y-1.5 pl-4">
              {validated.contenu.map((module) => (
                <li key={module}>{module}</li>
              ))}
            </ul>
            <p className="mt-3">
              <Link href={programmePdfHref} className="font-medium text-[#377CF3] hover:underline">
                Télécharger le programme officiel (PDF)
              </Link>
            </p>
          </QualiopiItem>

          <QualiopiItem icon={Clock} title={`4. ${labels.duree}`}>
            <p>
              <strong>{validated.duree}</strong>
              {dureeJours ? ` — ${dureeJours}` : null}
            </p>
          </QualiopiItem>

          <QualiopiItem icon={Calendar} title={`5. ${labels.modalitesAcces}`}>
            <p>{validated.modalitesAcces}</p>
            <p className="mt-3">
              <Link href={LINKS.prendreRdv} className="font-medium text-[#377CF3] hover:underline">
                Prendre rendez-vous
              </Link>{' '}
              ou{' '}
              <Link href={LINKS.contact} className="font-medium text-[#377CF3] hover:underline">
                me contacter
              </Link>{' '}
              pour vérifier les prochaines dates.
            </p>
          </QualiopiItem>

          <QualiopiItem icon={Calendar} title={`6. ${labels.delaisAcces}`}>
            <p>{validated.delaiAcces}</p>
          </QualiopiItem>

          <QualiopiItem icon={Euro} title={`7. ${labels.tarif}`}>
            <p>
              <strong>Tarif :</strong> {validated.tarifIntra}
              <MentionTvaAsterisque />
            </p>
            <MentionTVA className="mt-3" />
            <p className="mt-2 text-slate-600">
              <MentionFinancement variant="court" />.
            </p>
          </QualiopiItem>

          <QualiopiItem icon={BookOpen} title={`8. ${labels.methodes}`}>
            <ul className="list-disc space-y-1.5 pl-4">
              {methodesList.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </QualiopiItem>

          <QualiopiItem icon={ClipboardCheck} title={`9. ${labels.evaluation}`}>
            <ul className="list-disc space-y-1.5 pl-4">
              {evaluationList.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </QualiopiItem>

          <QualiopiItem icon={Accessibility} title={`10. ${labels.handicap}`}>
            <p>{validated.handicap}</p>
            <p className="mt-3 text-slate-600">
              Référente handicap : {QUALIOPI_REFERENT_HANDICAP.nom} —{' '}
              <a
                href={`mailto:${QUALIOPI_REFERENT_HANDICAP.email}`}
                className="font-medium text-[#377CF3] hover:underline"
              >
                {QUALIOPI_REFERENT_HANDICAP.email}
              </a>{' '}
              ·{' '}
              <a
                href={`tel:${QUALIOPI_REFERENT_HANDICAP.telephoneTel}`}
                className="font-medium text-[#377CF3] hover:underline"
              >
                {QUALIOPI_REFERENT_HANDICAP.telephone}
              </a>
            </p>
            <p className="mt-3">
              <Link href={LINKS.annuaireHandicap} className="font-medium text-[#377CF3] hover:underline">
                Consulter l&apos;annuaire des partenaires handicap
              </Link>
            </p>
          </QualiopiItem>

          <QualiopiItem icon={Mail} title={`11. ${labels.contact}`}>
            <ul className="space-y-2">
              <li className="text-slate-600">
                <span className="font-medium text-slate-900">{QUALIOPI_CONTACTS.nom}</span>
              </li>
              <li className="text-slate-600">{QUALIOPI_CONTACTS.fonction}</li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                <a href={`mailto:${QUALIOPI_CONTACTS.email}`} className="font-medium text-[#377CF3] hover:underline">
                  {QUALIOPI_CONTACTS.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
                <a
                  href={`tel:${QUALIOPI_REFERENT_HANDICAP.telephoneTel}`}
                  className="font-medium text-[#377CF3] hover:underline"
                >
                  {QUALIOPI_REFERENT_HANDICAP.telephone}
                </a>
              </li>
              <li className="text-slate-600">{QUALIOPI_CONTACTS.adresse}</li>
            </ul>
            <p className="mt-3 flex items-center gap-2 text-slate-600">
              <Award className="h-4 w-4 shrink-0 text-[#377CF3]" aria-hidden />
              Organisme certifié Qualiopi — actions de formation
            </p>
          </QualiopiItem>
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-[#377CF3]">
            <LineChart className="h-5 w-5 shrink-0" strokeWidth={1.75} aria-hidden />
            <h3 className="font-semibold text-slate-900">Indicateurs de résultats</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">
            En {new Date().getFullYear()}, OFC Création d&apos;Entreprise publie ses indicateurs de résultats
            Qualiopi sur plus de{' '}
            <strong></strong> ({getStatsFreshnessLabel()}
            ).
          </p>
          <IndicateursResultatsLink className="mt-3 text-left" />
        </div>

        <p className="mt-8 text-center text-xs text-slate-500">
          Fiche formation mise à jour le {validated.lastUpdated} — {version}
        </p>

        <FormationPartenairesMention className="!max-w-none !px-0 !pb-0 !pt-6" />
      </div>
    </section>
  );
}

/** Alias historique — même composant (11 sections audit + garde build). */
export function InfosQualiopi(props: InfosQualiopiProps) {
  return <InformationsReglementaires {...props} />;
}

export function CatalogueInfosQualiopi({ programmeRef }: { programmeRef: string }) {
  return <InformationsReglementaires {...getInfosQualiopiForCatalogue(programmeRef)} />;
}
