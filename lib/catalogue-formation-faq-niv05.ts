/**
 * FAQ métier — fiche NIV-05 (maîtrise d’œuvre BTP, fusion NIV-12).
 */
import { getFormationByCode, libelleDureeFormation, libelleEffectifFormation } from '@/data/formations';
import type { FAQItem } from '@/lib/faq';
import { FINANCEMENT_FORMULATION_PRUDENTE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import {
  libelleTarifParticipantCatalogue,
  TARIF_PARTICIPANT_NIV05_HT,
} from '@/lib/tarifs-catalogue-participant';

const F = () => getFormationByCode('NIV-05')!;

export const FAQ_MOE_NIV05: FAQItem[] = [
  {
    q: 'À qui s’adresse cette formation IA maîtrise d’œuvre ?',
    a: `Aux maîtres d’œuvre de conception et d’exécution (MOE / MOEX), architectes, économistes de la construction, BET, OPC et collaborateurs de cabinets — ainsi qu’aux conducteurs de travaux MOE et assistants gestion travaux. ${libelleDureeFormation(F())}, présentiel en Île-de-France.`,
  },
  {
    q: 'Quels outils d’IA sont utilisés ?',
    a: 'ChatGPT et Claude AI sur ordinateur : rédaction, analyse de documents longs, structuration de tableaux et transcription de notes ou dictées. Chaque participant utilise son propre compte (ChatGPT Plus ou Claude Pro recommandé — non inclus dans le tarif).',
  },
  {
    q: 'Peut-on rédiger un CCTP avec ChatGPT ?',
    a: 'Oui pour structurer des trames, descriptifs par lot et listes d’exigences à partir de vos pièces de référence. Les références normatives, quantités et conformité restent à vérifier sur les textes officiels et à valider par le maître d’œuvre compétent.',
  },
  {
    q: 'Comment préparer une DPGF avec l’IA ?',
    a: 'L’IA aide à organiser les postes, repérer des incohérences avec le CCTP et préparer une trame de bordereau. Les métrés, quantités et prix doivent être contrôlés par le professionnel avant toute consultation ou engagement.',
  },
  {
    q: 'Peut-on analyser un DCE avec Claude ?',
    a: 'Oui : synthèse des pièces (CCTP, CCAP, etc.), extraction d’exigences et points de vigilance, avec renvoi aux documents sources. Claude et ChatGPT sont interchangeables selon vos habitudes de cabinet — la vérification humaine est obligatoire.',
  },
  {
    q: 'Comment rédiger un compte rendu de chantier ?',
    a: 'À partir de notes, d’une dictée vocale ou de photos : l’IA structure le CR par corps d’état, décisions, actions et échéances. Vous relisez et validez avant envoi aux entreprises et au maître d’ouvrage.',
  },
  {
    q: 'L’IA peut-elle préparer les ordres de service ?',
    a: 'Elle peut produire un projet d’OS ou de courrier à partir de vos modèles et du contexte chantier. La validation juridique, les habilitations de signature et les stipulations contractuelles restent de votre responsabilité.',
  },
  {
    q: 'Comment suivre les réserves avec l’IA ?',
    a: 'Structuration des listes de réserves, tableaux de suivi des levées, relances et préparation des pièces de réception. Les constats terrain et la conformité des levées sont contrôlés par le maître d’œuvre sur place.',
  },
  {
    q: 'Combien coûte la formation ?',
    a: `${libelleTarifParticipantCatalogue(TARIF_PARTICIPANT_NIV05_HT)} en inter (${libelleEffectifFormation(F())}). Format intra sur devis. ${FINANCEMENT_FORMULATION_PRUDENTE} <a href="${LINKS.financement}">Financement OPCO</a>.`,
  },
  {
    q: 'Constructys peut-il prendre en charge la formation ?',
    a: `La prise en charge par Constructys ou un autre OPCO est possible selon l’éligibilité de votre entreprise et de vos salariés — elle n’est jamais automatique. OFC Création d’Entreprise est référencé Qualiopi. Voir <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>.`,
  },
];
