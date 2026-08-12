import Link from 'next/link';
import { QualiopiWordmark } from '@/components/QualiopiLogo';
import { Check } from 'lucide-react';
import { RdvLink } from '@/components/RdvLink';
import { SITE_CONFIG } from '@/lib/seo';
import { LINKS } from '@/lib/internal-links';
import { MODALITE_FORMATIONS_STANDARD } from '@/lib/tarifs-sessions';

/**
 * Bloc SEO / conversion — page Formation IA pour les pros du BTP Île-de-France uniquement.
 */
export function IleDeFranceSeoSections() {
  const mailProgramme = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
    'Demande de programme — formation IA appliquée au bâtiment Île-de-France'
  )}`;

  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl space-y-16 px-4 py-16">
        <section aria-labelledby="idf-pour-btp">
          <h2
            id="idf-pour-btp"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Une formation IA pensée pour les professionnels du BTP
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Contrairement aux formations généralistes, on travaille sur{' '}
            <strong className="text-slate-800">vos vrais cas métier</strong> : devis, réponses aux
            appels d&apos;offres, gestion de chantier, relances commerciales ou encore recrutement selon
            le module choisi. Objectif : repartir avec des outils et des trames{' '}
            <strong className="text-slate-800">directement utilisables</strong> le lundi suivant.
          </p>
          <p className="mt-4 text-sm text-slate-600">
            <span className="font-medium text-slate-800">Yvelines (78) :</span>{' '}
            <Link
              href={LINKS.formationYvelines}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              Formation IA pour le BTP Versailles, Yvelines et 78
            </Link>{' '}
            (Versailles, Saint-Quentin-en-Yvelines, Mantes, Rambouillet…). Page locale SQY :{' '}
            <Link
              href={LINKS.formationSaintQuentinYvelines}
              className="font-medium text-[var(--accent)] hover:underline"
            >
              formation IA pour les pros du BTP Saint-Quentin-en-Yvelines
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="idf-apprendre">
          <h2
            id="idf-apprendre"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Ce que vous allez apprendre
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            Utiliser des outils comme ChatGPT ou Claude pour :
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {[
              'Rédiger plus vite vos documents (emails, courriers, comptes rendus)',
              'Structurer vos réponses aux consultations et vos dossiers',
              'Automatiser les tâches répétitives sans sacrifier la relecture humaine',
              'Améliorer votre communication client et la clarté de vos plis',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="idf-cas">
          <h2
            id="idf-cas"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Des cas concrets 100 % BTP
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600">
            En présentiel, les stagiaires travaillent sur des situations proches de leur quotidien :
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              {
                titre: 'Devis',
                points: ['Rédaction rapide et structurée', 'Argumentaire client clair'],
              },
              {
                titre: "Appels d'offres",
                points: ['Mémoire technique et analyse de DCE', 'Différenciation par rapport au CCTP'],
              },
              {
                titre: 'Chantier',
                points: ['Comptes rendus et suivi', 'Organisation et priorités'],
              },
              {
                titre: 'Commercial',
                points: ['Relances', 'Emails et prospection ciblée'],
              },
            ].map((bloc) => (
              <div
                key={bloc.titre}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900">{bloc.titre}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-600">
                  {bloc.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-slate-600">
            Pour aller plus loin sur les marchés publics :{' '}
            <Link
              href="/formations/ia-appels-offre-btp"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              formation « Répondre aux appels d&apos;offres avec l&apos;IA »
            </Link>
            {' · '}
            <Link
              href="/blog/ia-memoire-technique-appel-offres-guide-2026"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              article mémoire technique BTP et IA
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="idf-ou" className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
          <h2
            id="idf-ou"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Formation IA appliquée au bâtiment en Île-de-France
          </h2>
          <p className="mt-4 text-slate-600">
            Interventions en <strong className="text-slate-800">entreprise</strong> (intra) ou en{' '}
            <strong className="text-slate-800">session inter</strong> selon le calendrier —{' '}
            {MODALITE_FORMATIONS_STANDARD} Zones couvertes : Paris, Yvelines, Hauts-de-Seine, Essonne,
            Seine-Saint-Denis, Val-de-Marne, Val-d&apos;Oise, Seine-et-Marne — détail par département
            dans la section{' '}
            <a href="#zones" className="font-medium text-[var(--accent)] hover:underline">
              Zones d&apos;intervention
            </a>
            .
          </p>
          <p className="mt-3 text-slate-600">
            Public : professionnels du BTP, PME, conducteurs de travaux, fonctions support —{' '}
            <Link href="/formations" className="font-medium text-[var(--accent)] hover:underline">
              voir le catalogue des formations
            </Link>
            .
          </p>
        </section>

        <section aria-labelledby="idf-resultats">
          <h2
            id="idf-resultats"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Résultats concrets
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {[
              'Gain de temps sur les tâches répétitives (emails, relances, premiers jets de documents)',
              'Meilleure organisation des dossiers et des priorités',
              'Documents plus lisibles et plus professionnels après relecture',
              'Plus de réactivité côté clients et marchés publics',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-slate-600">
            L&apos;objectif est de devenir plus efficace <strong className="text-slate-800">sans</strong>{' '}
            nécessairement recruter : vous gardez le contrôle sur le fond et sur les engagements.
          </p>
        </section>

        <section aria-labelledby="idf-simple">
          <h2
            id="idf-simple"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Une approche simple et accessible
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {[
              'Pas besoin d\'être « expert digital » : explications claires, vocabulaire BTP',
              'Mise en pratique immédiate sur des cas choisis avec vous',
              'Accompagnement pour cadrer ce que vous pouvez mettre dans les outils (données, confidentialité)',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="idf-financement">
          <h2
            id="idf-financement"
            className="font-display text-2xl font-bold text-slate-900 md:text-3xl"
          >
            Financement possible
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Les formations certifiées <QualiopiWordmark /> peuvent être financées dans le cadre du plan de
            développement des compétences, selon les règles de votre branche — en particulier via
            l&apos;OPCO <strong className="text-slate-800">Constructys</strong> pour les entreprises
            du BTP, sous conditions d&apos;éligibilité. Je vous indique les informations utiles
            pour monter votre dossier côté employeur.
          </p>
          <p className="mt-4">
            <Link
              href="/financement-constructys-formation-ia-btp"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              En savoir plus sur le financement Constructys
            </Link>
          </p>
        </section>

        <section
          aria-labelledby="idf-cta"
          className="rounded-2xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] p-8 text-center"
        >
          <h2 id="idf-cta" className="font-display text-xl font-bold text-slate-900">
            Passer à l&apos;action
          </h2>
          <p className="mt-3 text-slate-700">
            Gagner du temps, structurer votre activité et outiller vos équipes : prenez rendez-vous
            pour un échange ou demandez le programme détaillé par email.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <RdvLink className="inline-flex rounded-xl bg-[var(--accent)] px-6 py-3.5 font-semibold text-white hover:bg-blue-600">
              Prendre rendez-vous
            </RdvLink>
            <a
              href={mailProgramme}
              className="inline-flex rounded-xl border-2 border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-800 hover:border-[var(--accent)]"
            >
              Demander le programme par email
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
