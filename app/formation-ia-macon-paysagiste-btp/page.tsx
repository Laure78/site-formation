import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { LINKS } from '@/lib/internal-links';
import { CTA_RDV_LABEL, CtaRdv } from '@/components/CtaRdv';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { PreuveSociale } from '@/components/PreuveSociale';
import { LiensConnexes } from '@/components/LiensConnexes';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF } from '@/lib/constants';
import { JsonLd } from '@/components/JsonLd';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';

import { RenvoiFicheCatalogue } from '@/components/qualiopi/RenvoiFicheCatalogue';

export const revalidate = 3600;
const PATH = '/formation-ia-macon-paysagiste-btp';

export const metadata = createMetierBtpPageMetadata('maçon paysagiste', {
  title: 'Formation IA maçon paysagiste BTP IDF',
  description:
    'Automatisez vos devis dallage, terrasses, maçonnerie paysagère. Organisme certifié Qualiopi. Financement possible selon éligibilité.',
  path: PATH,
  keywords: [
    'formation IA maçon paysagiste',
    'ChatGPT devis dallage',
    'mémoire technique BTP',
    'maçonnerie paysagère IA',
    'formation IA pour le BTP',
    'OPCO Constructys',
    'Qualiopi BTP',
    'appel d’offres paysager',
  ],
  openGraphType: 'website',
});

const PROMPT_DEVIS = `Crée un devis structuré pour ce projet maçon paysagiste :
- Ouvrage : terrasse + dallage + muret
- Surface dallage : 100m² en grès 60×60, sur lit 5cm sable
- Terrassement : 180m³ (sol argileux)
- Muret paysager : 15m × 0,6m en parpaing + finition pierre
- Accès difficile, pas de portail, matériaux à apporter à la brouette
- Délai : 4 semaines
- Budget client estimé : 22 000€ HT

Pour chaque lot :
1. Lot terrassement : volume, type, prix unitaire
2. Lot dallage : surface, type dalle, prix m²
3. Lot muret : longueur, type matériau, prix ml
4. Main-d'œuvre : estimation jours ouvriers
5. Équipements spéciaux (escalier, sécurité)

Format : tableau avec quantité, description, PU, montant. Ajoute une clause délai et accès difficile.`;

const PROMPT_AO = `Je dois répondre à un marché public (Grand Paris) pour :
- Créer une terrasse paysagère de 150m² en dalle grès 80×80
- Terrassement 250m³
- Muret de soutènement 25m en béton armé
- Arrosage intégré

Mon entreprise : maçon paysagiste, GTD 35 salariés, ISO 9001, assurance 5M€, équipes spécialisées dallage.

Crée pour moi :
1. Un mémoire technique (3 pages) : savoir-faire, expérience similaire, équipes, GTD, sécurité
2. Un devis détaillé avec variantes (dallage standard vs dallage haut de gamme)
3. Un planning des travaux (calendrier semaine par semaine)

Ton : pro, technique, respecte la structure type des MTD publics (savoir-faire + équipes + conditions + planning).`;

const PROMPT_OPTIM = `Mon devis était à 22 000€, client demande 18 000€. Je peux pas descendre en dessous de 18 500€.
Propose-moi 3 approches pour répondre au client et justifier le prix :
1. Option allègement : moins de matériau premium, maintient la qualité
2. Option phasage : étape 1 terrasse basique, étape 2 muret finalisé
3. Option renvoi : amélioration terrain qui justifie budget + proche des 18k

Pour chaque, rédige un email court au client pour expliquer sans être trop baissier.`;

const PROMPT_EMAIL_COORD = `Rédige un email au paysagiste qui coordonne le projet pour valider avec lui :
- Terrassement fini le 15 mai
- Dallage posé semaines du 18-25 mai
- Accès limité par le côté ouest (canalisation)
- Besoin de son approbation sur le nivellement final avant dallage
- Prochaine réunion de chantier mercredi 10h

Ton : pro, amical, pas d'ordre mais de la coordination. Rappelle les responsabilités.`;

const FAQ_ITEMS = [
  {
    q: 'ChatGPT et les DTU (dallage, jointoiement) : que peut-on en attendre ?',
    a: "L'IA peut rappeler des principes généraux et structurer vos textes en citant des références que vous indiquez (ex. DTU). La conformité définitive et le choix des solutions relèvent de votre expertise, des plans et des prescriptions en vigueur sur le chantier.",
  },
  {
    q: 'Comment estimer le volume de terrassement avec ChatGPT ?',
    a: "Vous fournissez les dimensions et hypothèses (longueur × largeur × profondeur moyenne, pentes). L'IA calcule des volumes indicatifs ; vous contrôlez sur place et avec vos méthodes habituelles.",
  },
  {
    q: "L'IA peut-elle rédiger mon mémoire technique pour un marché public ?",
    a: "Elle peut produire un brouillon structuré (plan, formulations) à partir de vos données réelles. Les chiffres, références de chantiers et engagements contractuels doivent être vérifiés et signés par vous.",
  },
  {
    q: 'Comment financer la formation en tant que maçon paysagiste ?',
    a: "OFC Création d'Entreprise est un organisme certifié Qualiopi et enregistré Constructys. Le financement dépend de votre situation et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: "L'IA va-t-elle remplacer les maçons paysagistes ?",
    a: "Non. L'IA accélère la rédaction et l'organisation des dossiers ; l'exécution, le contrôle terrain et la responsabilité technique restent au métier.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On formule les demandes en français, avec des prompts que vous réutilisez et adaptez.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : entre terrassement et paperasse' },
  { href: '#la-solution', label: 'La solution : l’IA pour vos devis et mémoires techniques' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des maçons paysagistes sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
];

export default function FormationIaMaconPaysagisteBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <JsonLd id="schema-faq-page" schema={faqSchema} />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA maçon paysagiste BTP</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour maçons paysagistes —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur la paperasse et les dossiers</span>
        </h1>
        <PreuveSociale className="mt-6" />
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 2 h par semaine</strong> sur devis, mémoires techniques et mails de
          coordination. <strong>Présentiel en Île-de-France</strong> — <strong>Qualiopi</strong> — financement possible selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer devis, brouillons de mémoire technique et courriers ; les quantités, prix, normes et
            engagements contractuels restent sous votre responsabilité. Toujours relire avant envoi au client ou à
            l’acheteur public.
          </ShortAnswerBlock>
        </div>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[var(--accent)] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le problème : entre terrassement et paperasse
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>maçon paysagiste</strong> en Île-de-France ou Grand Paris : terrassement, dallage, murets,
            bassins, terrasses. Chaque dossier demande un <strong>devis technique</strong>, parfois un{' '}
            <strong>mémoire technique</strong> pour les marchés publics, et des échanges avec paysagistes, piscinistes ou
            conducteurs de travaux.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Sans aide à la rédaction, une part importante du temps part en :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Visite et relevés (accès, pentes, volumes, contraintes).',
              'Chiffrage détaillé : lots, matériaux, main-d’œuvre, délais.',
              'Réponses aux appels d’offres : structure MT, pièces, planning.',
              'Coordination : mails et synthèses pour les autres corps de métier.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Sur les gros dossiers ou les marchés publics, le temps « bureau » peut dépasser largement le temps de visite
            facturé — d’où l’intérêt d’accélérer la mise en forme tout en gardant la maîtrise technique.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour vos devis et mémoires techniques
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut aider à : produire des tableaux de devis à partir de paramètres, structurer un mémoire technique
            (à compléter avec vos preuves et chiffres), rédiger des mails de coordination — sous votre validation.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Devis structuré</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            À partir des notes de visite : lots, quantités, clauses d’accès et délais.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Marchés publics</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Plan de mémoire technique, formulations types, planning indicatif — à croiser avec le DCE et vos références.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Coordination</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Courriers clairs vers paysagiste, pisciniste ou maître d’œuvre.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <CtaRdv variant="inline" origin="page-inline-rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline" />{' '}
            — 30 minutes pour voir comment adapter ces usages à votre processus de devis et de réponse aux AO.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Méthode pas à pas</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : structurer le devis après la visite
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : appel d’offres — mémoire technique et pièces
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_AO}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : optimiser le devis et répondre au client
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_OPTIM}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : coordonner avec le paysagiste ou le chef de chantier
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_EMAIL_COORD}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>variables</strong> selon la complexité du dossier et votre temps de
            contrôle :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA sur un dossier maçon paysagiste
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain typique</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis structuré</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Tableau / lots proposés</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mémoire technique (AO)</td>
                  <td className="p-3">Très chronophage</td>
                  <td className="p-3">Plan + brouillon</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mails de coordination</td>
                  <td className="p-3">Rédaction</td>
                  <td className="p-3">Brouillon cadré</td>
                  <td className="p-3">Modéré</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Variantes / négociation</td>
                  <td className="p-3">Repartir de zéro</td>
                  <td className="p-3">Options + emails</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures par mois n’est garanti : tout dépend du nombre de dossiers, d’AO et de la qualité de vos
            relectures.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « J’osais moins répondre aux marchés publics à cause du mémoire technique. Avec un brouillon structuré, je
              gagne du temps sur la forme — je garde le contrôle sur le fond et les chiffres. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Maçon paysagiste, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — maçons paysagistes et IA</h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed"><FAQAnswer content={a} /></p>
              </div>
            ))}
          </div>
        </section>

        <LaureOlivieFormationPortrait />
<section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Devis dallage, brouillon de mémoire technique, optimisation de texte : démonstration sur un cas type. Vous
            repartez avec des prompts à adapter à vos chantiers.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50" />
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Formation IA maçon paysagiste — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Organisme certifié Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <LiensConnexes
          currentPath={PATH}
          excludeHrefs={['/formations', '/formations/ia-appels-offre-btp', '/formation-ia-paysagiste-btp', '/formation-ia-charge-affaires-btp', '/financement-constructys-formation-ia-btp']}
          />

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA pour le BTP' },
            { href: '/formations/ia-appels-offre-btp', label: 'Formation IA appels d’offres BTP' },
            { href: '/formation-ia-paysagiste-btp', label: 'Formation IA paysagiste BTP' },
            { href: '/formation-ia-charge-affaires-btp', label: 'Formation IA chargé d’affaires BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: LINKS.prendreRdv, label: CTA_RDV_LABEL },
          ]}
        />

        <RenvoiFicheCatalogue programmeRef="NIV-01" />
      </article>
    </div>
  );
}
