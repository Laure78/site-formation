/**
 * Article pilier SEO — cluster « formation IA CCTP » / analyse DCE BTP.
 */
import type { BlogArticle } from '@/lib/blog';
import { LINKS } from '@/lib/internal-links';
import { formatProfessionalsTrainedCount } from '@/lib/constants';

const N = formatProfessionalsTrainedCount();

export const blogArticleFormationIaCctpAnalyseDceBtp: BlogArticle = {
  slug: 'formation-ia-cctp-analyse-dce-btp',
  title:
    'Formation IA CCTP : analyser un DCE BTP en 30 minutes au lieu de 8 heures',
  seoTitle: 'Formation IA CCTP : analyser un DCE plus vite | Laure Olivié',
  description:
    'CCTP, DPGF et DCE : méthode terrain avec ChatGPT et Claude, relecture humaine sur le fond. Qualiopi ; Constructys si éligible. Diagnostic gratuit 30 min.',
  date: '2026-04-16',
  dateModified: '2026-04-16',
  keywords: [
    'formation IA CCTP',
    'analyser un CCTP avec l’IA',
    'IA appels d’offres BTP',
    'formation analyse DCE',
    'ChatGPT BTP CCTP',
    'Claude Pro analyse CCTP',
    'formation IA bâtiment Constructys',
    'mémoire technique IA',
    'DCE BTP',
    'DPGF',
    'Qualiopi',
  ],
  relatedSlugs: [
    'ia-analyse-cctp-methode',
    'memoire-technique-claude-projet-btp',
    'analyse-dce-notebooklm-claude-btp',
  ],
  faq: [
    {
      question: 'Combien coûte une formation IA CCTP ?',
      answer:
        'Le tarif dépend du format : inter via un organisme partenaire ou intra en entreprise. Je détaille les fourchettes et le financement Constructys sur la page formation dédiée. Un rendez-vous gratuit permet d’ajuster le devis à votre effectif.',
    },
    {
      question: 'Quel niveau IA faut-il avant la formation ?',
      answer:
        'Aucun prérequis technique. Il faut savoir naviguer sur un PC et ouvrir des PDF. Je pars de zéro côté IA et je verrouille les réglages utiles pour vos CCTP.',
    },
    {
      question: 'Constructys finance-t-il la formation IA CCTP ?',
      answer:
        'Oui, lorsque l’entreprise est éligible au Plan de Développement des Compétences et que le dossier est conforme. OFC est certifié Qualiopi et référencé Constructys : les modalités exactes dépendent de votre branche et de votre OPCO.',
    },
    {
      question: 'ChatGPT Plus suffit-il ou faut-il Claude Pro ?',
      answer:
        'ChatGPT Plus couvre une grande partie des analyses DCE. Claude Pro est souvent plus à l’aise sur les PDF longs et le raisonnement par lots. Je compare les deux en session et je vous aide à choisir selon vos habitudes.',
    },
    {
      question: 'Une PME de 5 salariés peut-elle se former ?',
      answer:
        'Oui. Les petites structures sont les premières à gagner du temps sur la lecture CCTP. L’intra est possible dès que vous pouvez bloquer une demi-journée.',
    },
    {
      question: 'Combien de temps pour être autonome après la formation ?',
      answer:
        'En général, une à deux semaines suffisent si vous réinvestissez la méthode sur un vrai dossier. Je fournis des prompts et une trame pour ne pas repartir les mains vides.',
    },
  ],
  sections: [
    {
      type: 'definition',
      title: 'En bref',
      content: `Un CCTP de 80 pages, c’est souvent 6 à 8 heures de lecture linéaire. Avec une méthode IA encadrée, je descends à environ 30 minutes pour en sortir une grille exploitable. J’ai formé plus de ${N} professionnels du BTP : je parle en direct, sans promesse magique. Je connais les pièges des DTU mal cités et des normes « inventées » par le modèle. Cet article décrit la formation IA CCTP comme un levier pour les entreprises qui répondent aux appels d’offres — pas pour les cabinets qui les rédigent. Vous trouverez la méthode en quatre temps, un comparatif ChatGPT et Claude, un cas anonymisé lot revêtements, puis la suite possible vers une formation courte et financement possible selon éligibilité (OPCO Constructys) lorsque votre dossier est éligible.`,
    },
    {
      type: 'html',
      title: 'Pourquoi l’IA change la donne sur l’analyse CCTP en 2026',
      content: `
<p class="text-sm text-slate-500">Dernière mise à jour : avril 2026 · Rédaction : Laure Olivié, formatrice IA BTP (OFC Création d’Entreprise, Qualiopi).</p>
<p class="mt-4">Réponse courte : l’IA ne remplace pas votre expertise. Elle accélère la lecture, la structuration et le croisement avec le DPGF. Vous gardez la décision go / no go.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Le coût caché d’une lecture CCTP manuelle (chiffres terrain)</h3>
<p class="mt-3">Sur le terrain, je vois encore des équipes qui impriment 200 pages et surlignent à la main. Le coût n’est pas l’imprimante : c’est l’arrêt du chargé d’affaires, le retard sur le chiffrage et la mauvaise lecture d’une clause pénale.</p>
<p class="mt-3">Quand je dirigeais ALIA BTP, un dossier mal cadré coûtait plus cher qu’une journée de formation. Aujourd’hui, je forme des équipes à éviter ce piège avec des prompts et des garde-fous.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Ce que l’IA peut (vraiment) faire sur un CCTP</h3>
<ul class="mt-3 list-disc space-y-2 pl-5">
<li>Cartographier les exigences par lot et renvoyer vers les articles du RC.</li>
<li>Lister les références normatives demandées (DTU, NF) pour préparer la relecture humaine.</li>
<li>Proposer une première grille de risques : délais, pénalités, coactivité, zones sensibles.</li>
<li>Aider à croiser CCTP et bordereau pour repérer les écarts de périmètre.</li>
</ul>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Ce que l’IA ne fera jamais à votre place</h3>
<p class="mt-3">Elle ne signe pas l’offre. Elle ne valide pas une solution technique contre un avis MOEX. Elle peut halluciner sur un DTU : vous devez garder le réflexe « source primaire » (PDF éditeur, notice produit, extrait norme).</p>
<p class="mt-3">La <strong>formation IA CCTP</strong> sert à verrouiller ce cadre. Pour passer à l’action commerciale, j’ai regroupé le programme sur la page <a href="${LINKS.formationIaCctpAnalyseDceBtp}" class="font-medium text-[var(--accent)] underline hover:no-underline">formation IA CCTP analyse DCE</a>. Pour le contexte global de mon accompagnement, voir <a href="${LINKS.home}" class="font-medium text-[var(--accent)] underline hover:no-underline">Laure Olivié, formatrice IA BTP</a> sur l’accueil du site.</p>
<p class="mt-3">Sur un marché public, le CCAP fixe les règles du jeu. Le RC encadre la procédure. Le CCTP porte le technique. Le DPGF traduit le risque prix. Quand je forme des chargés d’affaires, je leur fais répéter cet ordre de lecture. L’IA aide à ne rien sauter.</p>
<p class="mt-3">Sur un marché privé, la logique est proche. Les pièces portent d’autres noms. Le besoin reste identique : comprendre le périmètre avant d’écrire le mémoire. La <strong>formation IA bâtiment Constructys</strong> reste pertinente dès que vous passez par un financement OPCO.</p>
<p class="mt-3">Je distingue trois familles d’erreurs. Première famille : oublier un lot annexe. Deuxième famille : surévaluer une exigence rare. Troisième famille : croire une norme citée par le modèle sans vérifier la référence.</p>
<p class="mt-3">Pour le lot étanchéité ou le lot maçonnerie, le principe est le même. Je demande à l’IA de rester prudente sur les prescriptions spécifiques. Je garde la main sur le choix des solutions.</p>
<p class="mt-3">Le <strong>mémoire technique IA</strong> se nourrit de cette première passe. Sans grille fiable, vous produisez du texte vite mais hors sujet. Avec une grille, vous rédigez moins mais mieux.</p>`,
    },
    {
      type: 'html',
      title: 'Méthode pas à pas : analyser un CCTP avec l’IA en 30 minutes',
      content: `
<p class="mt-2">Voici la trame que j’enseigne en session. Chaque étape peut tenir dans le créneau indiqué si le DCE est déjà rangé.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Étape 1 — Préparer le DCE pour l’IA (5 min)</h3>
<p class="mt-3">Je classe les pièces : CCTP, RC, CCAP, DPGF, plans si disponibles. Je nomme les fichiers de façon lisible. J’importe ou je colle dans l’outil selon la taille. L’objectif est simple : éviter que le modèle mélange deux lots.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Étape 2 — Extraire les exigences techniques (10 min)</h3>
<p class="mt-3">Je demande une synthèse par lot avec les références aux articles du CCTP. Je force le modèle à citer les numéros de paragraphe. Je garde la sortie sous forme de tableau : critère, page, niveau de risque.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Étape 3 — Détecter les clauses à risque (5 min)</h3>
<p class="mt-3">Je cherche les pénalités, les délais impossibles, les exigences matériaux contradictoires. Je compare avec ce que j’ai vu sur des marchés publics et privés. C’est là que l’<strong>IA appels d’offres BTP</strong> fait gagner le plus de temps.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Étape 4 — Croiser CCTP × DPGF (10 min)</h3>
<p class="mt-3">Je vérifie que chaque ligne du bordereau a un socle dans le CCTP. Je note les trous : ligne DQE sans contrepartie claire, quantités ambiguës. Je prépare ainsi le chiffrage sans doublon.</p>
<p class="mt-3">Pour enchaîner vers le mémoire et le chiffrage, le catalogue propose aussi la <a href="${LINKS.formationAO}" class="font-medium text-[var(--accent)] underline hover:no-underline">formation IA sur les appels d’offres BTP</a> (mémoire technique, DCE complet).</p>
<p class="mt-3">Je note souvent les acronymes en légende sur mon écran. BPU pour le prix unitaire. DQE pour le détail quantitatif. Je ne confonds pas avec le récapitulatif administratif. Cette rigueur évite les erreurs de reprise.</p>
<p class="mt-3">Je demande aussi un plan de relecture humaine. Qui valide le lot étanchéité ? Qui relit les interfaces avec le lot couverture ? L’IA ne remplace pas la réunion interne courte. Elle la rend plus ciblée.</p>
<p class="mt-3">Enfin, je classe les questions ouvertes. S’il manque une précision sur une résine, je la note avant d’appeler le maître d’œuvre. L’objectif est simple : éviter le chiffrage sur une ambiguïté.</p>`,
    },
    {
      type: 'html',
      title: 'ChatGPT ou Claude : quel outil pour analyser un CCTP ?',
      content: `
<p class="mt-2">Je n’ai pas de religion d’outil. J’ai des usages : ChatGPT pour la rapidité, Claude pour les PDF lourds et la stabilité sur les longs contextes.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">ChatGPT Plus — points forts et limites sur un CCTP</h3>
<p class="mt-3">Points forts : intégrations bureautiques, habitudes sur tableurs, bons résumés si vous segmentez bien les questions. Limites : il faut discipliner les prompts pour éviter la dérive. Sur <strong>ChatGPT BTP CCTP</strong>, je préfère des requêtes courtes et des contrôles croisés.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Claude Pro — points forts et limites sur un CCTP</h3>
<p class="mt-3">Points forts : confort sur les dossiers longs, bonne tenue des listes et des tableaux. Limites : l’outil ne remplace pas votre bibliothèque DTU. Pour une <strong>Claude Pro analyse CCTP</strong>, je garde toujours une lecture humaine des passages qui engagent la responsabilité.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Tableau comparatif synthétique</h3>
<div class="mt-4 overflow-x-auto rounded-xl border border-slate-200">
<table class="min-w-full text-left text-sm text-slate-700">
<thead class="bg-slate-100"><tr><th class="px-3 py-2">Critère</th><th class="px-3 py-2">ChatGPT Plus</th><th class="px-3 py-2">Claude Pro</th></tr></thead>
<tbody>
<tr class="border-t border-slate-200"><td class="px-3 py-2">PDF volumineux</td><td class="px-3 py-2">Bon si découpé</td><td class="px-3 py-2">Très bon natif</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Tableaux / lots</td><td class="px-3 py-2">Bon avec consignes</td><td class="px-3 py-2">Stable</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Risque hallucination DTU</td><td class="px-3 py-2">Moyen</td><td class="px-3 py-2">Moyen</td></tr>
</tbody>
</table>
</div>
<p class="mt-4">Pour un comparatif orienté interfaces métiers, voir aussi la page <a href="${LINKS.claudeAiBtp}" class="font-medium text-[var(--accent)] underline hover:no-underline">Claude AI pour le BTP</a>.</p>`,
    },
    {
      type: 'html',
      title: 'Cas concret : analyse d’un lot revêtements en marché public',
      content: `
<h3 class="font-display text-lg font-semibold text-slate-900">Le DCE de départ</h3>
<p class="mt-3">Profil type : PME revêtements, 12 salariés, marché public en Île-de-France. CCTP dense sur les systèmes, le DPGF serré sur les quantités. CCAP exigeant sur les délais de phase.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">La méthode appliquée</h3>
<p class="mt-3">J’ai fait extraire les obligations par sous-lot, puis recouper avec le bordereau. Nous avons isolé deux écarts : une finition annoncée dans le CCTP mais absente du DPGF, et une contrainte de sous-couche mentionnée tard dans le texte.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Le résultat chiffré (heures gagnées, oublis détectés)</h3>
<p class="mt-3">Lecture manuelle estimée par l’équipe : une demi-journée. Synthèse structurée : moins d’une heure, dont relecture humaine ciblée. Les oublis détectés avant chiffrage ont évité une marge à risque sur une ligne sous-quantifiée.</p>
<p class="mt-3">Ce cas illustre l’intérêt d’une <strong>formation analyse DCE</strong> centrée terrain, pas théorique.</p>
<p class="mt-3">Je compare souvent ce type de dossier à une voiture en panne sur route. Le CCTP est le moteur. Le DPGF est le tableau de bord. Si vous ne branchez pas les deux, vous avancez à l’aveugle.</p>
<p class="mt-3">Sur le terrain, le gain se mesure aussi en sérénité. Moins de nuits à relire 80 pages. Plus de temps pour structurer l’offre et sécuriser les prix.</p>
<p class="mt-3">Je ne promets pas un gain identique à chaque dossier. Je promets une méthode reproductible. C’est la différence entre un coup de chance et un process.</p>
<p class="mt-3">Pour les équipes qui enchaînent les marchés, je recommande de tenir un journal de prompts. Deux lignes par dossier : ce qui a marché, ce qui a failli tromper le modèle.</p>`,
    },
    {
      type: 'html',
      title: 'Se former à l’IA appliquée aux CCTP : que choisir ?',
      content: `
<h3 class="font-display text-lg font-semibold text-slate-900">Auto-formation : forces et angles morts</h3>
<p class="mt-3">Forces : coût modique, flexibilité. Angles morts : personne pour corriger vos prompts, risque de généralités inutiles. L’autoformation ne remplace pas un retour d’expérience BTP.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Formation inter-entreprise (FFB, fédérations)</h3>
<p class="mt-3">Forces : échanges entre pairs, dynamique de groupe. Je suis intervenue pour des réseaux institutionnels : le format s’adapte aux calendriers des fédérations.</p>
<h3 class="font-display mt-8 text-lg font-semibold text-slate-900">Formation intra-entreprise sur mesure</h3>
<p class="mt-3">Forces : vos PDF, vos lots, vos règles internes. Je recommande ce format si vous répondez souvent aux marchés. Le financement passe souvent par l’OPCO : je renvoie vers la page <a href="${LINKS.financement}" class="font-medium text-[var(--accent)] underline hover:no-underline">financement Constructys formation IA BTP</a> pour les conditions.</p>
<p class="mt-3">Pour des prompts prêts à l’emploi, je renvoie aussi vers les autres articles du blog sur l’analyse CCTP. Le programme structuré avec objectifs mesurables est sur la page formation dédiée (lien en tête d’article).</p>`,
    },
    {
      type: 'html',
      title: 'Foire aux questions',
      content: `
<h3 class="font-display text-lg font-semibold text-slate-900">Combien coûte une formation IA CCTP ?</h3>
<p class="mt-2">Le tarif dépend du format intra ou inter. Je prépare un devis après un échange court.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Quel niveau IA faut-il avant la formation ?</h3>
<p class="mt-2">Aucun : je pars des réglages de base et des exemples réels.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Constructys finance-t-il la formation IA CCTP ?</h3>
<p class="mt-2">Oui, selon éligibilité et dossier. OFC est certifié Qualiopi.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">ChatGPT Plus suffit-il ou faut-il Claude Pro ?</h3>
<p class="mt-2">Les deux fonctionnent. Le choix dépend de vos PDF et de vos habitudes.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Une PME de 5 salariés peut-elle se former ?</h3>
<p class="mt-2">Oui : la demi-journée est souvent suffisante pour verrouiller la méthode.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Combien de temps pour être autonome après la formation ?</h3>
<p class="mt-2">En général une à deux semaines avec un premier dossier réel.</p>`,
    },
    {
      type: 'paragraph',
      title: 'Conclusion',
      content: `Trois enseignements : le CCTP se lit mieux avec une grille ; l’IA accélère mais n’efface pas la validation humaine ; le croisement DPGF évite les erreurs de chiffrage. Je vous propose un rendez-vous visio gratuit pour voir si votre typologie de marchés colle à cette approche. La prise de contact se fait via la page rendez-vous du site (chemin ${LINKS.prendreRdv}).`,
    },
  ],
};
