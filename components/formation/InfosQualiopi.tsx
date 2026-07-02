import Link from 'next/link';
import { Accessibility, Award, BookOpen, Calendar, ClipboardCheck, Clock, Euro, Mail, Phone, Target, Users } from 'lucide-react';
import { QUALIOPI_FICHE_META } from '@/config/qualiopi';
import {
  QUALIOPI_CONTACTS,
  QUALIOPI_REFERENT_HANDICAP,
  buildLandingInfosQualiopiProps,
  getInfosQualiopiForCatalogue,
  type InfosQualiopiProps,
} from '@/lib/qualiopi-info';
import { LINKS } from '@/lib/internal-links';

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

export function InfosQualiopi({
  formationTitle,
  prerequis,
  objectifs,
  duree,
  dureeJours,
  modalitesAcces,
  tarifInter,
  tarifIntra,
  methodes,
  evaluation,
  handicap,
  lastUpdated,
  version = QUALIOPI_FICHE_META.version,
  programmeRef,
}: InfosQualiopiProps) {
  const methodesList = methodes ?? [];
  const evaluationList = evaluation ?? [];

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
            Informations réglementaires — {formationTitle}
          </h2>
          {programmeRef ? (
            <p className="mt-2 text-sm text-slate-500">Référence programme : {programmeRef}</p>
          ) : null}
          {lastUpdated ? (
            <p className="mt-1 text-sm font-medium text-slate-600">Dernière mise à jour du programme : {lastUpdated}</p>
          ) : null}
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          <QualiopiItem icon={Users} title="1. Prérequis">
            <ul className="list-disc space-y-1.5 pl-4">
              {asList(prerequis).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </QualiopiItem>

          <QualiopiItem icon={Target} title="2. Objectifs de la formation">
            <p className="mb-2 text-slate-600">Objectifs opérationnels et évaluables :</p>
            <ul className="list-disc space-y-1.5 pl-4">
              {objectifs.map((obj) => (
                <li key={obj}>{obj}</li>
              ))}
            </ul>
          </QualiopiItem>

          <QualiopiItem icon={Clock} title="3. Durée">
            <p>
              <strong>{duree}</strong>
              {dureeJours ? ` — ${dureeJours}` : null}
            </p>
          </QualiopiItem>

          <QualiopiItem icon={Calendar} title="4. Modalités et délais d'accès">
            <p>{modalitesAcces}</p>
            <p className="mt-2">
              <Link href={LINKS.prendreRdv} className="font-medium text-[#377CF3] hover:underline">
                Prendre rendez-vous
              </Link>{' '}
              ou{' '}
              <Link href={LINKS.contact} className="font-medium text-[#377CF3] hover:underline">
                nous contacter
              </Link>{' '}
              pour vérifier les prochaines dates.
            </p>
          </QualiopiItem>

          <QualiopiItem icon={Euro} title="5. Tarifs (HT)">
            <p>
              <strong>Inter-entreprise :</strong> {tarifInter}
            </p>
            <p className="mt-2">
              <strong>Intra-entreprise :</strong> {tarifIntra}
            </p>
            <p className="mt-2 text-slate-600">
              TVA non applicable, art. 261-4-4° du CGI (formation professionnelle). Financement OPCO Constructys
              possible selon éligibilité —{' '}
              <Link href={LINKS.financement} className="font-medium text-[#377CF3] hover:underline">
                voir le guide financement
              </Link>
              .
            </p>
          </QualiopiItem>

          <QualiopiItem icon={BookOpen} title="6. Méthodes mobilisées">
            <ul className="list-disc space-y-1.5 pl-4">
              {methodesList.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </QualiopiItem>

          <QualiopiItem icon={ClipboardCheck} title="7. Modalités d'évaluation">
            <ul className="list-disc space-y-1.5 pl-4">
              {evaluationList.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </QualiopiItem>

          <QualiopiItem icon={Accessibility} title="8. Accessibilité handicap">
            <p>{handicap}</p>
            <p className="mt-3">
              <Link href={LINKS.annuaireHandicap} className="font-medium text-[#377CF3] hover:underline">
                Consulter notre annuaire des partenaires handicap
              </Link>
            </p>
          </QualiopiItem>

          <QualiopiItem icon={Mail} title="9. Contacts">
            <ul className="space-y-2">
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

        {lastUpdated ? (
          <p className="mt-8 text-center text-xs text-slate-500">
            Fiche formation mise à jour le {lastUpdated} — {version}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function CatalogueInfosQualiopi({ programmeRef }: { programmeRef: string }) {
  return <InfosQualiopi {...getInfosQualiopiForCatalogue(programmeRef)} />;
}

export function InfosQualiopiLanding({ formationTitle }: { formationTitle: string }) {
  return <InfosQualiopi {...buildLandingInfosQualiopiProps(formationTitle)} />;
}
