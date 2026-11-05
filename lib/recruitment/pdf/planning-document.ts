import PDFDocument from 'pdfkit';

type PdfDoc = InstanceType<typeof PDFDocument>;
import {
  formatRecruitmentFormations,
  RECRUITMENT_MODALITY,
  RECRUITMENT_STATUS,
  type RecruitmentStatus,
} from '@/lib/recruitment/constants';
import {
  formatSlotLabel,
  INTERVIEW_SLOT_TIMES,
  interviewAtToSlotTime,
  type InterviewSlotTime,
} from '@/lib/recruitment/interview-slots';
import { recruitmentPdfFooterLine } from '@/lib/recruitment/pdf-footer';
import type { RecruitmentCandidatRow } from '@/lib/recruitment/types';

const BLUE = '#377CF3';
const MARGIN = 48;

function anonymizedName(c: RecruitmentCandidatRow): string {
  const initial = c.last_name.trim().charAt(0).toUpperCase();
  return `${c.first_name.trim()} ${initial}.`;
}

function bufferFromDoc(doc: PdfDoc): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    doc.on('data', (chunk: Buffer) => chunks.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(chunks)));
    doc.on('error', reject);
    doc.end();
  });
}

export async function buildPlanningPdf(options: {
  dateYmd: string;
  variant: 'interne' | 'anonyme';
  candidats: RecruitmentCandidatRow[];
}): Promise<Buffer> {
  const { dateYmd, variant, candidats } = options;
  const bySlot = new Map<InterviewSlotTime, RecruitmentCandidatRow>();
  for (const c of candidats) {
    const t = interviewAtToSlotTime(c.interview_at);
    if (t) bySlot.set(t, c);
  }

  const doc = new PDFDocument({ size: 'A4', margin: MARGIN });
  const dateLabel = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'full',
    timeZone: 'Europe/Paris',
  }).format(new Date(`${dateYmd}T12:00:00+01:00`));

  doc.fillColor(BLUE).font('Helvetica-Bold').fontSize(14).text('Planning entretiens formateurs', MARGIN, MARGIN);
  doc.font('Helvetica').fontSize(10).fillColor('#475569').text(dateLabel, MARGIN, doc.y + 4);
  doc
    .fontSize(9)
    .text(
      variant === 'interne' ? 'Document interne — OFC' : 'Planning candidats — version anonymisée',
      MARGIN,
      doc.y + 4,
    );

  let y = doc.y + 16;
  const colW = 495;

  for (const slot of INTERVIEW_SLOT_TIMES) {
    const c = bySlot.get(slot);
    doc.fillColor('#0F172A').font('Helvetica-Bold').fontSize(11).text(`${formatSlotLabel(slot)}`, MARGIN, y);
    y = doc.y + 4;

    if (!c) {
      doc.font('Helvetica').fontSize(10).fillColor('#64748B').text('Créneau libre', MARGIN + 8, y);
      y = doc.y + 12;
      continue;
    }

    const statusLabel = RECRUITMENT_STATUS[c.status as RecruitmentStatus] ?? c.status;
    const modality =
      c.interview_modality != null ? RECRUITMENT_MODALITY[c.interview_modality] : '—';

    if (variant === 'anonyme') {
      doc
        .font('Helvetica')
        .fontSize(10)
        .fillColor('#0F172A')
        .text(`${anonymizedName(c)} — ${statusLabel} — ${modality}`, MARGIN + 8, y, { width: colW });
    } else {
      const lines = [
        `${c.first_name} ${c.last_name} — ${statusLabel}`,
        `Tél. ${c.phone ?? '—'} · ${c.email}`,
        modality,
        `Formations : ${formatRecruitmentFormations(c.formations)}`,
      ];
      if (c.interview_modality === 'visio_zoom') {
        lines.push(
          `Zoom : ${c.zoom_link ?? '—'} · ID ${c.zoom_id ?? '—'} · Code ${c.zoom_passcode ?? '—'}`,
        );
      }
      doc.font('Helvetica').fontSize(10).fillColor('#0F172A').text(lines.join('\n'), MARGIN + 8, y, {
        width: colW,
      });
    }
    y = doc.y + 14;
    if (y > 720) {
      doc.addPage();
      y = MARGIN;
    }
  }

  doc
    .fontSize(8)
    .fillColor('#64748B')
    .text(recruitmentPdfFooterLine(), MARGIN, 780, { width: colW, align: 'center' });

  return bufferFromDoc(doc);
}
