import Link from 'next/link';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  Download,
  FileText,
  Users,
  MapPin,
  Phone,
  Mail,
  Globe,
  CheckCircle,
  Building2,
} from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { ReferentHandicapBlock } from '@/components/formation/ReferentHandicapBlock';

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
          Document actualisé le 30 janvier 2026
        </p>
        <p className="mt-4 text-slate-600">
          Cet annuaire répertorie l&apos;ensemble des contacts pour accompagner les personnes en
          situation de handicap en France. Pour le processus d&apos;accueil et la référente handicap
          OFC, consultez la{' '}
          <Link href="/accessibilite-handicap" className="font-medium text-[var(--accent)] hover:underline">
            page Accessibilité &amp; handicap
          </Link>
          .
        </p>
        <ul className="mt-4 flex flex-col items-center gap-2 text-left sm:inline-block">
          <li className="flex items-center gap-2 text-slate-600">
            <CheckCircle size={20} strokeWidth={1.5} className="shrink-0 text-emerald-500" />
            AGEFIPH : Contacts par région pour l&apos;insertion professionnelle
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

      {/* Téléchargement */}
      <div className="mt-12 flex flex-wrap justify-center gap-4">
        <a
          href="/documents/annuaire-handicap.pdf"
          download
          className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
        >
          <Download size={20} strokeWidth={1.5} />
          Télécharger l&apos;annuaire complet
        </a>
        <a
          href="/documents/annuaire-handicap.pdf"
          download
          className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-300 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-50"
        >
          <FileText size={20} strokeWidth={1.5} />
          Télécharger le PDF complet (10 pages)
        </a>
      </div>

      {/* AGEFIPH */}
      <section className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--accent-soft)] text-[var(--accent)]">
            <Users size={28} strokeWidth={1.5} />
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-slate-900">
              AGEFIPH — Par région
            </h2>
            <p className="mt-4 text-slate-600">
              L&apos;AGEFIPH (Association de Gestion du Fonds pour l&apos;Insertion
              Professionnelle des Personnes Handicapées) accompagne les personnes
              handicapées et les employeurs pour favoriser l&apos;emploi dans le
              secteur privé.
            </p>
            <ul className="mt-6 space-y-3 text-slate-600">
              <li className="flex items-center gap-2">
                <MapPin size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                17 régions couvertes — Contacts spécialisés dans chaque région
              </li>
              <li className="flex items-center gap-2">
                <Phone size={18} className="shrink-0 text-[var(--accent)]" />
                Contacts directs : téléphones et emails des référents handicap
                formation régionaux
              </li>
              <li className="flex items-center gap-2">
                <Globe size={18} strokeWidth={1.5} className="shrink-0 text-[var(--accent)]" />
                Site web :{' '}
                <ExternalLinkAnchor
                  href="https://www.agefiph.fr"
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
            <h3 className="font-semibold text-[var(--accent)]">AGEFIPH</h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li>
                <strong>Région :</strong> Toutes les régions françaises
              </li>
              <li>
                <strong>Contacts :</strong> Noms des référents
              </li>
              <li>
                <strong>Téléphones :</strong> Directs et lignes dédiées
              </li>
              <li>
                <strong>Emails :</strong> Contacts régionaux
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
        <p>Document actualisé le 30 janvier 2026</p>
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
