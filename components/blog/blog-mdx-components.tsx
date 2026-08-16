import type { MDXComponents } from 'mdx/types';
import { CitationSentence } from '@/components/seo/CitationSentence';
import { CTAInline } from '@/components/blog/CTAInline';
import { EnBref } from '@/app/components/EnBref';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

const proseH2 =
  'font-display mt-10 scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 first:mt-0 md:text-3xl';
const proseH3 = 'font-display mt-8 scroll-mt-28 text-xl font-semibold text-slate-900 md:text-2xl';
const proseP = 'mt-4 text-slate-700 leading-relaxed';
const proseA = OFC_LINK;
const proseUl = 'mt-4 list-disc space-y-2 pl-6 text-slate-700';
const proseOl = 'mt-4 list-decimal space-y-2 pl-6 text-slate-700';
const proseBlockquote =
  'my-6 border-l-4 border-slate-300 bg-slate-50 py-2 pl-4 text-slate-700 italic';

/**
 * Composants MDX — passés à `compileMDX` (next-mdx-remote RSC).
 */
export function getBlogMdxComponents(): MDXComponents {
  return {
    h1: (props) => <h1 className="sr-only" {...props} />,
    h2: ({ className, ...props }) => <h2 className={proseH2} {...props} />,
    h3: ({ className, ...props }) => <h3 className={proseH3} {...props} />,
    p: ({ className, ...props }) => <p className={proseP} {...props} />,
    a: ({ href, className, ...props }) => {
      const ext = typeof href === 'string' && href.startsWith('http');
      return (
        <a
          href={href}
          className={proseA}
          {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          {...props}
        />
      );
    },
    ul: (props) => <ul className={proseUl} {...props} />,
    ol: (props) => <ol className={proseOl} {...props} />,
    li: (props) => <li className="leading-relaxed" {...props} />,
    blockquote: (props) => <blockquote className={proseBlockquote} {...props} />,
    strong: (props) => <strong className="font-semibold text-slate-900" {...props} />,
    hr: () => <hr className="my-10 border-slate-200" />,
    img: ({ src, alt, ...rest }) =>
      typeof src === 'string' ? (
        // eslint-disable-next-line @next/next/no-img-element -- contenu MDX (URLs locales ou distantes)
        <img
          src={src}
          alt={alt ?? ''}
          className="my-6 w-full rounded-xl border border-slate-200 object-cover"
          loading="lazy"
          {...rest}
        />
      ) : null,
    CitationSentence,
    CTAInline,
    EnBref,
  };
}
