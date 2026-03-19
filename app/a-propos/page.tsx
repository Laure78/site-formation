import Link from 'next/link';
import Image from 'next/image';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { CheckCircle, Building2, Clock, Award } from 'lucide-react';
import { ProfilePhoto } from '@/components/landing/ProfilePhoto';
import { FAQSection } from '@/components/landing/FAQSection';
import { PHOTOS } from '@/lib/photos';

import { createPageMetadata, getFAQSchema } from '@/lib/seo';
import { FAQ_A_PROPOS } from '@/lib/faq';

export const metadata = createPageMetadata({
  title: 'Laure Olivié : Formatrice IA BTP | 1592 formés, note 4,85/5',
  description:
    'Laure Olivié forme 1592 professionnels BTP à l\'IA depuis Guyancourt (78). Certification Qualiopi, financement 100% Constructys. Note 4,85/5. Clients : FFB, CAPEB, GERESO.',
  path: '/a-propos',
  keywords: [
    'Laure Olivié',
    'formatrice IA BTP',
    'expert IA bâtiment',
    'LinkedIn Learning instructor',
    'consultant IA BTP',
    'formation IA entreprise',
  ],
});

export default function AProposPage() {
  const faqSchema = getFAQSchema(FAQ_A_PROPOS);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      {/* Hero — Formatrice IA pour les entreprises du BTP */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            <article>
              <h1 className="font-display text-3xl font-bold text-slate-900 md:text-4xl">
                Laure Olivié
              </h1>
              <p className="mt-2 text-xl text-slate-600">
                Formatrice IA et ChatGPT pour les entreprises du BTP
              </p>
              
              {/* Bio dense GEO-optimisée avec faits vérifiables */}
              <div className="mt-8 space-y-4 text-slate-700">
                <p className="text-lg leading-relaxed">
                  <strong>Laure Olivié</strong> est formatrice en intelligence artificielle spécialisée dans le secteur du BTP. 
                  Basée à <strong>Guyancourt (Yvelines, 78)</strong>, elle accompagne depuis 2014 les artisans, conducteurs de travaux et 
                  dirigeants d'entreprises du bâtiment dans l'intégration de ChatGPT et de l'IA générative.
                </p>
                <p className="text-lg leading-relaxed">
                  <strong>1592 professionnels formés</strong> avec une note moyenne de <strong>4,85/5</strong>. 
                  <strong>10 ans d'expérience</strong> en formation professionnelle et conduite de chantier dans les travaux publics. 
                  Instructrice <strong>LinkedIn Learning</strong> avec 2 formations officielles sur l'IA pour le BTP.
                </p>
                <p className="text-lg leading-relaxed">
                  Son organisme <strong>OFC Création d'Entreprise</strong> est <strong>certifié Qualiopi</strong> (n° 905 244 281 00010), 
                  garantissant l'éligibilité au <strong>financement OPCO Constructys à 100 %</strong> pour les entreprises du BTP de moins de 50 salariés.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  '1592 formés',
                  'Note 4,85/5',
                  '10 ans expérience',
                  'Qualiopi',
                  'LinkedIn Learning',
                ].map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full bg-[var(--accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--accent)]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </article>
            <div className="shrink-0 lg:w-96">
              <ProfilePhoto />
            </div>
          </div>
        </div>
      </section>

      {/* Clients institutionnels — Bloc "Ils me font confiance" */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-display text-center text-2xl font-bold text-slate-900 md:text-3xl">
            Ils me font confiance
          </h2>
          <p className="mt-3 text-center text-slate-600">
            Partenaires et clients institutionnels
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: 'FFB Grand Paris', desc: 'Fédération Française du Bâtiment' },
              { name: 'FFB Yvelines', desc: 'Fédération Française du Bâtiment' },
              { name: 'FFB Seine-et-Marne', desc: 'Fédération Française du Bâtiment' },
              { name: 'IFRB 78', desc: 'Institut de Formation Régional du Bâtiment' },
              { name: 'CAPEB', desc: 'Confédération Artisanat et Petites Entreprises' },
              { name: 'GERESO', desc: 'Organisme de formation professionnelle' },
              { name: 'Lefebvre Dalloz', desc: 'Formations juridiques et professionnelles' },
              { name: 'CNAM Entreprise', desc: 'Conservatoire National des Arts et Métiers' },
            ].map(({ name, desc }) => (
              <li
                key={name}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
              >
                <p className="font-semibold text-slate-900">{name}</p>
                <p className="mt-1 text-xs text-slate-600">{desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Galerie photos */}
      <section className="border-b border-slate-200 bg-white px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/btp-collaboration-chantier.png"
                alt="Partenariat et collaboration réussie sur chantier BTP grâce aux formations IA de Laure Olivié"
                width={1024}
                height={711}
                className="h-auto w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/laure-olivie-portrait-pro.png"
                alt="Laure Olivié formatrice en intelligence artificielle spécialisée dans les formations pour entreprises du BTP"
                width={1024}
                height={747}
                className="h-auto w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={PHOTOS.linkedinPanel.src}
                alt={PHOTOS.linkedinPanel.alt}
                width={PHOTOS.linkedinPanel.width}
                height={PHOTOS.linkedinPanel.height}
                className="h-auto w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={PHOTOS.formationEntreprise.src}
                alt={PHOTOS.formationEntreprise.alt}
                width={PHOTOS.formationEntreprise.width}
                height={PHOTOS.formationEntreprise.height}
                className="h-auto w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={PHOTOS.bannerRecrutementDifficile.src}
                alt={PHOTOS.bannerRecrutementDifficile.alt}
                width={PHOTOS.bannerRecrutementDifficile.width}
                height={PHOTOS.bannerRecrutementDifficile.height}
                className="h-auto w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="overflow-hidden rounded-2xl shadow-lg">
              <Image
                src={PHOTOS.linkedinPortrait.src}
                alt={PHOTOS.linkedinPortrait.alt}
                width={PHOTOS.linkedinPortrait.width}
                height={PHOTOS.linkedinPortrait.height}
                className="h-auto w-full"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
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
                title: "1592 professionnels formés",
                desc: "Artisans, conducteurs de travaux, dirigeants BTP. Statistique officielle vérifiable.",
              },
              {
                icon: Building2,
                title: '10 ans expérience terrain',
                desc: "Conduite de chantier, travaux publics, génie civil. Expertise métier BTP.",
              },
              {
                icon: Clock,
                title: 'Méthode 100% pratique',
                desc: "Travail sur vos vrais documents : devis, emails, CR chantier. Zéro théorie.",
              },
              {
                icon: Award,
                title: 'Certification Qualiopi',
                desc: "100 % finançable OPCO Constructys. Note 4,85/5. Référencé FFB.",
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
          <article>
            <h2 className="font-display text-center text-2xl font-bold text-slate-900">
              Mon approche
            </h2>
            <div className="mt-10 space-y-6 text-slate-600">
              <p>
                Forte de <strong>10 ans d'expérience</strong> en formation professionnelle et en conduite de chantier dans les travaux publics,
                je me suis spécialisée dans l'accompagnement des entreprises du BTP vers l'intelligence artificielle. 
                Mon objectif n'est pas de parler théorie, mais de vous montrer concrètement comment ChatGPT et l'IA générative 
                peuvent transformer votre quotidien.
              </p>
              <p>
                <strong>Basée à Guyancourt (78)</strong>, j'interviens en <strong>Île-de-France</strong> (Paris, Yvelines, Seine-et-Marne, Essonne, Hauts-de-Seine, Val-de-Marne, Seine-Saint-Denis, Val-d'Oise) 
                et partout en France (Lyon, Bordeaux, Lille, etc.).
              </p>
              <p>
                Que vous soyez artisan, chef de chantier ou dirigeant de TPE/PME, je vous accompagne sur vos cas réels : 
                préparation de devis, réponses clients, relances d'impayés, comptes rendus de chantier, communication sécurité, 
                préparation de documents pour assurances et maîtres d'ouvrage.
              </p>
              <blockquote className="border-l-4 border-[var(--accent)] bg-[var(--accent-soft)] py-4 pl-6 pr-6 italic text-[var(--accent)]">
                « Mon rôle, ce n'est pas de faire du blabla sur l'IA. C'est de vous montrer en direct 
                comment ChatGPT fait gagner 3 à 5 heures par semaine sur vos devis, vos comptes rendus chantier 
                et vos relances clients. »
              </blockquote>
              <p>
                Mes formations sont <strong>certifiées Qualiopi</strong> et peuvent être prises en charge à <strong>100 % 
                par votre OPCO Constructys</strong>. Je vous accompagne également dans les démarches administratives 
                pour faciliter le financement de votre formation.
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
          </article>
        </div>
      </section>

      {/* FAQ GEO inline */}
      <section className="border-b border-slate-200 bg-slate-50 px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <FAQSection
            items={FAQ_A_PROPOS}
            title="Questions fréquentes sur Laure Olivié"
            subtitle="Zone d'intervention, expérience, accompagnement post-formation."
          />
        </div>
      </section>

      {/* Aller plus loin */}
      <section className="bg-white px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <AllerPlusLoin
            links={[
              { href: '/formations', label: 'Formation IA BTP' },
              { href: '/chatgpt-artisans-btp', label: 'ChatGPT artisans BTP' },
              { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
              { href: '/blog', label: 'Articles et guides' },
              { href: '/prendre-rdv', label: 'Prendre rendez-vous' },
            ]}
          />
        </div>
      </section>
    </div>
  );
}
