/** Format nombre FR — espace milliers, virgule décimale (ex. 1 592 · 4,85). */
export function formatNumberFr(value: number, decimals = 0): string {
  return value.toLocaleString('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function formatCountUpDisplay(
  to: number,
  options?: {
    decimals?: number;
    prefix?: string;
    suffix?: string;
  }
): string {
  const { decimals = 0, prefix = '', suffix = '' } = options ?? {};
  return `${prefix}${formatNumberFr(to, decimals)}${suffix}`;
}
