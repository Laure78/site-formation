'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface BuyButtonProps {
  courseId: string;
  courseTitle: string;
  price: number;
}

export function BuyButton({ courseId, courseTitle, price }: BuyButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? 'Erreur');
      if (data.url) window.location.href = data.url;
      else throw new Error('Pas d\'URL de paiement');
    } catch (e) {
      alert(e instanceof Error ? e.message : 'Erreur lors du paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-70"
    >
      {loading ? 'Redirection...' : `Acheter — ${price.toFixed(2)} €`}
    </button>
  );
}
