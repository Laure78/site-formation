import Link from 'next/link';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { CheckCircle, Building2, Clock, Award } from 'lucide-react';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';

import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Laure Olivié — Formatrice IA BTP | Formation bâtiment',
  description:
    'Laure Olivié, formatrice IA pour le BTP. 10 ans d\'expérience, méthode 100% pratique. Paris, Île-de-France. Qualiopi · Constructys.',
  path: '/a-propos',
});

export default function AProposPage() {
  return (
    <div>
      {/* Hero — Formatrice IA pour les entreprises du BTP */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--accent)] font-bold text-white">
                  IA
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold text-slate-900">
                    Laure Olivié
                  </h1>
                  <p className="text-sm text-slate-500">
                    Formation IA pour le BTP
                  </p>
                </div>
              </div>
              <h2 className="mt-8 font-display text-3xl font-bold text-slate-900 md:text-4xl">
                Formatrice IA pour les{' '}
                <span className="text-[var(--accent)]">entreprises du BTP</span>
              </h2>
              <p className="mt-6 max-w-xl text-slate-600">
                J&apos;accompagne les artisans, conducteurs de travaux et dirigeants
                de TPE/PME du bâtiment pour intégrer l&apos;IA dans leurs tâches
                quotidiennes et{' '}
                <span className="font-semibold text-slate-900">
                  gagner 3 à 5 heures par semaine.
                </span>
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  '10+ ans en formation',
                  'Spécialisation BTP',
                  '100% pratique',
                  'Qualiopi & OPCO',
                ].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-medium text-[var(--accent)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 lg:w-96">
              <ProfilePhoto />
            </div>
          </div>
        </div>
      </section>

      {/* 4 cartes caractéristiques */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: CheckCircle,
                title: "10+ ans d'expérience",
                desc: "Animation de formations professionnelles auprès d'artisans et PME du BTP",
              },
              {
                icon: Building2,
                title: 'Expertise terrain',
                desc: "IA appliquée sur vos vrais chantiers : devis, chiffrage, mails clients",
              },
              {
                icon: Clock,
                title: 'Méthode 100% pratique',
                desc: "Cas réels, modèles prêts à l'emploi, autonomie garantie",
              },
              {
                icon: Award,
                title: 'Financement OPCO',
                desc: "Formation Qualiopi avec prise en charge Constructys possible",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent)] text-white shadow-lg shadow-blue-500/20">
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mon approche */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-center text-2xl font-bold text-slate-900">
            Mon approche
          </h2>
          <div className="mt-10 space-y-6 text-slate-600">
            <p>
              Forte de plus de 10 ans d&apos;expérience en formation professionnelle,
              je me suis spécialisée dans l&apos;accompagnement des entreprises du BTP
              vers l&apos;intelligence artificielle. Mon objectif n&apos;est pas de parler
              théorie, mais de vous montrer concrètement comment l&apos;IA peut
              transformer votre quotidien.
            </p>
            <p>
              Que vous soyez artisan, chef de chantier ou dirigeant de TPE/PME, je
              vous accompagne sur vos cas réels : préparation de devis, réponses
              clients, relances d&apos;impayés, comptes rendus de chantier, communication
              sécurité, préparation de documents pour assurances et maîtres
              d&apos;ouvrage.
            </p>
            <blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-soft)] py-4 pl-6 pr-6 italic text-[var(--accent)]">
              « Mon rôle, ce n&apos;est pas de faire du blabla sur l&apos;IA. C&apos;est
              de vous montrer en direct comment l&apos;IA fait gagner 2 à 3 heures par
              semaine sur vos devis, vos comptes rendus chantier et vos relances
              clients. »
            </blockquote>
            <p>
              Mes formations sont certifiées Qualiopi et peuvent être prises en charge
              à 100% par votre OPCO (Constructys, etc.). Je vous accompagne également
              dans les démarches administratives pour faciliter le financement de votre
              formation.
            </p>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <Link
              href="/formations"
              className="inline-block rounded-xl bg-[var(--accent)] px-8 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Voir le catalogue formations
            </Link>
            <Link
              href="/prendre-rdv"
              className="inline-block rounded-xl border-2 border-[var(--accent)] px-8 py-3 font-semibold text-[var(--accent)] hover:bg-[var(--accent-soft)]"
            >
              Prendre RDV
            </Link>
          </div>
          <div className="mt-16 border-t border-slate-200 pt-12">
            <AllerPlusLoin />
          </div>
        </div>
      </section>
    </div>
  );
}
