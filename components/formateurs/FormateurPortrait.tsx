import Image from 'next/image';
import type { FormateurPortrait as Portrait } from '@/lib/formateurs/types';

type Props = {
  portrait: Portrait;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const SIZE_CLASS = {
  sm: 'h-16 w-16 text-lg',
  md: 'h-24 w-24 text-2xl',
  lg: 'h-28 w-28 text-3xl md:h-32 md:w-32',
} as const;

/**
 * Portrait photo ou avatar initiales (slot remplaçable par un portrait autorisé).
 * Cadrage circulaire homogène.
 */
export function FormateurPortraitView({
  portrait,
  className = '',
  size = 'md',
}: Props) {
  const box = SIZE_CLASS[size];

  if (portrait.kind === 'photo') {
    return (
      <div
        className={`relative shrink-0 overflow-hidden rounded-full bg-ofc-accent-soft ring-1 ring-ofc-border ${box} ${className}`}
      >
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          className="h-full w-full object-cover"
          sizes={size === 'lg' ? '128px' : size === 'md' ? '96px' : '64px'}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-ofc-accent-soft font-display font-bold text-ofc-accent ring-1 ring-ofc-border ${box} ${className}`}
      role="img"
      aria-label={portrait.label}
    >
      <span aria-hidden>{portrait.initials}</span>
    </div>
  );
}
