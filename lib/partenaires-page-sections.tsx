import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  ALT_LOGO_CNAM_ENTREPRISES,
  ALT_LOGO_CSFE,
  ALT_LOGO_FFB_GRAND_PARIS_IDF,
  ALT_LOGO_FFB_OFFICIEL,
  ALT_LOGO_IFRB,
  ALT_LOGO_LEFEBVRE_DALLOZ,
  ALT_LOGO_UMB_FFB,
  LOGO_LEFEBVRE_DALLOZ,
  LOGO_UMB_FFB,
  PARTNER_WEBSITES,
} from '@/lib/client-logos';
import { CSFE_NOM_LIBRE } from '@/lib/csfe';
import { UMB_FFB_NOM_LIBRE } from '@/lib/umb-ffb';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import type { PartenaireLogo } from '@/lib/partenaires-content';

export type PartenairePageSection = {
  id: string;
  h2: string;
  subtitle?: string;
  officialHref: string;
  officialLabel: string;
  paragraphs: ReactNode[];
  logo?: PartenaireLogo;
};

/**
 * Blocs H2 de la page /partenaires — rôle = interventions / formations déléguées.
 * Aucun verbatim n’est inventé (emplacements Temoignage dans la page).
 */
export const PARTENAIRES_PAGE_INTRO: ReactNode[] = [
  <>
    Je n’arrive pas dans le BTP comme une prestataire « IA générique ». Ce sont des
    fédérations, syndicats et instituts du secteur qui me confient des{' '}
    <strong className="font-semibold text-slate-800">
      interventions et des formations déléguées
    </strong>{' '}
    pour leurs adhérents ou leurs stagiaires. Le cadre est toujours le même : présentiel
    en Île-de-France, documents réels (devis, DCE, comptes rendus, mails), relecture
    humaine.
  </>,
  <>
    Ce n’est pas un agrément, ni une exclusivité, ni un label collé sur tout le catalogue.
    OFC Création d’Entreprise reste l’organisme certifié Qualiopi ; les réseaux listés
    ci-dessous organisent ou relaient des sessions. Le{' '}
    <Link href={LINKS.formations} className={OFC_LINK}>
      catalogue des formations IA pour le BTP
    </Link>{' '}
    décrit les programmes ; cette page décrit seulement{' '}
    <strong className="font-semibold text-slate-800">avec qui je les anime</strong>.
  </>,
  <>
    Financement OPCO possible selon éligibilité (Constructys pour le BTP). Les thèmes
    restent concrets : productivité de bureau, appels d’offres, suivi de chantier — pas
    une promesse d’automatiser le métier.
  </>,
  <>
    Concrètement, une session déléguée se prépare avec le réseau : date, lieu en
    Île-de-France, effectif, profils attendus. Le jour J, les participants travaillent
    sur leurs fichiers — pas sur des cas fictifs de cabinet conseil. Je reste
    formatrice OFC : le réseau convoque, j’anime, chacun repart avec une méthode et des
    prompts à retravailler dans son entreprise.
  </>,
];

export const PARTENAIRES_PAGE_SECTIONS: PartenairePageSection[] = [
  {
    id: 'ffb-grand-paris',
    h2: 'FFB Grand Paris',
    subtitle: 'Fédération Française du Bâtiment — Grand Paris',
    officialHref: PARTNER_WEBSITES.ffbGrandParis,
    officialLabel: 'Site officiel FFB Grand Paris',
    logo: {
      src: '/images/partenaires/logo-ffb-grand-paris-formation-idf.webp',
      alt: ALT_LOGO_FFB_GRAND_PARIS_IDF,
      width: 400,
      height: 120,
    },
    paragraphs: [
      <>
        La FFB Grand Paris est la fédération régionale du bâtiment sur le périmètre Grand
        Paris. Elle rassemble des entreprises du bâtiment — TPE, PME, groupes de travaux —
        autour de la représentation, des services aux adhérents et de la montée en
        compétence.
      </>,
      <>
        J’y anime des formations IA déléguées, en présentiel en Île-de-France : groupes
        d’adhérents (dirigeants, conducteurs de travaux, fonctions support). Les thèmes :
        structurer un devis, lire un DCE, préparer un mémoire, rédiger un compte rendu ou
        un mail client, avec ChatGPT ou Claude — le texte n’est jamais envoyé sans
        validation.
      </>,
      <>
        En salle, on avance sur des extraits de consultation, des notes de réunion et des
        modèles internes. La session type du catalogue dure 4 heures ; le rythme est celui
        d’un atelier, pas d’une conférence. Les adhérents Grand Paris sont souvent exposés
        à des marchés denses (rénovation, logements, tertiaire) : l’IA sert à classer
        l’information, pas à signer à leur place.
      </>,
      <>
        Je ne parle pas au nom de la fédération : j’interviens comme formatrice OFC, à la
        demande du réseau. Le détail d’un dispositif FFB / étanchéité est relaté dans{' '}
        <Link href={LINKS.etudesCas} className={OFC_LINK}>
          l’étude de cas FFB et CSFE
        </Link>
        .
      </>,
    ],
  },
  {
    id: 'ffb-ile-de-france',
    h2: 'FFB Île-de-France',
    subtitle: 'Fédérations territoriales du bâtiment (dont 78, 91, 95 et Est)',
    officialHref: PARTNER_WEBSITES.ffbIdf,
    officialLabel: 'Site officiel FFB Île-de-France',
    logo: {
      src: '/images/partenaires/logo-ffb-partenaire-formation-ia-btp.webp',
      alt: ALT_LOGO_FFB_OFFICIEL,
      width: 200,
      height: 80,
    },
    paragraphs: [
      <>
        La FFB Île-de-France recouvre les fédérations territoriales du bâtiment hors du
        seul Grand Paris — notamment l’Ouest francilien (Yvelines, Essonne, Val-d’Oise) et
        l’Est. Les adhérents sont des entreprises de gros œuvre, de second œuvre et de
        travaux, de la TPE à la PME.
      </>,
      <>
        Les sessions que j’anime pour ces adhérents portent sur les mêmes usages IA de
        bureau : administratif, appels d’offres, suivi de chantier. Format : présentiel
        en Île-de-France, groupe restreint, cas apportés par les participants (notes de
        réunion, extraits de CCTP, brouillons de devis).
      </>,
      <>
        Les entreprises franciliennes hors Grand Paris ont souvent des équipes plus
        petites et un bureau qui « absorbe » le chantier le soir. L’atelier sert à poser
        une routine : capturer l’info, la faire rédiger par l’outil, la corriger avant
        envoi. Je n’interviens pas dans la relation adhérent–fédération (cotisations,
        services, représentation).
      </>,
      <>
        Le rôle reste une intervention pédagogique déléguée. Ce n’est pas un partenariat
        d’image, ni un agrément fédéral du catalogue OFC.
      </>,
    ],
  },
  {
    id: 'csfe',
    h2: 'CSFE',
    subtitle: CSFE_NOM_LIBRE,
    officialHref: PARTNER_WEBSITES.csfe,
    officialLabel: 'Site officiel CSFE — Chambre Syndicale Française de l’Étanchéité',
    logo: {
      src: '/images/partenaires/logo-csfe-partenaire-formation-btp.webp',
      alt: ALT_LOGO_CSFE,
      width: 360,
      height: 120,
    },
    paragraphs: [
      <>
        La {CSFE_NOM_LIBRE} représente les entreprises d’étanchéité, de bardage et
        d’enveloppe, membres de la FFB. Public formé : chefs d’entreprise, conducteurs de
        travaux et chargés d’affaires de la filière toiture-terrasse et étanchéité.
      </>,
      <>
        Thèmes IA : extraire les exigences d’un CCTP (DTU 43, relevés, EPDM ou bitume),
        structurer une note technique ou un mémoire, préparer un compte rendu après
        intempéries. L’IA ne tranche pas la conformité d’un ouvrage : la relecture reste
        humaine, sur les référentiels de l’entreprise.
      </>,
      <>
        En étanchéité, un mot faux sur une nappe, un relevé ou une interface avec le gros
        œuvre coûte cher. D’où le cadre posé en formation : sources citées, questions à
        poser au maître d’œuvre, interdiction de « conclure » sur la conformité. Je forme
        à l’usage de l’outil ; je ne fais pas l’étude technique à la place de l’entreprise.
      </>,
      <>
        Sessions en présentiel en Île-de-France. OFC est sollicitée pour former, pas pour
        certifier les ouvrages. L’angle métier étanchéité est aussi décrit sur la page{' '}
        <Link href={LINKS.formationIaEtancheur} className={OFC_LINK}>
          formation IA étancheur BTP
        </Link>
        .
      </>,
    ],
  },
  {
    id: 'umb-ffb',
    h2: 'UMB-FFB',
    subtitle: UMB_FFB_NOM_LIBRE,
    officialHref: PARTNER_WEBSITES.umbFfb,
    officialLabel: 'Site officiel UMB-FFB — Union des Métiers du Bois',
    logo: {
      src: LOGO_UMB_FFB.src,
      alt: ALT_LOGO_UMB_FFB,
      width: LOGO_UMB_FFB.width,
      height: LOGO_UMB_FFB.height,
    },
    paragraphs: [
      <>
        L’{UMB_FFB_NOM_LIBRE} rassemble, au sein de la FFB, les entreprises de charpente,
        menuiserie, agencement et construction bois. Les adhérents sont surtout des TPE et
        PME de la filière bois.
      </>,
      <>
        J’y décline la même méthode sur le vocabulaire du bois : devis, métrés, mails
        client, documents de chantier. Public : dirigeants et équipes en Île-de-France,
        en présentiel, sur leurs pièces (plans, notes, extraits de CCTP bois).
      </>,
      <>
        Charpente, menuiserie et agencement n’ont pas les mêmes DTU ni les mêmes postes
        de devis. L’atelier s’adapte au lot amené par le groupe, sans transformer la
        session en cours de conception bois. L’IA aide à rédiger et à classer ; le
        métré et le choix technique restent ceux de l’entreprise.
      </>,
      <>
        C’est une formation déléguée, pas une offre « labellisée UMB » distincte du
        catalogue Qualiopi. Pour l’angle charpente, voir la{' '}
        <Link href={LINKS.formationIaCharpentierBtp} className={OFC_LINK}>
          formation IA charpentier BTP
        </Link>
        .
      </>,
    ],
  },
  {
    id: 'cnam-entreprise',
    h2: 'CNAM Entreprise',
    subtitle: 'Conservatoire national des arts et métiers — offre entreprises',
    officialHref: PARTNER_WEBSITES.cnamIdf,
    officialLabel: 'Site officiel CNAM Entreprises Île-de-France',
    logo: {
      src: '/images/partenaires/logo-cnam-formation-continue-ia-btp.webp',
      alt: ALT_LOGO_CNAM_ENTREPRISES,
      width: 220,
      height: 72,
    },
    paragraphs: [
      <>
        Le CNAM Entreprise (Conservatoire national des arts et métiers, offre destinée
        aux organisations en Île-de-France) s’adresse aux salariés et aux entreprises qui
        montent en compétence — y compris des profils bâtiment et fonctions support.
      </>,
      <>
        J’y interviens pour des modules IA appliquée : productivité de bureau, rédaction
        professionnelle, cadres de prompts. Public : stagiaires inscrits via le dispositif
        CNAM Entreprise. Les sessions que j’anime ont lieu en présentiel en Île-de-France.
      </>,
      <>
        Le public n’est pas uniquement « BTP pur » : on y croise des fonctions support et
        des organisations qui veulent un cadre d’usage avant de généraliser l’outil. Je
        reste sur des cas professionnels (mails, notes, trames), sans livrer un cursus
        CNAM ni un titre RNCP.
      </>,
      <>
        Le rôle est celui d’une formatrice invitée / formation déléguée. OFC ne délivre
        pas un diplôme CNAM ; le CNAM ne labellise pas le catalogue OFC.
      </>,
    ],
  },
  {
    id: 'lefebvre-dalloz',
    h2: 'Lefebvre Dalloz',
    subtitle: 'Lefebvre Dalloz Formation',
    officialHref: PARTNER_WEBSITES.lefebvreDalloz,
    officialLabel: 'Site officiel Lefebvre Dalloz Formation',
    logo: {
      src: LOGO_LEFEBVRE_DALLOZ.src,
      alt: ALT_LOGO_LEFEBVRE_DALLOZ,
      width: LOGO_LEFEBVRE_DALLOZ.width,
      height: LOGO_LEFEBVRE_DALLOZ.height,
    },
    paragraphs: [
      <>
        Lefebvre Dalloz Formation est un organisme de formation continue (droit,
        fiscalité, métiers). Les publics croisent souvent les fonctions support, RH et
        juridiques, y compris dans des entreprises en lien avec le bâtiment.
      </>,
      <>
        J’y ai animé des interventions IA orientées usages professionnels : structurer un
        document, poser un cadre de prompt, relire un texte avant envoi. Format :
        présentiel, sur le programme qu’ils organisent.
      </>,
      <>
        Lefebvre Dalloz fixe le calendrier, le public et le lieu ; j’apporte le volet IA
        appliquée (rédaction, structuration, limites). Ce n’est pas une formation juridique
        OFC, ni un module « droit du travail » déguisé : quand le sujet touche au BTP, on
        reste sur les écrits de bureau que les participants doivent produire.
      </>,
      <>
        Ce n’est pas une co-édition de catalogue ni une marque blanche. Lefebvre Dalloz
        programme ; j’anime en tant que formatrice OFC.
      </>,
    ],
  },
  {
    id: 'ifrb-77',
    h2: 'IFRB 77',
    subtitle: 'Institut de Formation Régional du Bâtiment — Seine-et-Marne et Île-de-France',
    officialHref: PARTNER_WEBSITES.ifrb,
    officialLabel: 'Site officiel IFRB — Institut de Formation Régional du Bâtiment',
    logo: {
      src: '/images/partenaires/logo-ifrb-78-91-95-formation-batiment.webp',
      alt: ALT_LOGO_IFRB,
      width: 200,
      height: 80,
    },
    paragraphs: [
      <>
        L’IFRB (Institut de Formation Régional du Bâtiment) forme les entreprises du
        bâtiment en Île-de-France. Le libellé « IFRB 77 » désigne les interventions côté
        Seine-et-Marne ; l’institut régional couvre aussi d’autres départements
        franciliens (Yvelines, Essonne, Val-d’Oise).
      </>,
      <>
        J’anime des formations IA pour des stagiaires du bâtiment : devis, administratif,
        documents de chantier. Public : entreprises et salariés formés via l’institut.
        Présentiel en Île-de-France.
      </>,
      <>
        L’IFRB connaît ses stagiaires et ses contraintes d’organisation ; je m’insère dans
        ce cadre (durée, salle, groupe). Les exercices restent ceux du catalogue OFC
        adaptés au bâtiment : pas un module IFRB « IA » autonome que je revendiquerais
        comme marque.
      </>,
      <>
        Rôle : formatrice OFC sur des sessions déléguées par l’institut. OFC n’opère pas
        le centre IFRB et n’en reprend pas le catalogue.
      </>,
    ],
  },
  {
    id: 'capeb',
    h2: 'CAPEB',
    subtitle: 'Confédération de l’Artisanat et des Petites Entreprises du Bâtiment',
    officialHref: PARTNER_WEBSITES.capeb,
    officialLabel: 'Site officiel CAPEB',
    paragraphs: [
      <>
        La CAPEB représente les petites entreprises du bâtiment. Les adhérents sont des
        dirigeants de TPE et des équipes de terrain qui, de plus en plus, rédigent aussi
        au bureau (devis, relances, comptes rendus).
      </>,
      <>
        Lorsque le réseau me confie une intervention, j’anime une formation IA en
        présentiel en Île-de-France : mêmes thèmes concrets (devis, mails, CR), même
        cadre Qualiopi OFC, sans jargon startup.
      </>,
      <>
        Les TPE du bâtiment n’ont souvent ni service RH ni « chef de projet digital ».
        L’atelier vise donc un usage immédiat : un devis mieux cadré, un mail de relance
        propre, un CR de visite lisible. Je ne vends pas d’outil, je n’installe rien dans
        l’entreprise, je n’interviens pas dans la vie syndicale de la confédération.
      </>,
      <>
        Je décris ici des formations déléguées, pas un partenariat exclusif, ni une
        labellisation CAPEB du catalogue OFC.
      </>,
    ],
  },
];

export const PARTENAIRES_PAGE_CLOSING: ReactNode[] = [
  <>
    Si vous représentez une fédération, un syndicat, un institut ou une entreprise du BTP
    en Île-de-France, la visio découverte sert à cadrer une session sur vos documents —
    pas à « vendre un partenariat ». Vous pouvez aussi lire{' '}
    <Link href={LINKS.aPropos} className={OFC_LINK}>
      qui je suis et comment je forme
    </Link>
    .
  </>,
  <>
    En résumé : chaque nom ci-dessus correspond à des interventions que je mène, en
    présentiel, pour des adhérents ou des stagiaires de ces réseaux. OFC reste
    l’organisme de formation ; le réseau reste le réseau. Rien de plus n’est revendiqué
    sur cette page.
  </>,
];
