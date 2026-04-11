import Link from 'next/link';
import { Check } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { Breadcrumb } from '@/components/Breadcrumb';
import { breadcrumbItemsFromPaths, createPageMetadata, SITE_CONFIG } from '@/lib/seo';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';
import { PHOTOS } from '@/lib/photos';
import Image from 'next/image';

const KIT_PROMPTS_HREF = '/formations/ia-appels-offre-btp/Kit_IA_AO_BTP_7_prompts.html';

export const metadata = createPageMetadata({
  title:
    'Répondre aux appels d’offres BTP avec l’IA — mémoire technique, DCE | Laure Olivié',
  description:
    'Répondre aux appels d’offres BTP avec l’IA : analyser le DCE, structurer le mémoire technique, éviter les erreurs. Méthode terrain, formation Qualiopi Constructys. Île-de-France et France.',
  path: '/repondre-appels-offres-ia-btp',
  keywords: [
    'répondre appels offres BTP IA',
    'mémoire technique IA BTP',
    'DCE CCTP intelligence artificielle',
    'formation appels d’offres BTP',
    'ChatGPT marchés publics BTP',
  ],
  image: {
    url: PHOTOS.btpFormationChantierPlans2026.src,
    width: PHOTOS.btpFormationChantierPlans2026.width,
    height: PHOTOS.btpFormationChantierPlans2026.height,
    alt: PHOTOS.btpFormationChantierPlans2026.alt,
  },
});

export default function RepondreAppelsOffresIaBtpPage() {
  const mailProgramme = `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(
    'Demande programme — appels d’offres BTP et IA'
  )}`;

  return (
    <div className="border-b border-slate-200 bg-white">
      <Breadcrumb
        items={breadcrumbItemsFromPaths([
          { name: 'Accueil', path: '/' },
          { name: 'Répondre aux appels d’offres BTP avec l’IA', path: '/repondre-appels-offres-ia-btp' },
        ])}
      />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1 lg:max-w-[min(100%,42rem)]">
            <Link
              href="/formations"
              className="text-sm text-[var(--accent)] hover:underline"
            >
              ← Retour aux formations
            </Link>
            <p className="mt-4 text-sm font-medium uppercase tracking-wide text-slate-500">
              OFC Création d&apos;Entreprise · Présentiel · Qualiopi
            </p>
            <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-[2.5rem] lg:leading-tight">
              Répondre aux appels d&apos;offres BTP avec l&apos;IA : gagnez du temps et augmentez vos
              chances de réussite
            </h1>
            <p className="mt-4 text-lg font-medium text-slate-700">
              Mémoire technique, DCE et méthode — entreprises du bâtiment et marchés publics
            </p>
            <div className="mt-6 space-y-4 text-slate-600">
              <p>
                Répondre à un appel d&apos;offres, c&apos;est souvent long, complexe et stressant. Et
                pourtant c&apos;est un levier majeur pour développer l&apos;activité. L&apos;intelligence
                artificielle permet aujourd&apos;hui de{' '}
                <strong className="text-slate-800">réduire fortement le temps de préparation</strong>,
                d&apos;améliorer la clarté des dossiers et de structurer vos mémoires techniques — à
                condition d&apos;avoir une <strong className="text-slate-800">méthode</strong> et une
                relecture humaine.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <RdvLink className="rounded-xl bg-[var(--accent)] px-6 py-3.5 text-center font-semibold text-white hover:bg-blue-600">
                Prendre rendez-vous
              </RdvLink>
              <Link
                href="/formations/ia-appels-offre-btp"
                className="rounded-xl border-2 border-[var(--accent)] bg-[var(--accent-soft)] px-6 py-3.5 text-center font-semibold text-[var(--accent)] hover:bg-blue-100"
              >
                Voir la formation catalogue (BTP-02)
              </Link>
              <a
                href={mailProgramme}
                className="rounded-xl border-2 border-slate-200 px-6 py-3.5 text-center font-semibold text-slate-800 hover:border-[var(--accent)]"
              >
                Demander le programme
              </a>
            </div>
          </div>
          <div className="w-full shrink-0 lg:w-[400px]">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
              <Image
                src={PHOTOS.btpFormationChantierPlans2026.src}
                alt={PHOTOS.btpFormationChantierPlans2026.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 400px"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl space-y-16 px-4 pb-20">
        <section aria-labelledby="ao-probleme">
          <h2 id="ao-probleme" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Le problème actuel dans le BTP
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Beaucoup d&apos;entreprises répondent trop tard, envoient des dossiers incomplets ou manquent
            de différenciation sur la note technique. Résultat : des marchés perdus, parfois même avec un
            prix compétitif. Le mémoire et la qualité du dossier comptent autant que le chiffrage.
          </p>
        </section>

        <section aria-labelledby="ao-change">
          <h2 id="ao-change" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Ce que l&apos;IA change concrètement
          </h2>
          <p className="mt-4 text-slate-600">
            Avec des outils comme ChatGPT ou Claude, vous pouvez accélérer l&apos;analyse du DCE, produire
            des brouillons de mémoire technique structurés et clarifier vos réponses — pour traiter{' '}
            <strong className="text-slate-800">plus d&apos;appels d&apos;offres</strong> dans le même
            temps, sans vous épuiser. L&apos;IA ne remplace pas votre expertise : elle libère du temps sur
            la mise en forme et la structuration.
          </p>
        </section>

        <section aria-labelledby="ao-methode">
          <h2 id="ao-methode" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Méthode simple pour répondre avec l&apos;IA
          </h2>
          <ol className="mt-6 space-y-4 text-slate-700">
            {[
              {
                titre: 'Analyse du DCE',
                texte: 'RC, CCTP, critères d’attribution : comprendre ce qui note vraiment.',
              },
              {
                titre: 'Structuration du mémoire',
                texte: 'Plan aligné sur la grille de notation, pas sur un ancien copier-coller.',
              },
              {
                titre: 'Génération assistée',
                texte: 'Premiers jets à partir de vos données réelles (moyens, références, méthode).',
              },
              {
                titre: 'Personnalisation',
                texte: 'Contraintes de chantier, organisation, interfaces entre lots — le différenciant.',
              },
              {
                titre: 'Optimisation',
                texte: 'Clarté, cohérence avec le prix, relecture croisée avant dépôt.',
              },
            ].map((step, i) => (
              <li
                key={step.titre}
                className="flex gap-4 rounded-xl border border-slate-200 bg-slate-50 p-4"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-slate-900">{step.titre}</h3>
                  <p className="mt-1 text-sm text-slate-600">{step.texte}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          aria-labelledby="ao-erreurs"
          className="rounded-2xl border border-amber-200 bg-amber-50/80 p-6 md:p-8"
        >
          <h2 id="ao-erreurs" className="font-display text-xl font-bold text-slate-900">
            Les erreurs à éviter
          </h2>
          <ul className="mt-4 space-y-2 text-slate-700">
            {[
              'Copier-coller une réponse générée sans adaptation au CCTP',
              'Rester trop générique : le jury le voit immédiatement',
              'Oublier les contraintes réelles du chantier ou la cohérence avec votre offre de prix',
            ].map((item) => (
              <li key={item} className="flex gap-2 text-sm">
                <span className="text-amber-700" aria-hidden>
                  ▸
                </span>
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-700">
            L&apos;IA sans méthode et sans relecture humaine peut faire <strong>perdre des points</strong>{' '}
            sur la note technique. C&apos;est exactement ce que nous travaillons en formation.
          </p>
        </section>

        <section aria-labelledby="ao-cas">
          <h2 id="ao-cas" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Cas concret (terrain)
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Des équipes passent de plusieurs heures à environ une heure pour un premier brouillon structuré
            de mémoire lorsque la méthode (DCE, plan, prompts, relecture) est en place — le temps exact
            dépend du marché. L&apos;effet le plus visible est souvent le <strong className="text-slate-800">nombre de dossiers traités</strong> et la <strong className="text-slate-800">qualité de préparation</strong>, pas une promesse de gain de marché.
          </p>
        </section>

        <section aria-labelledby="ao-benefices">
          <h2 id="ao-benefices" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Les bénéfices
          </h2>
          <ul className="mt-6 space-y-3 text-slate-700">
            {[
              'Gain de temps sur l’analyse de pièces et la rédaction',
              'Meilleure organisation des réponses et des relances internes',
              'Dossiers plus clairs après relecture',
              'Avantage concurrentiel lorsque votre méthode est propre et traçable',
            ].map((item) => (
              <li key={item} className="flex gap-3">
                <Check size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="ao-pour-qui">
          <h2 id="ao-pour-qui" className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
            Pour qui ?
          </h2>
          <p className="mt-4 text-slate-600">
            Artisans, PME du BTP, conducteurs de travaux, responsables appels d&apos;offres ou direction
            technique — dès que vous répondez à des consultations, l&apos;IA peut devenir un levier, avec
            les bons réflexes de confidentialité.
          </p>
        </section>

        <section
          aria-labelledby="ao-se-former"
          className="rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-8"
        >
          <h2 id="ao-se-former" className="font-display text-xl font-bold text-slate-900">
            Se former pour aller plus loin
          </h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Savoir utiliser l&apos;IA sur des marchés publics ne s&apos;improvise pas : une formation
            courte permet d&apos;éviter les erreurs coûteuses, de gagner du temps immédiatement et
            d&apos;utiliser des prompts et trames adaptés au BTP — comme le programme{' '}
            <Link
              href="/formations/ia-appels-offre-btp"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              « Répondre aux appels d&apos;offres avec l&apos;IA »
            </Link>{' '}
            (réf. BTP-02, présentiel, Qualiopi, financement OPCO Constructys selon éligibilité).
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Ressource gratuite :{' '}
            <a
              href={KIT_PROMPTS_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              kit 7 prompts appels d&apos;offres BTP
            </a>
            {' · '}
            <Link
              href="/blog/memoire-technique-btp-ia-gagner-temps-appels-offres"
              className="font-medium text-[var(--accent)] hover:underline"
            >
              article : mémoire technique BTP et IA
            </Link>
            .
          </p>
        </section>

        <section className="rounded-2xl bg-[var(--accent)] px-6 py-10 text-center text-white md:px-10">
          <h2 className="font-display text-2xl font-bold">Passez à l&apos;action</h2>
          <p className="mt-3 text-lg text-blue-100">
            Répondre plus vite, structurer vos dossiers et monter en puissance sur les marchés publics.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <RdvLink className="inline-flex rounded-xl bg-white px-8 py-3.5 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Prendre rendez-vous
            </RdvLink>
            <Link
              href="/formations/ia-appels-offre-btp"
              className="inline-flex rounded-xl border-2 border-white/80 px-8 py-3.5 font-semibold text-white hover:bg-white/10"
            >
              Découvrir la formation
            </Link>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white/80 px-8 py-3.5 font-semibold text-white hover:bg-white/10" iconSize={18} />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 p-6">
          <h2 className="font-display text-lg font-semibold text-slate-900">
            Formation IA BTP en Île-de-France
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Sessions en présentiel : inter en Île-de-France ou intra dans vos locaux —{' '}
            <Link href="/formations/ia-btp-ile-de-france" className="font-medium text-[var(--accent)] hover:underline">
              voir la page dédiée
            </Link>
            .
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations/ia-appels-offre-btp', label: 'Formation appels d’offres BTP (BTP-02)' },
            { href: '/formations/ia-btp-ile-de-france', label: 'Formation IA BTP Île-de-France' },
            { href: '/blog/ia-memoire-technique-appel-offres-guide-2026', label: 'Guide mémoire technique IA' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
            { href: '/formations', label: 'Catalogue des formations' },
          ]}
        />
      </div>
    </div>
  );
}
