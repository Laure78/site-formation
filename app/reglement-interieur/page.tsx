import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';

export const metadata = {
  title: 'Règlement intérieur — OFC Création d\'Entreprise',
  description: 'Règlement intérieur des formations. Organisme certifié Qualiopi. Conforme Code du travail L.6352-3 et R.6352-1.',
};

export default function ReglementInterieurPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* En-tête */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <div className="text-center">
          <p className="text-sm font-medium text-[var(--accent)]">
            Organisme de formation certifié Qualiopi
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            RÈGLEMENT INTÉRIEUR
          </h1>
          <p className="mt-2 font-display text-xl font-bold text-[var(--accent)]">
            OFC CRÉATION D&apos;ENTREPRISE
          </p>
          <p className="mt-4 text-sm text-slate-600">
            Conformément aux articles L.6352-3 et suivants et R.6352-1 et suivants
            du Code du travail
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-slate-600">
            <span>SIRET : 905 244 281 00010</span>
            <span>NDA : 11788515078</span>
            <span>6 rue Henri Dunant, 78280 GUYANCOURT</span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 text-sm">
            <a
              href="mailto:contact@laureolivie.fr"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
            >
              <Mail size={16} strokeWidth={1.5} />
              contact@laureolivie.fr
            </a>
            <a
              href="tel:+33695661818"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
            >
              <Phone size={16} strokeWidth={1.5} />
              06 95 66 18 18
            </a>
          </div>
        </div>
      </div>

      <div className="mt-12 text-slate-600">
        <p className="text-lg">
          Le présent règlement intérieur s&apos;applique à toutes les personnes
          participant à une action de formation organisée par OFC CRÉATION
          D&apos;ENTREPRISE.
        </p>
        <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm">
          <p>
            <strong>Raison sociale :</strong> OFC CRÉATION D&apos;ENTREPRISE
          </p>
          <p>
            <strong>SIRET :</strong> 905 244 281 00010
          </p>
          <p>
            <strong>Numéro de déclaration d&apos;activité :</strong> 11788515078
          </p>
          <p>
            <strong>Siège social :</strong> 6 rue Henri Dunant, 78280 GUYANCOURT
          </p>
          <p>
            <strong>Certification Qualiopi :</strong> Organisme certifié
          </p>
        </div>
      </div>

      <article className="mt-12 space-y-12">
        {/* PRÉAMBULE */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            PRÉAMBULE
          </h2>
          <p className="mt-4 text-slate-600">
            Le présent règlement intérieur a pour objet de définir les règles de
            fonctionnement et de discipline applicables aux Stagiaires durant leur
            formation au sein de l&apos;Organisme, ainsi que les garanties de
            procédure dont ils bénéficient.
          </p>
          <p className="mt-4 text-slate-600">
            Il est applicable pour toute action de formation, qu&apos;elle se
            déroule : dans les locaux de l&apos;Organisme ; dans des locaux mis à
            disposition (intra-entreprise, centre de formation partenaire) ; à
            distance (e-learning, classes virtuelles).
          </p>
        </section>

        {/* ARTICLE 1 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 1 — CHAMP D&apos;APPLICATION
          </h2>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            1.1 Personnes concernées
          </h3>
          <p className="mt-2 text-slate-600">
            Le présent règlement s&apos;applique à toute personne inscrite à une
            formation dispensée par OFC CRÉATION D&apos;ENTREPRISE, ci-après
            dénommée « le Stagiaire », pour la durée de la formation suivie.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            1.2 Remise du règlement intérieur
          </h3>
          <p className="mt-2 text-slate-600">
            Le présent règlement intérieur est remis à chaque Stagiaire : lors de
            la signature du contrat ou de la convention de formation ; lors de
            l&apos;envoi de la convocation ; le premier jour de la formation.
          </p>
          <p className="mt-2 text-slate-600">
            Il est également consultable sur le site internet :{' '}
            <a
              href="https://www.laureolivie.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--accent)] hover:underline"
            >
              www.laureolivie.fr
            </a>
          </p>
          <p className="mt-2 text-slate-600">
            Le Stagiaire reconnaît en avoir pris connaissance et s&apos;engage à le
            respecter.
          </p>
        </section>

        {/* ARTICLE 2 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 2 — DISPOSITIONS GÉNÉRALES
          </h2>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            2.1 Principes généraux
          </h3>
          <p className="mt-2 text-slate-600">
            Les Stagiaires sont tenus de : respecter les horaires de formation ;
            respecter le matériel et les locaux mis à disposition ; adopter une
            attitude et un comportement respectueux envers le formateur, le
            personnel de l&apos;Organisme et les autres Stagiaires ; ne pas
            perturber le bon déroulement de la formation.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            2.2 Laïcité et neutralité
          </h3>
          <p className="mt-2 text-slate-600">
            Conformément aux principes de laïcité et de neutralité du service
            public, il est interdit : de faire du prosélytisme religieux,
            politique ou philosophique ; d&apos;arborer des signes ostentatoires
            pouvant porter atteinte à la liberté d&apos;autrui ; de tenir des propos
            discriminatoires.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            2.3 Égalité de traitement
          </h3>
          <p className="mt-2 text-slate-600">
            L&apos;Organisme s&apos;engage à assurer l&apos;égalité de traitement
            entre tous les Stagiaires sans discrimination liée : au sexe,
            l&apos;identité de genre ; à l&apos;âge ; à l&apos;origine ; à la
            religion ; à l&apos;orientation sexuelle ; à l&apos;état de santé ; au
            handicap ; à l&apos;appartenance syndicale ou politique.
          </p>
        </section>

        {/* ARTICLE 3 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 3 — ORGANISATION DES FORMATIONS
          </h2>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            3.1 Horaires de formation
          </h3>
          <p className="mt-2 font-medium text-slate-700">
            Formations en présentiel
          </p>
          <p className="mt-2 text-slate-600">
            Les horaires de formation sont précisés dans la convocation. Sauf
            indication contraire, les horaires habituels sont : matin 9h00-12h30 ;
            après-midi 14h00-17h30. Des pauses sont prévues à mi-matinée et
            mi-après-midi. Le déjeuner n&apos;est pas pris en charge par
            l&apos;Organisme sauf mention contraire.
          </p>
          <p className="mt-4 font-medium text-slate-700">
            Formations à distance
          </p>
          <p className="mt-2 text-slate-600">
            Les horaires des classes virtuelles sont précisés dans la convocation.
            Les formations en e-learning peuvent être suivies selon la
            disponibilité du Stagiaire, dans le respect du calendrier global de la
            formation.
          </p>

          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            3.2 Retards et absences
          </h3>
          <p className="mt-2 font-medium text-slate-700">Ponctualité</p>
          <p className="mt-2 text-slate-600">
            Les Stagiaires doivent arriver à l&apos;heure prévue. En cas de retard :
            le Stagiaire doit prévenir l&apos;Organisme dès que possible ; un
            retard de plus de 15 minutes peut entraîner un refus d&apos;accès à la
            salle ; les retards répétés peuvent entraîner des sanctions.
          </p>
          <p className="mt-4 font-medium text-slate-700">Absences</p>
          <p className="mt-2 text-slate-600">
            Toute absence doit être justifiée dans les plus brefs délais par
            téléphone (06 95 66 18 18) ou email (contact@laureolivie.fr).
          </p>
          <p className="mt-2 text-slate-600">
            En cas d&apos;absence injustifiée ou de justificatif non fourni,
            l&apos;Organisme se réserve le droit de ne pas délivrer l&apos;attestation
            de formation. Une absence non justifiée supérieure à 20% de la durée
            totale entraîne l&apos;exclusion de la session en cours.
          </p>

          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            3.3 Feuilles d&apos;émargement
          </h3>
          <p className="mt-2 text-slate-600">
            Les Stagiaires doivent signer une feuille d&apos;émargement par
            demi-journée (présentiel) ou un registre de connexion (à distance).
            L&apos;émargement conditionne la délivrance de l&apos;attestation et le
            versement des fonds par les financeurs. Tout refus d&apos;émargement
            est considéré comme une absence injustifiée.
          </p>
        </section>

        {/* ARTICLE 4 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 4 — ACCÈS AUX LOCAUX ET SÉCURITÉ
          </h2>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            4.1 Accès aux locaux de formation
          </h3>
          <p className="mt-2 text-slate-600">
            L&apos;accès aux locaux est réservé aux Stagiaires inscrits pendant les
            horaires de formation. Aucune personne extérieure ne peut accéder sans
            autorisation préalable.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            4.2 Consignes de sécurité
          </h3>
          <p className="mt-2 text-slate-600">
            Les Stagiaires doivent respecter les consignes affichées, connaître
            les issues de secours, ne pas encombrer les voies d&apos;évacuation. En
            cas d&apos;incendie : suivre les consignes, évacuer calmement, se
            diriger vers le point de rassemblement. Tout accident doit être
            immédiatement déclaré. Un registre des accidents est tenu conforme à
            l&apos;article R.6352-13 du Code du travail.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            4.3 Assurance
          </h3>
          <p className="mt-2 text-slate-600">
            Le Stagiaire doit être couvert par une assurance responsabilité civile.
            Une attestation peut être demandée.
          </p>
        </section>

        {/* ARTICLE 5 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 5 — HYGIÈNE ET SÉCURITÉ
          </h2>
          <p className="mt-4 text-slate-600">
            Interdiction stricte de fumer/vapoter dans les salles et espaces fermés
            (décret 2006-1386). Interdiction de consommer de l&apos;alcool ou des
            substances illicites ; toute infraction entraîne l&apos;exclusion
            immédiate. Repas interdits dans les salles ; boissons non alcoolisées
            autorisées hors évaluations. Hygiène corporelle et tenue correcte
            exigées. En situation sanitaire particulière, des mesures spécifiques
            peuvent être mises en place (masque, gel, distanciation).
          </p>
        </section>

        {/* ARTICLE 6 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 6 — UTILISATION DU MATÉRIEL ET DES LOCAUX
          </h2>
          <p className="mt-4 text-slate-600">
            Le matériel pédagogique doit être utilisé conformément à sa destination.
            Interdit : modifier la configuration informatique, installer des
            logiciels non autorisés, consulter des sites hors formation, dégrader le
            matériel. Tout Stagiaire causant des dégradations sera tenu de
            rembourser les frais. L&apos;Organisme n&apos;est pas responsable des
            effets personnels.
          </p>
        </section>

        {/* ARTICLE 7 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 7 — UTILISATION DES OUTILS NUMÉRIQUES
          </h2>
          <p className="mt-4 text-slate-600">
            Les identifiants de plateforme sont personnels et confidentiels.
            Interdit : enregistrer les sessions sans autorisation écrite,
            effectuer des captures d&apos;écran, diffuser les contenus.
            L&apos;accès internet doit être utilisé uniquement dans le cadre de la
            formation. Téléphones en mode silencieux pendant les sessions.
          </p>
        </section>

        {/* ARTICLE 8 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 8 — CONFIDENTIALITÉ ET PROPRIÉTÉ INTELLECTUELLE
          </h2>
          <p className="mt-4 text-slate-600">
            Les Stagiaires s&apos;engagent à respecter la confidentialité des
            échanges et à ne pas divulguer d&apos;informations sensibles. Les
            supports de formation sont la propriété exclusive de l&apos;Organisme
            (Code de la propriété intellectuelle). Toute reproduction,
            diffusion ou utilisation commerciale non autorisée constitue une
            contrefaçon (jusqu&apos;à 3 ans d&apos;emprisonnement et 300 000€
            d&apos;amende).
          </p>
        </section>

        {/* ARTICLE 9 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 9 — COMPORTEMENT ET DISCIPLINE
          </h2>
          <p className="mt-4 text-slate-600">
            Comportement respectueux exigé. Prohibés : discrimination, harcèlement,
            violences, menaces, prosélytisme, sollicitation commerciale non
            autorisée. Tenue correcte exigée. Participation active encouragée ;
            manque d&apos;implication peut faire l&apos;objet d&apos;un avertissement.
          </p>
        </section>

        {/* ARTICLE 10 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 10 — ÉVALUATION
          </h2>
          <p className="mt-4 text-slate-600">
            Les Stagiaires doivent se soumettre aux évaluations prévues (positionnement,
            formatives, finale). Toute fraude ou tentative de fraude entraîne
            l&apos;annulation de l&apos;évaluation, un avertissement écrit ; en
            cas de récidive : exclusion. Les questionnaires de satisfaction sont
            obligatoires.
          </p>
        </section>

        {/* ARTICLE 11 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 11 — SANCTIONS DISCIPLINAIRES
          </h2>
          <p className="mt-4 text-slate-600">
            Sanctions possibles : avertissement oral ; avertissement écrit ;
            exclusion temporaire (1 à 3 jours) ; exclusion définitive. Aucune
            sanction majeure sans information des griefs et possibilité de
            présenter sa défense (convocation 5 jours avant, entretien, notification
            sous 2 jours). En cas de faute grave (violence, harcèlement, vol,
            ébriété, etc.), exclusion immédiate à titre conservatoire. L&apos;exclusion
            n&apos;entraîne aucun remboursement.
          </p>
        </section>

        {/* ARTICLE 12 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 12 — REPRÉSENTATION DES STAGIAIRES
          </h2>
          <p className="mt-4 text-slate-600">
            Dans les formations d&apos;une durée supérieure à 500 heures et au moins
            4 Stagiaires, des délégués peuvent être élus (2 titulaires, 2
            suppléants) au scrutin uninominal à deux tours, au plus tard 20 heures
            après le début. Les délégués représentent les Stagiaires, font part
            des réclamations et facilitent le dialogue.
          </p>
        </section>

        {/* ARTICLE 13 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 13 — PERSONNES EN SITUATION DE HANDICAP
          </h2>
          <p className="mt-4 text-slate-600">
            L&apos;Organisme s&apos;engage à faciliter l&apos;accès aux formations.
            Référent Handicap : Laure OLIVIÉ — contact@laureolivie.fr — 06 95 66 18 18.
            Aménagements possibles sur demande (supports, horaires, moyens
            techniques, temps supplémentaire). Demandes à formuler 15 jours avant
            le début. Partenariats : MDPH, AGEFIPH, référents handicap OPCO.
          </p>
        </section>

        {/* ARTICLE 14 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 14 — RÉCLAMATIONS
          </h2>
          <p className="mt-4 text-slate-600">
            Réclamations à adresser par email (contact@laureolivie.fr), courrier (6
            rue Henri Dunant, 78280 GUYANCOURT) ou téléphone (06 95 66 18 18).
            L&apos;Organisme s&apos;engage à accuser réception sous 48h et répondre
            sous 15 jours ouvrés.
          </p>
        </section>

        {/* ARTICLE 15 */}
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 15 — DISPOSITIONS FINALES
          </h2>
          <p className="mt-4 text-slate-600">
            Le règlement peut être modifié à tout moment ; les modifications sont
            applicables immédiatement. Il est remis à chaque Stagiaire, consultable
            sur www.laureolivie.fr et affiché dans les locaux. L&apos;inscription
            à une formation vaut acceptation sans réserve du présent règlement
            intérieur.
          </p>
        </section>
      </article>

      {/* Pied de page */}
      <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="text-sm text-slate-600">
          Règlement intérieur établi conformément aux articles L.6352-3, L.6352-4,
          R.6352-1 à R.6352-15 du Code du travail
        </p>
        <p className="mt-4 font-semibold text-slate-900">
          Version en vigueur au : 30 janvier 2026
        </p>
        <div className="mt-6 space-y-1 text-sm text-slate-600">
          <p className="font-bold text-[var(--accent)]">
            OFC CRÉATION D&apos;ENTREPRISE
          </p>
          <p>6 rue Henri Dunant — 78280 GUYANCOURT</p>
          <p>SIRET : 905 244 281 00010 | NDA : 11788515078</p>
          <p>
            <a
              href="mailto:contact@laureolivie.fr"
              className="text-[var(--accent)] hover:underline"
            >
              contact@laureolivie.fr
            </a>
            {' · '}
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
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-8">
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
