import PDFDocument from 'pdfkit';

type PdfDoc = InstanceType<typeof PDFDocument>;
import {
  EVALUATION_CRITERIA_ETAPE_1,
  EVALUATION_CRITERIA_ETAPE_2,
  EVALUATION_DECISIONS_ETAPE_1,
  EVALUATION_DECISIONS_ETAPE_2,
  EVALUATION_MAX_ETAPE_1,
  EVALUATION_MAX_ETAPE_2,
  scoreLabel,
  sumEvaluationScores,
} from '@/lib/recruitment/evaluation-criteria';
import { recruitmentPdfFooterLine } from '@/lib/recruitment/pdf-footer';
import type { RecruitmentCandidatRow, RecruitmentEvaluationRow } from '@/lib/recruitment/types';

const BLUE = '#377CF3';
const MARGIN = 48;

function bufferFromDoc(doc: PdfDoc): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    doc.end();
  });
}

export async function buildEvaluationPdf(options: {
  candidat: RecruitmentCandidatRow;
  evaluation: RecruitmentEvaluationRow;
  stage: 1 | 2;
}): Promise<Buffer> {
  const { candidat, evaluation, stage } = options;
  const criteria = stage === 1 ? EVALUATION_CRITERIA_ETAPE_1 : EVALUATION_CRITERIA_ETAPE_2;
  const max = stage === 1 ? EVALUATION_MAX_ETAPE_1 : EVALUATION_MAX_ETAPE_2;
  const scores = (evaluation.scores ?? {}) as Record<string, number>;
  const total = sumEvaluationScores(scores, criteria);

  const doc = new PDFDocument({ size: 'A4', margin: MARGIN });
  doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(14).text(`Grille d’évaluation — étape ${stage}`, MARGIN, MARGIN);
  doc
    .font('Helvetica')
    .fontSize(10)
    .fillColor('#475569')
    .text(`${candidat.first_name} ${candidat.last_name}`, MARGIN, doc.y + 4);

  let y = doc.y + 16;
  let currentGroup = '';

  for (const { group, key, label } of criteria) {
    if (group !== currentGroup) {
      currentGroup = group;
      doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(11).text(group, MARGIN, y);
      y = doc.y + 6;
    }
    const n = scores[key];
    const line =
      typeof n === 'number'
        ? `${label} : ${n}/4 (${scoreLabel(n)})`
        : `${label} : —`;
    doc.fillColor('#0F172A').font('Helvetica').fontSize(10).text(line, MARGIN + 8, y);
    y = doc.y + 4;
  }

  y += 8;
  doc.font('Helvetica-Bold').text(`Total : ${total} / ${max}`, MARGIN, y);
  y = doc.y + 12;

  if (stage === 2 && evaluation.cas_pratique_subject) {
    doc.font('Helvetica-Bold').text('Sujet du cas pratique', MARGIN, y);
    y = doc.y + 4;
    doc.font('Helvetica').text(evaluation.cas_pratique_subject, MARGIN, y, { width: 495 });
    y = doc.y + 12;
  }

  const blocks: [string, string | null | undefined][] = [
    ['Points forts', evaluation.strengths],
    ['Points de vigilance', evaluation.vigilance],
  ];
  for (const [title, text] of blocks) {
    doc.font('Helvetica-Bold').text(title, MARGIN, y);
    y = doc.y + 4;
    doc.font('Helvetica').text(text?.trim() || '—', MARGIN, y, { width: 495 });
    y = doc.y + 10;
  }

  const decisionMap =
    stage === 1 ? EVALUATION_DECISIONS_ETAPE_1 : EVALUATION_DECISIONS_ETAPE_2;
  const decisionLabel =
    evaluation.decision && evaluation.decision in decisionMap
      ? decisionMap[evaluation.decision as keyof typeof decisionMap]
      : evaluation.decision ?? '—';

  doc.font('Helvetica-Bold').text(`Décision : ${decisionLabel}`, MARGIN, y);

  doc
    .fontSize(8)
    .fillColor('#64748B')
    .text(recruitmentPdfFooterLine(), MARGIN, 780, { width: 495, align: 'center' });

  return bufferFromDoc(doc);
}
