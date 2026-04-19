import Link from 'next/link';
import { calendlyClaudeBtpGuideUrl } from '@/lib/calendly';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import { LINKS } from '@/lib/internal-links';

/**
 * Bloc conversion fin de page — CTA Calendly avec UTM bottom-cta (texte inchangé).
 */
export function ClaudeBtpConversionCta() {
  return (
    <section
      className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#1E40AF] via-[#377CF3] to-[#2563EB] px-6 py-16 text-white md:px-10 md:py-20"
      aria-labelledby="formation-ofc"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,rgba(255,255,255,0.4)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.4)_1px,transparent_1px)] [background-size:28px_28px]"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <h2 id="formation-ofc" className="font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-[40px]">
            Formation Claude AI avec OFC
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/90 md:text-base">
            4 h — Qualiopi — finançable Constructys. Chat, Projets, Cowork, Code, Chrome : présentiel en Île-de-France ou
            distanciel.
          </p>
          <ul className="mt-6 grid gap-2 text-sm text-white/85 sm:grid-cols-2">
            <li>• Jusqu&apos;à 24 € HT/h/stagiaire (plafonds Constructys)</li>
            <li>• Entreprises &lt; 11 sal. : prise en charge salaires (15 € HT/h)</li>
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-white/70">
            {`FFB Grand Paris, FFB IDF, CSFE, CNAM, Lefebvre Dalloz · +${formatProfessionalsTrainedCount()} formés · ${SOCIAL_PROOF.AVERAGE_RATING}`}
          </p>
        </div>

        <div className="flex flex-col justify-center rounded-3xl border border-white/25 bg-white p-8 text-[#0F172A] shadow-2xl">
          <div className="flex flex-col gap-4">
            <a
              href={calendlyClaudeBtpGuideUrl('bottom-cta')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl border-2 border-[#1E40AF] bg-[#EFF6FF] px-8 py-4 text-center text-base font-semibold text-[#1E40AF] shadow-lg transition hover:scale-[1.02] hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1E40AF]"
            >
              Prendre rendez-vous
            </a>
            <Link
              href={LINKS.contact}
              className="inline-flex items-center justify-center rounded-2xl border-2 border-[#377CF3] bg-transparent px-8 py-4 text-center text-base font-semibold text-[#377CF3] transition hover:bg-[#EFF6FF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#377CF3]"
            >
              Contact formation IA BTP
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
