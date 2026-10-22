import type { MDXComponents } from 'mdx/types';
import { CitationSentence } from '@/components/seo/CitationSentence';
import { CTAInline } from '@/components/blog/CTAInline';
import { CharteIaBtpDownloadButton } from '@/components/blog/CharteIaBtpDownloadButton';
import { BlogEncadre } from '@/components/blog/BlogEncadre';
import { BlogTableWrap } from '@/components/blog/BlogTableWrap';
import { EnBref } from '@/app/components/EnBref';
import { CopiableCodeBlock } from '@/components/blog/CopiableCodeBlock';
import {
  SKILL_CHATGPT_EDITOR_EXAMPLE,
  SKILL_CR_PLOMBERIE_EXAMPLE,
} from '@/lib/blog-creer-skill-snippets';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';

const proseH2 =
  'font-display mt-10 scroll-mt-28 text-2xl font-bold tracking-tight text-slate-900 first:mt-0 md:text-3xl';
const proseH3 = 'font-display mt-8 scroll-mt-28 text-xl font-semibold text-slate-900 md:text-2xl';
const proseP =
  'mt-4 text-slate-700 leading-relaxed text-pretty sm:text-justify sm:hyphens-auto';
const proseA = OFC_LINK;
const proseUl = 'mt-4 list-disc space-y-2 pl-6 text-slate-700';
const proseOl = 'mt-4 list-decimal space-y-2 pl-6 text-slate-700';
const proseBlockquote =
  'my-6 border-l-4 border-slate-300 bg-slate-50 py-2 pl-4 text-slate-700 italic';

/**
 * Composants MDX — passés à `compileMDX` (next-mdx-remote RSC).
 * Les `#` MDX ne doivent jamais produire un 2ᵉ H1 (le hero article l’émet déjà) :
 * on rétrograde en H2 visuel.
 */
export function getBlogMdxComponents(): MDXComponents {
  return {
    h1: ({ className, ...props }) => <h2 className={proseH2} {...props} />,
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
    CharteIaBtpDownloadButton,
    BlogEncadre,
    BlogTableWrap,
    EnBref,
    CopiableCodeBlock,
    SkillCrPlomberieCopiable: () => (
      <CopiableCodeBlock
        title="SKILL.md — extraction lot plomberie (données fictives)"
        text={SKILL_CR_PLOMBERIE_EXAMPLE}
      />
    ),
    SkillRedactionCrCopiable: () => (
      <CopiableCodeBlock
        title="SKILL.md — rédaction CR chantier (exemple ChatGPT)"
        text={SKILL_CHATGPT_EDITOR_EXAMPLE}
      />
    ),
    table: (props) => (
      <div className="my-6 overflow-x-auto rounded-xl border border-slate-200">
        <table className="min-w-[640px] w-full text-left text-sm text-slate-700" {...props} />
      </div>
    ),
    thead: (props) => <thead className="bg-slate-50 text-slate-800" {...props} />,
    th: (props) => <th className="px-3 py-2 font-semibold md:px-4 md:py-3" {...props} />,
    td: (props) => <td className="border-t border-slate-100 px-3 py-2 md:px-4 md:py-3" {...props} />,
  };
}
