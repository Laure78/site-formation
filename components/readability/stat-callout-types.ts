export type StatCountUpValue = {
  to: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
};

export function isStatCountUpValue(value: unknown): value is StatCountUpValue {
  return typeof value === 'object' && value !== null && 'to' in value && typeof (value as StatCountUpValue).to === 'number';
}
