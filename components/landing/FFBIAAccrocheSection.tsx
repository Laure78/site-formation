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
          <div className="mx-auto w-full max-w-[min(100%,380px)] lg:mx-0">
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-lg">
              <Image
                src="/images/ffb-affiche-ia-tous-concernes.png"
                alt="Affiche FFB : Intelligence artificielle, tous concernés — cas concrets sur tout le cycle de l’acte de construire."
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 90vw, 380px"
              />
            </div>
            <p className="mt-3 text-center text-xs text-slate-500 lg:text-left">
              Campagne FFB — message terrain pour la filière bâtiment
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
                alt="Logo FFB — Fédération Française du Bâtiment sur panneau végétalisé"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-xs text-slate-600">
              FFB — référence fédération BTP
            </figcaption>
          </figure>
          <figure className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/images/csfe-signaletique.png"
                alt="Signalétique CSFE — Professionnels de l’étanchéité, Chambre syndicale française de l’étanchéité"
                fill
                className="object-cover object-center"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
            <figcaption className="px-4 py-3 text-center text-xs text-slate-600">
              CSFE — filière étanchéité &amp; BTP
            </figcaption>
          </figure>
        </div>

        <figure className="mx-auto mt-10 max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
          <div className="relative aspect-[3/4] w-full max-h-[420px]">
            <Image
              src="/images/ffb-logo-moss-panneau.png"
              alt="Logo FFB sur panneau végétalisé — Fédération Française du Bâtiment"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 448px"
            />
          </div>
          <figcaption className="px-4 py-3 text-center text-xs text-slate-600">
            FFB — présence institutionnelle &amp; réseau national
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
