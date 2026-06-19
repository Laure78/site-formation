import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { FormationMetierJsonLd } from '@/components/seo/FormationMetierJsonLd';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { createPageMetadata, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

export const revalidate = 3600;
const PATH = '/formation-ia-etancheur';
const PAGE_URL = `${SITE_CONFIG.url.replace(/\/$/, '')}${PATH}`;

const SEO_TITLE = 'Formation IA pour Étancheur — ChatGPT BTP';
const SEO_DESCRIPTION =
  "Formation IA dédiée aux entreprises d'étanchéité : devis, mémoires techniques, CCTP. Qualiopi. Financement possible selon éligibilité. Partenaire CSFE.";

export const metadata = createPageMetadata({
  title: SEO_TITLE,
  description: SEO_DESCRIPTION,
  path: PATH,
  keywords: [
    'ChatGPT étancheur',
    'formation IA étanchéité',
    'IA pour entreprise d\u2019étanchéité',
    'ChatGPT pour étancheur',
    'formation IA appliquée au bâtiment étanchéité',
    'devis étanchéité bicouche IA',
    'mémoire technique étanchéité',
    'CCTP toiture-terrasse ChatGPT',
    'DTU 43 IA',
    'OPCO Constructys étanchéité',
    'Qualiopi étanchéité',
    'CSFE formation IA',
  ],
  openGraphType: 'article',
});

const PROMPT_DEVIS = `Tu es expert étancheur en Île-de-France. Rédige un devis structuré pour une réfection d'étanchéité de toiture-terrasse :

CHANTIER :
- Surface utile : 420 m² (toiture-terrasse inaccessible, immeuble R+5)
- Support : ancienne étanchéité bitumineuse multicouche dégradée à déposer
- Isolation : panneaux PIR 100 mm (R = 4,55)
- Étanchéité neuve : bicouche élastomère SBS soudée (DTU 43.1)
- Relevés : 80 ml en acrotère
- Évacuations : 4 EP Ø 100, remplacement avec naissances neuves
- Protection : gravillons roulés 4/8 sur 80 % de la surface
- Acceptation chantier : nacelle 18 m, 3 jours

Pour chaque lot, donne :
1. Désignation technique
2. Quantité + unité
3. Prix unitaire HT (laisse [À COMPLÉTER] si tu n'as pas la donnée — JAMAIS d'invention)
4. Sous-total HT
5. Référence DTU ou norme applicable

Format : tableau prêt à coller dans Word, ton professionnel et factuel.`;

const PROMPT_CCTP = `Voici un extrait de CCTP (lot étanchéité) d'un marché public :

[COLLE ICI LE TEXTE DU CCTP]

Analyse ce CCTP et produis :
1. **Synthèse** (10 lignes max) : nature des travaux, surfaces, contraintes principales, pénalités notables.
2. **Liste des prestations exigées** sous forme de checklist (avec référence DTU/norme).
3. **Points de vigilance** : exigences inhabituelles, clauses techniques restrictives, marques imposées, performances thermiques (R, U, Up).
4. **Questions à poser** au maître d'œuvre avant de chiffrer (5 à 8 questions précises).
5. **Risques d'omission** : éléments souvent oubliés au chiffrage (relevés, évacuations, protection, garde-corps, lignes de vie).

Ne reformule pas si tu n'es pas sûr — préfère citer le CCTP littéralement.`;

const PROMPT_MEMOIRE_TECHNIQUE = `Rédige le mémoire technique de notre entreprise d'étanchéité pour répondre à ce marché public :

CONTEXTE MARCHÉ :
- Maître d'ouvrage : [BAILLEUR / COLLECTIVITÉ]
- Objet : réfection complète de l'étanchéité d'un groupe scolaire (1 800 m² toiture-terrasse)
- Critères d'attribution : technique 60 %, prix 30 %, délai 10 %
- Exigences environnementales : tri des déchets, bilan carbone, isolation biosourcée valorisée

NOTRE ENTREPRISE :
- 18 ans d'expérience étanchéité bitumineuse et synthétique
- Qualifications : Qualibat 3212, RGE
- Effectif : 14 personnes (dont 6 compagnons étancheurs)
- 3 chantiers similaires réalisés ces 24 derniers mois

Structure le mémoire en 6 parties :
1. Présentation de l'entreprise (1 page)
2. Compréhension du besoin et contraintes du site (1 page)
3. Méthodologie d'exécution étape par étape (2 pages, avec DTU 43.1, 43.3, 43.4, 43.5 selon le cas)
4. Moyens humains et matériels affectés (1 page)
5. Démarche QSE / environnementale (1 page)
6. Planning prévisionnel + références similaires (1 page)

Ton : professionnel, concret, sans jargon marketing. Évite les généralités creuses.`;

const PROMPT_PPSPS = `Génère un PPSPS pour un chantier d'étanchéité en hauteur :

CHANTIER :
- Toiture-terrasse R+5, hauteur 18 m
- Surface 420 m², durée 3 semaines
- Co-activité : ravalement façade côté est (semaines 2-3)
- Effectif : 4 étancheurs en pointe d'effectif

Structure le PPSPS :
1. Identification de l'entreprise et du chantier
2. Analyse des risques (chute de hauteur, co-activité, manutention bitume chaud, soudure, électrique)
3. Mesures de prévention (ligne de vie, garde-corps temporaire, EPI, protection contre incendie soudure)
4. Organisation des secours (numéros, point de rassemblement, moyens de premier secours)
5. Liste des équipements de sécurité avec dates de vérification
6. Procédures particulières (manipulation bitume, soudure flamme, intervention en bord de toiture)

Rappelle-moi en fin de document les 3 points que je dois personnaliser avant de signer.`;

const PROMPT_CR_CHANTIER = `À partir de ces notes brutes prises sur chantier, rédige un compte rendu de réunion de chantier propre :

NOTES BRUTES :
[COLLE ICI TES NOTES VOCALES TRANSCRITES OU TES POINTS-CLÉS]

Format attendu :
- En-tête : nom du chantier, n° de réunion, date, lieu, météo
- Présents / Excusés
- Points abordés (ordre logique : avancement, point technique, sécurité, planning, divers)
- Décisions prises (avec qui s'engage et pour quand)
- Points en attente (avec responsable et délai)
- Prochaine réunion

Ton : factuel, neutre, pas d'interprétation. Si une information manque dans mes notes, indique-la entre [À CONFIRMER].`;

const FAQ_ITEMS = [
  {
    question: "L'IA peut-elle calculer une surface d'étanchéité complexe ?",
    answer:
      "ChatGPT peut décomposer une toiture-terrasse en zones rectangulaires et faire l'addition à partir des dimensions que vous lui donnez, mais il ne lit pas les plans à l'échelle. Pour les surfaces complexes (noues, relevés, pénétrations), le métré reste à votre charge ou doit être fait depuis un plan vectorisé que vous vérifiez ; l'IA aide ensuite à structurer le tableau de quantitatif et le calepinage.",
  },
  {
    question: "ChatGPT comprend-il les normes DTU 43.1, 43.3, 43.4, 43.5 ?",
    answer:
      "ChatGPT et Claude AI connaissent les grandes lignes des DTU 43 (étanchéité des toitures, support maçonnerie, support bois, support tôle d'acier). Ils peuvent vous aider à structurer une note technique en s'appuyant sur les principes courants. La référence officielle reste le texte AFNOR : pour toute clause contractuelle, vérifiez systématiquement la version en vigueur du DTU concerné.",
  },
  {
    question: "L'IA peut-elle rédiger une note de calcul thermique ?",
    answer:
      "L'IA peut produire un brouillon de note avec la structure type (résistance thermique R, coefficient U, performance Up de la paroi, conformité à la RE2020 ou à la réglementation thermique applicable). Le calcul réel doit être validé par votre bureau d'études ou un thermicien : ChatGPT n'est pas un logiciel de calcul réglementaire et peut commettre des erreurs sur les valeurs lambda des isolants récents.",
  },
  {
    question: 'Comment financer cette formation avec Constructys ?',
    answer:
      "OFC Création d'Entreprise est certifié Qualiopi et enregistré auprès de Constructys (NDA 11788515078). Les entreprises d'étanchéité cotisant à l'OPCO Constructys peuvent demander une prise en charge dans la limite de 24 € HT par heure et par stagiaire (plafond 840 € HT/jour en intra-entreprise). Le dossier doit être déposé au moins 15 jours avant la formation via la plateforme eGestion.",
  },
  {
    question: 'Faut-il être bon en informatique ?',
    answer:
      "Non. Si vous savez utiliser un email et un traitement de texte, vous savez utiliser ChatGPT. La formation part de zéro et travaille sur vos vrais documents : un CCTP que vous avez sous la main, un devis à finaliser, des notes de chantier. Aucune installation technique n'est requise — un navigateur web suffit.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: "Le problème : pourquoi les entreprises d'étanchéité perdent du temps" },
  { href: '#la-solution', label: "La solution : l'IA adaptée aux étancheurs" },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et partenariat CSFE' },
  { href: '#faq', label: "FAQ — questions des étancheurs sur l'IA" },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

const CAS_USAGE = [
  {
    titre: 'Devis étanchéité bicouche en 15 min',
    description:
      "Vous décrivez le chantier (surface, support, isolant, complexité des relevés) ; ChatGPT structure le tableau lot par lot, vous reprenez la main sur les prix et le bordereau.",
  },
  {
    titre: 'Analyser un CCTP toiture-terrasse en 20 min',
    description:
      "Synthèse du lot étanchéité, checklist des prestations exigées, points de vigilance (DTU, marques imposées, performance thermique), questions à poser au MOE avant de chiffrer.",
  },
  {
    titre: 'Mémoire technique pour un marché de réfection',
    description:
      "Plan en 6 parties (présentation, compréhension du besoin, méthodologie DTU 43, moyens, QSE, planning + références). Vous gardez le contrôle de la dernière relecture commerciale.",
  },
  {
    titre: 'PPSPS rapide pour un chantier en hauteur',
    description:
      "Trame complète : analyse des risques (chute, soudure flamme, co-activité), mesures de prévention, organisation des secours, EPI. Personnalisation à la fin sur 3 points sensibles.",
  },
  {
    titre: 'Compte rendu de chantier automatisé',
    description:
      "Vos notes vocales transcrites deviennent un CR de réunion structuré (avancement, décisions, points en attente, prochaines échéances) en moins de 5 minutes.",
  },
  {
    titre: 'Note de calcul thermique (brouillon)',
    description:
      "Structure type R/U/Up avec rappels normatifs. À valider obligatoirement par votre BE ou un thermicien — l'IA ne remplace pas le calcul réglementaire.",
  },
];

export default function FormationIaEtancheurPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <FormationMetierJsonLd
        metierLabel="Étancheur"
        path={PATH}
        courseName="Formation IA pour Étancheur — ChatGPT BTP"
        courseDescription={SEO_DESCRIPTION}
        duration="PT4H"
        price={100}
        level="Intermediate"
        faqItems={FAQ_ITEMS}
        scriptId="schema-formation-ia-etancheur"
      />

      <nav className="mb-8 text-sm text-slate-600" aria-label="Fil d'Ariane">
        <Link href={LINKS.home} className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href={LINKS.formations} className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA pour Étancheur</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour Étancheur —{' '}
          <span className="text-[var(--accent)]">gagnez 5 h par semaine sur l&apos;administratif</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Devis multicouches, mémoires techniques pour marchés publics, analyse de CCTP toiture-terrasse,
          comptes rendus de chantier : <strong>ChatGPT et Claude AI</strong> automatisent les tâches
          rédactionnelles qui pèsent sur les entreprises d&apos;étanchéité. Formation{' '}
          <strong>Qualiopi</strong>, financement possible selon éligibilité, conçue avec la sensibilité
          terrain de la <strong>filière étanchéité</strong> — partenariat CSFE.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            La formation IA pour étancheur apprend à utiliser ChatGPT et Claude AI sur les vrais documents
            du métier : devis bicouche, mémoires techniques, CCTP toiture-terrasse, PPSPS, comptes rendus de
            chantier. Les normes (DTU 43.1, 43.3, 43.4, 43.5) et les calculs thermiques restent validés par
            l&apos;humain ; l&apos;IA accélère la rédaction et la mise en forme.
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
            Le problème : pourquoi les entreprises d&apos;étanchéité perdent du temps
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            L&apos;<strong>étanchéité</strong> est un métier où la part administrative pèse lourd : entre la
            complexité technique (multicouches, isolation, relevés, évacuations) et les exigences
            documentaires des marchés publics, les dirigeants et conducteurs de travaux passent souvent{' '}
            <strong>une journée entière par semaine</strong> à écrire au lieu de produire.
          </p>
          <ul className="mt-4 space-y-3">
            {[
              'Devis longs à monter : multicouches bitumineux ou synthétiques, isolation thermique, accessoires (relevés, naissances EP, garde-corps, lignes de vie).',
              "Mémoires techniques chronophages pour les marchés publics — bailleurs sociaux, collectivités, écoles, hôpitaux — où la note technique pèse 60 % de l'attribution.",
              'CCTP de toiture-terrasse à analyser sous pression : exigences DTU, marques imposées, performance thermique (R, Up), pénalités de retard.',
              'Comptes rendus de chantier répétitifs (réunion hebdo, suivi co-activité ravalement, courrier au MOE).',
              "Sécurité en hauteur : PPSPS et plans de prévention à formaliser pour chaque chantier R+3 et plus.",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Sans méthode, ce temps de rédaction se prend sur la <strong>réponse aux appels
            d&apos;offres</strong>, la prospection, ou le suivi de chantier — au détriment de la marge.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l&apos;IA adaptée aux étancheurs
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>ChatGPT</strong> (OpenAI) et <strong>Claude AI</strong> (Anthropic) sont des assistants
            de rédaction généraliste très performants sur les documents BTP. Avec la bonne méthode et les
            bons prompts, ils produisent en quelques minutes ce qui prend une à deux heures à la main.
          </p>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {CAS_USAGE.map(({ titre, description }) => (
              <div
                key={titre}
                className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <h3 className="font-display text-lg font-semibold text-slate-900">{titre}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-slate-500">
            La formation travaille sur <strong>vos documents réels</strong> : un CCTP que vous traitez
            actuellement, un devis en cours, des notes de chantier de la semaine. Aucune théorie, zéro cas
            fictif.
          </p>
        </section>

        {/* Bandeau CTA milieu de page */}
        <aside
          className="mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10"
          aria-label="Réserver une visio découverte"
        >
          <h2 className="font-display text-2xl font-bold">
            Adapter ces usages à votre entreprise d&apos;étanchéité
          </h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            30 minutes en visio pour analyser vos cas concrets : un devis bicouche en cours, un CCTP
            difficile, ou une réponse à un marché public. Sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Réserver votre visio découverte
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
          </div>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Méthode pas à pas avec prompts ChatGPT
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Cinq étapes, cinq prompts éprouvés sur le terrain — adaptés à l&apos;étanchéité bitumineuse et
            synthétique. Copiez-les, adaptez-les à votre entreprise, gardez toujours la main sur les prix et
            les références normatives.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 — Devis étanchéité bicouche en 15 min
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 — Analyser un CCTP toiture-terrasse
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_CCTP}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 — Mémoire technique pour un marché public
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_MEMOIRE_TECHNIQUE}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 — PPSPS pour un chantier en hauteur
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_PPSPS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 5 — Compte rendu de chantier automatisé
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_CR_CHANTIER}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Résultats concrets et partenariat CSFE
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur observés en fin de formation auprès des entreprises d&apos;étanchéité —{' '}
            <strong>variables selon la complexité</strong> des dossiers et le temps de relecture que vous
            conservez :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l&apos;IA sur un dossier d&apos;étanchéité
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
                  <td className="p-3">Devis bicouche standard</td>
                  <td className="p-3">2 h à 3 h</td>
                  <td className="p-3">15 à 25 min</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Analyse CCTP toiture-terrasse</td>
                  <td className="p-3">1 h 30 à 2 h</td>
                  <td className="p-3">15 à 20 min</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mémoire technique marché public</td>
                  <td className="p-3">1 à 2 jours</td>
                  <td className="p-3">2 à 4 h</td>
                  <td className="p-3">Très important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">PPSPS chantier en hauteur</td>
                  <td className="p-3">2 h à 3 h</td>
                  <td className="p-3">30 à 45 min</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">CR de réunion de chantier</td>
                  <td className="p-3">45 min</td>
                  <td className="p-3">5 à 10 min</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures ou en chiffre d&apos;affaires n&apos;est garanti : tout dépend du volume de
            dossiers et de la qualité de vos relectures techniques.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8">
            <p className="font-display text-lg font-semibold text-slate-900">
              Partenariat avec la CSFE
            </p>
            <p className="mt-3 text-slate-600 leading-relaxed">
              La <strong>Chambre Syndicale Française de l&apos;Étanchéité</strong> est cliente d&apos;OFC
              Création d&apos;Entreprise. Les modules ont été pensés avec et pour la filière, sur des cas
              terrain (DTU 43, marchés publics, sécurité chantier hauteur).{' '}
              <Link
                href={LINKS.etudesCas}
                className="font-semibold text-[var(--accent)] underline hover:no-underline"
              >
                Voir l&apos;étude de cas FFB &amp; CSFE
              </Link>
              .
            </p>
          </div>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Sur un dossier de réfection de groupe scolaire, j&apos;ai gagné une journée entière sur le
              mémoire technique. Je relis, j&apos;ajuste les références chantier, je signe — au lieu de
              tout réécrire à zéro le dimanche soir. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Dirigeant entreprise d&apos;étanchéité, témoignage de formation (filière CSFE)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            FAQ — questions des étancheurs sur l&apos;IA
          </h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ question, answer }) => (
              <div key={question} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{question}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed">
                  <FAQAnswer content={answer} />
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="a-propos" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Laure Olivié</strong> forme depuis <strong>2023</strong> les professionnels du BTP à
            l&apos;intelligence artificielle générative — <strong>{formatProfessionalsTrainedCount()}</strong>{' '}
            personnes formées, satisfaction <strong>{SOCIAL_PROOF.AVERAGE_RATING}</strong>. Plus de 10 ans
            d&apos;expérience en conduite de chantier travaux publics avant de pivoter vers la formation IA
            adaptée au secteur.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Organisme :</strong> OFC Création d&apos;Entreprise, certifié Qualiopi (action de
            formation), enregistré Constructys (NDA 11788515078).
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Références filière étanchéité &amp; bâtiment :</strong> CSFE, FFB Grand Paris, FFB
            Île-de-France, CAPEB, CNAM Entreprise, Lefebvre Dalloz, LinkedIn Learning.
          </p>
        </section>

        <section
          id="rdv"
          className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10"
        >
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Démonstration sur un cas type d&apos;étanchéité : devis bicouche, analyse CCTP, ou structure de
            mémoire technique. Apportez un document réel, on travaille dessus en direct. Sans engagement.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Réserver votre visio découverte
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
            <Link
              href={LINKS.contact}
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
            Formation IA pour étancheur — présentiel en Île-de-France uniquement
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d&apos;Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}
            {sitePhoneDisplaySuffix()}
          </p>
        </section>

        <div className="mt-14">
          <AuthorBio />
        </div>

        <AllerPlusLoin
          links={[
            { href: LINKS.formations, label: 'Catalogue formations IA pour le BTP' },
            { href: LINKS.repondreAoLanding, label: 'Formation IA appels d\u2019offres BTP' },
            { href: LINKS.formationClaudeAiBatiment, label: 'Formation Claude AI bâtiment' },
            { href: LINKS.financement, label: 'Financement Constructys' },
            { href: LINKS.etudesCas, label: 'Étude de cas FFB & CSFE' },
            { href: buildSiteCalendlyCtaUrl('formation-ia-etancheur-footer-rdv'), label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
