import raw from '@/data/barometre-2026.json';
import type { Barometre2026Data } from '@/lib/barometre-2026-types';

export const BAROMETRE_IA_BTP_IDF_PATH = '/barometre-ia-btp-ile-de-france' as const;

const data = raw as Barometre2026Data;

export function getBarometre2026(): Barometre2026Data {
  return data;
}

export function barometreRowPercent(row: { count: number; n: number }): number {
  if (!row.n) return 0;
  return Math.round((row.count / row.n) * 100);
}
