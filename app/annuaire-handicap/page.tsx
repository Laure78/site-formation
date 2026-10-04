import Link from 'next/link';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  Users,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Building2,
  Download,
} from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { ReferentHandicapBlock } from '@/components/formation/ReferentHandicapBlock';
import { LINKS } from '@/lib/internal-links';
import { EXTERNAL_SITE_URLS } from '@/lib/external-site-urls';

export const revalidate = 3600;
export const metadata = createPageMetadata({
  title: 'Annuaire handicap — OFC formation BTP',
  description:
    "Annuaire handicap : AGEFIPH, MDPH, accompagnement. Contacts utiles pour les stagiaires en situation de handicap en formation IA pour le BTP, OFC.",
  path: '/annuaire-handicap',
  keywords: ['handicap formation professionnelle', 'AGEFIPH', 'MDPH', 'formation IA appliquée au bâtiment'],
});

export default function AnnuaireHandicapPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* En-tête */}
      <div className="text-center">
        <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
          Annuaire national des partenaires handicap
        </h1>
        <p className="mt-4 text-slate-600">
          Document actualisé le 30 janvier 2026 — contacts RHF Agefiph (janvier 2026)
        </p>
        <p className="mt-4 text-slate-600">
          Cet annuaire répertorie les contacts utiles pour accompagner les personnes en
          situation de handicap en France. Pour le processus d&apos;accueil et la référente handicap
          OFC, consultez la{' '}
          <Link href={LINKS.accessibiliteHandicap} className="font-medium text-[var(--accent)] hover:underline">
            page Accessibilité &amp; handicap
          </Link>
          .
        </p>
        <p className="mt-6">
          <a
            href={LINKS.annuaireHandicapPdf}
            download
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            <Download size={18} strokeWidth={1.5} aria-hidden />
            Télécharger les contacts RHF Agefiph (PDF)
          </a>
        </p>
        <p className="mt-3 text-sm text-slate-500">
          Source : Agefiph — Ressource Handicap Formation, liste des contacts régionaux (janvier 2026).
        </p>
        <ul className="mt-8 flex flex-col items-center gap-2 text-left sm:inline-block">
          <li className="flex items-center gap-2 text-slate-600">
            <CheckCircle size={20} strokeWidth={1.5} className="shrink-0 text-emerald-500" />
            AGEFIPH / RHF : Contacts par région pour l&apos;insertion professionnelle
            dans le secteur privé
          </li>
          <li className="flex items-center gap-2 text-slate-600">
            <CheckCircle size={20} strokeWidth={1.5} className="shrink-0 text-emerald-500" />
            MDPH : Les 101 Maisons Départementales des Personnes Handicapées
            (métropole + DOM-TOM)
          </li>
        </ul>
      </div>

      <ReferentHandicapBlock className="mt-10" />

      {/* Contacts utiles — version web + PDF RHF */}
      <p className="mt-12 text-center text-sm text-slate-600">
        Les contacts détaillés RHF figurent dans le PDF ci-dessus. Pour les ressources officielles :{' '}
        <ExternalLinkAnchor href={EXTERNAL_SITE_URLS.agefiph} className="font-medium text-[var(--accent)] hover:underline">
          AGEFIPH
        </ExternalLinkAnchor>
        {' · '}
        <ExternalLinkAnchor
          href={EXTERNAL_SITE_URLS.agefiphRhf}
          className="font-medium text-[var(--accent)] hover:underline"
        >
          Ressource Handicap Formation (RHF)
        </ExternalLinkAnchor>
        {' · '}
        <ExternalLinkAnchor
          href="https://www.service-public.fr/particuliers/vosdroits/F16562"
          className="font-medium text-[var(--accent)] hover:underline"
        >
          MDPH (service-public.fr)
        </ExternalLinkAnchor>
      </p>

      {/* AGEFIPH */}
      <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <Users size={28} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              AGEFIPH — Ressource Handicap Formation (RHF)
            </h2>
            <p className="mt-4 text-slate-600">
              L&apos;AGEFIPH (Association de Gestion du Fonds pour l&apos;Insertion
              Professionnelle des Personnes Handicapées) accompagne les personnes
              handicapées et les employeurs pour favoriser l&apos;emploi dans le
              secteur privé. La <strong>Ressource Handicap Formation (RHF)</strong> est
              un service <strong>gratuit</strong> pour adapter une formation au handicap :
              elle accompagne les organismes de formation sur l&apos;accessibilité et
              conseille le référent handicap pour proposer un parcours adapté.
            </p>
            <p className="mt-4 text-slate-600">
              <strong>Public :</strong> personnes en situation de handicap (recherche
              d&apos;emploi, salariés, alternants) avec un projet de formation validé.{' '}
              <strong>Demande :</strong> effectuée par le référent handicap de
              l&apos;organisme de formation auprès du conseiller RHF — chez OFC, Laure
              Olivié.
            </p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li className="flex items-center gap-2">
                <MapPin size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                Contacts RHF par région — dont Île-de-France (rhf-idf@agefiph.asso.fr)
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="shrink-0 text-[var(--accent)]" />
                Coordonnées téléphones et emails dans le PDF téléchargeable
              </li>
              <li className="flex items-center gap-2">
                <Globe size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                Service RHF :{' '}
                <ExternalLinkAnchor
                  href={EXTERNAL_SITE_URLS.agefiphRhf}
                  title="Agefiph — Ressource Handicap Formation"
                  className="text-[var(--accent)] hover:underline"
                >
                  agefiph.fr/services/ressource-handicap-formation
                </ExternalLinkAnchor>
              </li>
              <li className="flex items-center gap-2">
                <Globe size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                Site web :{' '}
                <ExternalLinkAnchor
                  href={EXTERNAL_SITE_URLS.agefiph}
                  title="Agefiph — Association gestion fonds insertion handicap"
                  className="text-[var(--accent)] hover:underline"
                >
                  www.agefiph.fr
                </ExternalLinkAnchor>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* MDPH */}
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <Building2 size={28} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              MDPH — Par département
            </h2>
            <p className="mt-4 text-slate-600">
              Les Maisons Départementales des Personnes Handicapées (MDPH) sont
              le guichet unique pour l&apos;accès aux droits et prestations des
              personnes handicapées.
            </p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li className="flex items-center gap-2">
                <MapPin size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                101 départements — Toute la France métropolitaine et d&apos;outre-mer
              </li>
              <li className="flex items-center gap-2">
                <Building2 size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                Adresses complètes : coordonnées postales, téléphones et emails
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="shrink-0 text-[var(--accent)]" />
                Numéros verts : appels gratuits disponibles dans de nombreux
                départements
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Que trouver dans cet annuaire ? */}
      <section className="mt-16">
        <h2 className="font-display text-xl font-bold text-slate-900">
          Que trouver dans cet annuaire ?
        </h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-[var(--accent)]">AGEFIPH / RHF</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <strong>Région :</strong> Toutes les régions françaises
              </li>
              <li>
                <strong>Contacts :</strong> Emails RHF régionaux (PDF)
              </li>
              <li>
                <strong>Téléphones :</strong> Lignes dédiées selon le PDF
              </li>
              <li>
                <strong>Île-de-France :</strong> rhf-idf@agefiph.asso.fr
              </li>
            </ul>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-semibold text-[var(--accent)]">MDPH</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <strong>Département :</strong> Tous les départements (01 à 976)
              </li>
              <li>
                <strong>Adresses :</strong> Sièges et antennes territoriales
              </li>
              <li>
                <strong>Téléphones :</strong> Standards et numéros verts
              </li>
              <li>
                <strong>Emails :</strong> Contacts départementaux
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Référent handicap OFC */}
      <section className="mt-16 rounded-2xl border-2 border-[var(--accent-soft)] bg-[var(--accent-soft)] p-8">
        <h2 className="font-display text-lg font-bold text-slate-900">
          Référent handicap OFC
        </h2>
        <p className="mt-2 text-slate-600">
          Pour toute demande d&apos;aménagement ou d&apos;adaptation de la
          formation :
        </p>
        <div className="mt-4 flex flex-wrap gap-6">
          <a
            href="mailto:contact@laureolivie.fr"
            className="inline-flex items-center gap-2 font-medium text-[var(--accent)] hover:underline"
          >
            <Mail size={20} strokeWidth={1.5} />
            contact@laureolivie.fr
          </a>
        </div>
      </section>

      {/* Pied de page */}
      <div className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
        <p>Document actualisé le 30 janvier 2026 — PDF RHF Agefiph janvier 2026</p>
        <p className="mt-2 font-semibold text-slate-900">
          OFC Création d&apos;Entreprise
        </p>
        <p>SIRET : 905 244 281 00010 | Organisme certifié Qualiopi</p>
        <p>
          Numéro de déclaration d&apos;activité : 11788515078 (auprès du préfet
          de région d&apos;Île-de-France)
        </p>
        <p className="mt-2 italic">
          Cet enregistrement ne vaut pas l&apos;agrément de l&apos;État.
        </p>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-8">
        <Link
          href="/"
          className="text-[var(--accent)] font-medium hover:underline"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
