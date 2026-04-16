/**
 * Article blog — IA devis bâtiment, chiffrage automatisé (cluster cas d’usage).
 */
import type { BlogArticle } from '@/lib/blog';
import { LINKS } from '@/lib/internal-links';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const N = formatProfessionalsTrainedCount();

export const blogArticleIaDevisBatimentChiffrageAutomatise: BlogArticle = {
  slug: 'ia-devis-batiment-chiffrage-automatise',
  title: 'IA et devis bâtiment : automatiser le chiffrage BTP en 15 minutes',
  seoTitle: 'IA devis bâtiment : chiffrer un BTP en 15 min | Laure Olivié',
  description:
    "Rédigez un devis BTP complet en 15 minutes avec l'IA au lieu de 3h. Méthode en 4 étapes, prompts ChatGPT prêts à l'emploi. Formation finançable Constructys.",
  date: '2026-04-21',
  keywords: [
    'ia devis batiment',
    'chatgpt devis btp',
    'ia chiffrage batiment',
    'devis automatique btp',
    'formation IA BTP',
    'Constructys',
    'Qualiopi',
    'FFB',
    'chiffrage BTP',
  ],
  relatedSlugs: [
    'chatgpt-devis-btp-methode-2026',
    '5-cas-usage-chatgpt-artisans-btp',
    'formation-ia-btp-guide-complet-2026',
  ],
  coverImage: '/images/laure-olivie-formatrice.png',
  faq: [
    {
      question: 'Combien de temps pour rédiger un devis BTP avec ChatGPT ?',
      answer:
        'Un devis bâtiment standard prend 15 à 25 minutes avec ChatGPT, contre 2 à 4 heures sans IA. Le gain moyen sur la phase rédactionnelle est d’environ −85 % en formation OFC. L’intégration des prix unitaires et la relecture restent humaines.',
    },
    {
      question: 'Peut-on utiliser ChatGPT pour des devis de marchés publics ?',
      answer:
        'Oui, en respectant deux règles : ne pas coller de données nominatives sensibles dans un environnement non professionnel, et faire relire humainement avant envoi. L’IA aide à structurer mémoire technique et DQE.',
    },
    {
      question: 'Quelle différence entre ChatGPT, Claude et Mistral pour un devis BTP ?',
      answer:
        'ChatGPT est le plus simple pour démarrer. Claude est très utile sur de longs documents (CCTP). Mistral offre une option française avec hébergement adapté. Pour la majorité des PME BTP, ChatGPT Plus ou Claude Pro suffisent.',
    },
    {
      question: "L'IA peut-elle calculer les prix unitaires à ma place ?",
      answer:
        'Non. L’IA ne connaît pas vos achats fournisseurs ni vos marges. Elle peut calculer quantité × prix une fois les PU renseignés, mais le chiffrage reste votre responsabilité.',
    },
    {
      question: 'Comment former mes équipes à l’utilisation de l’IA pour les devis BTP ?',
      answer:
        'OFC propose une formation IA BTP de 4 h, finançable selon dossier Constructys. Voir le catalogue des formations et la prise de rendez-vous sur le site.',
    },
    {
      question: 'Mes données client sont-elles protégées si j’utilise ChatGPT pour mes devis ?',
      answer:
        'Pas avec les offres grand public par défaut. Pour des données nominatives, utilisez des offres Team / Enterprise avec option « no training » ou des solutions françaises adaptées. C’est traité en formation.',
    },
    {
      question: "L'IA pour les devis bâtiment est-elle adaptée aux artisans seuls ?",
      answer:
        'Oui : gagner du temps sur les devis libère du créneau pour le terrain. Les pages dédiées ChatGPT artisans et IA devis bâtiment du site détaillent les usages.',
    },
  ],
  sections: [
    {
      type: 'paragraph',
      title: undefined,
      content: `Par Laure Olivié — Formatrice IA BTP, OFC Création d'Entreprise — 9 minutes de lecture`,
    },
    {
      type: 'list',
      title: 'En bref',
      content: [
        'Un devis bâtiment détaillé prend en moyenne 2 à 4 heures à un chargé d’affaires expérimenté.',
        'Avec l’IA générative (ChatGPT, Claude, Mistral), le temps tombe à 15-20 minutes pour un devis équivalent.',
        'La méthode s’appuie sur 4 étapes : structuration du besoin, génération de la trame, intégration des prix unitaires, relecture humaine obligatoire.',
        'Le chiffrage final reste sous la responsabilité du chargé d’affaires : l’IA ne décide jamais des prix.',
        'Cette compétence est intégrée dans les formations IA BTP délivrées par OFC pour la FFB Grand Paris, la FFB Île-de-France et la CSFE.',
      ],
    },
    {
      type: 'html',
      title: "L'IA devis bâtiment, qu'est-ce que c'est concrètement ?",
      content: `
<p>L'<strong>IA devis bâtiment</strong> désigne l'utilisation d'outils d'intelligence artificielle générative (ChatGPT, Claude, Mistral, Perplexity) pour accélérer la rédaction des devis de chantier dans le BTP : structuration du descriptif, génération du détail quantitatif, formulation des conditions commerciales, mise en forme professionnelle.</p>
<p>L'IA ne remplace ni la connaissance des prix unitaires, ni la maîtrise technique du métier, ni la signature du chargé d'affaires. Elle accélère uniquement la partie rédactionnelle et structurelle, qui représente 70 à 80 % du temps passé sur un devis.</p>`,
    },
    {
      type: 'html',
      title: 'Le problème terrain : 3 heures par devis, et 4 devis par semaine',
      content: `
<p>J'ai dirigé une entreprise de travaux publics pendant 8 ans (ALIA BTP, à Guyancourt). Les devis, je les ai faits moi-même, le soir, après 19h, pendant des années. Et ce que je vois aujourd'hui chez les artisans et chargés d'affaires que je forme à la FFB Grand Paris ou à la CSFE, c'est exactement la même chose : <strong>le devis, c'est l'angle mort administratif du BTP</strong>.</p>
<p>Un devis bâtiment correctement chiffré demande :</p>
<ul class="list-disc space-y-2 pl-5">
<li>30 à 45 minutes pour relire les pièces du marché ou la demande client</li>
<li>1 à 2 heures pour structurer le descriptif technique</li>
<li>30 à 60 minutes pour aller chercher les prix unitaires (BPU interne, fournisseurs, mercuriales)</li>
<li>30 à 45 minutes pour mettre en forme, vérifier les calculs, ajouter les conditions commerciales</li>
</ul>
<p>Soit <strong>2 à 4 heures par devis</strong>. Multipliez par 4 à 6 devis par semaine pour une PME du bâtiment, et vous arrivez à 12 à 20 heures hebdomadaires consacrées au chiffrage. C'est l'équivalent d'un mi-temps de chargé d'affaires.</p>
<p>Conséquence directe : les devis sont envoyés avec retard, certaines opportunités sont abandonnées par manque de temps, et les chargés d'affaires n'ont plus de bande passante pour les visites client ou les relances.</p>`,
    },
    {
      type: 'html',
      title: 'La méthode IA en 4 étapes pour un devis bâtiment en 15 minutes',
      content: `
<p>Voici la méthode que je transmets en formation IA BTP, testée sur des centaines de devis réels avec des artisans, électriciens, étancheurs et conducteurs de travaux.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 1 — Structurer le besoin avant d'ouvrir ChatGPT (3 minutes)</h3>
<p>Avant de solliciter l'IA, prenez 3 minutes pour rassembler : le métier, le type de chantier, les prestations, les quantités approximatives, le contexte client.</p>
<p>Cette étape n'est pas optionnelle. Un prompt mal contextualisé donne un devis générique inutilisable.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 2 — Générer la trame du descriptif (3 minutes)</h3>
<p>Utilisez un prompt métier (voir section prompts ci-dessous). La consigne « ne mets pas de prix » est essentielle pour éviter des montants inventés.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 3 — Intégrer les prix unitaires depuis votre base interne (5 minutes)</h3>
<p>Vous reprenez la trame et vous insérez vos PU depuis votre BPU, votre logiciel ou vos historiques. L'IA peut aider à calculer les sous-totaux une fois les prix renseignés.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 4 — Relecture humaine et personnalisation (4 minutes)</h3>
<p>Relisez cohérence des prestations, quantités, conditions commerciales, mentions légales. Le devis sort en 15-20 minutes au total.</p>`,
    },
    {
      type: 'prompts',
      title: 'Les 3 prompts IA devis bâtiment à garder en favoris',
      content: [
        {
          titre: 'Prompt 1 — Devis rénovation salle de bain (artisan plombier)',
          prompt: `Tu es plombier-chauffagiste basé en Île-de-France.

Rédige un devis professionnel pour la rénovation complète d'une salle de bain de 7 m² chez un particulier :
- Dépose ancienne installation (baignoire, WC, lavabo)
- Pose receveur extra-plat 90×120 + paroi vitrée
- Pose WC suspendu avec bâti-support Geberit
- Pose meuble vasque 80 cm avec robinetterie thermostatique
- Reprise plomberie eau chaude/eau froide et évacuations
- Évacuation des gravats incluse

Structure : description du chantier, détail des 6 postes numérotés, conditions (TVA 10 %, validité 30 jours, acompte 30 %).
Ne mets pas de prix.`,
        },
        {
          titre: 'Prompt 2 — Devis lot électricité (chargé d\'affaires marché privé)',
          prompt: `Tu es chargé d'affaires en électricité pour une PME de 25 salariés en région parisienne.

Rédige un devis pour un lot électricité dans une rénovation de bureaux de 350 m² :
- Dépose installation existante
- Mise en place tableau électrique 4 rangées + parafoudre
- Pose de 80 prises 16A et 40 prises RJ45
- Pose de 60 luminaires LED encastrés
- Câblage réseau et courant fort sur chemins de câbles
- Mise en service et conformité Consuel

Structure : descriptif sommaire, détail des 6 postes numérotés avec ratios par m² ou par unité, conditions commerciales marché privé (TVA 20 %, retenue de garantie 5 %, validité 60 jours, acompte 30 %).
Ne mets pas de prix.`,
        },
        {
          titre: 'Prompt 3 — Devis dépannage urgent (artisan)',
          prompt: `Tu es maçon basé en Yvelines.

Rédige un devis de dépannage rapide pour :
- Reprise d'une fissure structurelle de 2 ml sur un mur extérieur en parpaing (façade Est, maison individuelle)
- Décapage, traitement des armatures si visibles
- Application enduit de réparation et finition projetée
- Garantie 1 an sur l'intervention

Structure courte : 1 paragraphe descriptif + 3 postes numérotés + conditions (TVA 10 % rénovation, intervention sous 7 jours, paiement fin de chantier).
Ne mets pas de prix.`,
        },
      ],
    },
    {
      type: 'paragraph',
      title: undefined,
      content: `Ces prompts ne sont pas figés : vous les adaptez à votre métier. C'est ce que nous faisons pendant les 4 heures de formation IA BTP : construire votre bibliothèque de prompts personnalisée.`,
    },
    {
      type: 'html',
      title: 'Tableau de gains de temps : devis BTP avec et sans IA',
      content: `
<div class="mt-4 overflow-x-auto rounded-xl border border-slate-200">
<table class="min-w-full text-left text-sm text-slate-700">
<thead class="bg-slate-100"><tr><th class="px-3 py-2">Type de devis</th><th class="px-3 py-2">Sans IA</th><th class="px-3 py-2">Avec IA</th><th class="px-3 py-2">Gain</th></tr></thead>
<tbody>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Rénovation salle de bain (plombier)</td><td class="px-3 py-2">1h30 à 2h</td><td class="px-3 py-2">15 à 20 min</td><td class="px-3 py-2">−85 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Lot électricité bureaux</td><td class="px-3 py-2">3h à 4h</td><td class="px-3 py-2">25 à 35 min</td><td class="px-3 py-2">−85 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Chantier maçonnerie complet</td><td class="px-3 py-2">2h à 3h</td><td class="px-3 py-2">20 à 30 min</td><td class="px-3 py-2">−80 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Dépannage rapide</td><td class="px-3 py-2">30 à 45 min</td><td class="px-3 py-2">5 à 10 min</td><td class="px-3 py-2">−80 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Étanchéité 800 m²</td><td class="px-3 py-2">4h à 5h</td><td class="px-3 py-2">30 à 45 min</td><td class="px-3 py-2">−85 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Lot peinture rénovation</td><td class="px-3 py-2">1h30 à 2h</td><td class="px-3 py-2">15 à 20 min</td><td class="px-3 py-2">−85 %</td></tr>
</tbody>
</table>
</div>
<p class="mt-4">Sur une PME qui produit 5 devis par semaine, le gain moyen est de <strong>8 à 12 heures hebdomadaires</strong>.</p>`,
    },
    {
      type: 'html',
      title: 'Quel outil IA choisir pour vos devis bâtiment ?',
      content: `
<div class="mt-4 overflow-x-auto rounded-xl border border-slate-200">
<table class="min-w-full text-left text-sm text-slate-700">
<thead class="bg-slate-100"><tr><th class="px-3 py-2">Outil</th><th class="px-3 py-2">Forces</th><th class="px-3 py-2">Limites</th><th class="px-3 py-2">Tarif</th></tr></thead>
<tbody>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">ChatGPT Plus</td><td class="px-3 py-2">Polyvalent, simple</td><td class="px-3 py-2">Données à protéger (RGPD)</td><td class="px-3 py-2">20 €/mois</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">Claude Pro</td><td class="px-3 py-2">Longs documents, DCE/CCTP</td><td class="px-3 py-2">Moins connu en France</td><td class="px-3 py-2">18 €/mois</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">Mistral Le Chat</td><td class="px-3 py-2">Option française</td><td class="px-3 py-2">Fonctionnalités plus limitées</td><td class="px-3 py-2">Gratuit / Pro</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">NotebookLM</td><td class="px-3 py-2">Interroger vos BPU</td><td class="px-3 py-2">Peu adapté au texte long</td><td class="px-3 py-2">Gratuit</td></tr>
</tbody>
</table>
</div>
<p class="mt-4">Pour démarrer, <strong>ChatGPT Plus ou Claude Pro</strong> suffisent largement. Ne collez jamais de données client réelles dans une version non sécurisée. Pour les données sensibles, passez sur ChatGPT Team ou Enterprise.</p>
<p class="mt-3">Je traite ce point avec les sessions sur la <a href="${LINKS.formationParis}" class="font-medium text-[var(--accent)] underline hover:no-underline">formation IA BTP Paris</a> et les sessions intra entreprises.</p>`,
    },
    {
      type: 'html',
      title: 'Les limites : ce que l’IA ne fera jamais à votre place',
      content: `
<ul class="list-disc space-y-2 pl-5">
<li><strong>L'IA ne connaît pas vos prix d'achat fournisseurs.</strong> Vous restez maître du chiffrage.</li>
<li><strong>L'IA ne connaît pas la spécificité de votre chantier</strong> (accès, délais réels). Vous devez les renseigner.</li>
<li><strong>L'IA ne signe pas le devis.</strong> Le chargé d'affaires reste juridiquement responsable.</li>
<li><strong>L'IA peut inventer des prix</strong> si vous ne précisez pas de ne pas en mettre.</li>
<li><strong>L'IA ne remplace pas la visite client</strong> ni la qualification du besoin.</li>
</ul>
<p class="mt-4">L'IA est un assistant rédactionnel. Le métier reste le vôtre.</p>`,
    },
    {
      type: 'html',
      title: 'Foire aux questions — IA devis bâtiment',
      content: `
<h3 class="font-display text-lg font-semibold text-slate-900">Combien de temps pour rédiger un devis BTP avec ChatGPT ?</h3>
<p class="mt-2">15 à 25 minutes pour un devis standard, contre 2 à 4 heures sans IA. Le gain moyen sur la rédaction est d’environ −85 %.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Peut-on utiliser ChatGPT pour des devis de marchés publics ?</h3>
<p class="mt-2">Oui, avec des règles de confidentialité et une relecture humaine avant envoi.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Quelle différence entre ChatGPT, Claude et Mistral ?</h3>
<p class="mt-2">ChatGPT pour démarrer, Claude pour les longs documents, Mistral pour une approche française selon vos contraintes.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">L'IA peut-elle calculer les prix unitaires à ma place ?</h3>
<p class="mt-2">Non pour vos coûts réels. Oui pour l’arithmétique une fois les PU saisis.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Comment former mes équipes ?</h3>
<p class="mt-2">OFC propose une formation de 4 h, finançable selon dossier. Voir le <a href="${LINKS.formations}" class="font-medium text-[var(--accent)] underline hover:no-underline">catalogue des formations IA BTP</a> ou <a href="${LINKS.prendreRdv}" class="font-medium text-[var(--accent)] underline hover:no-underline">demander un diagnostic gratuit</a> de 30 minutes.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Mes données client sont-elles protégées ?</h3>
<p class="mt-2">Pas avec les offres grand public par défaut. Utilisez des offres professionnelles ou des solutions françaises adaptées.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">L'IA pour les devis est-elle adaptée aux artisans seuls ?</h3>
<p class="mt-2">Oui. Voir la page <a href="${LINKS.chatgptArtisans}" class="font-medium text-[var(--accent)] underline hover:no-underline">ChatGPT pour artisans BTP</a>.</p>`,
    },
    {
      type: 'html',
      title: 'Se former à l’IA devis bâtiment avec OFC Création d’Entreprise',
      content: `
<p>OFC propose une formation IA BTP de 4 h, finançable selon éligibilité. Le module devis couvre bibliothèque de prompts, BPU, méthode « devis en 15 minutes », confidentialité RGPD.</p>
<p><strong>Présentiel</strong> en Île-de-France ou <strong>distanciel</strong>. Financement : jusqu'à 24 € HT/h/stagiaire dans le cadre du PDC, selon règles Constructys — détail sur la page <a href="${LINKS.financement}" class="font-medium text-[var(--accent)] underline hover:no-underline">financement Constructys formation IA BTP</a>.</p>
<p>Références : FFB Grand Paris, FFB Île-de-France (78/91/95), FFB IDF Est, CSFE, CNAM Île-de-France — <strong>+${N} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}</strong>.</p>`,
    },
    {
      type: 'html',
      title: undefined,
      content: `
<p class="text-sm text-slate-600">Laure Olivié — Formatrice IA BTP, OFC Création d'Entreprise<br/>
Organisme certifié Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078<br/>
<a href="mailto:laureolivie@yahoo.fr" class="text-[var(--accent)] underline">laureolivie@yahoo.fr</a> · www.laureolivie.fr</p>
<p class="mt-4"><a href="${CALENDLY_BOOKING_URL}" class="font-medium text-[var(--accent)] underline" target="_blank" rel="noopener noreferrer">Prendre rendez-vous — diagnostic gratuit 30 min</a></p>`,
    },
  ],
};
