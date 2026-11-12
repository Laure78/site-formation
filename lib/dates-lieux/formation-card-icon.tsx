import type { LucideIcon } from 'lucide-react';
import {
  Bot,
  Brain,
  FileSearch,
  HardHat,
  Laptop,
  Scale,
  Sparkles,
} from 'lucide-react';

const BY_CODE_PREFIX: Record<string, LucideIcon> = {
  'NIV-01': Laptop,
  'NIV-02': FileSearch,
  'NIV-03': HardHat,
  'NIV-04': Brain,
  'NIV-05': Scale,
  'NIV-11': Scale,
  'NIV-09': Bot,
};

export function getDatesLieuxFormationIcon(code: string): LucideIcon {
  if (BY_CODE_PREFIX[code]) return BY_CODE_PREFIX[code];
  if (code.startsWith('NIV-1') && code !== 'NIV-10') return Laptop;
  return Sparkles;
}
