import {
  googleStatusLabel,
  googleStatusTone,
  questionnaireStatusLabel,
  questionnaireStatusTone,
} from '@/lib/training-ops/satisfaction/labels';
import type { GoogleStatus, QuestionnaireStatus } from '@/lib/training-ops/satisfaction/types';

const TONE_CLASS: Record<string, string> = {
  slate: 'bg-slate-100 text-slate-700',
  blue: 'bg-blue-100 text-blue-800',
  amber: 'bg-amber-100 text-amber-900',
  emerald: 'bg-emerald-100 text-emerald-800',
  red: 'bg-red-100 text-red-800',
  violet: 'bg-violet-100 text-violet-800',
};

export function QuestionnaireStatusBadge({ status }: { status: QuestionnaireStatus }) {
  const tone = questionnaireStatusTone(status);
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONE_CLASS[tone]}`}
    >
      {questionnaireStatusLabel(status)}
    </span>
  );
}

export function GoogleStatusBadge({ status }: { status: GoogleStatus }) {
  const tone = googleStatusTone(status);
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${TONE_CLASS[tone]}`}
    >
      {googleStatusLabel(status)}
    </span>
  );
}
