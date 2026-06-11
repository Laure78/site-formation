import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import {
  A_PROPOS_PARTNERS_FACTUAL_SENTENCE,
  A_PROPOS_PARTNERS_GRID,
} from '@/lib/a-propos-partners-grid';
import { PHOTOS } from '@/lib/photos';
import { OFC_CARD, OFC_LINK } from '@/lib/ofc-interaction-classes';

export function PartnersGrid() {
  return (
    <section className="scroll-mt-24">
      <div className="mx-auto max-w-6xl rounded-2xl border border-[#E2E8F0] bg-white px-6 py-10 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">Ils m&apos;ont fait confiance</h2>
        <p className="mt-3 text-base text-[#64748B]">
          Fédérations professionnelles, organismes de formation et entreprises du BTP
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-[#475569]">
          {A_PROPOS_PARTNERS_FACTUAL_SENTENCE}
        </p>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {A_PROPOS_PARTNERS_GRID.map((partner) => (
            <li key={partner.name}>
              <ExternalLinkAnchor
                href={partner.href}
                title={`Site officiel ${partner.name}`}
                className={`${OFC_CARD} group flex h-full flex-col justify-between p-6`}
              >
                <div className="flex h-28 items-center justify-center">
                  <Image
                    src={partner.logo}
                    alt={partner.alt ?? `Logo ${partner.name}`}
                    width={200}
                    height={100}
                    className="max-h-20 w-auto object-contain grayscale transition group-hover:grayscale-0"
                    loading="lazy"
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-[15px] font-bold text-[#0F172A]">{partner.name}</p>
                  <p className="mt-1 text-xs text-[#64748B]">{partner.subtitle}</p>
                </div>
              </ExternalLinkAnchor>
            </li>
          ))}
        </ul>

        <article className="mt-12 rounded-3xl border border-[#D4E3FC] border-l-4 border-l-[#377CF3] bg-[#EFF6FF] p-8 shadow-[0_8px_30px_rgba(15,23,42,0.05)] md:p-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h3 className="font-display text-2xl font-bold text-[#0F172A]">Partenariat FFB Grand Paris</h3>
              <p className="mt-2 inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#377CF3]">
                Organisme de formation référencé
              </p>
              <p className="mt-4 text-[#334155]">
                Organisme de formation référencé par la Fédération Française du Bâtiment Grand Paris — formations
                adaptées aux réalités du secteur, avec financement facilité via Constructys pour les adhérents FFB
                selon dossier.
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'Programme IA orienté terrain BTP',
                  'Cas concrets devis et chantiers',
                  'Accompagnement dossier Constructys',
                  'Format inter ou intra entreprise',
                  'Sessions Qualiopi en présentiel',
                  'Suivi post-formation opérationnel',
                ].map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-[#334155]">
                    <span className="mt-0.5 rounded-full bg-[#DBEAFE] p-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#377CF3]" />
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <Link href={LINKS.etudesCas} className={`${OFC_LINK} mt-6 inline-block text-sm font-semibold`}>
                Étude de cas FFB &amp; CSFE →
              </Link>
            </div>
            <Image
              src={PHOTOS.rencontresArtisansIaFfbBtp.src}
              alt={PHOTOS.rencontresArtisansIaFfbBtp.alt}
              width={PHOTOS.rencontresArtisansIaFfbBtp.width}
              height={PHOTOS.rencontresArtisansIaFfbBtp.height}
              className="h-full w-full rounded-xl object-cover shadow-lg"
            />
          </div>
        </article>
      </div>
    </section>
  );
}
