import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Check } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { FAQSection } from '@/components/landing/FAQSection';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { breadcrumbItemsFromPaths, createPageMetadata, getFAQSchema } from '@/lib/seo';
import type { FAQItem } from '@/lib/faq';
import { getFormationIleDeFrancePageLocalBusinessJsonLd } from '@/lib/seo-formation-ia-schemas';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = createPageMetadata({
  title: 'Formation IA BTP Île-de-France — ChatGPT bâtiment, finançable Constructys | Laure Olivié',
  description:
    "Formation IA BTP en Île-de-France : Paris, Yvelines, Essonne, Hauts-de-Seine, Val-d'Oise. Qualiopi, 100% finançable Constructys. Sessions 4h en présentiel.",
  path: '/formation-ia-btp-ile-de-france',
  keywords: [
    'formation IA BTP Île-de-France',
    'ChatGPT bâtiment IDF',
    'formation IA Paris',
    'OPCO Constructys',
    'Qualiopi',
    'Claude AI BTP',
    'formation présentiel Guyancourt',
  ],
});

const FAQ_IDF: FAQItem[] = [
  {
    q: 'Intervenez-vous dans tous les départements IDF ?',
    a:
      'Oui. OFC intervient dans les huit départements d&apos;Île-de-France : Paris (75), Seine-et-Marne (77), Yvelines (78), Essonne (91), Hauts-de-Seine (92), Seine-Saint-Denis (93), Val-de-Marne (94) et Val-d&apos;Oise (95). Les sessions peuvent être organisées en <strong>inter</strong> (salle en région parisienne) ou en <strong>intra</strong> directement dans vos bureaux ou sur un chantier-accessible selon le format retenu. Pour un créneau ou une proposition intra, utilisez la <a href="/contact">page contact</a> ou <a href="' +
      CALENDLY_BOOKING_URL +
      '" rel="noopener noreferrer">prenez rendez-vous</a>.',
  },
  {
    q: 'La formation peut-elle avoir lieu dans nos locaux ?',
    a:
      'Oui, c&apos;est même une modalité fréquente : la formation IA BTP en <strong>présentiel intra-entreprise</strong> permet à votre équipe de travailler sur vos propres documents (devis, modèles d&apos;emails, extraits de DCE) dans un cadre confidentiel. Le groupe reste limité (effectif adapté à la salle) pour garder du temps d&apos;atelier. Consultez le <a href="/formations">catalogue des formations</a> et indiquez vos contraintes lors de l&apos;échange préalable.',
  },
  {
    q: 'Quel délai pour monter le dossier Constructys ?',
    a:
      'Les règles Constructys imposent en pratique un dépôt du dossier sur la plateforme <strong>eGestion</strong> au moins <strong>15 jours avant</strong> le début de l&apos;action, avec un dossier complet. Les plafonds pédagogiques et les barèmes évoluent : pour une vue à jour (plafonds 24&nbsp;€ HT/h/stagiaire, session intra, etc.), suivez le <a href="/financement-constructys-formation-ia-btp">guide financement Constructys formation IA BTP</a>.',
  },
];

const DEPT_GRID: { title: string; lines: string[] }[] = [
  {
    title: 'Paris (75)',
    lines: ['Boulogne-Billancourt', 'Levallois-Perret', 'Neuilly-sur-Seine', 'et arrondissements de Paris'],
  },
  {
    title: 'Yvelines (78)',
    lines: ['Versailles', 'Guyancourt', 'Saint-Quentin-en-Yvelines', 'Poissy'],
  },
  {
    title: 'Essonne (91)',
    lines: ['Évry-Courcouronnes', 'Massy', 'Palaiseau', 'Longjumeau'],
  },
  {
    title: 'Hauts-de-Seine (92)',
    lines: ['Nanterre', 'Boulogne-Billancourt', 'Rueil-Malmaison', 'Issy-les-Moulineaux'],
  },
  {
    title: 'Seine-Saint-Denis (93)',
    lines: ['Saint-Denis', 'Montreuil', 'Bobigny', 'et Plaine Commune / Est ensemble'],
  },
  {
    title: 'Val-de-Marne (94)',
    lines: ['Créteil', 'Vincennes', 'Ivry-sur-Seine', 'Champigny-sur-Marne'],
  },
  {
    title: "Val-d'Oise (95)",
    lines: ['Cergy-Pontoise', 'Argenteuil', 'Sarcelles', 'Franconville'],
  },
  {
    title: 'Seine-et-Marne (77)',
    lines: ['Melun', 'Meaux', 'Fontainebleau', 'Torcy / Marne-la-Vallée'],
  },
];

export default function FormationIaBtpIleDeFrancePage() {
  const localBusinessSchema = getFormationIleDeFrancePageLocalBusinessJsonLd();
  const faqSchema = getFAQSchema(FAQ_IDF);

  return (
    <div className={poppins.className}>
      <JsonLd id="schema-formation-idf-localbusiness" schema={localBusinessSchema} />
      <JsonLd id="schema-formation-idf-faq" schema={faqSchema} />

      <div className="mx-auto max-w-6xl px-4 pt-8">
        <Breadcrumb
          items={breadcrumbItemsFromPaths([
            { name: 'Accueil', path: '/' },
            { name: 'Formation IA BTP Île-de-France', path: '/formation-ia-btp-ile-de-france' },
          ])}
          showVisual
          className="mb-6"
        />
      </div>

      <section className="border-b border-slate-200 bg-white px-4 py-12 md:py-16">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            OFC Création d&apos;Entreprise · Présentiel · Qualiopi
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-slate-900 md:text-4xl lg:text-[2.5rem]">
            Formation IA BTP Île-de-France — ChatGPT et Claude AI pour les entreprises du bâtiment
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-slate-600">
            Depuis plus de dix ans, Laure Olivié accompagne les dirigeants, artisans et encadrants du secteur BTP
            vers une meilleure productivité administrative et commerciale. Basée à{' '}
            <strong className="text-slate-800">Guyancourt (Yvelines, 78)</strong>, elle intervient dans toute
            l&apos;Île-de-France : sessions en <strong>présentiel</strong> chez vous (intra-entreprise) ou en salle
            selon le calendrier, avec une méthode 100&nbsp;% terrain — devis, dossiers, chantier, sans jargon inutile.
            L&apos;organisme est certifié <strong>Qualiopi</strong> ; les formations sont éligibles au financement{' '}
            <strong>OPCO Constructys</strong> dans les conditions en vigueur. Objectif : repartir avec des prompts,
            trames et réflexes utilisables dès le lundi suivant, sur les outils que vos équipes adoptent déjà
            (ChatGPT, Claude AI, Copilot selon les modules).
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <RdvLink className="inline-flex rounded-full bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#2d6ae0]">
              Prendre RDV — 30 min offertes
            </RdvLink>
            <Link
              href="/formations"
              className="inline-flex items-center rounded-full border-2 border-[#377CF3] px-6 py-3 text-sm font-semibold text-[#377CF3] hover:bg-blue-50"
            >
              Catalogue formations
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pourquoi les PME BTP d&apos;Île-de-France adoptent l&apos;IA
          </h2>
          <p className="mt-4 max-w-3xl text-slate-700 leading-relaxed">
            La région parisienne concentre des marchés exigeants : grands projets de transport (dont lignes et travaux
            liés au réseau existant et aux extensions type Grand Paris Express), marchés publics avec DCE volumineux,
            copropriétés parisiennes et rénovations denses. Les entreprises qui automatisent une partie de
            l&apos;administratif — relances, premiers jets de devis, structuration de mémoires — gagnent en réactivité
            face à des donneurs d&apos;ordre saturés. Par ailleurs, la <strong>pénurie de personnel</strong> pousse à
            libérer du temps sur le terrain plutôt que sur Word ou Excel. Enfin, la <strong>concurrence</strong> entre
            cotraitants et sous-traitants renforce             l&apos;intérêt d&apos;une réponse rapide et lisible : l&apos;IA ne
            remplace pas le métier, mais accélère la mise en forme ; la relecture humaine reste obligatoire sur
            les engagements contractuels.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-3">
            {[
              'Marchés publics & gros projets IDF (DCE, mémoires, délais courts)',
              'Pénurie de talents : libérer les équipes de tâches répétitives',
              'Différenciation : réactivité et clarté des dossiers clients',
            ].map((t) => (
              <li
                key={t}
                className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-slate-800 shadow-sm"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={2} aria-hidden />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Zones d&apos;intervention en Île-de-France
          </h2>
          <p className="mt-4 max-w-3xl text-slate-600 leading-relaxed">
            Ci-dessous une grille indicative des départements et de villes où les interventions en présentiel sont
            courantes. La liste n&apos;est pas exhaustive : si votre commune n&apos;y figure pas, écrivez-nous — nous
            étudions les contraintes d&apos;accès et de salle pour l&apos;intra comme pour l&apos;inter.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {DEPT_GRID.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 shadow-sm"
              >
                <h3 className="font-semibold text-[#377CF3]">{d.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-slate-700">
                  {d.lines.map((line) => (
                    <li key={line}>· {line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-[#F2F2F2] px-4 py-14">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Les 4 modules de formation IA BTP les plus demandés en IDF
          </h2>
          <p className="mt-4 max-w-3xl text-slate-700 leading-relaxed">
            Le catalogue compte six parcours référencés ; en région parisienne, quatre familles de besoins reviennent
            très souvent lors des diagnostics entreprise. Elles correspondent à des gains de temps mesurables et à des
            documents que vous produisez déjà chaque semaine.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: 'Devis et chiffrage',
                text: 'PME de second œuvre et artisans : accélérer la rédaction des corps d&apos;état, harmoniser les libellés et préparer des variantes pour négociation — sans remplacer votre grille tarifaire.',
                href: '/formations/ia-au-service-du-batiment',
              },
              {
                title: 'Réponses aux marchés publics',
                text: 'Analyse de DCE, fil rouge pour mémoire technique et relecture des pièces : méthode pour les marchés où la pression des délais est maximale.',
                href: '/formations/ia-appels-offre-btp',
              },
              {
                title: 'Comptes rendus de chantier',
                text: 'Transformer notes vocales ou bullet points en CR structurés pour MOE, maître d&apos;ouvrage ou interne — un levier majeur pour les conducteurs et chefs de chantier.',
                href: '/ia-conducteur-travaux',
              },
              {
                title: 'Gestion administrative et emails',
                text: 'Relances clients, fournisseurs et confirmations : ton professionnel, gain de temps sur la boîte mail collective.',
                href: '/formation-ia-artisans-btp',
              },
            ].map((m) => (
              <div key={m.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-display text-lg font-bold text-slate-900">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{m.text}</p>
                <Link href={m.href} className="mt-4 inline-block text-sm font-semibold text-[#377CF3] hover:underline">
                  En savoir plus →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white px-4 py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Financement Constructys en IDF — comment ça marche
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Les entreprises du BTP cotisent à l&apos;OPCO Constructys : selon votre taille, votre convention et votre plan
            de développement des compétences, le coût pédagogique peut être pris en charge dans les plafonds en
            vigueur — jusqu&apos;à 24&nbsp;€ HT/h/stagiaire pour le volet formation dans le cadre du PDC lorsque les
            conditions sont réunies, et règles spécifiques pour les très petites structures. Le dossier se dépose sur{' '}
            <strong>eGestion</strong> ; anticipez les délais (souvent au moins 15 jours avant le premier jour de
            formation).
          </p>
          <p className="mt-6">
            <Link
              href="/financement-constructys-formation-ia-btp"
              className="font-semibold text-[#377CF3] underline-offset-4 hover:underline"
            >
              Lire le guide financement Constructys formation IA BTP
            </Link>
          </p>
          <div className="mt-8">
            <RdvLink className="inline-flex rounded-full bg-[#377CF3] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#2d6ae0]">
              Prendre RDV — échange gratuit 30 min
            </RdvLink>
          </div>
        </div>
      </section>

      <FAQSection
        id="faq-idf"
        title="FAQ — Questions des entreprises BTP d'Île-de-France"
        subtitle="Périmètre géographique, modalités présentiel et dossier OPCO."
        items={FAQ_IDF}
      />

      <section className="border-b border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto max-w-xl text-center">
          <RdvLink className="inline-flex w-full justify-center rounded-full bg-[#377CF3] px-8 py-4 text-base font-semibold text-white shadow-md transition hover:bg-[#2d6ae0] sm:w-auto">
            Prendre RDV découverte — Calendly
          </RdvLink>
          <p className="mt-3 text-xs text-slate-500">
            Rendez-vous visio gratuit · environ 30 minutes · sans engagement
          </p>
        </div>
      </section>

      <section className="bg-[#F2F2F2] px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <AllerPlusLoin
            links={[
              { href: '/formations', label: 'Catalogue formations IA BTP' },
              { href: '/formations/ia-btp-paris', label: 'Formation IA BTP Paris' },
              { href: '/formation-ia-btp-yvelines', label: 'Formation IA BTP Yvelines' },
              { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
              { href: '/contact', label: 'Contact' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
