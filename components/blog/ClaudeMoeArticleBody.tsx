import Link from 'next/link';
import { EnBref } from '@/components/blog/EnBref';
import { PromptBlock } from '@/components/blog/PromptBlock';
import { ClaudeMoeFeatureCards } from '@/components/blog/ClaudeMoeFeatureCards';
import { PhaseGrid } from '@/components/blog/PhaseGrid';
import { FaqList } from '@/components/blog/FaqList';
import { BlogArticleMoeFinalBandeau } from '@/components/blog/BlogArticleMoeFinalBandeau';
import { CtaVisio } from '@/components/CtaVisio';
import { ArticleAuthorBio } from '@/components/blog/ArticleAuthorBio';
import { LINKS } from '@/lib/internal-links';
import { OFC_LINK } from '@/lib/ofc-interaction-classes';
import {
  CLAUDE_MOE_TOC,
  FAQ_ITEMS,
  PHASE_GRID_CARDS,
  PRUDENCE_RULES,
  PROMPT_CCTP_DPGF,
  PROMPT_CR,
  PROMPT_PROJET_OPERATION,
  PROMPT_VISA,
  SKILL_STEPS,
} from '@/lib/blog-claude-ia-maitrise-oeuvre-data';

const PROSE =
  'text-[17px] leading-[1.75] text-[#1A1A1A] [&_h2]:font-display [&_h2]:mt-12 [&_h2]:scroll-mt-28 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-[#1A1A1A] [&_h2]:first:mt-0 md:[&_h2]:text-3xl [&_h3]:font-display [&_h3]:mt-8 [&_h3]:scroll-mt-28 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#1A1A1A] md:[&_h3]:text-2xl [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-[#555F6D] [&_strong]:font-semibold [&_strong]:text-[#1A1A1A]';

export function ClaudeMoeArticleBody() {
  return (
    <div className={PROSE}>
      <EnBref>
        Claude, l&apos;IA d&apos;Anthropic, peut préparer une grande partie de l&apos;écrit
        d&apos;une mission de maîtrise d&apos;œuvre : CCTP, analyse des offres, pré-analyse des
        visas, comptes rendus de chantier, listes de réserves et contrôle des DOE. Bien configuré
        avec un Projet par opération et des Skills, il travaille à partir des pièces du marché et
        des gabarits de l&apos;agence. Le maître d&apos;œuvre reste responsable : il relit, corrige
        et signe chaque document.
      </EnBref>

      <h2 id={CLAUDE_MOE_TOC[0].id}>Pourquoi l&apos;IA intéresse les maîtres d&apos;œuvre</h2>
      <p>
        Une mission de maîtrise d&apos;œuvre produit beaucoup d&apos;écrit. En phase DCE, il faut
        rédiger ou adapter les CCTP et vérifier leur cohérence avec les DPGF. En ACT, il faut
        comparer les offres et rédiger le rapport d&apos;analyse. En phase DET, les comptes rendus,
        les visas et les relances s&apos;enchaînent chaque semaine. À la réception, viennent les
        listes de réserves, leur suivi et le contrôle des DOE.
      </p>
      <p>
        Ces tâches demandent de la rigueur, mais une bonne partie relève de la mise en forme, de la
        comparaison et de la reformulation. C&apos;est précisément là qu&apos;un assistant IA comme
        Claude peut faire gagner du temps, à condition de lui fournir les bonnes pièces et des
        consignes claires.
      </p>
      <h3>Ce que Claude ne fait pas à votre place</h3>
      <p>
        Claude ne remplace ni le jugement technique ni la responsabilité contractuelle du maître
        d&apos;œuvre. Il ne note pas les offres à votre place, ne tranche pas un choix technique et
        ne valide pas un visa. Il prépare un premier jet solide, que vous vérifiez. Cette règle,
        « l&apos;IA prépare, le maître d&apos;œuvre valide et signe », structure tous les usages qui
        suivent.
      </p>

      <h2 id={CLAUDE_MOE_TOC[1].id}>
        Quelles fonctionnalités de Claude utiliser en maîtrise d&apos;œuvre ?
      </h2>
      <p>
        Claude ne se limite plus à une fenêtre de discussion. Six fonctionnalités sont utiles en
        agence de MOE :
      </p>
      <div className="my-6 hidden md:block">
        <ClaudeMoeFeatureCards />
      </div>
      <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 md:hidden">
        <table className="min-w-[640px] w-full text-left text-sm text-[#555F6D]">
          <thead className="bg-[#F2F2F2] text-[#1A1A1A]">
            <tr>
              <th className="px-3 py-2 font-semibold">Fonctionnalité</th>
              <th className="px-3 py-2 font-semibold">À quoi elle sert</th>
              <th className="px-3 py-2 font-semibold">Exemple en maîtrise d&apos;œuvre</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-semibold">Projets</td>
              <td className="px-3 py-2">Un espace avec vos documents et des consignes permanentes</td>
              <td className="px-3 py-2">
                Un projet par opération : programme, CCTP, DPGF, planning, CR précédents
              </td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-semibold">Skills</td>
              <td className="px-3 py-2">
                Une méthode enregistrée une fois et appliquée automatiquement
              </td>
              <td className="px-3 py-2">« CR de chantier au format de l&apos;agence »</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-semibold">Connecteurs</td>
              <td className="px-3 py-2">
                Un accès à vos outils : Outlook, Gmail, Google Drive, SharePoint
              </td>
              <td className="px-3 py-2">
                Retrouver le dernier mail d&apos;une entreprise sur un lot
              </td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-semibold">Fichiers</td>
              <td className="px-3 py-2">Lecture de PDF, Word, Excel et production de documents</td>
              <td className="px-3 py-2">Tableau comparatif des offres en Excel</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-semibold">Tâches planifiées</td>
              <td className="px-3 py-2">Une consigne qui se lance seule à intervalle régulier</td>
              <td className="px-3 py-2">Chaque lundi, la liste des actions en retard</td>
            </tr>
            <tr className="border-t border-slate-100">
              <td className="px-3 py-2 font-semibold">Agents et Claude Code</td>
              <td className="px-3 py-2">Des traitements en plusieurs étapes sur de nombreux fichiers</td>
              <td className="px-3 py-2">
                Classer les pièces d&apos;un DOE et repérer les manquants
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Les Projets, les Skills et les connecteurs sont réservés aux offres payantes de Claude. Les
        fonctionnalités évoluent vite : vérifiez ce qui est inclus dans votre offre avant de vous
        lancer.
      </p>

      <h2 id={CLAUDE_MOE_TOC[2].id}>Étape 1 : créer un Projet par opération</h2>
      <p>
        C&apos;est le point de départ. Dans un Projet, déposez le programme et la notice descriptive,
        les CCTP et DPGF de tous les lots, le CCAP et le règlement de consultation, le planning, la
        liste des intervenants et les derniers comptes rendus.
      </p>
      <p>Ajoutez ensuite des instructions permanentes. Voici une base à adapter :</p>
      <PromptBlock fileName="instructions-projet-moe.txt" text={PROMPT_PROJET_OPERATION} />
      <p>
        Ajoutez aussi la liste des lots et des entreprises titulaires : Claude attribuera ainsi les
        actions des comptes rendus aux bonnes entreprises.
      </p>
      <blockquote className="my-6 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] px-5 py-4 text-[#555F6D]">
        <p>
          <strong className="text-[#1A1A1A]">Aller plus loin ?</strong> Ces méthodes sont
          travaillées sur vos propres dossiers en formation.{' '}
          <Link href={`${LINKS.prendreRdv}?src=blog-moe`} className={OFC_LINK}>
            Réservez votre visio découverte gratuite
          </Link>
        </p>
      </blockquote>

      <h2 id={CLAUDE_MOE_TOC[3].id}>Les 12 usages de Claude, phase par phase</h2>
      <PhaseGrid cards={PHASE_GRID_CARDS} />

      <h3>Phase DCE</h3>
      <p>
        <strong>1. Rédiger un CCTP de lot à partir de vos CCTP types.</strong> Déposez deux ou trois
        CCTP de référence et la notice du projet. Demandez à Claude de garder votre structure,
        d&apos;adapter les ouvrages au programme et de marquer « [À VALIDER] » chaque choix technique
        qu&apos;il a dû faire.
      </p>
      <p>
        <strong>2. Contrôler la cohérence CCTP / DPGF.</strong>
      </p>
      <PromptBlock fileName="prompt-cctp-dpgf.txt" text={PROMPT_CCTP_DPGF} />
      <p>
        Pour approfondir l&apos;analyse des pièces de marché, consultez notre guide sur{' '}
        <Link href={LINKS.iaAnalyseDce} className={OFC_LINK}>
          l&apos;analyse d&apos;un DCE avec l&apos;IA
        </Link>
        .
      </p>

      <h3>Phase ACT</h3>
      <p>
        <strong>3. Préparer l&apos;analyse des offres.</strong> À partir des DPGF remplies et du
        règlement de consultation, Claude produit un tableau comparatif ligne à ligne, avec votre
        estimation en référence. Il signale les écarts importants, les lignes non chiffrées et les
        variantes, puis prépare les questions à poser aux candidats. Il ne note pas les offres.
      </p>
      <p>
        <strong>4. Rédiger le rapport d&apos;analyse.</strong> Fournissez le tableau validé et vos
        notes sur la valeur technique. Claude structure le rapport (contexte, offres reçues, analyse
        prix, analyse technique par critère, synthèse) sans modifier vos notes.
      </p>

      <h3>Phase VISA</h3>
      <p>
        <strong>5. Pré-analyser une fiche technique.</strong>
      </p>
      <PromptBlock fileName="prompt-visa.txt" text={PROMPT_VISA} />
      <p>
        <strong>6. Tenir le suivi des visas.</strong> Avec le connecteur de votre messagerie, Claude
        repère les documents d&apos;exécution reçus et complète le tableau de suivi : lot, émetteur,
        indice, date de réception. Il signale ceux qui attendent depuis trop longtemps.
      </p>

      <h3>Phase DET</h3>
      <p>
        <strong>7. Produire le compte rendu de chantier à partir d&apos;une dictée.</strong> Dictez vos
        notes en sortant de réunion, puis collez la transcription.
      </p>
      <PromptBlock fileName="prompt-cr-chantier.txt" text={PROMPT_CR} />
      <p>
        Notre guide dédié détaille la méthode :{' '}
        <Link href={LINKS.iaCompteRenduChantier} className={OFC_LINK}>
          le compte rendu de chantier avec l&apos;IA
        </Link>
        .
      </p>
      <p>
        <strong>8. Relancer les entreprises.</strong> À partir du dernier CR, Claude rédige un mail
        court par entreprise ayant des actions en retard, avec l&apos;action, la date prévue et la
        nouvelle échéance demandée.
      </p>

      <h3>Phase OPC</h3>
      <p>
        <strong>9. Analyser un glissement de planning.</strong> Comparez le planning initial et le
        planning mis à jour : Claude liste les tâches qui ont glissé, l&apos;impact sur le chemin
        critique, et rédige une note courte pour le maître d&apos;ouvrage avec des pistes de
        rattrapage.
      </p>

      <h3>Réception et DOE</h3>
      <p>
        <strong>10. Établir la liste des réserves.</strong> À partir de vos notes et photos
        d&apos;OPR, Claude classe les réserves par lot et par local, avec une description précise et
        un délai de levée proposé, au format tableau prêt à joindre au PV.
      </p>
      <p>
        <strong>11. Suivre la levée des réserves.</strong> Il met à jour le statut de chaque réserve,
        calcule le taux de levée par lot et prépare les relances.
      </p>
      <p>
        <strong>12. Contrôler la complétude des DOE.</strong> Il compare la liste des documents
        attendus au CCTP avec les fichiers remis, puis prépare le mail de demande des pièces
        manquantes.
      </p>
      <blockquote className="my-6 rounded-2xl border-l-4 border-[#377CF3] bg-[#F2F2F2] px-5 py-4 text-[#555F6D]">
        <p>
          <strong className="text-[#1A1A1A]">Former votre agence ?</strong> La formation{' '}
          <Link href={LINKS.formationIaMaitriseOeuvre} className={OFC_LINK}>
            L&apos;IA au service des maîtres d&apos;œuvre
          </Link>{' '}
          met en pratique ces usages en présentiel, en Île-de-France.{' '}
          <Link href={`${LINKS.prendreRdv}?src=blog-moe`} className={OFC_LINK}>
            Réservez votre visio découverte gratuite
          </Link>
        </p>
      </blockquote>

      <h2 id={CLAUDE_MOE_TOC[4].id}>
        Automatiser avec les Skills : créer votre premier Skill en 5 étapes
      </h2>
      <p>
        Quand un prompt revient chaque semaine, transformez-le en Skill. Un Skill est un dossier
        contenant un fichier d&apos;instructions (SKILL.md) et, si besoin, vos modèles. Claude le
        charge automatiquement dès que la tâche correspond à sa description.
      </p>
      <ol className="mt-6 space-y-6">
        {SKILL_STEPS.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#377CF3] text-sm font-bold text-white"
              aria-hidden
            >
              {index + 1}
            </span>
            <div>
              <p className="font-display text-base font-semibold text-[#1A1A1A]">
                {step.title}
              </p>
              <p className="mt-1 text-[#555F6D]">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-8">
        Un bon SKILL.md contient une description précise de quand l&apos;utiliser, les étapes dans
        l&apos;ordre, le format de sortie, les règles (dont « n&apos;invente aucune information ») et
        une vérification finale. Des Skills BTP sont disponibles en téléchargement sur notre page{' '}
        <Link href={LINKS.skillsClaudeBtp} className={OFC_LINK}>
          Skills Claude pour le BTP
        </Link>
        . Pour construire votre propre bibliothèque, la formation{' '}
        <Link href={LINKS.formationMaitriserClaudeAiBtp} className={OFC_LINK}>
          Maîtriser Claude AI pour le BTP
        </Link>{' '}
        couvre les Projets, les Skills, les connecteurs et Claude Code.
      </p>

      <h2 id={CLAUDE_MOE_TOC[5].id}>Les règles de prudence à respecter</h2>
      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PRUDENCE_RULES.map((rule) => (
          <li
            key={rule.title}
            className="rounded-2xl bg-[#F2F2F2] px-5 py-4 text-sm leading-relaxed text-[#555F6D]"
          >
            <strong className="text-[#1A1A1A]">{rule.title}</strong> : {rule.text}
          </li>
        ))}
      </ul>

      <h2 id={CLAUDE_MOE_TOC[6].id}>FAQ</h2>
      <FaqList items={FAQ_ITEMS} />

      <p className="mt-10 text-[#555F6D]">
        <strong className="text-[#1A1A1A]">À propos de l&apos;auteure</strong> : Laure Olivié,
        fondatrice de l&apos;organisme de formation OFC Création d&apos;Entreprise (certifié
        Qualiopi), 7 ans dans le BTP comme ex-dirigeante d&apos;ALIA BTP, instructrice LinkedIn
        Learning. Formations IA pour les PME du BTP, en présentiel en Île-de-France.
      </p>
      <p className="mt-6">
        <CtaVisio src="blog-moe" variant="inline" className="font-semibold" />
      </p>

      <ArticleAuthorBio />
      <BlogArticleMoeFinalBandeau />
    </div>
  );
}
