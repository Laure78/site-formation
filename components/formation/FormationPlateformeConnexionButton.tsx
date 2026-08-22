import { LogIn } from 'lucide-react';
import { TEACHIZY_PATHS } from '@/lib/external-site-urls';

type FormationPlateformeConnexionButtonProps = {
  /** nav = header desktop ; navMobile = drawer ; outline = bouton secondaire ; primary = CTA plein */
  variant?: 'nav' | 'navMobile' | 'outline' | 'primary';
  label?: string;
  className?: string;
  onClick?: () => void;
};

const VARIANT_CLASSES: Record<
  NonNullable<FormationPlateformeConnexionButtonProps['variant']>,
  string
> = {
  nav:
    'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-slate-300 bg-white px-2.5 py-2 text-sm font-semibold text-slate-800 transition-colors hover:border-[#377CF3] hover:bg-[#EFF6FF] hover:text-[#377CF3] 2xl:px-3.5',
  navMobile:
    'inline-flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#377CF3] bg-white px-4 py-3.5 text-center text-[0.9375rem] font-semibold text-[#377CF3]',
  outline:
    'inline-flex items-center justify-center gap-2 rounded-lg border border-[#377CF3] bg-white px-6 py-3 text-sm font-semibold text-[#377CF3] transition-colors hover:bg-[#EFF6FF]',
  primary:
    'inline-flex items-center justify-center gap-2 rounded-lg bg-[#377CF3] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#2A6BD9]',
};

/** Lien Connexion — espace apprenant OFC (supports post-session). */
export function FormationPlateformeConnexionButton({
  variant = 'outline',
  label = 'Connexion',
  className = '',
  onClick,
}: FormationPlateformeConnexionButtonProps) {
  return (
    <a
      href={TEACHIZY_PATHS.login}
      title="Connexion à la plateforme de formation IA BTP — OFC Création d'Entreprise"
      aria-label={label}
      onClick={onClick}
      className={`${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      <LogIn className="h-4 w-4 shrink-0" strokeWidth={1.75} aria-hidden />
      <span className="hidden 2xl:inline">{label}</span>
    </a>
  );
}
