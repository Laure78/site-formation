import Link from 'next/link';
import { QualiopiLogoInline, QualiopiWordmark } from '@/components/QualiopiLogo';
import type { FormationIaRawMetier, FormationIaRawVille } from '@/lib/seo-formation-ia-hub-data';
import {
  getMetierLinkedVilles,
  getSisterVilles,
  getVilleLinkedMetiers,
} from '@/lib/seo-formation-ia-hub-links';
import { SOCIAL_PROOF, formatProfessionalsTrainedCount } from '@/lib/constants';

function hashSlug(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function capitalizeFirst(text: string): string {
  if (!text) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function FormationIaMetierBody({
  metier,
}: {
  metier: FormationIaRawMetier;
}) {
  const h = hashSlug(metier.slug);
  const villes = getMetierLinkedVilles(metier.slug);
  const sistersByDept = villes.flatMap((v) => getSisterVilles(v)).slice(0, 8);
  const tone = ['concret', 'terrain', 'efficace', 'structuré', 'réaliste'][h % 5];

  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Formation IA, ChatGPT et Claude AI — {capitalizeFirst(metier.label)}
      </h1>
      <p className="lead text-lg text-slate-700">
        Vous cherchez une <strong>formation IA BTP</strong> alignée sur le lot{' '}
        <strong>{metier.label}</strong> ({metier.categorie}) ? Cette page détaille comment{' '}
        <strong>ChatGPT</strong> et <strong>Claude AI</strong> s&apos;intègrent à votre quotidien :
        devis, réponses aux consultations, mémoires techniques, comptes rendus de chantier et
        coordination documentaire — sans remplacer votre expertise {tone}.
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Pourquoi associer IA générative et {metier.label} ?
      </h2>
      <p>
        Dans la <strong>formation intelligence artificielle bâtiment</strong>, l&apos;objectif est
        simple : réduire le temps passé sur les tâches répétitives pour libérer du temps sur le
        terrain et la relation client. Pour la <strong>formation IA construction</strong> appliquée
        à <strong>{metier.label}</strong>, nous travaillons des cas réels : pièces écrites,
        structuration d&apos;arguments techniques, relecture de courriers, préparation de synthèses
        avant réunion de coordination.
      </p>
      <p>
        {metier.exemple} Cette approche fait de la session un atelier actionnable : vous repartez
        avec des modèles de prompts et des méthodes pour capitaliser sur vos propres documents
        (CCTP, notices, historiques d&apos;échanges) tout en respectant le cadre{' '}
        <QualiopiWordmark /> et les
        exigences de traçabilité du BTP.
      </p>
      <p>
        La <strong>formation ChatGPT BTP</strong> met l&apos;accent sur la rapidité d&apos;itération
        et la reformulation ; la <strong>formation Claude AI bâtiment</strong> est particulièrement
        adaptée aux textes longs, aux comparaisons de variantes et aux synthèses de dossiers. Les deux
        outils sont enseignés : vous apprenez à choisir le bon assistant selon la nature du besoin
        (email court vs analyse de pièce volumineuse).
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Cas d&apos;usage {tone} pour {metier.label}
      </h2>
      <p>
        Au-delà des exemples génériques, nous adaptons les exercices à votre lot : pour la{' '}
        <strong>formation IA construction</strong> dans le cadre de <strong>{metier.label}</strong>,
        l&apos;idée est de partir de vos propres modèles (devis, métrés, mails types) et de les
        améliorer avec <strong>ChatGPT</strong> (rapidité, variantes) puis avec <strong>Claude AI</strong>{' '}
        (textes plus longs, comparaisons, synthèses). Vous repartez avec des prompts réutilisables et une
        méthode de relecture : indispensable lorsque vous engagez votre responsabilité sur des réponses
        écrites ou des engagements contractuels.
      </p>
      <p>
        La <strong>formation Claude AI pour les professionnels du BTP</strong> prend tout son sens
        lorsqu&apos;il faut intégrer plusieurs contraintes : planning, coactivité, normes, exigences du
        maître d&apos;ouvrage. L&apos;assistant aide à structurer ; vous conservez le dernier mot sur les
        quantités, les prix et les choix techniques. C&apos;est aussi ce qui distingue une approche
        professionnelle d&apos;un simple tutoriel « généraliste ».
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Programme indicatif (adapté au public présent)
      </h2>
      <h3 className="text-lg font-semibold text-slate-800">Mise à niveau & cadre</h3>
      <ul>
        <li>
          Cadrage <QualiopiWordmark />, objectifs personnels et cas d&apos;usage prioritaires pour {metier.label}.
        </li>
        <li>Rappels RGPD : ce qu&apos;on peut / ne peut pas déposer dans un assistant IA en entreprise.</li>
        <li>Comparatif pratique ChatGPT vs Claude AI pour le même brief métier.</li>
      </ul>
      <h3 className="text-lg font-semibold text-slate-800">Ateliers « copilotes » métier</h3>
      <ul>
        <li>
          Devis et descriptions : structure, variantes, relecture client — avec itérations guidées.
        </li>
        <li>
          Mémoires techniques et synthèses : découpage des exigences, plan, relecture critique.
        </li>
        <li>
          Chantier & coordination : comptes rendus, mails, relances fournisseurs — ton professionnel.
        </li>
      </ul>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Paris, Grand Paris et Île-de-France : une zone d&apos;intervention dense
      </h2>
      <p>
        Les chantiers en région parisienne imposent souvent des délais courts et une coordination
        multi-acteurs. La <strong>formation IA dirigeants BTP</strong> comme les sessions
        opérationnelles côté terrain s&apos;appuient sur cette réalité : nous intégrons des exemples
        de flux documentaires fréquents (réponses aux demandes de précisions, relances, structuration
        de dossiers) pour une <strong>formation IA et intelligence artificielle pour le bâtiment</strong>{' '}
        directement utile à vos équipes.
      </p>
      <p>
        Que vous interveniez en <strong>formation IA travaux publics</strong> ou sur des opérations
        privées, la méthode reste la même : fiabiliser le contenu produit, garder la main sur les
        chiffres et les engagements, et utiliser l&apos;IA comme assistant — pas comme « boîte noire ».
      </p>

      <h2 className="font-display flex flex-wrap items-center gap-2 text-xl font-semibold text-slate-900">
        <QualiopiLogoInline heightPx={28} className="hidden sm:inline-block" />
        <span>Financement OPCO Constructys & certification Qualiopi</span>
      </h2>
      <p>
        L&apos;organisme OFC Création d&apos;Entreprise est certifié <QualiopiWordmark />. Selon votre branche et
        votre plan de développement des compétences, une prise en charge via{' '}
        <strong>OPCO Constructys</strong> est fréquente pour les publics BTP : nous vous orientons
        vers la bonne démarche (financements, justificatifs, objectifs pédagogiques). Pour toute
        question sur l&apos;éligibilité : consultez la page dédiée ou{' '}
        <Link href="/contact" className="text-[#377CF3] underline-offset-2 hover:underline">
          contactez-nous
        </Link>
        .
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        OFC Création d&apos;Entreprise — Laure Olivié
      </h2>
      <p>
        <strong>Formatrice IA, ChatGPT et Claude AI pour le BTP</strong> — plus de{' '}
        {formatProfessionalsTrainedCount()} professionnels accompagnés, note moyenne {SOCIAL_PROOF.AVERAGE_RATING}.
        SIRET 905 244 281 00010 — NDA 11788515078.
        Siège : 6 rue Henri Dunant, 78280 Guyancourt — laureolivie@yahoo.fr.
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Poursuivre la lecture : pages locales & financement
      </h2>
      <p>
        Pour ancrer votre projet dans votre zone : consultez les pages ville (dont Paris) ci-dessous,
        puis le financement Constructys. Chaque lien renforce le maillage utile à votre recherche
        (formation IA carreleur Île-de-France, formation ChatGPT électricien Nanterre, etc.) sans
        sur-optimisation : le contenu reste lisible et orienté bénéfices.
      </p>
      <ul>
        {villes.map((v) => (
          <li key={v.slug}>
            <Link href={`/formation-ia/${v.slug}`} className="text-[#377CF3] underline-offset-2 hover:underline">
              Formation IA BTP {v.label} ({v.deptName})
            </Link>
          </li>
        ))}
      </ul>
      {sistersByDept.length > 0 && (
        <>
          <p className="text-sm text-slate-600">
            Villes voisines (même département) :{' '}
            {sistersByDept.map((v, i) => (
              <span key={v.slug}>
                {i > 0 ? ' · ' : ''}
                <Link href={`/formation-ia/${v.slug}`} className="text-[#377CF3] hover:underline">
                  {v.label}
                </Link>
              </span>
            ))}
          </p>
        </>
      )}
      <p>
        <Link href="/financement-constructys-formation-ia-btp" className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
          Financement Constructys / OPCO — formation IA BTP
        </Link>
        {' · '}
        <Link href="/contact" className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
          Contact
        </Link>
        {' · '}
        <Link href="/formation-ia/faq" className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
          FAQ formation IA BTP (longue traîne)
        </Link>
        {' · '}
        <Link href="/formation-ia" className="font-medium text-[#377CF3] underline-offset-2 hover:underline">
          Hub formation IA BTP
        </Link>
      </p>
    </article>
  );
}

export function FormationIaVilleBody({
  ville,
}: {
  ville: FormationIaRawVille;
}) {
  const metiers = getVilleLinkedMetiers(ville);
  const sisters = getSisterVilles(ville);
  const isParis = ville.slug === 'btp-paris';

  if (isParis) {
    return <FormationIaParisBody />;
  }

  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Formation IA BTP à {ville.label} — ChatGPT & Claude AI ({ville.deptName})
      </h1>
      <p className="lead text-lg text-slate-700">
        Vous êtes basé·e à <strong>{ville.label}</strong> ({ville.deptName}, département{' '}
        {ville.dept}) et vous voulez une <strong>formation IA BTP</strong> concrète pour artisans,
        chefs d&apos;équipe et dirigeants ? Cette page présente l&apos;approche OFC : ateliers sur{' '}
        <strong>ChatGPT</strong> et <strong>Claude AI</strong>, cas réels de chantier et pièces
        administratives, avec une perspective locale Île-de-France.
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Ce que vous travaillerez avec ChatGPT et Claude AI
      </h2>
      <p>
        La <strong>formation ChatGPT artisans</strong> et la <strong>formation Claude AI artisans du bâtiment</strong>{' '}
        ne sont pas des « cours généralistes » : nous appliquons les assistants à vos livrables :
        devis, mails, synthèses, préparation de réponses, relecture de documents. À {ville.label},
        les enjeux sont souvent liés au rythme des chantiers et à la densité des échanges : l&apos;IA
        sert à accélérer la structuration, pas à remplacer votre jugement technique.
      </p>
      <p>
        Exemples fréquents : un <strong>formation ChatGPT peintre bâtiment Versailles</strong> ou une{' '}
        <strong>formation IA carreleur Île-de-France</strong> suivent la même méthode — seuls les
        cas d&apos;atelier changent. Pour {ville.label}, nous insistons sur les scénarios utiles à votre
        bassin d&apos;emploi (chantiers privés, copropriétés, marchés publics selon votre activité).
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Maillage vers les lots métiers (pour cibler votre cœur de métier)
      </h2>
      <p>
        Sélectionnez la page qui correspond à votre lot pour des exemples plus spécialisés (gros œuvre,
        seconde œuvre, CVC, VRD, etc.) :
      </p>
      <ul>
        {metiers.slice(0, 12).map((m) => (
          <li key={m.slug}>
            <Link href={`/formation-ia/${m.slug}`} className="text-[#377CF3] underline-offset-2 hover:underline">
              Formation IA — {capitalizeFirst(m.label)}
            </Link>
            <span className="text-slate-600"> ({m.categorie})</span>
          </li>
        ))}
      </ul>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Paris & départements voisins : liens utiles
      </h2>
      <p>
        Même si vous êtes à {ville.label}, beaucoup d&apos;équipes interviennent sur tout l&apos;est
        ou l&apos;ouest francilien. La page prioritaire <strong>Paris</strong> centralise un maillage
        large vers tous les lots :
      </p>
      <p>
        <Link href="/formation-ia/btp-paris" className="font-semibold text-[#377CF3] underline-offset-2 hover:underline">
          Formation IA BTP Paris — ChatGPT & Claude AI
        </Link>
      </p>

      {sisters.length > 0 && (
        <>
          <h3 className="text-lg font-semibold text-slate-800">Autres villes du {ville.deptName}</h3>
          <ul>
            {sisters.map((s) => (
              <li key={s.slug}>
                <Link href={`/formation-ia/${s.slug}`} className="text-[#377CF3] hover:underline">
                  Formation IA BTP {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <h2 className="font-display flex flex-wrap items-center gap-2 text-xl font-semibold text-slate-900">
        <QualiopiLogoInline heightPx={28} className="hidden sm:inline-block" />
        <span>Qualiopi — financement Constructys — contact</span>
      </h2>
      <p>
        Organisme certifié <QualiopiWordmark />, financements OPCO selon éligibilité.{' '}
        <Link href="/financement-constructys-formation-ia-btp" className="text-[#377CF3] hover:underline">
          Page financement Constructys
        </Link>
        {' · '}
        <Link href="/contact" className="text-[#377CF3] hover:underline">
          Contact
        </Link>
        {' · '}
        <Link href="/formation-ia/faq" className="text-[#377CF3] hover:underline">
          FAQ
        </Link>
      </p>
    </article>
  );
}

/** Page Paris prioritaire — contenu renforcé (1000+ mots) */
function FormationIaParisBody() {
  const metiers = getVilleLinkedMetiers({
    slug: 'btp-paris',
    label: 'Paris',
    dept: '75',
    deptName: 'Paris',
  });

  return (
    <article className="prose prose-slate max-w-none">
      <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
        Formation IA, ChatGPT et Claude AI pour le BTP à Paris et en Île-de-France
      </h1>
      <p className="lead text-lg text-slate-700">
        Accroche : <strong>Formation IA, ChatGPT et Claude AI pour le BTP à Paris et en Île-de-France</strong>{' '}
        — pour dirigeants, conducteurs de travaux, responsables techniques et artisans qui veulent
        gagner du temps sur l&apos;écrit sans baisser la qualité. Paris intra-muros, Grand Paris et
        Métropole du Grand Paris : les flux documentaires sont intenses ; cette page pose un cadre
        clair pour une montée en compétence utile immédiatement.
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Paris Centre, Nord, Est, Ouest, Sud : une même méthode, des contextes variés
      </h2>
      <p>
        Des chantiers du <strong>Paris</strong> central aux opérations en périphérie, la pression
        calendaire et la diversité des maîtres d&apos;ouvrage rendent l&apos;assistant IA intéressant
        pour accélérer la préparation des écrits. Nous ne promettons pas la « magie » : nous
        enseignons <strong>ChatGPT</strong> et <strong>Claude AI</strong> comme outils au service de
        vos procédures (relecture, plan, synthèse), avec des garde-fous adaptés au BTP.
      </p>
      <p>
        Que vous interveniez près du <strong>Paris</strong> 1er, 2e, 3e, 4e, 5e, 6e, 7e, 8e, 9e, 10e,
        11e, 12e, 13e, 14e, 15e, 16e, 17e, 18e, 19e ou 20e arrondissement, les besoins se recoupent :
        réponses rapides, comptes rendus, structuration de dossiers. La différence se joue surtout dans
        vos contraintes locales (accès chantier, coordination urbaine, relations avec copropriétés) :
        nous intégrons ces paramètres dans les ateliers.
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Grand Paris & Métropole du Grand Paris : coordination et volumétrie documentaire
      </h2>
      <p>
        Au-delà du périphérique, les projets « Grand Paris » multiplient les interfaces entre acteurs.
        La <strong>formation IA construction</strong> et la <strong>formation intelligence artificielle bâtiment</strong>{' '}
        prennent ici tout leur sens pour hiérarchiser l&apos;information : un conducteur peut préparer
        une synthèse de réunion en quelques minutes à partir de notes brutes ; un dirigeant peut
        clarifier un courrier sensible avant envoi. <strong>Claude AI</strong> excelle sur les pièces
        longues ; <strong>ChatGPT</strong> brille pour itérer vite sur des formats courts.
      </p>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Exemples longue traîne couverts par nos ateliers (Paris & IDF)
      </h2>
      <ul>
        <li>
          <strong>Formation IA étanchéité Paris</strong> : PPSPS, courriers, synthèses techniques.
        </li>
        <li>
          <strong>Formation intelligence artificielle CVC Paris</strong> : notices, explications clients,
          structuration de propositions.
        </li>
        <li>
          <strong>Formation Claude AI entreprise générale Paris</strong> : consolidation multi-lots,
          relecture de mémoires.
        </li>
        <li>
          <strong>Formation IA VRD</strong> et traitements de dossiers réseaux en Île-de-France.
        </li>
        <li>
          <strong>Formation IA ascensoriste Grand Paris</strong> : comptes rendus, procédures, mails.
        </li>
      </ul>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Tous les lots : maillage vers les pages métiers
      </h2>
      <p>
        La page Paris centralise le lien vers <strong>tous</strong> les regroupements métiers (gros
        œuvre, seconde œuvre, fluides, électricité, VRD, rénovation, TP, etc.) :
      </p>
      <ul>
        {metiers.map((m) => (
          <li key={m.slug}>
            <Link href={`/formation-ia/${m.slug}`} className="text-[#377CF3] underline-offset-2 hover:underline">
              {capitalizeFirst(m.label)}
            </Link>
            <span className="text-slate-600"> — {m.categorie}</span>
          </li>
        ))}
      </ul>

      <h2 className="font-display text-xl font-semibold text-slate-900">
        Départements 77, 78, 91, 92, 93, 94, 95 : relais vers vos bassins
      </h2>
      <p>
        Pour une recherche locale : consultez aussi les pages ville (Versailles, Créteil, Nanterre,
        Saint-Denis, Cergy-Pontoise, Évry-Courcouronnes, Melun, etc.) depuis le{' '}
        <Link href="/formation-ia" className="text-[#377CF3] hover:underline">
          hub formation IA BTP
        </Link>
        . L&apos;objectif est de concilier <strong>SEO local</strong> et utilité réelle : chaque page
        reste lisible, avec des exemples concrets.
      </p>

      <h2 className="font-display flex flex-wrap items-center gap-2 text-xl font-semibold text-slate-900">
        <QualiopiLogoInline heightPx={28} className="hidden sm:inline-block" />
        <span>Qualiopi, OPCO Constructys, contact</span>
      </h2>
      <p>
        OFC Création d&apos;Entreprise — Laure Olivié, formatrice <strong>ChatGPT</strong> et{' '}
        <strong>Claude AI</strong> pour le BTP. {formatProfessionalsTrainedCount()}+ professionnels formés, note{' '}
        {SOCIAL_PROOF.AVERAGE_RATING}. Siège :
        Guyancourt (78).{' '}
        <Link href="/financement-constructys-formation-ia-btp" className="text-[#377CF3] hover:underline">
          Financement Constructys
        </Link>
        {' · '}
        <Link href="/contact" className="text-[#377CF3] hover:underline">
          Contact
        </Link>
        {' · '}
        <Link href="/formation-ia/faq" className="text-[#377CF3] hover:underline">
          FAQ
        </Link>
      </p>
    </article>
  );
}
