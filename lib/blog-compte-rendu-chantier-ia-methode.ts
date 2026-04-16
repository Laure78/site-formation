/**
 * Article blog — compte rendu de chantier IA, méthode 5 étapes (conducteurs de travaux).
 */
import type { BlogArticle } from '@/lib/blog';
import { LINKS } from '@/lib/internal-links';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

const N = formatProfessionalsTrainedCount();

export const blogArticleCompteRenduChantierIaMethode: BlogArticle = {
  slug: 'compte-rendu-chantier-ia-methode',
  title:
    'Compte rendu de chantier IA : méthode en 5 étapes pour conducteurs de travaux',
  seoTitle: 'Compte rendu chantier IA : méthode 5 étapes | Laure Olivié',
  description:
    "Rédigez un compte rendu de chantier en 15 minutes avec l'IA au lieu de 2h. Méthode 5 étapes, prompts ChatGPT terrain, retours formation FFB. Finançable Constructys.",
  date: '2026-04-24',
  keywords: [
    'compte rendu chantier ia',
    'cr chantier automatisé',
    'ia conducteur de travaux',
    'compte rendu réunion btp ia',
    'ChatGPT chantier',
    'formation IA BTP',
    'Qualiopi',
    'FFB',
    'Constructys',
  ],
  relatedSlugs: [
    'compte-rendu-chantier-ia-automatiser-gagner-temps',
    'ia-devis-batiment-chiffrage-automatise',
    'formation-ia-btp-guide-complet-2026',
  ],
  coverImage: '/images/laure-olivie-formatrice.png',
  faq: [
    {
      question: 'Combien de temps pour rédiger un CR de chantier avec ChatGPT ?',
      answer:
        'Un CR hebdomadaire prend 15 à 20 minutes avec une méthode IA structurée, contre 1h30 à 2h sans IA. Le gain moyen sur la rédaction est d’environ −85 %. Photos, validation et envoi restent à votre charge.',
    },
    {
      question: 'Peut-on enregistrer une réunion de chantier pour la transcrire avec l’IA ?',
      answer:
        'Oui, avec l’accord des participants en début de réunion. L’enregistrement reste interne à l’entreprise et n’est pas diffusé sans cadre adapté.',
    },
    {
      question: 'Quelle différence entre ChatGPT et Claude pour rédiger un CR de chantier ?',
      answer:
        'ChatGPT est très accessible (dont mode vocal). Claude structure souvent très bien le français professionnel sur de longues transcriptions. Le choix dépend du volume et de vos habitudes.',
    },
    {
      question: 'Mes données chantier sont-elles confidentielles avec ChatGPT ?',
      answer:
        'Les offres grand public ne conviennent pas aux données sensibles. Pour des CR nominatifs ou contractuels, utilisez des offres Team / Enterprise ou des solutions françaises adaptées — point traité en formation.',
    },
    {
      question: "L'IA peut-elle générer un CR à partir de notes manuscrites ?",
      answer:
        'Oui : OCR ou dictée à chaud après la réunion. La dictée immédiate est souvent plus fiable que la retranscription manuscrite tardive.',
    },
    {
      question: 'Comment former mon équipe de conducteurs de travaux à l’IA ?',
      answer:
        'OFC propose une formation IA BTP de 4 h, finançable selon dossier. Voir le catalogue des formations et la prise de rendez-vous sur le site.',
    },
    {
      question: 'Le CR généré par l’IA a-t-il une valeur juridique ?',
      answer:
        'Le CR vaut s’il est validé par la personne responsable. L’usage de l’IA comme assistant de rédaction ne change pas la responsabilité du signataire.',
    },
  ],
  sections: [
    {
      type: 'paragraph',
      content: `Par Laure Olivié — Formatrice IA BTP, OFC Création d'Entreprise — 10 minutes de lecture`,
    },
    {
      type: 'list',
      title: 'En bref',
      content: [
        'Un compte rendu de chantier prend en moyenne 1h30 à 2h à un conducteur de travaux après chaque réunion.',
        'Avec une méthode IA structurée, le temps tombe à 15-20 minutes sans perdre en qualité.',
        'La méthode repose sur 5 étapes : enregistrement vocal, transcription, structuration par prompt, ajout des photos et plans, validation humaine.',
        'Les outils utilisés sont accessibles : smartphone (dictaphone), ChatGPT ou Claude, et un modèle Word interne.',
        'Cette méthode est enseignée dans les formations IA BTP délivrées à la FFB Grand Paris, à la FFB Île-de-France et aux entreprises clientes en intra.',
      ],
    },
    {
      type: 'html',
      title: 'Le compte rendu de chantier IA, qu’est-ce que c’est ?',
      content: `
<p>Le <strong>compte rendu de chantier IA</strong> désigne l'utilisation d'outils d'intelligence artificielle (transcription vocale, ChatGPT, Claude) pour transformer des notes brutes prises en réunion de chantier — vocales ou écrites — en un compte rendu professionnel structuré, exploitable et envoyé sous 24 heures.</p>
<p>L'IA ne décide pas du contenu du chantier. Elle ne juge pas les responsabilités entre intervenants. Elle structure une matière brute fournie par le conducteur de travaux et la met en forme dans un livrable professionnel. La validation finale reste humaine et engage la responsabilité du CDT.</p>`,
    },
    {
      type: 'html',
      title: 'Le problème terrain : 2 heures par CR, et 3 réunions par semaine',
      content: `
<p>Avant de devenir formatrice IA pour le BTP, j'étais conductrice de travaux puis dirigeante d'une entreprise de TP. Le CR de chantier, je l'ai écrit pendant des années, le soir, après les visites. Ce que je vois en formation à la FFB Grand Paris ou en intra dans les entreprises de bâtiment, c'est la même situation : <strong>le CR, c'est la tâche que tout le monde repousse au lendemain.</strong></p>
<p>Un CR de chantier correctement rédigé demande :</p>
<ul class="list-disc space-y-2 pl-5">
<li>30 à 45 minutes pour relire les notes manuscrites</li>
<li>30 à 60 minutes pour structurer les rubriques (avancement, vigilance, décisions, prochaines étapes)</li>
<li>20 à 30 minutes pour mettre en forme, photos, références marché</li>
<li>10 à 15 minutes pour relire et envoyer</li>
</ul>
<p>Soit <strong>1h30 à 2h par CR</strong>. Avec 3 réunions par semaine, cela fait <strong>6 à 9 heures hebdomadaires</strong> consacrées aux comptes rendus.</p>
<p>Conséquence : retards, perte de précision, décisions floues. Sur un dossier litigieux, un CR mal rédigé peut coûter cher.</p>`,
    },
    {
      type: 'html',
      title: 'La méthode IA en 5 étapes pour un compte rendu de chantier en 15 minutes',
      content: `
<p>Voici la méthode que je transmets en formation IA BTP, testée sur de vrais chantiers avec des conducteurs de travaux et des équipes du secteur.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 1 — Enregistrer la réunion (ou dicter à chaud)</h3>
<p><strong>Option A :</strong> enregistrement audio sur smartphone avec accord des participants (RGPD).</p>
<p><strong>Option B :</strong> notes manuscrites puis dictée vocale juste après la réunion.</p>
<p>Précaution : prévenir en début de réunion si vous enregistrez (« J'enregistre pour faciliter le CR — accord ? »).</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 2 — Transcrire l'audio (2 minutes)</h3>
<p>ChatGPT Plus (mode vocal), Whisper, Notta, Otter ou Claude Pro selon vos habitudes. Pour 30 minutes d'enregistrement, transcription en quelques minutes.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 3 — Structurer le CR par prompt (5 minutes)</h3>
<p>Utilisez le prompt-cadre de la section prompts ci-dessous : c'est le cœur de la méthode.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 4 — Ajouter photos, plans et pièces marché (5 minutes)</h3>
<p>Étape manuelle : insérer photos légendées, références CCTP, plans, annexes. L'IA peut aider pour les légendes courtes.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Étape 5 — Validation humaine et envoi (3 minutes)</h3>
<p>Relisez décisions, porteurs, délais, réserves, destinataires. Total : <strong>15 à 20 minutes</strong> pour un CR qui prenait 1h30 à 2h.</p>`,
    },
    {
      type: 'prompts',
      title: 'Prompt-cadre — structurer le CR à partir de notes brutes',
      content: [
        {
          titre: 'Prompt-cadre (méthode centrale)',
          prompt: `Tu es conducteur de travaux expérimenté pour une PME de bâtiment en Île-de-France.

À partir des notes brutes ci-dessous, rédige un compte rendu de réunion de chantier professionnel.

Notes brutes :
[COLLER LA TRANSCRIPTION OU LES NOTES]

Structure attendue :
1. En-tête : chantier, date, lieu, participants présents/excusés
2. Avancement général (en %)
3. Points abordés (synthèse par lot ou par sujet)
4. Décisions prises (avec porteur et délai)
5. Points de vigilance / réserves
6. Prochaines étapes (avec dates)
7. Date de la prochaine réunion

Ton : professionnel, factuel, sans jugement.
Format : phrases courtes, listes à puces structurées.
Longueur : 1 à 2 pages maximum.`,
        },
        {
          titre: 'Légendes de photos (aide rédactionnelle)',
          prompt: `Voici la description de 5 photos prises sur le chantier aujourd'hui :
1. [DESCRIPTION 1]
2. [DESCRIPTION 2]
...

Rédige pour chaque photo une légende courte et professionnelle (15 mots max) à insérer dans un CR de chantier BTP.`,
        },
      ],
    },
    {
      type: 'prompts',
      title: '3 prompts compte rendu de chantier IA à garder en favoris',
      content: [
        {
          titre: 'Prompt 1 — CR hebdomadaire de chantier de bâtiment',
          prompt: `Tu es conducteur de travaux pour un chantier de rénovation de bureaux en région parisienne.

À partir de mes notes ci-dessous, rédige le CR hebdomadaire de chantier de la semaine [N° / DATE].

Notes :
[COLLER LES NOTES]

Structure :
- En-tête (chantier, semaine, météo, intervenants présents)
- Avancement global (% par lot : gros œuvre, électricité, CVC, finitions)
- Travaux réalisés cette semaine
- Travaux prévus la semaine prochaine
- Difficultés rencontrées
- Décisions à valider par le maître d'ouvrage
- Demandes en attente

Ton : professionnel, factuel. Format A4 1 page.`,
        },
        {
          titre: 'Prompt 2 — CR réunion MOA / MOE / entreprises',
          prompt: `Tu es OPC sur un chantier neuf de logements collectifs en Île-de-France.

Rédige le compte rendu de la réunion de chantier hebdomadaire à partir des notes suivantes :
[COLLER LES NOTES]

Structure :
- En-tête (chantier, date, n° de réunion, participants par organisme : MOA, MOE, BET, entreprises)
- Avancement par lot
- Points abordés (synthèse par sujet)
- Décisions prises (avec porteur, délai, n° d'ordre)
- Réserves levées / nouvelles réserves
- Prochaines étapes (avec dates précises)
- Annexes : photos, plans, PV joints

Ton : neutre et factuel, sans attribution de faute.
Format : 2 pages A4 maximum.`,
        },
        {
          titre: 'Prompt 3 — CR visite de chantier (chargé d’affaires)',
          prompt: `Tu es chargé d'affaires en rénovation pour une PME du bâtiment.

Rédige un compte rendu court de visite de chantier réalisée aujourd'hui chez [CLIENT] à [VILLE], à partir des notes suivantes :
[COLLER LES NOTES]

Structure courte :
- Date / chantier / personnes présentes
- État d'avancement constaté
- Points discutés avec le client
- Décisions à valider
- Travaux supplémentaires identifiés (à devis)
- Prochaine étape

Ton : professionnel, accessible pour le client.
Format : 1 page maximum.`,
        },
      ],
    },
    {
      type: 'html',
      title: 'Bibliothèque de prompts conducteurs de travaux',
      content: `
<p>Ces prompts sont des bases : chaque conducteur de travaux les adapte à ses chantiers. C’est ce que nous construisons ensemble pendant les 4 heures de la page <a href="${LINKS.iaCDT}" class="font-medium text-[var(--accent)] underline hover:no-underline">IA conducteur de travaux</a> : bibliothèque de prompts personnalisés.</p>`,
    },
    {
      type: 'html',
      title: 'Tableau de gains de temps : CR de chantier avec et sans IA',
      content: `
<div class="mt-4 overflow-x-auto rounded-xl border border-slate-200">
<table class="min-w-full text-left text-sm text-slate-700">
<thead class="bg-slate-100"><tr><th class="px-3 py-2">Type de compte rendu</th><th class="px-3 py-2">Sans IA</th><th class="px-3 py-2">Avec IA</th><th class="px-3 py-2">Gain</th></tr></thead>
<tbody>
<tr class="border-t border-slate-200"><td class="px-3 py-2">CR réunion hebdo (1h de réunion)</td><td class="px-3 py-2">1h30 à 2h</td><td class="px-3 py-2">15 à 20 min</td><td class="px-3 py-2">−85 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">CR visite rapide</td><td class="px-3 py-2">30 à 45 min</td><td class="px-3 py-2">5 à 10 min</td><td class="px-3 py-2">−80 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">CR réunion MOA/MOE (2h)</td><td class="px-3 py-2">2h30 à 3h</td><td class="px-3 py-2">25 à 35 min</td><td class="px-3 py-2">−85 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">Synthèse réunion technique BET</td><td class="px-3 py-2">1h à 1h30</td><td class="px-3 py-2">15 à 20 min</td><td class="px-3 py-2">−80 %</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2">CR réception partielle</td><td class="px-3 py-2">1h30 à 2h</td><td class="px-3 py-2">20 à 30 min</td><td class="px-3 py-2">−80 %</td></tr>
</tbody>
</table>
</div>
<p class="mt-4">Sur 3 CR par semaine, le gain moyen est de <strong>5 à 7 heures hebdomadaires</strong>. Les ordres de grandeur ci-dessus correspondent à des retours de terrain en formation OFC (sessions intra et inter, dont FFB Grand Paris).</p>`,
    },
    {
      type: 'html',
      title: 'Quel outil IA choisir pour vos CR de chantier ?',
      content: `
<div class="mt-4 overflow-x-auto rounded-xl border border-slate-200">
<table class="min-w-full text-left text-sm text-slate-700">
<thead class="bg-slate-100"><tr><th class="px-3 py-2">Outil</th><th class="px-3 py-2">Forces</th><th class="px-3 py-2">Limites</th><th class="px-3 py-2">Tarif</th></tr></thead>
<tbody>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">ChatGPT Plus</td><td class="px-3 py-2">Mode vocal, polyvalent</td><td class="px-3 py-2">Données nominatives à protéger</td><td class="px-3 py-2">20 €/mois</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">Claude Pro</td><td class="px-3 py-2">Longs documents, français pro</td><td class="px-3 py-2">Mode vocal moins poussé</td><td class="px-3 py-2">18 €/mois</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">Notta / Otter</td><td class="px-3 py-2">Transcription réunions</td><td class="px-3 py-2">Peu de structuration auto du CR</td><td class="px-3 py-2">10 à 30 €/mois</td></tr>
<tr class="border-t border-slate-200"><td class="px-3 py-2 font-medium">NotebookLM</td><td class="px-3 py-2">Archives de CR passés</td><td class="px-3 py-2">Pas de génération vocale</td><td class="px-3 py-2">Gratuit</td></tr>
</tbody>
</table>
</div>
<p class="mt-4">Pour démarrer, <strong>ChatGPT Plus</strong> suffit souvent. Pour de gros volumes de CR, <strong>Claude Pro</strong> peut mieux structurer le français professionnel.</p>`,
    },
    {
      type: 'html',
      title: 'Les limites : ce que l’IA ne fera jamais à votre place',
      content: `
<ul class="list-disc space-y-2 pl-5">
<li><strong>L'IA ne décide pas du fond du litige.</strong> Elle ne tranche pas qui doit quoi.</li>
<li><strong>L'IA peut mal attribuer une responsabilité</strong> : relisez la rubrique décisions.</li>
<li><strong>L'IA ne connaît pas votre marché</strong> ni vos enjeux contractuels.</li>
<li><strong>L'IA ne signe pas le CR.</strong></li>
<li><strong>L'IA peut halluciner</strong> si les notes brutes sont floues.</li>
<li><strong>L'IA ne remplace pas la visite physique.</strong></li>
</ul>
<p class="mt-4">L'IA est un assistant rédactionnel et structurel. Le métier reste le vôtre.</p>`,
    },
    {
      type: 'html',
      title: 'Foire aux questions — CR de chantier IA',
      content: `
<h3 class="font-display text-lg font-semibold text-slate-900">Combien de temps pour rédiger un CR avec ChatGPT ?</h3>
<p class="mt-2">15 à 20 minutes pour un CR hebdomadaire typique, contre 1h30 à 2h sans IA.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Peut-on enregistrer une réunion pour la transcrire ?</h3>
<p class="mt-2">Oui, avec accord explicite en début de réunion et usage interne encadré.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">ChatGPT ou Claude ?</h3>
<p class="mt-2">ChatGPT pour l’accessibilité ; Claude pour les longues transcriptions et la structuration.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Données confidentielles ?</h3>
<p class="mt-2">Évitez les offres grand public pour les données sensibles ; privilégiez des offres professionnelles adaptées.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Notes manuscrites ?</h3>
<p class="mt-2">OCR ou dictée à chaud : la dictée immédiate est souvent la plus fiable.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Comment former l’équipe ?</h3>
<p class="mt-2">Voir le <a href="${LINKS.formations}" class="font-medium text-[var(--accent)] underline hover:no-underline">catalogue des formations IA BTP</a> ou <a href="${LINKS.prendreRdv}" class="font-medium text-[var(--accent)] underline hover:no-underline">demander un diagnostic gratuit</a> de 30 minutes.</p>
<h3 class="font-display mt-6 text-lg font-semibold text-slate-900">Valeur juridique du CR IA ?</h3>
<p class="mt-2">Le CR vaut s’il est validé par le responsable ; l’IA est un outil de rédaction comme un modèle Word.</p>`,
    },
    {
      type: 'html',
      title: 'Se former au compte rendu de chantier IA avec OFC',
      content: `
<p>OFC propose une formation IA BTP de 4 h, finançable selon éligibilité. Module CR : méthode « CR en 15 minutes », prompts, transcription, RGPD, bonnes pratiques d’enregistrement.</p>
<p><strong>Présentiel</strong> en Île-de-France ou <strong>distanciel</strong>. Financement : jusqu'à 24 € HT/h/stagiaire selon règles du PDC — détail sur <a href="${LINKS.financement}" class="font-medium text-[var(--accent)] underline hover:no-underline">financement Constructys formation IA BTP</a>.</p>
<p>Références : FFB Grand Paris, FFB Île-de-France (78/91/95), FFB IDF Est, CSFE, CNAM Île-de-France — <strong>+${N} professionnels formés, note ${SOCIAL_PROOF.AVERAGE_RATING}</strong>.</p>
<p>Une fois le CR maîtrisé, les mêmes principes servent pour d’autres documents ; enchaînez avec le <a href="${LINKS.iaDevis}" class="font-medium text-[var(--accent)] underline hover:no-underline">chiffrage et devis BTP</a> et les mémoires techniques pour appels d’offres.</p>`,
    },
    {
      type: 'html',
      content: `
<p class="text-sm text-slate-600">Laure Olivié — Formatrice IA BTP, OFC Création d'Entreprise<br/>
Organisme certifié Qualiopi · SIRET 905 244 281 00010 · NDA 11788515078<br/>
<a href="mailto:laureolivie@yahoo.fr" class="text-[var(--accent)] underline">laureolivie@yahoo.fr</a> · www.laureolivie.fr</p>
<p class="mt-4"><a href="${CALENDLY_BOOKING_URL}" class="font-medium text-[var(--accent)] underline" target="_blank" rel="noopener noreferrer">Prendre rendez-vous — diagnostic gratuit 30 min</a></p>`,
    },
  ],
};
