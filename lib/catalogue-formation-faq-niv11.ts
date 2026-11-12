/**
 * FAQ métier — fiche NIV-11 (assistance à maîtrise d’ouvrage).
 */
import { getFormationByCode } from '@/data/formations';
import type { FAQItem } from '@/lib/faq';
import { FINANCEMENT_PRISE_EN_CHARGE_100_SELON_ELIGIBILITE } from '@/lib/financement-copy';
import { LINKS } from '@/lib/internal-links';
import { SITE_FORMATION_MODALITE_DETAIL } from '@/lib/site-config';

const F = () => getFormationByCode('NIV-11')!;

export const FAQ_AMO_NIV11: FAQItem[] = [
  {
    q: 'À qui s’adresse cette formation IA assistance à maîtrise d’ouvrage ?',
    a: `Aux ingénieurs, chefs de projet et chargés d’opération en assistance à maîtrise d’ouvrage (AMO), conduite d’opération, programmation et maîtrise d’ouvrage déléguée. Public visé sur la fiche : ${F().public}.`,
  },
  {
    q: 'Peut-on analyser une consultation (DCE) avec l’IA ?',
    a: 'Oui pour organiser la relecture : recoupement du règlement de consultation (RC), du cahier des clauses techniques particulières (CCTP), du CCAP et de la décomposition du prix global et forfaitaire (DPGF), avec renvoi aux pièces sources. L’IA ne remplace pas l’analyse juridique ni la décision du maître d’ouvrage.',
  },
  {
    q: 'Comment préparer un rapport d’analyse des offres avec l’IA ?',
    a: 'L’IA aide à structurer les notes, comparer les mémoires techniques et les offres de prix, et préparer une trame de rapport d’analyse sourcée (MOE, entreprises, contrôleur technique, coordonnateur sécurité). Chaque point sensible est relié à un document ; vous validez avant envoi au maître d’ouvrage.',
  },
  {
    q: 'L’IA peut-elle relire les livrables de la maîtrise d’œuvre ?',
    a: 'Elle peut accélérer la lecture croisée de CCTP, notices et pièces graphiques pour repérer incohérences ou oublis apparents. La conformité technique, les prescriptions réglementaires et la validation contractuelle restent de la responsabilité du MOA et des acteurs habilités.',
  },
  {
    q: 'Quelle différence entre la formation IA AMO et la formation IA maîtrise d’œuvre ?',
    a: `La <a href="${LINKS.formationIaMaitriseOeuvre}">formation IA maîtrise d’œuvre</a> cible les missions MOE (CCTP, DPGF, DCE, CR, OS, réserves). Cette session AMO porte sur l’analyse des consultations, le rapport d’analyse des offres, le pilotage des intervenants et le reporting au maître d’ouvrage.`,
  },
  {
    q: 'Les données de mes opérations sont-elles en sécurité ?',
    a: `Oui, sous réserve d’anonymisation, de paramétrage des espaces professionnels et du respect des règles internes de votre maître d’ouvrage. Consultez notre guide sur la <a href="${LINKS.blogSecuriteDonneesChatgptBtp}">sécurité des données avec ChatGPT dans le BTP</a> avant tout dépôt de pièces sensibles.`,
  },
  {
    q: 'Faut-il déjà maîtriser ChatGPT ou Claude ?',
    a: `Une aisance numérique suffit pour démarrer ; un abonnement ChatGPT Plus ou Claude Pro actif sur chaque poste est nécessaire pour les ateliers (non inclus). Les bases peuvent être acquises via la <a href="${LINKS.formationIaBtpNiveau1BatimentTp}">formation IA BTP niveau 1</a>.`,
  },
  {
    q: 'Peut-on travailler sur des consultations confidentielles ?',
    a: 'Oui sous réserve d’anonymisation et du respect des règles internes et contractuelles de l’opération. La formation rappelle le périmètre des documents déposés dans les outils IA avant tout traitement.',
  },
  {
    q: 'Une prise en charge OPCO est-elle possible ?',
    a: `Prise en charge par votre OPCO selon éligibilité. ${FINANCEMENT_PRISE_EN_CHARGE_100_SELON_ELIGIBILITE}`,
  },
  {
    q: 'Où se déroule la formation ?',
    a: `${SITE_FORMATION_MODALITE_DETAIL} Zone : Île-de-France (Paris et départements 77, 78, 91, 92, 93, 94, 95).`,
  },
];
