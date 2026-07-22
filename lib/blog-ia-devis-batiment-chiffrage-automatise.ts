/**
 * Article blog — IA devis bâtiment, chiffrage automatisé (cluster cas d'usage).
 */
import type { BlogArticle } from '@/lib/blog';
import { LINKS } from '@/lib/internal-links';
import { buildSiteCalendlyCtaUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const N = formatProfessionalsTrainedCount();

export const blogArticleIaDevisBatimentChiffrageAutomatise: BlogArticle = {
  slug: 'ia-devis-batiment-chiffrage-automatise',
  title: 'IA et devis bâtiment : automatiser le chiffrage BTP en 15 minutes',
  seoTitle: 'IA devis bâtiment : chiffrage BTP en 15 minutes',
  description:
    "Rédigez vos devis BTP avec l'IA en 15 min au lieu de 3 heures. Méthode en 5 étapes, prompts ChatGPT, exemples chantier. Finançable Constructys.",
  date: '2026-04-27',
  readingTime: '12 min',
  keywords: [
    'ia devis batiment',
    'chatgpt devis btp',
    'ia chiffrage batiment',
    'devis automatique btp',
    'formation IA pour le BTP',
    'Constructys 2026',
    'devis bâtiment',
    'chiffrage BTP',
  ],
  relatedSlugs: [
    'chatgpt-devis-btp-methode-2026',
    'devis-btp-chatgpt-20-minutes',
    'formation-ia-btp-guide-complet-2026',
    'guide-skill-ia-conducteur-travaux-btp',
  ],
  coverImage: '/images/laure-olivie-formatrice-ia-btp-qualiopi.webp',
  faq: [
    {
      question: "L'IA peut-elle remplacer mon logiciel de devis (Batigest, Codial, Mediabat) ?",
      answer:
        "Non. L'IA prépare et structure vos devis, mais votre logiciel métier reste indispensable pour la bibliothèque de prix, le suivi commercial et la facturation.",
    },
    {
      question: "Mes données client sont-elles confidentielles si j'utilise ChatGPT ?",
      answer:
        "Oui avec les bons réglages et les bonnes offres. Pour les dossiers sensibles, privilégiez une offre professionnelle et évitez d'envoyer des données nominatives inutiles.",
    },
    {
      question: "Puis-je faire chiffrer un devis directement par l'IA sans donner mes prix ?",
      answer:
        "L'IA peut proposer des fourchettes mais ne doit pas remplacer votre chiffrage réel. Elle structure le devis ; vous renseignez les prix unitaires selon votre bibliothèque.",
    },
    {
      question: "Combien de temps faut-il pour devenir autonome sur l'IA pour les devis ?",
      answer:
        "En pratique, 4 heures de formation suffisent pour prendre en main une méthode fiable sur les devis courants.",
    },
    {
      question: 'La formation IA devis bâtiment est-elle financement possible selon éligibilité ?',
      answer:
        "Oui. OFC Création d'Entreprise est certifiée Qualiopi et les actions peuvent être financées selon les règles Constructys en vigueur.",
    },
    {
      question: "Que faire si l'IA invente des prix ou des références produits ?",
      answer:
        "Demandez systématiquement de laisser les colonnes de prix vides et vérifiez toujours les références techniques dans vos sources métier.",
    },
    {
      question: "L'IA devis bâtiment fonctionne-t-elle pour les marchés publics ?",
      answer:
        "Oui, mais elle doit être intégrée à une méthode plus large avec CCTP, RC, CCAP et mémoire technique.",
    },
  ],
  sections: [
    {
      type: 'paragraph',
      content: "Par Laure Olivié — Formatrice IA pour le BTP, OFC Création d'Entreprise · 12 min de lecture",
    },
    {
      type: 'list',
      title: 'En bref',
      content: [
        'Un devis BTP complet prend souvent 2 à 4 heures sans IA ; avec un prompt bien calibré, il passe à 15 à 20 minutes.',
        "L'IA ne remplace ni votre bibliothèque de prix ni votre validation métier : elle structure, rédige et sécurise la trame.",
        'La méthode terrain tient en 5 étapes : brief, trame, décomposition poste par poste, contrôle anti-oubli, mise en forme.',
        "Trois prompts couvrent 90 % des devis courants : tous corps d'état, électricité, vérification anti-oublis.",
        `Le module est éligible à un financement selon dossier 2026 (24 € HT/h/stagiaire) et s'appuie sur +${N} professionnels formés (note ${SOCIAL_PROOF.AVERAGE_RATING}).`,
      ],
    },
    {
      type: 'html',
      title: "Qu'est-ce qu'un devis bâtiment généré par IA ?",
      content: `
<p>L'<strong>IA devis bâtiment</strong> consiste à utiliser un assistant IA (ChatGPT, Claude, Mistral) pour transformer un brief chantier, un échange client ou un CCTP en devis structuré ligne par ligne.</p>
<p>L'IA excelle sur trois points : la décomposition par lots, la rédaction de libellés techniques et la mise en forme selon votre trame. En revanche, elle ne remplace ni vos quantités terrain, ni vos déboursés, ni votre marge. Le pas-à-pas prompts est dans <a href="${LINKS.blogChatgptDevisBtpMethode2026}" class="font-medium text-[var(--accent)] underline hover:no-underline">ChatGPT pour générer un devis BTP</a>.</p>
<ul class="list-disc space-y-2 pl-5">
  <li>Elle structure le devis pour gagner du temps.</li>
  <li>Elle homogénéise le vocabulaire technique et les unités.</li>
  <li>Elle aide à vérifier les oublis avant envoi client.</li>
</ul>`,
    },
    {
      type: 'html',
      title: 'Le problème terrain : pourquoi un devis prend 3 heures sans IA',
      content: `
<p>Sur le terrain, la majorité du temps est absorbée par la reprise de trames, la reformulation des postes et la vérification manuelle. Le risque principal n'est pas seulement la perte de temps : c'est le retard d'envoi et la perte commerciale.</p>
<p>Quand un devis part trop tard, le client signe souvent ailleurs. Accélérer la rédaction sans dégrader la qualité devient donc un levier direct de chiffre d'affaires.</p>`,
    },
    {
      type: 'html',
      title: 'La méthode en 5 étapes pour un devis bâtiment en 15 minutes',
      content: `
<h3 class="font-display text-lg font-semibold text-slate-900">Étape 1 — Briefer le projet en langage naturel (3 min)</h3>
<p>Décrivez le chantier en français courant : surface, prestations, contraintes, délai, contexte client.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 2 — Charger votre trame de devis (2 min)</h3>
<p>Copiez la structure de votre modèle pour que l'IA respecte vos colonnes, vos lots et vos mentions.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 3 — Décomposer poste par poste (5 min)</h3>
<p>Demandez une sortie détaillée avec libellé, unité, quantité et colonnes de prix vides.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 4 — Contrôler les oublis (3 min)</h3>
<p>Faites relire le devis à l'IA pour détecter postes manquants, incohérences et conditions absentes.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 5 — Mettre en forme et exporter (2 min)</h3>
<p>Exportez proprement, intégrez vos prix unitaires, puis validez totaux, conditions et conformité.</p>`,
    },
    {
      type: 'prompts',
      title: "Trois prompts prêts à l'emploi pour vos devis bâtiment",
      content: [
        {
          titre: "Prompt 1 — Devis tous corps d'état (rénovation logement)",
          prompt: `Tu es un assistant chiffrage pour une entreprise de BTP en France, spécialisée en rénovation tous corps d'état.

À partir du brief client ci-dessous, génère un devis structuré en tableau Markdown avec ces colonnes :
Lot · Désignation · Unité · Quantité · Prix unitaire HT (laisse vide) · Total HT (laisse vide).

Décompose en lots normalisés FFB : 1. Dépose / Démolition · 2. Gros œuvre · 3. Second œuvre · 4. Plomberie · 5. Électricité · 6. Finitions.
Ajoute en fin de tableau une ligne "Postes potentiellement oubliés".

Brief client : [coller le brief ici]`,
        },
        {
          titre: 'Prompt 2 — Devis spécialisé électricité (TGBT, courants forts/faibles)',
          prompt: `Tu es un assistant chiffrage pour une entreprise d'électricité bâtiment, certifiée Qualifelec.

Génère un devis structuré conforme à la NF C 15-100 en distinguant courants forts et courants faibles.
Colonnes : Désignation · Référence type · Unité · Quantité · Prix unitaire HT (vide) · Total HT (vide).

Inclus systématiquement : tableau principal, protections différentielles 30 mA, points lumineux, prises 16 A/20 A, mise à la terre, contrôle Consuel.

Projet : [décrire ici en 3-4 phrases]`,
        },
        {
          titre: 'Prompt 3 — Vérification anti-oublis sur un devis existant',
          prompt: `Tu es un contrôleur qualité de devis pour une entreprise de BTP.

Voici le devis à contrôler :
[coller le devis ligne par ligne]

Type de chantier : [ex : rénovation salle de bain 6 m²]

Liste-moi en tableau :
1. Postes probablement oubliés (libellé + raison)
2. Postes incohérents en quantité ou unité
3. Conditions de vente manquantes
4. Mentions légales obligatoires manquantes

Ne réécris pas le devis, signale uniquement les manques.`,
        },
      ],
    },
    {
      type: 'html',
      title: 'Tableau de gains de temps mesurés en formation OFC',
      content: `
<div class="mt-4 overflow-x-auto rounded-xl border border-slate-200">
<table class="min-w-full text-left text-sm text-slate-700">
<thead class="bg-slate-100"><tr><th class="px-3 py-2">Tâche de chiffrage</th><th class="px-3 py-2">Sans IA</th><th class="px-3 py-2">Avec IA</th><th class="px-3 py-2">Gain</th></tr></thead>
<tbody>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Devis rénovation salle de bain (6 m²)</td><td class="px-3 py-2">2 à 3 h</td><td class="px-3 py-2">15 min</td><td class="px-3 py-2">−90 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Devis tous corps d'état (T3 complet)</td><td class="px-3 py-2">3 à 4 h</td><td class="px-3 py-2">25 à 30 min</td><td class="px-3 py-2">−85 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Devis spécialisé électricité (maison)</td><td class="px-3 py-2">1h30 à 2h</td><td class="px-3 py-2">15 à 20 min</td><td class="px-3 py-2">−85 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Vérification anti-oublis sur devis</td><td class="px-3 py-2">30 à 45 min</td><td class="px-3 py-2">5 min</td><td class="px-3 py-2">−90 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Mise en forme finale (Excel/Word)</td><td class="px-3 py-2">30 à 45 min</td><td class="px-3 py-2">5 à 10 min</td><td class="px-3 py-2">−80 %</td></tr>
</tbody>
</table>
</div>
<p class="mt-4">Un conducteur de travaux qui produit 12 devis par mois récupère en moyenne 18 à 25 heures mensuelles.</p>`,
    },
    {
      type: 'html',
      title: 'Outils recommandés pour le chiffrage IA en BTP',
      content: `
<div class="mt-4 overflow-x-auto rounded-xl border border-slate-200">
<table class="min-w-full text-left text-sm text-slate-700">
<thead class="bg-slate-100"><tr><th class="px-3 py-2">Outil</th><th class="px-3 py-2">Force principale</th><th class="px-3 py-2">Faiblesse</th><th class="px-3 py-2">Tarif</th></tr></thead>
<tbody>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">ChatGPT Plus</td><td class="px-3 py-2">Vitesse, vocabulaire BTP</td><td class="px-3 py-2">Confidentialité hors UE</td><td class="px-3 py-2">22 €/mois</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">Claude Pro</td><td class="px-3 py-2">Excellente rédaction</td><td class="px-3 py-2">Moins de références produits</td><td class="px-3 py-2">18 €/mois</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">Mistral Le Chat Pro</td><td class="px-3 py-2">Hébergement européen</td><td class="px-3 py-2">Moins polyvalent</td><td class="px-3 py-2">14,99 €/mois</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">NotebookLM</td><td class="px-3 py-2">Synthèse multi-documents</td><td class="px-3 py-2">Pas orienté tableau de devis</td><td class="px-3 py-2">Gratuit</td></tr>
</tbody>
</table>
</div>
<p class="mt-4">Pour démarrer, un seul outil bien maîtrisé suffit : ChatGPT Plus ou Claude Pro.</p>
<p class="mt-2">Pour approfondir selon vos besoins métier, consultez <a href="${LINKS.chatgptArtisans}" class="font-medium text-[var(--accent)] underline hover:no-underline">ChatGPT pour entreprises BTP</a> et <a href="${LINKS.formationConducteurTravaux}" class="font-medium text-[var(--accent)] underline hover:no-underline">IA pour conducteur de travaux</a>.</p>`,
    },
    {
      type: 'html',
      title: "FAQ — Questions fréquentes sur l'IA pour devis bâtiment",
      content: `
<h3 class="font-display text-lg font-semibold text-slate-900">L'IA peut-elle remplacer mon logiciel de devis ?</h3>
<p class="mt-2">Non. Elle accélère la préparation et la vérification, mais votre logiciel reste le socle de gestion et de facturation.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Mes données client sont-elles confidentielles ?</h3>
<p class="mt-2">Oui avec les bons paramétrages et une offre adaptée ; pour les dossiers sensibles, privilégiez un cadre professionnel sécurisé.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Puis-je laisser l'IA fixer les prix ?</h3>
<p class="mt-2">Non. L'IA structure, mais vos prix unitaires et marges doivent rester pilotés par votre entreprise.</p>`,
    },
    {
      type: 'html',
      title: "Se former à l'IA devis bâtiment avec OFC Création d'Entreprise",
      content: `
<p>Le module chiffrage est intégré à la formation IA pour les pros du BTP de 4 heures : méthode en 5 étapes, prompts prêts à l'emploi, vérification anti-oubli et intégration à vos outils.</p>
<p>Sessions exclusivement en présentiel, en Île-de-France. Financement possible via Constructys selon barèmes en vigueur.</p>
<p>Références : FFB Grand Paris, FFB Île-de-France, CSFE, CNAM Île-de-France, Lefebvre Dalloz — +${N} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}.</p>
<p class="mt-4">Pour aller plus loin : <a href="${LINKS.formations}" class="font-medium text-[var(--accent)] underline hover:no-underline">catalogue des formations IA appliquées au bâtiment</a>, <a href="${LINKS.financement}" class="font-medium text-[var(--accent)] underline hover:no-underline">financement Constructys formation IA appliquée au bâtiment</a>, ou <a href="${LINKS.prendreRdv}" class="font-medium text-[var(--accent)] underline hover:no-underline">diagnostic IA BTP gratuit</a>.</p>`,
    },
    {
      type: 'html',
      content: `
<p class="text-sm text-slate-600">Laure Olivié — Formatrice IA pour les pros du BTP, OFC Création d'Entreprise<br/>
Organisme certifié Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078<br/>
<a href="mailto:laureolivie@yahoo.fr" class="text-[var(--accent)] underline">laureolivie@yahoo.fr</a> · www.laureolivie.fr</p>
<p class="mt-4"><a href="${buildSiteCalendlyCtaUrl('blog-article-ia-devis-batiment-chiffrage-automatise-fin')}" class="font-medium text-[var(--accent)] underline" target="_blank" rel="noopener noreferrer">Prendre rendez-vous — diagnostic gratuit 30 min</a></p>`,
    },
  ],
};
