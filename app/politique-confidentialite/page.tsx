import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Politique de confidentialité — OFC Création d\'Entreprise',
  description:
    "Politique confidentialité OFC : données personnelles, RGPD, droits d'accès. Informations pour stagiaires et prospects des formations IA BTP.",
  path: '/politique-confidentialite',
  keywords: ['RGPD formation', 'politique confidentialité organisme', 'données personnelles stagiaires'],
});

export default function PolitiqueConfidentialitePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* En-tête */}
      <div className="border-b border-slate-200 pb-8">
        <p className="text-sm text-[var(--accent)] underline">
          Consentement : Manifestation de volonté, libre, spécifique, éclairée et
          univoque.
        </p>
        <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
          Politique de confidentialité
        </h1>
        <p className="mt-2 font-medium text-[var(--accent)]">
          En vigueur au : 30 janvier 2026
        </p>
        <div className="mt-6 space-y-1 text-slate-600">
          <p>
            <span className="font-semibold text-[var(--accent)]">
              OFC CRÉATION D&apos;ENTREPRISE
            </span>
          </p>
          <p>6 rue Henri Dunant, 78280 GUYANCOURT</p>
          <p>SIRET : 905 244 281 00010 | NDA : 11788515078</p>
          <p>
            Email :{' '}
            <a
              href="mailto:laureolivie@yahoo.fr"
              className="text-[var(--accent)] hover:underline"
            >
              laureolivie@yahoo.fr
            </a>
            {' · '}
            Téléphone :{' '}
            <a
              href="tel:+33695661818"
              className="text-[var(--accent)] hover:underline"
            >
              06 95 66 18 18
            </a>
          </p>
          <p>
            Site :{' '}
            <a
              href="https://www.laureolivie.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              www.laureolivie.fr
            </a>
          </p>
          <p>Représentant légal : Laure OLIVIÉ</p>
        </div>
        <div className="mt-6 rounded-lg bg-slate-50 p-4">
          <p className="font-semibold text-slate-900">
            Responsable de la protection des données : Laure OLIVIÉ
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Pour exercer vos droits RGPD :{' '}
            <a
              href="mailto:laureolivie@yahoo.fr"
              className="text-[var(--accent)] hover:underline"
            >
              laureolivie@yahoo.fr
            </a>
          </p>
          <p className="mt-1 text-sm text-slate-600">
            CNIL :{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              www.cnil.fr
            </a>
          </p>
        </div>
      </div>

      <article className="mt-12">
        {/* ARTICLE 2 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 2 — DONNÉES PERSONNELLES COLLECTÉES
          </h2>
          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            2.1 Définition
          </h3>
          <p className="mt-2 text-slate-600">
            Les données personnelles sont toutes les informations permettant
            d&apos;identifier directement ou indirectement une personne physique.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            2.2 Catégories de données collectées
          </h3>
          <p className="mt-2 font-medium text-slate-700">
            Lors de la demande d&apos;information ou de devis :
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-600">
            <li>Civilité (M./Mme)</li>
            <li>Nom et prénom</li>
            <li>Adresse email</li>
            <li>Numéro de téléphone</li>
            <li>Entreprise (si applicable)</li>
            <li>Fonction</li>
            <li>Message / demande</li>
          </ul>

          <p className="mt-4 font-medium text-slate-700">
            Lors de l&apos;inscription à une formation :
          </p>
          <p className="mt-1 text-sm font-semibold text-[var(--accent)] underline">
            Données d&apos;identification
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-6 text-slate-600">
            <li>Civilité — Nom et prénom — Date et lieu de naissance</li>
            <li>Adresse postale complète — Adresse email</li>
            <li>Numéro de téléphone fixe et/ou mobile</li>
            <li>Numéro de sécurité sociale (si nécessaire pour les déclarations)</li>
          </ul>

          <p className="mt-4 font-medium text-slate-700">Données professionnelles :</p>
          <ul className="mt-1 list-disc space-y-1 pl-6 text-slate-600">
            <li>Situation professionnelle (salarié, demandeur d&apos;emploi, indépendant…)</li>
            <li>Nom de l&apos;employeur — Fonction occupée — Secteur d&apos;activité — Ancienneté</li>
          </ul>

          <p className="mt-4 font-medium text-slate-700">
            Données relatives à la formation :
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-6 text-slate-600">
            <li>Formations suivies — Dates — Résultats des évaluations</li>
            <li>Émargement — Attestations et certificats délivrés</li>
          </ul>

          <p className="mt-4 font-medium text-slate-700">
            Données de connexion (formations à distance) :
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-6 text-slate-600">
            <li>Adresse IP — Historique de connexion — Durée — Pages consultées</li>
          </ul>

          <p className="mt-4 font-medium text-slate-700">Données financières :</p>
          <ul className="mt-1 list-disc space-y-1 pl-6 text-slate-600">
            <li>Coordonnées bancaires (uniquement pour remboursements éventuels)</li>
            <li>Factures et historique des paiements</li>
          </ul>

          <p className="mt-4 font-medium text-slate-700">
            Données sensibles (sur demande et avec consentement explicite) :
          </p>
          <ul className="mt-1 list-disc space-y-1 pl-6 text-slate-600">
            <li>Reconnaissance de la qualité de travailleur handicapé (RQTH)</li>
            <li>Informations médicales nécessaires à l&apos;adaptation de la formation</li>
          </ul>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            2.3 Données non collectées
          </h3>
          <p className="mt-2 text-slate-600">
            Nous ne collectons pas : données révélant l&apos;origine raciale ou
            ethnique, les opinions politiques, philosophiques ou religieuses,
            l&apos;appartenance syndicale, les données génétiques ou biométriques,
            les données relatives à l&apos;orientation sexuelle.
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Sauf consentement explicite et justification par une obligation légale.
          </p>
        </section>

        {/* ARTICLE 3 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 3 — FINALITÉS ET BASES LÉGALES DU TRAITEMENT
          </h2>
          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            3.1 Finalités du traitement
          </h3>
          <p className="mt-2 text-slate-600">
            Nous traitons vos données personnelles pour les finalités suivantes :
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr className="bg-[var(--accent)] text-white">
                  <th className="border border-slate-200 px-4 py-3 text-left">
                    Finalité
                  </th>
                  <th className="border border-slate-200 px-4 py-3 text-left">
                    Base légale
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Gestion des demandes d&apos;information et de contact
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Consentement + intérêt légitime
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Gestion des inscriptions et dossiers de formation
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Exécution du contrat
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Suivi pédagogique et administratif des formations
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Exécution du contrat + obligation légale
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Délivrance des attestations et certificats
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Obligation légale
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Facturation et comptabilité
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Obligation légale
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Déclarations obligatoires (OPCO, État, Régions)
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Obligation légale
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Gestion de la relation client (suivi, réclamations)
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Exécution du contrat + intérêt légitime
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Amélioration de nos formations (questionnaires de satisfaction)
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Consentement + intérêt légitime
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Envoi d&apos;informations sur nos formations et actualités
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Consentement (avec possibilité de désinscription)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Gestion du handicap et des aménagements
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Consentement explicite
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Respect des obligations légales en matière de formation
                    professionnelle
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Obligation légale
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Sécurité et prévention de la fraude
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Intérêt légitime
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            3.2 Bases légales détaillées
          </h3>
          <ul className="mt-4 space-y-4 text-slate-600">
            <li>
              <strong>Exécution du contrat :</strong> Le traitement est nécessaire
              à l&apos;exécution du contrat ou de la convention de formation.
            </li>
            <li>
              <strong>Obligation légale :</strong> Le traitement est imposé par la
              réglementation : Code du travail (L.6351-1 et suivants), déclarations
              aux financeurs, obligations comptables et fiscales, règlement
              Qualiopi.
            </li>
            <li>
              <strong>Consentement :</strong> Vous avez donné votre accord
              explicite pour le traitement de vos données pour une finalité
              spécifique.
            </li>
            <li>
              <strong>Intérêt légitime :</strong> Le traitement est nécessaire à
              nos intérêts légitimes (amélioration des services, relation client)
              sous réserve du respect de vos droits fondamentaux.
            </li>
          </ul>
        </section>

        {/* ARTICLE 4 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 4 — DESTINATAIRES DES DONNÉES
          </h2>
          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            4.1 Destinataires internes
          </h3>
          <p className="mt-2 text-slate-600">
            Vos données sont accessibles à : notre équipe administrative, aux
            formateurs (pour les données nécessaires à la réalisation de la
            formation), au référent handicap (uniquement pour les données
            relatives au handicap).
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            4.2 Destinataires externes
          </h3>
          <p className="mt-2 text-slate-600">
            Vos données peuvent être transmises à : Organismes de financement
            (OPCO, Pôle Emploi, Régions, État/Caisse des Dépôts pour le CPF),
            partenaires techniques (hébergeur, plateforme de formation à distance,
            messagerie, CRM), autorités compétentes (DREETS, administration
            fiscale, Qualiopi, autorités judiciaires sur réquisition),
            prestataires (expert-comptable, prestataires de paiement).
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            4.3 Garanties
          </h3>
          <p className="mt-2 text-slate-600">
            Tous les destinataires sont soumis à des obligations de sécurité et
            de confidentialité. Nous nous assurons que les données sont transmises
            de manière sécurisée et que les destinataires respectent la
            réglementation en vigueur.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            4.4 Transferts hors Union Européenne
          </h3>
          <p className="mt-2 text-slate-600">
            Aucune donnée personnelle n&apos;est transférée en dehors de l&apos;Union
            Européenne. Si un tel transfert devait s&apos;avérer nécessaire, nous
            nous assurerions qu&apos;il respecte les garanties appropriées prévues
            par le RGPD (clauses contractuelles types, décision d&apos;adéquation).
          </p>
        </section>

        {/* ARTICLE 5 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 5 — DURÉE DE CONSERVATION DES DONNÉES
          </h2>
          <p className="mt-4 text-slate-600">
            Nous conservons vos données personnelles uniquement pendant la durée
            nécessaire aux finalités pour lesquelles elles ont été collectées, dans
            le respect des obligations légales.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse border border-slate-200 text-sm">
              <thead>
                <tr className="bg-[var(--accent)] text-white">
                  <th className="border border-slate-200 px-4 py-3 text-left">
                    Catégorie de données
                  </th>
                  <th className="border border-slate-200 px-4 py-3 text-left">
                    Durée de conservation
                  </th>
                  <th className="border border-slate-200 px-4 py-3 text-left">
                    Base légale
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-600">
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Demandes d&apos;information (sans suite)
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    3 ans à compter du dernier contact
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Prescription commerciale
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Devis non signés
                  </td>
                  <td className="border border-slate-200 px-4 py-3">2 ans</td>
                  <td className="border border-slate-200 px-4 py-3">
                    Prescription commerciale
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Dossiers de formation (stagiaires)
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Pendant la formation + 30 ans
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Obligation légale (L.6352-12 Code du travail)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Pièces comptables (factures)
                  </td>
                  <td className="border border-slate-200 px-4 py-3">10 ans</td>
                  <td className="border border-slate-200 px-4 py-3">
                    Obligation légale (Code de commerce)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Documents fiscaux
                  </td>
                  <td className="border border-slate-200 px-4 py-3">6 ans</td>
                  <td className="border border-slate-200 px-4 py-3">
                    Obligation légale (Livre des procédures fiscales)
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Données de connexion (logs)
                  </td>
                  <td className="border border-slate-200 px-4 py-3">1 an</td>
                  <td className="border border-slate-200 px-4 py-3">
                    Obligation légale
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Données de prospection (newsletter)
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    3 ans à compter du dernier contact
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Prescription commerciale
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Données RQTH et aménagements
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Durée de la formation + 5 ans
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    Certification Qualiopi
                  </td>
                </tr>
                <tr>
                  <td className="border border-slate-200 px-4 py-3">
                    Questionnaires de satisfaction
                  </td>
                  <td className="border border-slate-200 px-4 py-3">5 ans</td>
                  <td className="border border-slate-200 px-4 py-3">
                    Certification Qualiopi
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-slate-600">
            À l&apos;issue de ces durées, vos données sont : soit supprimées
            définitivement, soit anonymisées (pour les statistiques), soit
            archivées (uniquement si obligation légale).
          </p>
        </section>

        {/* ARTICLE 6 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 6 — SÉCURITÉ DES DONNÉES
          </h2>
          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            6.1 Mesures de sécurité techniques
          </h3>
          <p className="mt-2 text-slate-600">
            Nous mettons en œuvre des mesures de sécurité appropriées pour
            protéger vos données contre : l&apos;accès non autorisé, la
            modification non autorisée, la divulgation, la perte, la destruction
            accidentelle.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-600">
            <li>Chiffrement des données sensibles (SSL/TLS)</li>
            <li>
              Sécurisation des accès (authentification forte, gestion des mots de
              passe)
            </li>
            <li>Sauvegardes régulières et sécurisées</li>
            <li>Pare-feu et antivirus</li>
            <li>Mises à jour de sécurité régulières</li>
            <li>Surveillance et détection des incidents</li>
          </ul>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            6.2 Mesures organisationnelles
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-600">
            <li>Accès aux données limité au personnel habilité</li>
            <li>Sensibilisation du personnel à la protection des données</li>
            <li>Clauses de confidentialité dans les contrats de travail</li>
            <li>Gestion des droits d&apos;accès (principe du moindre privilège)</li>
            <li>Procédure de gestion des violations de données</li>
          </ul>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            6.3 Hébergement des données
          </h3>
          <p className="mt-2 text-slate-600">
            Hébergeur du site : O2switch — Localisation des serveurs : Union
            Européenne.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            6.4 Confidentialité
          </h3>
          <p className="mt-2 text-slate-600">
            Tous les membres de notre équipe sont tenus à une obligation de
            confidentialité stricte. Des clauses de confidentialité sont incluses
            dans tous nos contrats avec des prestataires externes.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            6.5 Notification des violations
          </h3>
          <p className="mt-2 text-slate-600">
            En cas de violation de données susceptible d&apos;engendrer un risque
            pour vos droits et libertés : notifier la CNIL dans les 72 heures,
            vous informer dans les meilleurs délais, mettre en œuvre toutes les
            mesures pour limiter les conséquences.
          </p>
        </section>

        {/* ARTICLE 7 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 7 — VOS DROITS
          </h2>
          <p className="mt-4 text-slate-600">
            Conformément au RGPD et à la loi Informatique et Libertés, vous
            disposez des droits suivants sur vos données personnelles :
          </p>
          <ul className="mt-6 space-y-4 text-slate-600">
            <li>
              <strong className="text-[var(--accent)]">
                7.1 Droit d&apos;accès (article 15 RGPD)
              </strong>
              : Vous avez le droit d&apos;obtenir la confirmation que vos données
              sont traitées, d&apos;y accéder et d&apos;en recevoir une copie.
            </li>
            <li>
              <strong className="text-[var(--accent)]">
                7.2 Droit de rectification (article 16 RGPD)
              </strong>
              : Vous pouvez demander la correction de vos données si elles sont
              inexactes, incomplètes ou obsolètes.
            </li>
            <li>
              <strong className="text-[var(--accent)]">
                7.3 Droit à l&apos;effacement / « droit à l&apos;oubli » (article 17
                RGPD)
              </strong>
              : Vous pouvez demander l&apos;effacement de vos données dans plusieurs
              cas. Limites : ce droit ne s&apos;applique pas lorsque la
              conservation est obligatoire (ex. dossiers de formation 30 ans).
            </li>
            <li>
              <strong className="text-[var(--accent)]">
                7.4 Droit à la limitation du traitement (article 18 RGPD)
              </strong>
              : Vous pouvez demander le gel temporaire du traitement dans
              certains cas.
            </li>
            <li>
              <strong className="text-[var(--accent)]">
                7.5 Droit à la portabilité (article 20 RGPD)
              </strong>
              : Vous pouvez recevoir vos données dans un format structuré et les
              transmettre à un autre responsable. Conditions : traitement fondé
              sur consentement ou contrat, traitement automatisé.
            </li>
            <li>
              <strong className="text-[var(--accent)]">
                7.6 Droit d&apos;opposition (article 21 RGPD)
              </strong>
              : Opposition pour motif légitime. Opposition à la prospection : vous
              pouvez vous opposer à tout moment à la prospection commerciale — en
              cas d&apos;emails, cliquez sur le lien de désinscription ou
              contactez-nous.
            </li>
            <li>
              <strong className="text-[var(--accent)]">
                7.7 Droit de retirer votre consentement
              </strong>
              : Lorsque le traitement est fondé sur le consentement, vous pouvez
              le retirer à tout moment. Le retrait ne remet pas en cause la
              licéité du traitement antérieur.
            </li>
            <li>
              <strong className="text-[var(--accent)]">
                7.8 Droit de définir des directives post-mortem
              </strong>
              : Vous pouvez définir des directives concernant la conservation,
              l&apos;effacement et la communication de vos données après votre décès.
            </li>
          </ul>
        </section>

        {/* ARTICLE 8 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 8 — EXERCICE DE VOS DROITS
          </h2>
          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            8.1 Comment exercer vos droits ?
          </h3>
          <p className="mt-2 text-slate-600">Contactez-nous :</p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-slate-600">
            <li>
              Par email :{' '}
              <a
                href="mailto:laureolivie@yahoo.fr"
                className="text-[var(--accent)] hover:underline"
              >
                laureolivie@yahoo.fr
              </a>
            </li>
            <li>
              Par courrier : OFC CRÉATION D&apos;ENTREPRISE — À l&apos;attention du
              Responsable de la protection des données — 6 rue Henri Dunant —
              78280 GUYANCOURT
            </li>
            <li>
              Par téléphone :{' '}
              <a
                href="tel:+33695661818"
                className="text-[var(--accent)] hover:underline"
              >
                06 95 66 18 18
              </a>
            </li>
          </ul>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            8.2 Informations à fournir
          </h3>
          <p className="mt-2 text-slate-600">
            Pour traiter votre demande : nom, prénom, coordonnées ; copie d&apos;une
            pièce d&apos;identité (si doute sur votre identité) ; description
            précise de votre demande.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            8.3 Délai de réponse
          </h3>
          <p className="mt-2 text-slate-600">
            Nous nous engageons à répondre dans un mois à compter de la réception.
            Ce délai peut être prolongé de deux mois en cas de complexité ; vous
            en serez informé.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            8.4 Gratuité
          </h3>
          <p className="mt-2 text-slate-600">
            L&apos;exercice de vos droits est gratuit. Pour les demandes
            manifestement infondées ou excessives (notamment répétitives), nous
            pouvons exiger des frais raisonnables ou refuser de donner suite.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            8.5 Refus de donner suite
          </h3>
          <p className="mt-2 text-slate-600">
            En cas de refus, vous serez informé des motifs et de la possibilité
            d&apos;introduire une réclamation auprès de la CNIL.
          </p>
        </section>

        {/* ARTICLE 9 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 9 — COOKIES ET TECHNOLOGIES SIMILAIRES
          </h2>
          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            9.1 Qu&apos;est-ce qu&apos;un cookie ?
          </h3>
          <p className="mt-2 text-slate-600">
            Un cookie est un petit fichier texte déposé sur votre terminal
            (ordinateur, tablette, smartphone) lors de la visite d&apos;un site
            internet.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            9.2 Cookies utilisés sur notre site
          </h3>
          <p className="mt-2 font-medium text-slate-700">
            Cookies strictement nécessaires (exemptés de consentement) :
          </p>
          <p className="mt-1 text-slate-600">
            Indispensables au fonctionnement du site : cookies de session,
            d&apos;authentification, de sécurité.
          </p>
          <p className="mt-4 font-medium text-slate-700">
            Cookies de mesure d&apos;audience :
          </p>
          <p className="mt-1 text-slate-600">
            Permettent de mesurer la fréquentation (nombre de visiteurs, pages
            consultées, durée). Ces cookies nécessitent votre consentement
            préalable.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            9.3 Gestion des cookies
          </h3>
          <p className="mt-2 text-slate-600">
            Lors de votre première visite : un bandeau vous informe et demande
            votre consentement. Vous pouvez à tout moment : accepter ou refuser
            via le gestionnaire, paramétrer votre navigateur pour refuser les
            cookies, supprimer les cookies déjà enregistrés.
          </p>
          <p className="mt-2 text-slate-600">
            Paramétrage navigateur : Chrome (Paramètres &gt; Confidentialité) —
            Firefox (Options &gt; Vie privée) — Safari (Préférences &gt;
            Confidentialité) — Edge (Paramètres &gt; Cookies).
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Note : Le refus des cookies peut impacter votre expérience de
            navigation.
          </p>

          <h3 className="mt-6 text-base font-semibold text-[var(--accent)] underline">
            9.4 Durée de conservation des cookies
          </h3>
          <p className="mt-2 text-slate-600">
            Cookies de session : supprimés à la fermeture du navigateur. Cookies
            persistants : maximum 13 mois.
          </p>
          <p className="mt-2 text-slate-600">
            Les boutons de partage sur les réseaux sociaux peuvent déposer des
            cookies.
          </p>
        </section>

        {/* ARTICLE 10 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 10 — MINEURS
          </h2>
          <p className="mt-4 text-slate-600">
            Nos services s&apos;adressent à des personnes majeures (18 ans et plus).
          </p>
        </section>

        {/* Modification importante */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            En cas de modification importante
          </h2>
          <p className="mt-4 text-slate-600">
            Nous vous en informerons par email ou par un avis sur notre site. La
            nouvelle version entrera en vigueur dès sa mise en ligne. La date de
            dernière mise à jour sera actualisée. Nous vous invitons à consulter
            régulièrement cette page.
          </p>
        </section>

        {/* ARTICLE 13 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 13 — RÉCLAMATION AUPRÈS DE LA CNIL
          </h2>
          <p className="mt-4 text-slate-600">
            Si vous estimez que vos droits ne sont pas respectés ou que le
            traitement de vos données personnelles n&apos;est pas conforme à la
            réglementation, vous avez le droit d&apos;introduire une réclamation
            auprès de l&apos;autorité de contrôle compétente :
          </p>
          <p className="mt-4 font-medium text-slate-900">
            Commission Nationale de l&apos;Informatique et des Libertés (CNIL)
          </p>
          <p className="mt-1 text-slate-600">
            3 Place de Fontenoy - TSA 80715 - 75334 PARIS CEDEX 07
          </p>
          <p className="mt-1 text-slate-600">
            Téléphone : 01 53 73 22 22 —{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              www.cnil.fr
            </a>
          </p>
          <p className="mt-2 text-slate-600">
            Plainte en ligne :{' '}
            <a
              href="https://www.cnil.fr/fr/plaintes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              www.cnil.fr/fr/plaintes
            </a>
          </p>
          <p className="mt-4 text-slate-600">
            Nous vous encourageons toutefois à nous contacter en priorité afin que
            nous puissions traiter votre réclamation.
          </p>
        </section>

        {/* ARTICLE 14 */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 14 — CONTACT
          </h2>
          <p className="mt-4 text-slate-600">
            Pour toute question relative à la protection de vos données
            personnelles ou à la présente Politique de confidentialité :
          </p>
          <div className="mt-4 rounded-lg bg-slate-50 p-6">
            <p className="font-semibold text-slate-900">
              Responsable de la protection des données : Laure OLIVIÉ
            </p>
            <p className="mt-2">
              <a
                href="mailto:laureolivie@yahoo.fr"
                className="text-[var(--accent)] hover:underline"
              >
                laureolivie@yahoo.fr
              </a>
              {' · '}
              <a
                href="tel:+33695661818"
                className="text-[var(--accent)] hover:underline"
              >
                06 95 66 18 18
              </a>
            </p>
            <p className="mt-2 text-slate-600">
              OFC CRÉATION D&apos;ENTREPRISE — 6 rue Henri Dunant — 78280 GUYANCOURT
            </p>
            <p className="mt-4 text-sm text-slate-600">
              Nous nous engageons à répondre dans les meilleurs délais.
            </p>
          </div>
        </section>

        {/* ARTICLE 15 - Glossaire */}
        <section className="mb-12">
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 15 — GLOSSAIRE
          </h2>
          <dl className="mt-6 space-y-4 text-slate-600">
            <div>
              <dt className="font-semibold text-[var(--accent)]">
                Donnée personnelle
              </dt>
              <dd className="mt-1">
                Toute information se rapportant à une personne physique identifiée
                ou identifiable.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--accent)]">Traitement</dt>
              <dd className="mt-1">
                Toute opération effectuée sur des données personnelles (collecte,
                enregistrement, utilisation, communication, effacement, etc.).
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--accent)]">
                Responsable de traitement
              </dt>
              <dd className="mt-1">
                Personne qui détermine les finalités et les moyens du traitement.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--accent)]">Destinataire</dt>
              <dd className="mt-1">
                Personne habilitée à recevoir communication des données.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--accent)]">RGPD</dt>
              <dd className="mt-1">
                Règlement Général sur la Protection des Données (UE) 2016/679.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--accent)]">CNIL</dt>
              <dd className="mt-1">
                Commission Nationale de l&apos;Informatique et des Libertés.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-[var(--accent)]">Consentement</dt>
              <dd className="mt-1">
                Manifestation de volonté, libre, spécifique, éclairée et univoque.
              </dd>
            </div>
          </dl>
        </section>
      </article>

      <div className="mt-12 border-t border-slate-200 pt-8">
        <Link
          href="/"
          className="text-[var(--accent)] font-medium hover:underline"
        >
          ← Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
