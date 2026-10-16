import Link from 'next/link';
import {
  DOMAINES_CATALOGUE_2027,
  getModuleByCode,
  SOUS_DOMAINES_IA_CHANTIER,
  type SousDomaineIaChantier,
} from '@/data/catalogue-2027';
import { libelleDisponibilite } from '@/lib/catalogue-2027/search-modules';
import { LINKS } from '@/lib/internal-links';
import { catalogueDemandeHref } from '@/lib/training-page-helpers';
import { OFC_CTA_PRIMARY, OFC_CTA_SECONDARY } from '@/lib/ofc-interaction-classes';

function domaineLabel(id: SousDomaineIaChantier['domainePrincipalId']): string {
  return DOMAINES_CATALOGUE_2027.find((d) => d.id === id)?.titre ?? id;
}

function moduleCtaHref(code: string, titre: string): { href: string; label: string } {
  const mod = getModuleByCode(code);
  if (!mod) {
    return {
      href: catalogueDemandeHref({
        formationOuParcours: `${code} — ${titre}`,
        nature: 'choix-formation',
      }),
      label: 'Demander le programme',
    };
  }
  if (mod.href) {
    return { href: mod.href, label: 'Voir le programme' };
  }
  return {
    href: catalogueDemandeHref({
      formationOuParcours: `${mod.code} — ${mod.titre}`,
      nature: 'choix-formation',
    }),
    label: 'Demander le programme',
  };
}

function SousDomaineCard({ sousDomaine: s }: { sousDomaine: SousDomaineIaChantier }) {
  const transversal = domaineLabel(s.domaineTransversalId);
  const principal = domaineLabel(s.domainePrincipalId);

  return (
    <article
      id={s.slug}
      className="scroll-mt-28 rounded-xl border border-ofc-border bg-white p-6 shadow-sm md:p-8"
      aria-labelledby={`${s.id}-title`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-ofc-accent">
        Sous-domaine · {principal}
        <span className="text-ofc-ink-muted"> · transversal {transversal}</span>
      </p>
      <h2 id={`${s.id}-title`} className="ofc-type-h2 mt-2 text-ofc-ink">
        {s.titre}
      </h2>
      <p className="mt-2 text-sm font-medium text-ofc-ink">{s.beneficeMetier}</p>
      <p className="mt-4 text-sm leading-relaxed text-ofc-ink-muted">{s.presentation}</p>

      {s.avertissementIa ? (
        <p className="mt-4 rounded-lg border border-ofc-border bg-ofc-canvas/80 p-3 text-sm text-ofc-ink-muted">
          {s.avertissementIa}
        </p>
      ) : null}

      <h3 className="mt-6 text-sm font-semibold text-ofc-ink">Publics concernés</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-ofc-ink-muted">
        {s.publics.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>

      <h3 className="mt-6 text-sm font-semibold text-ofc-ink">Modules associés</h3>
      <ul className="mt-3 space-y-3">
        {s.moduleCodes.map((code) => {
          const mod = getModuleByCode(code);
          if (!mod) return null;
          const cta = moduleCtaHref(code, mod.titre);
          return (
            <li
              key={code}
              className="flex flex-col gap-2 rounded-lg border border-ofc-border bg-ofc-canvas/50 p-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="font-mono text-xs font-semibold tabular-nums text-ofc-ink-muted">
                  {code} · {libelleDisponibilite(mod.disponibilite)}
                </p>
                <p className="mt-1 text-sm font-medium text-ofc-ink">{mod.titre}</p>
              </div>
              <Link
                href={cta.href}
                className={`${OFC_CTA_PRIMARY} inline-flex min-h-10 shrink-0 items-center justify-center px-4 py-2 text-sm`}
              >
                {cta.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <details className="mt-6 group">
        <summary className="cursor-pointer text-sm font-semibold text-ofc-accent hover:underline">
          Sujets, livrables et progression (3 niveaux)
        </summary>
        <div className="mt-4 space-y-4 text-sm text-ofc-ink-muted">
          <div>
            <p className="font-medium text-ofc-ink">Sujets travaillés</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {s.sujets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-medium text-ofc-ink">Livrables pédagogiques</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {s.livrablesPedagogiques.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <ol className="space-y-4">
            {s.niveauxMaitrise.map((n) => (
              <li key={n.niveau} className="rounded-lg border border-ofc-border p-3">
                <p className="font-medium text-ofc-ink">{n.libelle}</p>
                <p className="mt-2">
                  <span className="font-medium text-ofc-ink">Objectif :</span> {n.objectifObservable}
                </p>
                <p className="mt-1">
                  <span className="font-medium text-ofc-ink">Exercice :</span> {n.exercice}
                </p>
                <p className="mt-1">
                  <span className="font-medium text-ofc-ink">Livrable :</span> {n.livrable}
                </p>
                <p className="mt-1">
                  <span className="font-medium text-ofc-ink">Contrôle :</span> {n.controleAcquis}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </details>

      {s.sourcesOfficielles && s.sourcesOfficielles.length > 0 ? (
        <div className="mt-6 border-t border-ofc-border pt-5">
          <h3 className="text-sm font-semibold text-ofc-ink">Sources officielles (références)</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {s.sourcesOfficielles.map((src) => (
              <li key={src.href}>
                <a
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-ofc-accent underline-offset-2 hover:underline"
                >
                  {src.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href={`${LINKS.formations}#catalogue-modules`}
          className={`${OFC_CTA_SECONDARY} inline-flex min-h-10 items-center justify-center px-4 py-2 text-sm`}
        >
          Filtrer le catalogue
        </Link>
      </div>
    </article>
  );
}

export function FormationsSousDomainesIaChantier() {
  return (
    <section
      className="mt-16 scroll-mt-24 border-t border-[#E2E8F0] pt-14"
      aria-labelledby="sous-domaines-ia-chantier-title"
    >
      <h2 id="sous-domaines-ia-chantier-title" className="ofc-type-h2 text-ofc-ink">
        Organisation et prévention de chantier avec l’IA
      </h2>
      <p className="mt-3 max-w-3xl text-ofc-ink-muted">
        Deux sous-domaines du catalogue : préparation et conduite (domaine travaux) et prévention
        (domaine technique), avec le domaine numérique et IA en transversal. ChatGPT et Claude —
        contrôle humain sur chaque livrable.
      </p>
      <nav
        className="mt-6 flex flex-wrap gap-2"
        aria-label="Accès rapide aux sous-domaines chantier IA"
      >
        {SOUS_DOMAINES_IA_CHANTIER.map((s) => (
          <a
            key={s.id}
            href={`#${s.slug}`}
            className="inline-flex min-h-10 items-center rounded-lg border border-ofc-border-strong bg-white px-4 py-2 text-sm font-medium text-ofc-ink transition-colors hover:border-ofc-accent hover:text-ofc-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ofc-accent"
          >
            {s.titre}
          </a>
        ))}
      </nav>
      <div className="mt-10 space-y-10">
        {SOUS_DOMAINES_IA_CHANTIER.map((s) => (
          <SousDomaineCard key={s.id} sousDomaine={s} />
        ))}
      </div>
    </section>
  );
}
