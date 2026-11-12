import { CtaVisio } from '@/components/CtaVisio';

type Props = {
  title: string;
  description?: string;
  src?: string;
  className?: string;
};

/** Encart conversion bleu — visio découverte. */
export function CtaBox({
  title,
  description,
  src = 'blog-moe',
  className = '',
}: Props) {
  return (
    <aside
      className={`my-10 rounded-2xl bg-[#377CF3] px-6 py-8 text-white md:px-8 ${className}`}
      aria-labelledby="cta-box-title"
    >
      <p id="cta-box-title" className="font-display text-lg font-semibold md:text-xl">
        {title}
      </p>
      {description ? (
        <p className="mt-2 text-sm leading-relaxed text-white/90 md:text-base">{description}</p>
      ) : null}
      <div className="mt-5">
        <CtaVisio
          src={src}
          className="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-white px-6 py-3 text-base font-semibold text-[#377CF3] shadow-sm hover:bg-slate-50"
        />
      </div>
    </aside>
  );
}
