import Image from 'next/image';
import { ExternalLinkAnchor } from '@/components/ExternalLink';

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
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-slate-200/90 bg-slate-900 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.35)] ring-1 ring-black/8">
              <Image
                src="/images/ffb-affiche-ia-tous-concernes.png"
                alt="Affichette campagne FFB « Intelligence artificielle, tous concernés » : sensibilisation de la filière bâtiment à l’IA sur l’acte de construire — alignée aux formations ChatGPT et Claude AI pour le BTP (Laure Olivié)."
                fill
                quality={88}
                priority={false}
                className="object-cover object-[center_38%] contrast-[1.09] brightness-[1.05] saturate-[1.08]"
                sizes="(max-width: 1024px) 92vw, 640px"
              />
              {/* Atténue les reflets / aplati le rendu pour un rendu plus net à l’écran */}
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/10 via-transparent to-slate-950/15 mix-blend-soft-light"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_45%,transparent_0%,rgba(15,23,42,0.08)_100%)]"
                aria-hidden
              />
            </div>
            <p className="mt-3 text-center text-xs text-slate-500 lg:text-left">
              Campagne FFB — IA et filière bâtiment (Paris, Île-de-France et national)
            </p>
          </div>

          <div>
            <h2
              id="ffb-ia-accroche-titre"
              className="font-display text-2xl font-bold tracking-tight text-slate-900 md:text-3xl"
            >
              Intelligence artificielle,{' '}
              <span className="text-[var(--accent)]">tous concernés</span> !
            </h2>
            <p className="mt-4 text-lg font-medium text-slate-800">
              Des cas concrets de l&apos;amont à l&apos;aval de l&apos;acte de construire.
            </p>
            <p className="mt-6 text-slate-600">
              Les organisations professionnelles du bâtiment portent le message : l&apos;IA
              touche artisans, entreprises et acteurs de la filière. Les formations avec{' '}
              <span className="font-medium text-slate-800">Laure Olivié</span> s&apos;alignent
              sur cette exigence : pas de gadget — uniquement des usages mesurables (devis,
              chantier, marchés, administratif).
            </p>
            <p className="mt-4 text-sm text-slate-500">
              Première organisation patronale représentative des artisans et entrepreneurs du
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

        <div className="mt-14 grid gap-8 border-t border-slate-200 pt-12 sm:grid-cols-2">
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/ffb-logo-moss-mur.png"
                alt="Logo FFB sur mur végétalisé en accueil : Fédération Française du Bâtiment — institution de référence pour artisans et entreprises du bâtiment, partenaire formations IA BTP en Île-de-France."
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-xs text-slate-600">
              FFB — fédération du bâtiment · formations IA (ChatGPT, Claude AI) avec Laure Olivié
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/csfe-signaletique.png"
                alt="Signalétique murale CSFE : Chambre syndicale française de l’étanchéité et APME-PROMETHEE — accueil des professionnels de l’étanchéité et de la filière BTP."
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-xs text-slate-600">
              CSFE — étanchéité &amp; métiers enveloppe · formations IA pour entreprises du BTP
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
