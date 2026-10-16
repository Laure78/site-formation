/**
 * Génère public/ressources/modele-charte-ia-entreprise-btp.doc
 * (docx via npm `docx`, conversion .doc via macOS textutil).
 */
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import {
  AlignmentType,
  Document,
  Footer,
  Header,
  HeadingLevel,
  PageBreak,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';

const OUT_DIR = path.join(process.cwd(), 'public', 'ressources');
const DOCX_TMP = path.join(OUT_DIR, 'modele-charte-ia-entreprise-btp.docx');
const DOC_OUT = path.join(OUT_DIR, 'modele-charte-ia-entreprise-btp.doc');
const BLUE = '377CF3';
const GRAY = 'F2F2F2';

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 160, before: opts.before ?? 0 },
    alignment: opts.align,
    children: [
      new TextRun({
        text,
        bold: opts.bold,
        size: opts.size ?? 22,
        color: opts.color,
      }),
    ],
  });
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { after: 200, before: 240 },
    children: [new TextRun({ text, bold: true, size: 32, color: BLUE })],
  });
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { after: 160, before: 200 },
    children: [new TextRun({ text, bold: true, size: 26, color: '1A1A1A' })],
  });
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22 })],
  });
}

function cell(text, header = false) {
  return new TableCell({
    shading: header
      ? { fill: GRAY, type: ShadingType.CLEAR, color: 'auto' }
      : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text, bold: header, size: 20 })] })],
  });
}

function tableRow(cells, header = false) {
  return new TableRow({
    children: cells.map((c) => cell(c, header)),
  });
}

const doc = new Document({
  styles: {
    default: {
      document: {
        run: { font: 'Arial', size: 22 },
      },
    },
  },
  sections: [
    {
      properties: {},
      headers: {
        default: new Header({
          children: [
            p('OFC Création d\'Entreprise — Modèle charte IA BTP', { size: 18, color: '666666' }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            p(
              'Modèle indicatif — à adapter. Sources vérifiées le 16/10/2026 (CNIL, RGPD, règlement UE 2024/1689).',
              { size: 16, color: '888888', align: AlignmentType.CENTER },
            ),
          ],
        }),
      },
      children: [
        h1('Charte d\'utilisation de l\'intelligence artificielle — Entreprise BTP'),
        p('Entreprise : [ENTREPRISE]'),
        p('Responsable IA / direction : [RESPONSABLE IA]'),
        p('Contact interne (questions charte) : [CONTACT INTERNE]'),
        p('Version : [VERSION] — Date d\'entrée en vigueur : [DATE D\'ENTRÉE EN VIGUEUR]'),
        p('Prochaine révision prévue : [DATE DE RÉVISION]'),
        p(
          'Ce modèle doit être adapté aux usages, contrats et obligations de l\'entreprise. Il ne constitue pas une garantie de conformité juridique.',
          { bold: true },
        ),

        h2('1. Objet et périmètre'),
        p(
          'La présente charte fixe les règles d\'utilisation des outils d\'intelligence artificielle (IA) au sein de [ENTREPRISE], entreprise du bâtiment et/ou des travaux publics. Elle s\'applique à toute personne accédant aux outils autorisés pour des activités professionnelles.',
        ),
        p('Elle complète les obligations légales (RGPD, secret des affaires, clauses contractuelles) sans s\'y substituer.'),

        h2('2. Personnes concernées'),
        bullet('Dirigeants, associés et cadres.'),
        bullet('Conducteurs de travaux, chefs de chantier, chargés d\'affaires.'),
        bullet('Fonctions support : administration, RH, QSE, achats, études.'),
        bullet('Toute personne utilisant un compte ou un accès IA mis à disposition par l\'entreprise.'),

        h2('3. Responsabilités'),
        p('[RESPONSABLE IA] ou la direction valide la liste des outils autorisés, les paramètres et les mises à jour de la charte.'),
        p('Chaque collaborateur respecte les usages autorisés, signale les incidents et contrôle les contenus avant diffusion.'),
        p('Les managers vérifient que les équipes ont pris connaissance de la charte et appliquent les contrôles définis ci-dessous.'),

        h2('4. Outils et comptes autorisés'),
        p('Seuls les outils et offres listés ci-dessous sont autorisés pour un usage professionnel :'),
        p('[OUTILS ET OFFRES AUTORISÉS]'),
        p(
          'L\'utilisation de comptes personnels et de comptes gratuits non validés par l\'entreprise est interdite pour le traitement de documents ou de données professionnels. Les collaborateurs utilisent uniquement les outils, comptes et usages autorisés.',
          { bold: true },
        ),
        p(
          'Cette interdiction relève d\'un choix d\'organisation interne. Elle vise à garantir des conditions contractuelles connues, une gestion des accès et une traçabilité.',
        ),

        h2('5. Gestion des accès et départs'),
        bullet('Création des accès : sur demande validée, compte nominatif ou compte métier selon l\'outil.'),
        bullet('Formation : prise de connaissance de la charte avant premier usage sur données réelles.'),
        bullet('Départ ou changement de poste : désactivation des accès IA dans les mêmes délais que les autres outils métier.'),
        bullet('Mots de passe et clés API : stockage sécurisé, pas de partage non contrôlé.'),

        h2('6. Usages autorisés'),
        p('[USAGES AUTORISÉS]'),
        bullet('Reformulation de textes à partir d\'éléments non sensibles ou anonymisés.'),
        bullet('Structuration de comptes rendus, courriers ou listes à partir d\'informations fournies par l\'entreprise.'),
        bullet('Aide à la relecture (clarté, orthographe) sans modifier le fond technique validé.'),
        bullet('Préparation de brouillons soumis à validation humaine avant envoi ou signature.'),

        h2('7. Usages nécessitant une validation préalable'),
        bullet('Transmission de pièces de marché (DCE, CCTP, CCAP) contenant des données identifiantes ou confidentielles.'),
        bullet('Traitement de devis, bordereaux de prix ou grilles de marge.'),
        bullet('Documents RH, médicaux ou disciplinaires.'),
        bullet('Automatisations (connecteurs, scripts) accédant à des dossiers partagés ou messagerie.'),

        h2('8. Usages interdits'),
        bullet('Saisie de mots de passe, codes d\'accès chantier ou secrets d\'authentification.'),
        bullet('Envoi de données personnelles non nécessaires ou non anonymisées sans base et sans cadre validé.'),
        bullet('Diffusion externe d\'un contenu généré par IA sans relecture et sans mention des limites le cas échéant.'),
        bullet('Contournement de la charte via comptes personnels pour contourner les interdictions internes.'),
        bullet('Décisions automatiques engageant l\'entreprise (prix, sécurité, engagement contractuel) sans contrôle humain compétent.'),

        h2('9. Confidentialité et données personnelles'),
        p(
          'L\'entreprise reste responsable de traitement pour les données personnelles traitées dans le cadre de son activité. Toute utilisation d\'IA impliquant des données personnelles doit respecter le RGPD : finalité, minimisation, sécurité, information des personnes, contrats avec les sous-traitants le cas échéant.',
        ),
        p('Masquer un nom dans un document ne suffit pas toujours à anonymiser un dossier (contexte, montants, adresse, photos).'),
        bullet('Données commerciales sensibles : prix, marges, conditions fournisseurs, offres en cours.'),
        bullet('Données clients, salariés, sous-traitants et candidats.'),
        bullet('Photos de chantier avec personnes identifiables.'),

        h2('10. Contrôle des productions'),
        p('Toute sortie IA est un brouillon tant qu\'une personne compétente ne l\'a pas validée.'),
        p('Pour les devis et chiffrages : vérifier quantités, unités, prix, exclusions, délais et engagements.'),
        p('Pour les documents techniques et de sécurité (PPSPS, modes opératoires, notices) : validation par le profil compétent (QSE, encadrement, bureau d\'études).'),

        h2('11. Connecteurs, partage et automatisations'),
        bullet('Avant d\'activer un connecteur (Drive, messagerie, ERP), vérifier périmètre, droits et journalisation.'),
        bullet('Interdire les partages publics ou liens ouverts sans mot de passe sur des documents professionnels.'),
        bullet('Documenter les automatisations : déclencheur, données lues, destination, responsable.'),

        h2('12. Signalement d\'une erreur ou d\'une divulgation'),
        p(
          'En cas d\'erreur grave, de fuite de données ou de doute sur un traitement : contacter immédiatement [CONTACT INTERNE] et [RESPONSABLE IA].',
        ),
        p(
          'Le signalement interne permet de contenir l\'incident et d\'adapter les mesures. Il ne se confond pas avec une notification à la CNIL ou aux personnes concernées, qui relève de procédures distinctes selon la gravité et la nature des données.',
        ),

        h2('13. Sensibilisation'),
        p('L\'entreprise organise une sensibilisation à la charte à l\'embauche et lors des mises à jour majeures.'),
        p('Les rappels peuvent s\'appuyer sur la formation interne ou des sessions externes (ex. formation IA BTP en présentiel).'),

        h2('14. Mise à jour de la charte'),
        p('La charte est révisée au moins à chaque changement d\'outil majeur ou [DATE DE RÉVISION].'),
        p('Version archivée et historique des modifications conservés par [RESPONSABLE IA].'),

        h2('15. Prise de connaissance'),
        p(
          'Je déclare avoir reçu la charte, en comprendre les règles essentielles et m\'engager à les appliquer ou à demander conseil en cas de doute.',
        ),
        p('Nom : _________________________   Fonction : _________________________'),
        p('Date : _________________________   Signature : _________________________'),

        new Paragraph({ children: [new PageBreak()] }),

        h2('Annexe 1 — Tableau des outils, responsables et usages'),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            tableRow(['Outil / offre', 'Responsable', 'Usages autorisés', 'Remarques'], true),
            tableRow(['[Ex. ChatGPT Team]', '[Nom]', '[Reformulation, CR]', '[DPA / admin]']),
            tableRow(['[Ex. Claude for Work]', '[Nom]', '[Synthèse CCTP]', '[Compte entreprise]']),
            tableRow(['', '', '', '']),
          ],
        }),

        h2('Annexe 2 — Checklist avant transmission d\'un document à une IA'),
        bullet('Le document est-il nécessaire à la tâche (minimisation) ?'),
        bullet('Peut-on anonymiser ou remplacer par un extrait fictif ?'),
        bullet('L\'outil et le compte sont-ils autorisés par la charte ?'),
        bullet('Les clauses de confidentialité du marché / client le permettent-elles ?'),
        bullet('Une personne compétente validera-t-elle la sortie avant usage ?'),

        h2('Annexe 3 — Checklist avant diffusion d\'un contenu produit avec une IA'),
        bullet('Relecture complète par une personne compétente.'),
        bullet('Chiffres, unités, dates et noms vérifiés à la source.'),
        bullet('Pas de données personnelles ou secrets d\'affaires superflus.'),
        bullet('Ton et engagements conformes à la politique de l\'entreprise.'),
        bullet('Archivage de la version validée (PDF / GED).'),

        new Paragraph({ children: [new PageBreak()] }),

        h2('Sources officielles (vérification 16/10/2026)'),
        bullet('CNIL — Questions-réponses IA générative : https://www.cnil.fr/fr/les-questions-reponses-de-la-cnil-sur-lutilisation-dun-systeme-dia-generative'),
        bullet('CNIL — Intelligence artificielle : https://www.cnil.fr/fr/technologies/intelligence-artificielle-ia'),
        bullet('RGPD — Règlement (UE) 2016/679 : https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=fr'),
        bullet('Règlement européen sur l\'IA — (UE) 2024/1689 : https://eur-lex.europa.eu/eli/reg/2024/1689/oj?locale=fr'),
        bullet('Commission européenne — Maîtrise de l\'IA (FAQ) : https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers'),
        p('OFC Création d\'Entreprise — SIRET 905 244 281 00010 — contact@laureolivie.fr — www.laureolivie.fr'),
      ],
    },
  ],
});

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(DOCX_TMP, buffer);

  try {
    execSync(`textutil -convert doc "${DOCX_TMP}" -output "${DOC_OUT}"`, { stdio: 'inherit' });
  } catch (e) {
    console.error(
      '[charte-ia-doc] Échec conversion textutil. Fichier docx généré :',
      DOCX_TMP,
    );
    process.exit(1);
  }

  if (!fs.existsSync(DOC_OUT) || fs.statSync(DOC_OUT).size < 5000) {
    console.error('[charte-ia-doc] Fichier .doc absent ou trop petit.');
    process.exit(1);
  }

  try {
    fs.unlinkSync(DOCX_TMP);
  } catch {
    /* docx intermédiaire optionnel */
  }

  console.log('[charte-ia-doc] OK →', DOC_OUT, `(${fs.statSync(DOC_OUT).size} octets)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
