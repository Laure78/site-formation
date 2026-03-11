'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RotateCcw } from 'lucide-react';
import { resetProgressionAction } from '../actions';

interface Props {
  userId: string;
  courseId: string;
  courseTitle: string;
}

export function ResetProgressionButton({ userId, courseId, courseTitle }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleReset = async () => {
    if (!confirm) { setConfirm(true); return; }
    setLoading(true);
    try {
      await resetProgressionAction(userId, courseId);
      router.refresh();
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleReset}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-amber-200 px-3 py-2 text-sm font-medium text-amber-700 hover:bg-amber-50 disabled:opacity-50"
      title="Réinitialiser la progression pour cette formation"
    >
      <RotateCcw size={16} strokeWidth={1.5} />
      {loading ? 'En cours...' : confirm ? `Confirmer la réinitialisation (${courseTitle}) ?` : 'Réinitialiser progression'}
    </button>
  );
}
