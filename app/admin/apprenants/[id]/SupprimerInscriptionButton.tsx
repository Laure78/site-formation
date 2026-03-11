'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { supprimerInscriptionAction } from '../actions';

interface Props {
  userId: string;
  courseId: string;
  courseTitle: string;
}

export function SupprimerInscriptionButton({ userId, courseId, courseTitle }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleDelete = async () => {
    if (!confirm) { setConfirm(true); return; }
    setLoading(true);
    try {
      await supprimerInscriptionAction(userId, courseId);
      router.refresh();
    } finally {
      setLoading(false);
      setConfirm(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-2 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
      title="Supprimer l'inscription à cette formation"
    >
      <Trash2 size={16} strokeWidth={1.5} />
      {loading ? 'Suppression...' : confirm ? `Confirmer suppression (${courseTitle}) ?` : 'Supprimer inscription'}
    </button>
  );
}
