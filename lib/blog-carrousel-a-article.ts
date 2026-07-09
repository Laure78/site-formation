/**
 * Article blog — Carrousel A « Présentation formation » (PDF export → PNG).
 * /public/images/blog/carrousel-a-presentation-formation/slide-*.png
 */
import type { BlogArticle } from './blog';
import { TARIF_SESSION_DEBUTANT_HT ,
  formatTarifHt,
} from '@/lib/tarifs-sessions';

const A = '/images/blog/carrousel-a-presentation-formation';
const tarifNiv01 = `${formatTarifHt(TARIF_SESSION_DEBUTANT_HT)} € HT`;

export const carrouselAFormationArticle: BlogArticle = {
  slug: 'formation-ia-artisans-batiment-programme-objectifs-livrables',
  seoTitle: 'Formation IA bâtiment : programme 4h Qualiopi',
  title:
    '« L’IA au service du bâtiment » : présentation complète (infos pratiques, programme, livrables)',
  description:
    'Programme 4 h, 70 % pratique : fondamentaux IA, devis, administratif chantier, visibilité. Qualiopi ; financement Constructys. Diagnostic gratuit 30 min.',
  date: '2026-04-07',
  keywords: [
    'formation IA équipes BTP',
    'formation IA bâtiment',
    'programme formation IA pour le BTP',
    'objectifs pédagogiques IA BTP',
    'livrables formation IA',
    'Qualiopi',
    'OPCO Constructys',
    'devis IA BTP',
    'gestion administrative chantier IA',
  ],
  sections: [
    {
      type: 'definition',
      title: 'En bref',
      content:
        'Ce guide reprend le contenu du carrousel « Présentation formation » (support OFC / Laure Olivié) : promesse pédagogique, informations pratiques, public, objectifs, déroulé en quatre modules, livrables et méthodes. Les visuels ci-dessous sont extraits du PDF pour une lecture sur le web — les montants et modalités définitifs figurent sur votre devis et votre convention de formation.',
    },
    {
      type: 'paragraph',
      title: 'Modalité : présentiel uniquement',
      content:
        'Les formations OFC (NIV-01, NIV-02) : présentiel uniquement · Île-de-France uniquement — inter en salle ou intra dans vos locaux. Les modalités définitives figurent sur votre proposition de formation et la convention signée.',
    },
    {
      type: 'html',
      title: 'La formation en une slide',
      content: `<figure class="my-6">
<img src="${A}/slide-01.png" alt="Slide « L'IA au service du bâtiment » — promesse 4 h pratique, badge Qualiopi, Laure Olivié OFC" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1080" height="1080" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Promesse : gain de temps sur les tâches quotidiennes — dès la première heure.</figcaption>
</figure>`,
    },
    {
      type: 'html',
      title: 'Informations pratiques',
      content: `<figure class="my-6">
<img src="${A}/slide-02.png" alt="Slide informations pratiques — durée 4 h, tarif ${tarifNiv01}, effectif max et inscription" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1080" height="1080" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Durée, tarif, format, effectif, inscription et prérequis — synthèse à valider sur convention.</figcaption>
</figure>`,
    },
    {
      type: 'html',
      title: 'Public et prérequis',
      content: `<figure class="my-6">
<img src="${A}/slide-03.png" alt="Slide public visé — chefs de chantier, conducteurs de travaux et assistants PME bâtiment" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1080" height="1080" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Si vous savez écrire un SMS, vous pouvez démarrer avec l’IA — avec encadrement et bonnes pratiques.</figcaption>
</figure>`,
    },
    {
      type: 'html',
      title: 'Objectifs pédagogiques',
      content: `<figure class="my-6">
<img src="${A}/slide-04.png" alt="Slide objectifs pédagogiques — outils IA, devis, administratif chantier et visibilité en ligne" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1080" height="1080" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Cinq objectifs structurants + évaluation continue sur cas réels.</figcaption>
</figure>`,
    },
    {
      type: 'html',
      title: 'Les 4 modules du programme',
      content: `<figure class="my-6">
<img src="${A}/slide-05.png" alt="Slide programme — 4 modules : fondamentaux IA, devis, administratif chantier et visibilité" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1080" height="1080" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Fondamentaux, devis, administratif chantier (DOE, planning), visibilité en ligne.</figcaption>
</figure>`,
    },
    {
      type: 'html',
      title: 'Livrables : ce que vous repartez',
      content: `<figure class="my-6">
<img src="${A}/slide-06.png" alt="Slide livrables — kits de prompts, attestation Qualiopi et ressources post-formation" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1080" height="1080" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Kits de prompts, attestations et ressources — selon modalités prévues à la convention.</figcaption>
</figure>`,
    },
    {
      type: 'html',
      title: 'Méthodes pédagogiques',
      content: `<figure class="my-6">
<img src="${A}/slide-07.png" alt="Slide méthodes pédagogiques — 70 % pratique sur devis, emails et cas chantier réels" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1080" height="1080" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Ancrage terrain : pas de théorie abstraite seule.</figcaption>
</figure>`,
    },
    {
      type: 'html',
      title: 'Inscriptions et contact',
      content: `<figure class="my-6">
<img src="${A}/slide-08.png" alt="Slide inscriptions — contact et site laureolivie.fr pour réserver une session" class="w-full rounded-xl border border-slate-200 shadow-sm" loading="lazy" width="1080" height="1080" />
<figcaption class="mt-2 text-center text-sm text-slate-500">Prêt à utiliser l’IA sur votre prochain chantier ? Passer par le site ou la prise de rendez-vous.</figcaption>
</figure>`,
    },
    {
      type: 'html',
      title: 'Télécharger le carrousel (PDF)',
      content:
        '<p class="text-slate-600 leading-relaxed">Vous préférez le PDF pour le partager en interne ou l’imprimer ?</p><p class="mt-3"><a href="/formations/carrousels/Carrousel_A_Presentation_Formation.pdf" class="font-semibold text-[var(--accent)] hover:underline" download>Télécharger « Carrousel A — Présentation formation » (PDF)</a></p>',
    },
    {
      type: 'paragraph',
      title: 'Lien avec le catalogue du site',
      content:
        'La formation « NIV-01 — L’IA au service des pros du Bâtiment Travaux Publics » reprend ces grands enseignements dans le cadre catalogue actuel : forfait par session, session en 4 h, certification Qualiopi et financement possible via l’OPCO Constructys selon éligibilité. Pour les appels d’offres, voir la fiche NIV-02.',
    },
    {
      type: 'cta',
      content:
        'Découvrez la fiche catalogue, le programme détaillé et les modalités de financement.',
      formationHref: '/formations/ia-batiment-travaux-publics',
    },
  ],
  relatedSlugs: [
    '7-cas-usage-ia-btp-chiffrage-chantier-appels-offres',
    '5-assistants-ia-btp-chatgpt-productivite',
    'adoption-ia-btp-2026-chiffres-freins-leviers',
  ],
};
