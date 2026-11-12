import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { LINKS } from '@/lib/internal-links';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';
import { CtaDevis } from '@/components/CtaDevis';

export function DatesLieuxModalityCards() {
  return (
    <section
      className="mx-auto max-w-[80rem] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
      aria-labelledby="dates-lieux-modalites-h2"
    >
      <h2 id="dates-lieux-modalites-h2" className="sr-only">
        Modalités inter et intra
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/10] bg-slate-100">
            <Image
              src="/images/dates-lieux/formation-ia-btp-hero.webp"
              alt="Session inter-entreprises formation IA BTP en présentiel, participants autour d’un ordinateur"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40rem"
            />
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-bold text-[#101936]">Inter-entreprises</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Rejoignez une session avec des participants d&apos;autres entreprises du BTP. Dates publiées sur
              cette page lorsqu&apos;elles sont confirmées — petits groupes, exercices sur documents réels.
            </p>
            <Link
              href="#prochaines-sessions"
              className={`${OFC_CTA_PRIMARY} mt-5 inline-flex min-h-11 items-center gap-2 rounded-[8px] px-5 py-2.5 text-sm font-semibold`}
            >
              Consulter les sessions
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </article>

        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="relative aspect-[16/10] bg-slate-100">
            <Image
              src="/images/dates-lieux/formation-ia-btp-intra.webp"
              alt="Formation intra-entreprise IA BTP dans les locaux du client en Île-de-France"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 40rem"
            />
          </div>
          <div className="p-6">
            <h3 className="font-display text-xl font-bold text-[#101936]">Intra-entreprise</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Une formation sur mesure dans vos locaux, adaptée à vos métiers et à vos documents (devis, DCE,
              comptes rendus). Présentiel en Île-de-France uniquement.
            </p>
            <CtaDevis
              href={LINKS.contact}
              className={`${OFC_CTA_SECONDARY} mt-5 inline-flex min-h-11 items-center gap-2 rounded-[8px] border-2 border-[#377CF3] px-5 py-2.5 text-sm font-semibold text-[#377CF3]`}
            />
          </div>
        </article>
      </div>
    </section>
  );
}
