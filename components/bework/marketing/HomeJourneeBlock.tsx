'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  BEWORK_JOUR1_EYEBROW,
  BEWORK_JOUR1_LEAD,
  BEWORK_JOURNEE_PRATIQUE,
  type BeworkJourneePratiqueTone,
} from '@/lib/bework-formation-marketing';
import { BEWORK_JOUR1_SECTION_PHOTO } from '@/lib/bework-photos';
import { cn } from '@/lib/cn';
import styles from './HomeJourneeBlock.module.css';

const TONE_CLASS: Record<BeworkJourneePratiqueTone, string> = {
  blue: styles.iconBlue,
  violet: styles.iconViolet,
  peach: styles.iconPeach,
  mint: styles.iconMint,
};

const BENEFIT_ICONS: Record<BeworkJourneePratiqueTone, ReactNode> = {
  blue: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    />
  ),
  violet: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  ),
  peach: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  mint: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.75}
      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
    />
  ),
};

export type HomeJourneeBlockProps = {
  /** Lien page formation (bework.fr : `/formation`). */
  formationHref: string;
  /** Lien démonstrations (bework.fr : `/demonstrations`). */
  demonstrationsHref: string;
  /** Liens externes (aperçu depuis laureolivie.fr). */
  externalLinks?: boolean;
};

function CtaLink({
  href,
  className,
  children,
  external,
}: {
  href: string;
  className: string;
  children: ReactNode;
  external?: boolean;
}) {
  if (external) {
    return (
      <ExternalLinkAnchor href={href} className={className}>
        {children}
      </ExternalLinkAnchor>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

/** Section accueil BeWork — Jour 1 en pratique (à reporter sur bework.fr). */
export function HomeJourneeBlock({
  formationHref,
  demonstrationsHref,
  externalLinks = false,
}: HomeJourneeBlockProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [isIn, setIsIn] = useState(false);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) setIsIn(true);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const photo = BEWORK_JOUR1_SECTION_PHOTO;

  return (
    <section
      ref={rootRef}
      id="journee"
      className={cn(styles.scene, isIn && styles.isIn)}
      aria-labelledby="journee-home-heading"
    >
      <div className={cn(styles.halo, styles.haloBlue)} aria-hidden />
      <div className={cn(styles.halo, styles.haloViolet)} aria-hidden />
      <div className={cn(styles.halo, styles.haloPeach)} aria-hidden />
      <svg className={styles.curve} viewBox="0 0 1200 420" fill="none" aria-hidden>
        <path
          d="M40 280C220 120 420 60 620 90C860 130 980 240 1160 170"
          stroke="currentColor"
          strokeWidth="56"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>

      <div className={styles.shell}>
        <div className={styles.panel}>
          <div className={styles.note} aria-hidden>
            <p className={styles.noteText}>Des idées aux projets.</p>
            <svg className={styles.noteSvg} viewBox="0 0 44 22" fill="none">
              <path
                d="M4 6c10 2 20 8 32 12"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
              <path
                d="M30 14l6 4-2 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className={styles.visual}>
            <div className={styles.photoFrame}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className={styles.photo}
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
              <span className={styles.capsule}>{BEWORK_JOUR1_EYEBROW}</span>
            </div>
          </div>

          <div className={styles.content}>
            <h2 id="journee-home-heading" className={styles.title}>
              <span className={styles.titleLine}>Pas une journée à écouter.</span>
              <span className={cn(styles.titleLine, styles.titleAccent)}>Une journée à créer.</span>
            </h2>
            <p className={styles.lead}>{BEWORK_JOUR1_LEAD}</p>

            <ul className={styles.benefits}>
              {BEWORK_JOURNEE_PRATIQUE.map((item) => (
                <li key={item.title} className={styles.benefit}>
                  <span className={cn(styles.benefitIcon, TONE_CLASS[item.tone])} aria-hidden>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {BENEFIT_ICONS[item.tone]}
                    </svg>
                  </span>
                  <div>
                    <p className={styles.benefitTitle}>{item.title}</p>
                    <p className={styles.benefitDesc}>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className={styles.ctas}>
              <CtaLink
                href={formationHref}
                external={externalLinks}
                className={styles.btnPrimary}
              >
                Découvrir la formation
                <span aria-hidden>→</span>
              </CtaLink>
              <CtaLink
                href={demonstrationsHref}
                external={externalLinks}
                className={styles.btnSecondary}
              >
                Voir les démonstrations
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
