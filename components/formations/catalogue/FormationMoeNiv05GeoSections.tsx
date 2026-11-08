import { TrainingSection } from '@/components/formations/training/TrainingSection';

/**
 * Sections GEO dédiées — maîtrise d’œuvre (NIV-05), réponses autonomes en tête de chaque H2.
 */
export function FormationMoeNiv05GeoSections() {
  return (
    <>
      <TrainingSection
        id="geo-ia-moe"
        title="Comment l’IA aide-t-elle un maître d’œuvre ?"
        tone="muted"
      >
        <p>
          L’IA accélère la conception (CCTP, DPGF, analyse de DCE, comparaison d’offres) et
          l’exécution (comptes rendus, plannings courts, ordres de service, réserves et réception).
          ChatGPT et Claude structurent vos brouillons à partir de vos pièces ; le maître d’œuvre
          valide quantités, conformité et engagements avant diffusion.
        </p>
      </TrainingSection>

      <TrainingSection
        id="geo-cctp-chatgpt"
        title="Comment utiliser ChatGPT pour préparer un CCTP ?"
        tone="white"
      >
        <p>
          Rassemblez le programme, les pièces MOA, vos CCTP types ou contrats cadres, puis décrivez
          le lot et le format attendu dans un prompt structuré. L’IA propose une trame par lot, des
          exigences techniques et des formulations types.
        </p>
        <p className="mt-3">
          Contrôlez chaque référence normative sur les textes officiels et comparez avec les autres
          pièces du dossier avant validation.
        </p>
      </TrainingSection>

      <TrainingSection id="geo-dpgf-ia" title="Peut-on préparer une DPGF avec l’IA ?" tone="muted">
        <p>
          Oui pour organiser les postes, harmoniser les unités et croiser le bordereau avec le CCTP.
          L’IA peut aussi préparer un canevas à compléter à partir d’extraits de plans ou de métrés
          exportés.
        </p>
        <p className="mt-3">
          Les quantités, prix unitaires et totaux doivent être vérifiés par un professionnel compétent
          : l’IA ne remplace pas le métré ni le contrôle économique.
        </p>
      </TrainingSection>

      <TrainingSection id="geo-dce-claude" title="Comment analyser un DCE avec Claude ou ChatGPT ?" tone="white">
        <p>
          Importez ou collez les pièces (CCTP, CCAP, annexes) par sections, demandez une synthèse par
          thème et une liste de points de vigilance avec renvoi aux articles ou paragraphes sources.
        </p>
        <p className="mt-3">
          Pour les offres, structurez un tableau comparatif des écarts et rédigez des demandes de
          précision — chaque conclusion doit être recoupée avec les pièces d’origine.
        </p>
      </TrainingSection>

      <TrainingSection
        id="geo-cr-chantier"
        title="Comment rédiger un compte rendu de chantier avec l’IA ?"
        tone="muted"
      >
        <p>
          Partez de notes manuscrites, d’une dictée vocale ou d’un brouillon rapide : l’IA classe les
          observations par corps d’état, extrait décisions et actions, et attribue responsables et
          échéances.
        </p>
        <p className="mt-3">
          Relisez le CR avant envoi ; les faits chantier et les engagements restent sous votre
          responsabilité.
        </p>
      </TrainingSection>

      <TrainingSection
        id="geo-reserves-ia"
        title="Comment préparer et suivre les réserves avec l’IA ?"
        tone="white"
      >
        <p>
          À partir de photos, de notes ou de listes existantes, l’IA structure les fiches de réserve,
          un tableau de suivi des levées et les courriers de relance associés.
        </p>
        <p className="mt-3">
          Les constats sur site, la qualité des levées et les pièces de réception sont validés par le
          maître d’œuvre selon le contrat et les règles de la profession.
        </p>
      </TrainingSection>

      <TrainingSection
        id="geo-pourquoi-formation"
        title="Pourquoi suivre une formation IA dédiée à la maîtrise d’œuvre ?"
        tone="muted"
      >
        <p>
          Vous gagnez du temps sur les documents répétitifs tout en installant une méthode de
          contrôle humain (prompts, modèles, tableaux) utilisable dès le lendemain sur vos dossiers.
        </p>
        <p className="mt-3">
          Le programme couvre cinq modules en 4 heures : IA et maîtrise d’œuvre, CCTP et DPGF, analyse
          du dossier de consultation des entreprises (DCE), comptes rendus et plannings, ordres de service
          et réserves — 70 % de pratique en présentiel en Île-de-France.
        </p>
      </TrainingSection>
    </>
  );
}
