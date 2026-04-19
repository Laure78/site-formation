import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { JsonLd } from '@/components/JsonLd';
import { RdvLink } from '@/components/RdvLink';
import { FAQAnswer } from '@/components/landing/FAQAnswer';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { LINKS } from '@/lib/internal-links';
import { getBreadcrumbSchema, getCourseSchema, getFAQSchema, SITE_CONFIG } from '@/lib/seo';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';
import {
  FORMATION_IA_DIRIGEANT_BTP_COURSE,
  FORMATION_IA_DIRIGEANT_BTP_FAQ,
  FORMATION_IA_DIRIGEANT_BTP_GAINS_TABLE,
  FORMATION_IA_DIRIGEANT_BTP_PATH,
} from '@/lib/formation-ia-dirigeant-btp-config';

const OFC = "OFC Création d'Entreprise";

const SOMMAIRE = [
  { href: '#gains-tableau', label: 'Gains indicatifs par fonction' },
  { href: '#former-equipe', label: 'Pourquoi former toute l’équipe' },
  { href: '#piloter-projet', label: 'Piloter un projet IA (10–50 salariés)' },
  { href: '#budget', label: 'Budget et calendrier' },
  { href: '#cas-client', label: 'Cas client FFB Grand Paris & CSFE' },
  { href: '#rdv-audit', label: 'Audit IA gratuit — Calendly' },
  { href: '#faq', label: 'FAQ dirigeants' },
  { href: '#maillage', label: 'Ressources utiles' },
];

function AuditCalendlyBlock({ id }: { id: string }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 rounded-2xl border border-slate-200 bg-[#377CF3] px-6 py-10 text-white shadow-sm md:px-10"
    >
      <h2 className="font-display text-xl font-bold md:text-2xl">Audit IA gratuit de votre entreprise</h2>
      <p className="mt-3 text-sm leading-relaxed text-blue-100 md:text-base">
        Créneau 30 minutes : cadrage de votre contexte (taille, enjeux, fonctions), pistes de priorisation et
        questions financement. Même lien Calendly que les autres prises de rendez-vous — framing « audit » pour les
        décideurs.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#377CF3] hover:bg-blue-50">
          Réserver l&apos;audit IA gratuit
          <ArrowRight size={18} strokeWidth={1.5} aria-hidden />
        </RdvLink>
        <a
          href={CALENDLY_BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-xl border-2 border-white/80 px-5 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
        >
          {CALENDLY_BOOKING_URL}
        </a>
      </div>
    </section>
  );
}

export function FormationIaDirigeantBtpLanding() {
  const courseJson = getCourseSchema({
    name: FORMATION_IA_DIRIGEANT_BTP_COURSE.name,
    description: FORMATION_IA_DIRIGEANT_BTP_COURSE.description,
    path: FORMATION_IA_DIRIGEANT_BTP_PATH,
    providerName: SITE_CONFIG.legalName,
    instructorName: SITE_CONFIG.name,
    teaches: FORMATION_IA_DIRIGEANT_BTP_COURSE.teaches,
    educationalLevel: 'Professionnel',
    timeRequired: 'PT4H',
    areaServed: ['Île-de-France', 'France'],
  });
  const faqSchema = getFAQSchema(FORMATION_IA_DIRIGEANT_BTP_FAQ);
  const breadcrumbJsonLd = getBreadcrumbSchema([
    { name: 'Accueil', path: '/' },
    { name: 'Formation IA dirigeant BTP', path: FORMATION_IA_DIRIGEANT_BTP_PATH },
  ]);

  return (
    <div className="bg-white text-slate-900">
      <JsonLd id="schema-breadcrumb-dirigeant-btp" schema={breadcrumbJsonLd} />
      <JsonLd id="schema-course-dirigeant-btp" schema={courseJson} />
      <JsonLd id="schema-faq-dirigeant-btp" schema={faqSchema} />

      <div className="mx-auto max-w-4xl px-4 py-12 md:py-16">
        <nav aria-label="Fil d&apos;Ariane" className="text-sm text-slate-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href={LINKS.home} className="text-[#377CF3] hover:underline">
                Accueil
              </Link>
            </li>
            <li className="flex items-center gap-1.5">
              <span className="text-slate-400" aria-hidden>
                /
              </span>
              <span className="font-medium text-slate-900">Formation IA dirigeant BTP</span>
            </li>
          </ol>
        </nav>

        <article className="mt-8">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#377CF3]">
            Décideurs · PME du bâtiment · Qualiopi
          </p>
          <h1 className="font-display mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 md:text-4xl lg:text-[2.35rem]">
            Formation IA dirigeant BTP : ROI, équipes et avantage concurrentiel
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Vous dirigez une TPE ou une PME du bâtiment (10 à 50 salariés) : l’enjeu n’est pas d’ajouter un outil de
            plus, mais de{' '}
            <strong className="text-slate-800">libérer du temps utile</strong>,{' '}
            <strong className="text-slate-800">accélérer la réponse client</strong> et{' '}
            <strong className="text-slate-800">différencier votre entreprise</strong> sur les marchés serrés. {OFC} —{' '}
            {formatProfessionalsTrainedCount()}+ professionnels formés · note {SOCIAL_PROOF.AVERAGE_RATING}.
          </p>

          <div className="mt-8">
            <ShortAnswerBlock>
              L’IA proposée en formation est un levier de productivité sur les tâches rédactionnelles et
              d’organisation — pas un substitut à votre stratégie, à vos engagements contractuels ni à la validation des
              chiffrages et des dossiers réglementaires.
            </ShortAnswerBlock>
          </div>

          <nav aria-label="Sommaire" className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
              {SOMMAIRE.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-[#377CF3] underline hover:no-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <section id="gains-tableau" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Gains en heures / semaine par fonction (ordres de grandeur)
            </h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Les fourchettes ci-dessous reflètent des retours d’ateliers et de suivis : elles ne constituent pas un
              engagement contractuel — le gain dépend du volume de dossiers, de la maturité digitale et du cadrage des
              usages.
            </p>
            <div className="mt-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-sm">
              <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 font-semibold text-slate-900">Fonction</th>
                    <th className="px-4 py-3 font-semibold text-slate-900">Gain indicatif / semaine</th>
                    <th className="px-4 py-3 font-semibold text-slate-900">Commentaire</th>
                  </tr>
                </thead>
                <tbody>
                  {FORMATION_IA_DIRIGEANT_BTP_GAINS_TABLE.map((row) => (
                    <tr key={row.fonction} className="border-b border-slate-100 last:border-0">
                      <td className="px-4 py-3 font-medium text-slate-900">{row.fonction}</td>
                      <td className="px-4 py-3 text-[#377CF3]">{row.gainHeuresSemaine}</td>
                      <td className="px-4 py-3 text-slate-600">{row.commentaire}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section id="former-equipe" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Pourquoi former toute votre équipe à l’IA (pas seulement vous)
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Si vous êtes le seul à maîtriser les prompts, vous créez un nouveau goulot : les demandes continuent
                d’arriver sur les conducteurs de travaux, l’administration et le terrain — sans cadre commun, chacun
                improviser avec des outils grand public, au risque d’incohérence et de fuites de données.
              </p>
              <p>
                Une montée en compétence ciblée par fonction (encadrement, affaires, support) aligne les usages : mêmes
                règles de confidentialité, mêmes trames de documents, meilleure fluidité entre le bureau et le chantier.
                C’est un levier d’<strong className="text-slate-900">avantage concurrentiel</strong> : réponses plus
                rapides aux clients et aux marchés, avec une charge cognitive mieux répartie.
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {[
                'Réduire les dépendances individuelles (« seule Laure sait le faire »)',
                'Accélérer les relais entre chef de chantier, conducteur et support',
                'Sécuriser les pratiques (anonymisation, validation humaine avant envoi)',
              ].map((item) => (
                <li key={item} className="flex gap-3 text-slate-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-[#377CF3]" strokeWidth={1.5} aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section id="piloter-projet" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Comment piloter un projet IA dans une PME BTP de 10 à 50 salariés
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Le bon réflexe est de traiter l’IA comme un <strong className="text-slate-900">projet</strong>, pas comme
                un abonnement magique : périmètre limité au départ (ex. devis + courriers), sponsor dirigeant visible,
                indicateurs simples (temps passé, délais de réponse), et revues courtes pour ajuster.
              </p>
              <p>
                Pour une structure de cette taille, on combine souvent une <strong className="text-slate-900">
                  sensibilisation dirigeant
                </strong>{' '}
                (vision, ROI, risques) avec des{' '}
                <strong className="text-slate-900">sessions métier</strong> sur le catalogue Qualiopi — le tout cohérent
                avec votre organisation réelle (intra vs inter, Île-de-France ou France).
              </p>
            </div>
          </section>

          <section id="budget" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Budget réel d’une transformation IA BTP : combien, en combien de temps
            </h2>
            <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
              <p>
                Le coût direct inclut les <strong className="text-slate-900">sessions certifiées</strong> (forfaits par
                participant selon le module) et le <strong className="text-slate-900">temps interne</strong> de cadrage
                et de conduite du changement — souvent sous-estimé. Les outils (licences pro, comptes entreprise)
                s’ajoutent selon vos choix techniques.
              </p>
              <p>
                Le calendrier typique : quelques semaines pour un pilote utile, plusieurs mois pour généraliser des
                usages propres et mesurer l’impact — sans « big bang » irréaliste pour une PME du bâtiment.
              </p>
              <p>
                Le <strong className="text-slate-900">financement OPCO Constructys</strong> peut couvrir une partie du
                coût pédagogique selon éligibilité : voir le guide dédié dans les liens ci-dessous.
              </p>
            </div>
          </section>

          <section id="cas-client" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">
              Cas client : FFB Grand Paris &amp; Chambre syndicale de l&apos;étanchéité (CSFE)
            </h2>
            <p className="mt-6 text-slate-700 leading-relaxed">
              {OFC} accompagne des réseaux professionnels du bâtiment sur des dispositifs de formation et de
              sensibilisation à l&apos;IA — dont une démarche conjointe autour de l&apos;étanchéité avec la{' '}
              <strong className="text-slate-900">FFB</strong> et la <strong className="text-slate-900">CSFE</strong>,
              documentée dans notre étude de cas (méthode, publics, enseignements). C&apos;est un repère concret de
              déploiement à l&apos;échelle d&apos;un secteur, transposable en réflexe « PME » sur votre propre
              périmètre.
            </p>
            <div className="mt-8">
              <Link
                href={LINKS.etudesCas}
                className="inline-flex flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3] md:inline-flex md:min-w-[20rem]"
              >
                <span className="text-slate-900">Lire l&apos;étude de cas FFB &amp; CSFE</span>
                <span className="mt-3 text-sm font-normal text-slate-600">
                  Retour d&apos;expérience, formation IA et enjeux réseau professionnel.
                </span>
              </Link>
            </div>
          </section>

          <div className="mt-14">
            <AuditCalendlyBlock id="rdv-audit" />
          </div>

          <section id="faq" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">FAQ — décideurs</h2>
            <div className="mt-8 space-y-5">
              {FORMATION_IA_DIRIGEANT_BTP_FAQ.map((item) => (
                <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <h3 className="font-semibold text-slate-900">{item.q}</h3>
                  <div className="mt-2 text-slate-600 leading-relaxed">
                    <FAQAnswer content={item.a} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="maillage" className="scroll-mt-24 mt-14">
            <h2 className="font-display text-2xl font-bold text-slate-900 md:text-3xl">Ressources utiles</h2>
            <p className="mt-4 text-slate-600">
              Pour aller plus loin : parcours de la formatrice, financement et retour d&apos;expérience réseau
              professionnel.
            </p>
            <ul className="mt-8 grid gap-4">
              <li>
                <Link
                  href={LINKS.aPropos}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3]"
                >
                  <span className="text-slate-900">À propos — Laure Olivié</span>
                  <span className="mt-3 text-sm font-normal text-slate-600">
                    Parcours, références Qualiopi, expérience terrain BTP.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={LINKS.financement}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3]"
                >
                  <span className="text-slate-900">Financement Constructys — formation IA BTP</span>
                  <span className="mt-3 text-sm font-normal text-slate-600">
                    Barèmes, éligibilité, montage de dossier pour les entreprises du BTP.
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={LINKS.etudesCas}
                  className="flex flex-col rounded-2xl border border-slate-200 bg-[#F2F2F2] p-5 font-semibold text-[#377CF3] transition hover:border-[#377CF3]"
                >
                  <span className="text-slate-900">Étude de cas FFB &amp; CSFE</span>
                  <span className="mt-3 text-sm font-normal text-slate-600">
                    Contexte, objectifs et résultats de la démarche commune.
                  </span>
                </Link>
              </li>
            </ul>
          </section>

          <section className="mt-14 border-t border-slate-200 pt-10 text-sm text-slate-600">
            <p>
              <strong>{SITE_CONFIG.legalName}</strong> — SIRET {SITE_CONFIG.siret} · NDA 11788515078 · Certifiée Qualiopi
              · {SITE_CONFIG.email} ·{' '}
              <a href={SITE_CONFIG.url} className="text-[#377CF3] hover:underline">
                www.laureolivie.fr
              </a>
            </p>
          </section>
        </article>
      </div>
    </div>
  );
}
