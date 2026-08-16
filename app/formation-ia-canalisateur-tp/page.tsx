import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { LiensConnexes } from '@/components/LiensConnexes';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { JsonLd } from '@/components/JsonLd';
import { LINKS } from '@/lib/internal-links';
import { LaureOlivieFormationPortrait } from '@/components/laure-olivie/LaureOlivieFormationPortrait';

export const revalidate = 3600;
const PATH = '/formation-ia-canalisateur-tp';

export const metadata = createPageMetadata({
  title: 'Formation IA Canalisateur TP Île-de-France',
  description:
    'Automatisez vos devis canalisations, rapports de chantier, conformité normes. Formation Qualiopi. Financement possible selon éligibilité.',
  path: PATH,
  keywords: [
    'formation IA canalisateur',
    'ChatGPT devis canalisation',
    'DTU 26.1',
    'mémoire technique eau assainissement',
    'ANC DTU 64.1',
    'OPCO Constructys',
    'Qualiopi BTP',
    'travaux publics canalisation',
  ],
  openGraphType: 'website',
});

const PROMPT_DEVIS = `Crée un devis technique pour cette canalisation TP (Île-de-France) :
- Type réseau : EU (eau usée) neuve
- Longueur : 280m
- Profondeur moyenne : 1,5m
- Diamètre proposé : 315mm (à valider avec débit et étude hydraulique)
- Débit estimé : 35 L/s (groupe collectif)
- Pente : minimale 0,5%
- Matériau : PVC (proposer aussi alternative béton renforcé)
- Accès facile par tranchée existante
- Raccordement réseau public à 80m (côté est)
- Délai : 4 semaines
- Budget client : 16 500€

Pour chaque élément :
1. Justification technique indicative (débit, pente, diamètre — à croiser avec DTU et étude)
2. Quantité
3. Coûts indicatifs (je remplace par mes barèmes)
4. Main-d'œuvre (jours ouvriers, qualification)

Sections : terrassement/tranchée, canalisation + raccords, branchement réseau, pose/essais, mise en service, planning.

Ajoute une section « Conformité normes » : rappels DTU 26.1, DTU 64.1 si ANC, à valider avec les documents en vigueur et le bureau d’études.`;

const PROMPT_VARIANTES = `Mon devis canalisation est à 16 500€. Client demande 3 alternatives :
1. « Moins cher » : PVC différent grade, ou postes à ajuster sans casser la conformité
2. « Plus durable » : béton renforcé vs PVC : surcoût indicatif et maintenance
3. « Phasage » : 200m phase 1 (réseau principal), 80m phase 2 (branchement) plus tard

Pour chaque :
- Montant HT indicatif (à recalculer avec mes PU)
- Impact durabilité / maintenance
- Enjeux techniques (préparation raccordements phase 2)

Rédige un email court au client pour présenter les variantes, ton informatif plutôt qu’argumentaire commercial.`;

const PROMPT_MT = `Je dois répondre à un marché public (CCTP eau/assainissement Grand Paris) :
- Pose 450m canalisation EU 400mm + branchements
- Niveaux de profondeur 1,5m-2m
- Raccordement réseau public de 2km

Mon entreprise : canalisateur spécialisé, GTD 12 salariés, 20 ans expérience, ISO 9001, assurance 2M€.

Crée un brouillon de mémoire technique (4-5 pages) avec :
1. Savoir-faire et expérience similaire (je complète les références réelles)
2. Équipes : responsable de chantier, ouvriers qualifiés (certifications)
3. Moyens techniques : engins, essais conformité, équipements sécurité
4. Planning indicatif : semaine par semaine, jalons
5. Conformité normes : DTU 26.1, tests étanchéité, procédures — à aligner sur le CCTP
6. Sécurité : rappels organisationnels ; le PPSPS et les plans de prévention restent rédigés selon la réglementation et les rôles habilités

Ton : pro, technique, structure type MT marchés publics.

Ajoute : « À compléter avec les pièces officielles, attestations et chiffres contractuels de mon entreprise. »`;

const PROMPT_FICHE = `Crée une fiche technique descriptive pour cette canalisation EU :
- Longueur : 280m
- Diamètre : 315mm PVC
- Pente : 0,5%
- Profondeur : 1,5m-2m selon relief
- Matériau : PVC groupe I
- Branchement réseau public à 80m

Fiche doit contenir :
1. Spécifications techniques (diamètre, pente, matériau, joints)
2. Rappels normatifs à croiser avec DTU 26.1 et fiches produit (pas de substitution au bureau d’études)
3. Raccordements : description du branchement réseau public (schéma texte)
4. Essais conformité : procédure type d’essai d’étanchéité — durées/pressions selon prescription chantier
5. Mise en service : étapes indicatives

Format : 2-3 pages, tableaux et listes, schémas texte.

Mention : « Document de travail — validation par le responsable technique avant signature client. »`;

const FAQ_ITEMS = [
  {
    q: 'DTU, pentes, débits : ChatGPT peut-il remplacer l’étude hydraulique ?',
    a: "Non. L'IA peut proposer des ordres de grandeur et structurer des justifications à partir de vos hypothèses. Les dimensionnements définitifs et la conformité aux DTU en vigueur relèvent de votre expertise et des études retenues sur le projet.",
  },
  {
    q: 'Réseaux et assainissement non collectif (ANC) ?',
    a: "L'IA peut aider à structurer des textes et listes de postes. Le dimensionnement ANC, les relevés terrain et la validation réglementaire restent à votre charge et à celle des professionnels compétents.",
  },
  {
    q: "L'IA va-t-elle remplacer les canalisateurs ?",
    a: "Non. L'IA accélère la rédaction et la mise en forme ; la pose, les essais et la responsabilité technique restent sur le terrain.",
  },
  {
    q: 'Essais d’étanchéité et rapports : que peut faire ChatGPT ?',
    a: "Elle peut aider à rédiger des procédures et des comptes rendus types. Les essais physiques et leur conformité aux prescriptions sont réalisés et validés sur site.",
  },
  {
    q: 'Comment financer la formation si je suis salarié ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de l'employeur et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On formule les demandes en français, avec des prompts que vous réutilisez et adaptez.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : devis complexes et suivi client lourd' },
  { href: '#la-solution', label: 'La solution : l’IA pour structurer vos projets' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des canalisateurs sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaCanalisateurTpPage() {
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
        <span className="text-slate-900">Formation IA canalisateur TP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour canalisateurs TP —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur devis et dossiers techniques</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 3 h par semaine</strong> sur devis, variantes et mémoires techniques.{' '}
          <strong>Île-de-France</strong> & <strong>Grand Paris</strong> — <strong>Qualiopi</strong> — financement possible selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer devis et textes ; les calculs hydrauliques définitifs, les prix contractuels et la
            conformité aux normes et au CCTP restent validés par vous et votre organisation.
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
            Le problème : devis complexes et suivi lourd
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>canalisateur</strong> (travaux publics) en Île-de-France ou Grand Paris : chaque dossier
            combine réseau existant, tranchées, raccordements, contraintes d’accès et exigences du CCTP ou du client.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Sans aide à la rédaction, le temps part souvent en :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Montage de devis détaillés (lots, matériaux, main-d’œuvre, planning).',
              'Variantes et comparatifs pour le client.',
              'Mémoires techniques pour marchés publics.',
              'Fiches techniques et synthèses de conformité.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Beaucoup de données se répètent d’un dossier à l’autre — d’où l’intérêt d’accélérer la mise en forme tout en
            gardant la validation métier.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour structurer vos projets
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut aider à : produire des brouillons de devis à partir de paramètres, générer des variantes
            comparables, structurer un mémoire technique, rédiger des fiches descriptives — sous votre relecture et avec
            vos barèmes.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Devis et justification technique</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Lots, quantités, rappels normatifs à croiser avec vos études.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Variantes</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Comparaisons matériaux, phasage, courriers pour le client.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Marchés publics et fiches</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Plan de mémoire technique et fiches descriptives — pièces et chiffres réels à intégrer par vous.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour adapter ces usages à votre processus de devis canalisation.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Méthode pas à pas</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : calcul technique et devis
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : variantes et alternatives
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_VARIANTES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : mémoire technique (appel d’offres)
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_MT}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : fiche technique et essais
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_FICHE}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>variables</strong> selon la taille du projet et votre temps de contrôle
            :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA sur un dossier canalisateur
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
                  <td className="p-3">Devis + justification</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Brouillon structuré</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Variantes</td>
                  <td className="p-3">Recalcul manuel</td>
                  <td className="p-3">Options cadrées</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mémoire technique AO</td>
                  <td className="p-3">Très chronophage</td>
                  <td className="p-3">Plan + texte</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Fiche technique / essais</td>
                  <td className="p-3">Mise en forme lourde</td>
                  <td className="p-3">Trame remplie</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures par mois n’est garanti : tout dépend du nombre de dossiers et de la qualité de vos
            relectures.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Les devis canalisation me prenaient une grosse partie de la soirée. Avec des prompts calés sur nos lots, je
              vais plus vite sur la forme — je garde la main sur les chiffres et les normes. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Canalisateur TP, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — canalisateurs et IA</h2>
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
            Devis, variantes, mémoire technique : démonstration sur un cas type. Vous repartez avec des prompts à adapter à
            vos barèmes et à votre bureau d’études.
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
            Formation IA canalisateur TP — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <LiensConnexes currentPath={LINKS.formationIaCanalisateur} />

        <AllerPlusLoin
          links={[
            { href: LINKS.formationIaBtpNiveau1BatimentTp, label: 'NIV-01 — Bâtiment & travaux publics' },
            { href: '/formations/ia-appels-offre-btp', label: 'Formation IA appels d’offres BTP' },
            { href: '/formation-ia-chef-chantier-tp', label: 'Formation IA chef de chantier TP' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: buildSiteCalendlyCtaUrl('formation-ia-canalisateur-tp-footer-rdv'), label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
