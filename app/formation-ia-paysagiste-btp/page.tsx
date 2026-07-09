import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { JsonLd } from '@/components/JsonLd';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';
import { MetierIdfPresentielLine } from '@/components/formation-ia-metier/MetierIdfPresentielLine';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';

export const revalidate = 3600;
const PATH = '/formation-ia-paysagiste-btp';

export const metadata = createMetierBtpPageMetadata('paysagiste', {
  title: 'Formation IA Paysagiste BTP Île-de-France',
  description:
    'Automatisez vos devis paysagers, briefs clients et plans d’aménagement. Formation Qualiopi. Financement possible selon éligibilité.',
  path: PATH,
  keywords: [
    'formation IA paysagiste BTP',
    'ChatGPT devis paysager',
    'brief paysager IA',
    'métré jardin Île-de-France',
    'formation IA pour les pros du BTP',
    'OPCO Constructys',
    'Qualiopi BTP',
    'aménagement extérieur IA',
  ],
  openGraphType: 'article',
});

const PROMPT_BRIEF = `Je reviens de visite chez un client à [Ville Île-de-France].
Voici les notes brutes :
- Terrain : 150m² en angle, exposition sud-ouest
- Client : maison années 1970, jardin très minéral actuellement
- Budget : 12 000€ HT
- Envies client : plus de végétal, zone lounge avec salon de jardin, éclairage ambiance
- Contraintes : canalisation 50cm sous la surface, pas d'accès direct du côté ouest, arrosage automatique demandé

Crée un brief paysager structuré avec :
1. Concept design (style, ambiance)
2. Zonage fonctionnel (réception, détente, service)
3. Palette végétale recommandée (3-4 espèces dominantes)
4. Matériaux principaux
5. Équipements spécialisés (arrosage auto, éclairage, etc.)`;

const PROMPT_METRE = `Crée un tableau de métré pour un projet paysager avec ces paramètres :
- Terrassement/préparation : 150m² à déblayer 30cm
- Arrosage automatique : zone 120m² (gaine, goutteurs, programmateur)
- Plantation : 40 arbustes persistants, 80 vivaces/plantes couvre-sol
- Revêtement : 40m² de dallage pierre reconstituée, 60m² de paillage
- Équipement : 1 salon de jardin, 1 fontaine décorative, 6 luminaires éclairage ambiance

Pour chaque lot, indique :
- Quantité et unité
- Description courte
- PU HT estimé (je fournirai mes tarifs)
- Montant total

Ajoute une ligne "Main-d'œuvre" avec estimation du nombre de jours nécessaires.`;

const PROMPT_EMAIL = `Écris un email de présentation de concept paysager pour présenter ce projet au client (format email pro, 3-4 paragraphes) :
- Concept : jardin méditerranéen relaxant, fusion pierre/végétal
- Points forts : arrosage auto, plantes peu gourmandes, coin détente fonctionnel
- Montant HT : [votre total]
- Délai réalisation : 3 semaines
- Prochaine étape : RDV confirmation et signature

Tone : chaleureux mais pro, peu de jargon paysager, focus sur bénéfices client.`;

const PROMPT_MODIFS = `Mon client trouve le devis à 12 000€ trop élevé. Il demande à 10 000€ max.
Propose-moi 3 scénarios pour réduire le coût tout en gardant le concept qualité :
1. Optimisation matériaux (moins cher mais résistant)
2. Réduction de surface/lot
3. Phasage (ce qu'on fait en phase 1 et 2)

Pour chaque scénario, nouveau montant et justification brève pour le client.`;

const FAQ_ITEMS = [
  {
    q: "L'IA peut-elle m'aider à concevoir le plan d'aménagement ?",
    a: "L'IA peut proposer des textes de zonage, des listes d'idées et des variantes à partir de votre brief — pas des plans graphiques signés. La conception finale, le choix des végétaux et la faisabilité terrain restent votre expertise.",
  },
  {
    q: 'Comment l’IA tient-elle compte des contraintes locales (sol, climat, réglementation) ?',
    a: "Vous devez indiquer dans le prompt les données utiles (exposition, type de sol, budget, contraintes d’urbanisme). L'IA propose des pistes ; vous validez avec votre connaissance du terrain et les textes en vigueur.",
  },
  {
    q: 'Arrosage, éclairage : ChatGPT peut-il dimensionner à ma place ?',
    a: "L'IA peut proposer des ordres de grandeur et des listes de postes à vérifier. Les dimensionnements définitifs (débits, protections électriques, conformité) relèvent de votre méthode et des corps de métier habilités.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On formule les demandes en français, avec des prompts que vous réutilisez et adaptez.",
  },
  {
    q: 'Comment financer la formation en tant que paysagiste ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de votre situation et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: "L'IA va-t-elle remplacer les paysagistes ?",
    a: "Non. L'IA accélère la rédaction et la structuration ; le métier de terrain, le rendu paysager et la relation client restent centraux.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : concevoir plus vite, facturer juste' },
  { href: '#la-solution', label: 'La solution : l’IA adaptée aux paysagistes' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des paysagistes sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaPaysagisteBtpPage() {
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
        <span className="text-slate-900">Formation IA paysagiste BTP</span>
      </nav>

      <article>
        <MetierIdfPresentielLine className="mb-4" />
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour paysagistes —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur la conception et les devis</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 3 h par semaine</strong> sur briefs, métrés et communication client.{' '}
          <strong>Présentiel en Île-de-France</strong> — <strong>Qualiopi</strong> — financement possible selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer briefs, tableaux de métré et mails ; le choix des végétaux, les prix et la faisabilité
            réglementaire restent sous votre responsabilité. Toujours relire avant envoi au client ou aux partenaires.
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
            Le problème : concevoir plus vite, facturer juste
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>paysagiste</strong> en Île-de-France ou Grand Paris : chaque projet demande analyse du
            terrain, proposition de composition, coordination avec d’autres métiers, puis <strong>devis précis</strong> et
            suivi.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Sans outillage adapté, le temps part souvent en :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Visite et relevés (mesures, photos, contraintes).',
              'Rédaction du brief et du concept pour le client ou les sous-traitants.',
              'Métré et devis : lots, quantités, prix, mise en forme.',
              'Allers-retours : ajustements, variantes, relances.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Beaucoup de paysagistes souhaitent <strong>moins d’administratif</strong> et plus de temps pour la conception et
            la prospection — d’où l’intérêt d’accélérer la mise en forme avec des assistants IA encadrés.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA adaptée aux paysagistes
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut aider à : structurer un brief à partir de notes brutes, générer des tableaux de métré (à compléter
            avec vos PU), rédiger des mails de présentation, proposer des scénarios d’optimisation budgétaire — sous votre
            validation.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Brief structuré</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Passage des notes terrain à un document lisible pour le client ou les intervenants.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Métré et devis</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Premiers jets de quantités et de lots — vous vérifiez les unités et les tarifs.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Communication client</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Emails de présentation, relances, reformulations selon les retours du client.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour voir comment adapter ces usages à votre portefeuille de projets.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas : de la visite client au devis
          </h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : capturer et structurer le brief projet
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_BRIEF}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : métré et devis
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_METRE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : présentation client
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_EMAIL}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : modifications de devis
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_MODIFS}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>variables</strong> selon la taille du projet et votre temps de relecture
            :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">Temps indicatif avant / après usage de l’IA sur un dossier paysager</caption>
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
                  <td className="p-3">Brief conceptuel</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Structuré vite</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Métré + devis</td>
                  <td className="p-3">Chronophage</td>
                  <td className="p-3">Tableau proposé</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Email présentation</td>
                  <td className="p-3">Rédaction</td>
                  <td className="p-3">Brouillon</td>
                  <td className="p-3">Modéré</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Itérations devis</td>
                  <td className="p-3">Repartir de zéro</td>
                  <td className="p-3">Variantes cadrées</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures par mois n’est garanti : tout dépend du nombre de dossiers et de la qualité de vos
            contrôles.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Je passe moins de temps sur la mise en forme des devis et des mails. Il me reste de la marge pour affiner le
              projet et voir les clients — en gardant la main sur les prix et le choix des plantes. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Paysagiste, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — paysagistes et IA</h2>
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
            Briefs, métrés, mails : démonstration sur un cas type. L’intégration avec Excel ou votre logiciel métier dépend
            de vos habitudes — l’IA sert d’abord à produire des textes et des tableaux à copier ou à importer.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Réserver votre visio découverte
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
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
            Formation IA paysagiste — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA pour les pros du BTP' },
            { href: '/formation-ia-pisciniste-btp', label: 'Formation IA pisciniste BTP' },
            { href: '/formation-ia-dirigeant-pme-btp', label: 'Formation IA dirigeant PME BTP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: buildSiteCalendlyCtaUrl('formation-ia-paysagiste-btp-footer-rdv'), label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
