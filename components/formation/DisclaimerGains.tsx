import { QUALIOPI_DISCLAIMER_GAINS } from '@/config/qualiopi';

type DisclaimerGainsProps = {
  className?: string;
};

export function DisclaimerGains({ className = '' }: DisclaimerGainsProps) {
  return (
    <p className={`text-xs italic leading-relaxed text-slate-500 ${className}`}>
      {QUALIOPI_DISCLAIMER_GAINS}
    </p>
  );
}
