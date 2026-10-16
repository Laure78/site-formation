import Image from 'next/image';
import type { FormateurPortrait as Portrait } from '@/lib/formateurs/types';
import { cn } from '@/lib/cn';

type Props = {
  portrait: Portrait;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  /** Photo type identité 7:9 — page hub formateurs. */
  shape?: 'circle' | 'portrait';
  priority?: boolean;
};

const CIRCLE_SIZE = {
  sm: 'h-16 w-16 text-lg',
  md: 'h-24 w-24 text-2xl',
  lg: 'h-28 w-28 text-3xl md:h-32 md:w-32',
} as const;

const PORTRAIT_SIZE =
  'w-[110px] shrink-0 aspect-[7/9] text-xl sm:w-[130px] sm:text-2xl';

/**
 * Portrait photo ou avatar initiales.
 * `portrait` : cadrage 7:9, coins arrondis (hub /formateurs).
 */
export function FormateurPortraitView({
  portrait,
  className = '',
  size = 'md',
  shape = 'circle',
  priority = false,
}: Props) {
  const isPortraitShape = shape === 'portrait';
  const box = isPortraitShape ? PORTRAIT_SIZE : CIRCLE_SIZE[size];
  const radius = isPortraitShape ? 'rounded-lg' : 'rounded-full';

  if (portrait.kind === 'photo') {
    return (
      <div
        className={cn(
          'relative overflow-hidden bg-ofc-accent-soft ring-1 ring-ofc-border',
          radius,
          box,
          className,
        )}
      >
        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          className="h-full w-full object-cover"
          style={
            portrait.objectPosition
              ? { objectPosition: portrait.objectPosition }
              : undefined
          }
          sizes={isPortraitShape ? '(max-width: 640px) 110px, 130px' : size === 'lg' ? '128px' : size === 'md' ? '96px' : '64px'}
          loading={priority ? undefined : 'lazy'}
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center bg-ofc-accent-soft font-display font-bold text-ofc-accent ring-1 ring-ofc-border',
        radius,
        box,
        className,
      )}
      role="img"
      aria-label={portrait.label}
    >
      <span aria-hidden>{portrait.initials}</span>
    </div>
  );
}
