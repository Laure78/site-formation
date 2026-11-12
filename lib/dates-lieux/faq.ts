import { FINANCEMENT_FORMULATION_PRUDENTE, MODALITE_FORMATIONS_PRESENTIEL } from '@/lib/tarifs-sessions';
import { LINKS } from '@/lib/internal-links';

export const DATES_LIEUX_FAQ = [
  {
    q: 'Où ont lieu les formations inter-entreprises ?',
    a: `En présentiel, en Île-de-France uniquement. Le lieu exact est indiqué sur chaque session confirmée ; à défaut, il est communiqué à l’inscription. ${MODALITE_FORMATIONS_PRESENTIEL}`,
  },
  {
    q: 'Comment m’inscrire à une session inter ?',
    a: `Choisissez une date confirmée et envoyez une demande d’inscription via le formulaire. L’équipe OFC confirme les places et vous adresse la suite (convention, convocation). Cela ne constitue pas une réservation définitive tant que la session n’est pas validée par écrit.`,
  },
  {
    q: 'Aucune date ne convient — que faire ?',
    a: `Utilisez « Proposer une date » : précisez la formation, votre entreprise, une période souhaitée et le nombre de participants. Nous étudions l’organisation d’une session inter ou d’un format intra dans vos locaux.`,
  },
  {
    q: 'Peut-on financer via l’OPCO ?',
    a: `Oui — ${FINANCEMENT_FORMULATION_PRUDENTE} Voir le détail sur <a href="${LINKS.financement}">financement Constructys formation IA BTP</a>.`,
  },
  {
    q: 'Que signifie « Être informé » sur une session complète ?',
    a: `La session a atteint son effectif. Vous pouvez demander à être prévenu si une place se libère ou pour une prochaine date sur la même formation.`,
  },
] as const;
