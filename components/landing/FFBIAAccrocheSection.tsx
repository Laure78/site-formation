import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';
import { ALT_LOGO_CSFE, ALT_LOGO_FFB_OFFICIEL } from '@/lib/client-logos';

/**
 * Aligné campagne FFB terrain : citation + visuel affiche + logos réseau (FFB / CSFE).
 */
export function FFBIAAccrocheSection() {
  return (
    <section
      className="border-b border-slate-200 bg-white px-4 py-16 md:py-20"
      aria-labelledby="ffb-ia-accroche-titre"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div className="mx-auto w-full max-w-[min(100%,640px)] lg:mx-0">
            <div className="flex aspect-video w-full items-center justify-center gap-8 overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.22)]">
              <div className="relative h-20 w-full max-w-[240px]">
                <Image
                  src="/images/partenaires/ffb-logo-officiel.png"
                  alt={ALT_LOGO_FFB_OFFICIEL}
                  title="Fédération Française du Bâtiment — partenaire formations terrain"
                  fill
                  className="object-contain object-center"
                  sizes="240px"
                />
              </div>
              <div className="relative h-20 w-full max-w-[240px]">
                <Image
                  src="/images/partenaires/csfe-logo.png"
                  alt={ALT_LOGO_CSFE}
                  title="CSFE — filière étanchéité et bâtiment"
                  fill
                  className="object-contain object-center"
                  sizes="240px"
                />
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-slate-500 lg:text-left">
              Logos partenaires FFB &amp; CSFE — filière bâtiment et étanchéité
            </p>
          </div>

          <div>
            <h3
              id="ffb-ia-accroche-titre"
              className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
            >
              Intelligence artificielle,{' '}
              <span className="text-[var(--accent)]">tous concernés</span> !
            </h3>
            <p className="mt-4 text-lg font-medium text-slate-800">
              Des cas concrets de l&apos;amont à l&apos;aval de l&apos;acte de construire.
            </p>
            <p className="mt-6 text-slate-600">
              Les organisations professionnelles du bâtiment portent le message : l&apos;IA
              touche les professionnels du BTP, les entreprises et les acteurs de la filière. Les formations avec{' '}
              <span className="font-medium text-slate-800">Laure Olivié</span> s&apos;alignent
              sur cette exigence : pas de gadget — uniquement des usages mesurables (devis,
              chantier, marchés, administratif).
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Première organisation patronale représentative des professionnels et entrepreneurs du
              bâtiment —{' '}
              <ExternalLinkAnchor
                href="https://www.ffbatiment.fr"
                title="Site officiel de la Fédération Française du Bâtiment"
                className="font-medium text-[var(--accent)] hover:underline"
              >
                ffbatiment.fr
              </ExternalLinkAnchor>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
