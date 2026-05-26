import Link from 'next/link';
import { Mail } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'CGV — Conditions Générales de Vente — OFC Création d\'Entreprise',
  description:
    "CGV formations OFC : vente, délais, annulations, paiement. Organisme Qualiopi. Lisez les conditions avant de réserver votre formation IA pour les pro du BTP.",
  path: '/cgv',
  keywords: ['CGV formation professionnelle', 'conditions vente formation BTP', 'Qualiopi OFC'],
});

export default function CGVPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      {/* En-tête */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
        <div className="text-center">
          <p className="text-sm font-medium text-slate-600">
            Formation professionnelle continue
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold text-slate-900 md:text-4xl">
            CONDITIONS GÉNÉRALES DE VENTE
          </h1>
          <p className="mt-2 font-display text-xl font-bold text-[var(--accent)]">
            OFC CRÉATION D&apos;ENTREPRISE
          </p>
          <p className="mt-2 text-sm text-slate-600">
            Organisme de formation certifié Qualiopi
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm text-slate-600">
            <span>SIRET : 905 244 281 00010</span>
            <span>NDA : 11788515078</span>
            <span>6 rue Henri Dunant, 78280 GUYANCOURT</span>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 text-sm">
            <a
              href="mailto:laureolivie@yahoo.fr"
              className="inline-flex items-center gap-2 text-[var(--accent)] hover:underline"
            >
              <Mail size={16} strokeWidth={1.5} />
              laureolivie@yahoo.fr
            </a>
          </div>
        </div>
      </div>

      <article className="mt-12 space-y-12 text-slate-600">
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 1 — CHAMP D&apos;APPLICATION
          </h2>
          <p className="mt-4">
            Les présentes Conditions Générales de Vente (CGV) s&apos;appliquent à
            l&apos;ensemble des prestations de formation professionnelle continue
            dispensées par OFC CRÉATION D&apos;ENTREPRISE, ci-après dénommé «
            l&apos;Organisme » ou « le Prestataire ».
          </p>
          <div className="mt-6 rounded-lg bg-slate-50 p-4 text-sm">
            <p>Raison sociale : OFC CRÉATION D&apos;ENTREPRISE</p>
            <p>Forme juridique : SAS (Société par Actions Simplifiée)</p>
            <p>SIRET : 905 244 281 00010</p>
            <p>CODE NAF : 8559B - Autres enseignements</p>
            <p>Siège social : 6 rue Henri Dunant, 78280 GUYANCOURT</p>
            <p>
              Numéro de déclaration d&apos;activité : 11788515078 (auprès du préfet
              de région d&apos;Île-de-France)
            </p>
            <p>Certification Qualiopi : Organisme certifié pour Actions de formation</p>
            <p className="mt-2 italic">
              Cet enregistrement ne vaut pas agrément de l&apos;État.
            </p>
          </div>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 2 — DÉFINITIONS
          </h2>
          <dl className="mt-4 space-y-2">
            <dt className="font-medium text-slate-800">Client :</dt>
            <dd className="ml-4">
              Toute personne physique ou morale, de droit privé ou public,
              s&apos;inscrivant à une formation.
            </dd>
            <dt className="mt-4 font-medium text-slate-800">
              Participant/Stagiaire :
            </dt>
            <dd className="ml-4">Personne physique suivant l&apos;action de formation.</dd>
            <dt className="mt-4 font-medium text-slate-800">Formation :</dt>
            <dd className="ml-4">
              Action de formation professionnelle continue (article L.6313-1 Code du
              travail).
            </dd>
            <dt className="mt-4 font-medium text-slate-800">
              Convention de formation :
            </dt>
            <dd className="ml-4">
              Contrat entre l&apos;Organisme et le Client pour la réalisation
              d&apos;une action de formation.
            </dd>
            <dt className="mt-4 font-medium text-slate-800">OPCO :</dt>
            <dd className="ml-4">
              Opérateur de Compétences assurant le financement des actions.
            </dd>
          </dl>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 3 — INSCRIPTION ET CONCLUSION DU CONTRAT
          </h2>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            3.1 Modalités d&apos;inscription
          </h3>
          <p className="mt-2">
            Via la page contact de www.laureolivie.fr (coordonnées et prise de rendez-vous) ; par email à
            laureolivie@yahoo.fr ; par voie postale.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            3.2 Validation de l&apos;inscription
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Particuliers : contrat signé + acompte 30%</li>
            <li>Entreprises : convention signée + bon de commande</li>
            <li>OPCO : accord de prise en charge</li>
          </ul>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            3.3 Documents contractuels
          </h3>
          <p className="mt-2">
            Contrat de formation (L.6353-3) pour particuliers ; convention (L.6353-2)
            pour entreprises ; programme détaillé ; règlement intérieur.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 4 — TARIFS ET CONDITIONS DE PAIEMENT
          </h2>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">4.1 Tarifs</h3>
          <p className="mt-2">
            Prix en euros HT et TTC. Exonération TVA (article 261-4-4° CGI). Tarifs
            au jour de la commande ou du devis.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            4.2 Modalités de paiement
          </h3>
          <p className="mt-2">
            Particuliers : acompte 30% à la signature, solde avant le début.
            Entreprises : 30 jours fin de mois. OPCO : facturation directe ; le
            Client reste solidairement responsable en cas de refus ou prise en
            charge partielle.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            4.3 Moyens de paiement
          </h3>
          <p className="mt-2">
            Virement, chèque à l&apos;ordre d&apos;OFC CRÉATION D&apos;ENTREPRISE,
            carte bancaire en ligne.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            4.4 Retard de paiement
          </h3>
          <p className="mt-2">
            Pénalités de retard à 3 fois le taux d&apos;intérêt légal ;
            indemnité forfaitaire 40€ (D.441-5 Code de commerce) ; possibilité
            de suspension de l&apos;accès à la formation.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 5 — FINANCEMENT DE LA FORMATION
          </h2>
          <p className="mt-4">
            Demande OPCO au moins 4 semaines avant. L&apos;Organisme transmet les
            documents nécessaires. En cas de refus partiel, le Client reste redevable.
            Autres dispositifs : CPF, plan de développement des compétences,
            financement personnel. Accompagnement possible dans les démarches.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 6 — MODALITÉS DE RÉALISATION
          </h2>
          <p className="mt-4">
            <strong>Présentiel :</strong> lieu dans la convention, horaires dans la
            convocation (7 jours avant), matériel fourni. <strong>À distance :</strong>{" "}
            accès par email, connexion stable requise. <strong>Intra-entreprise :</strong>{" "}
            locaux du Client, programme adapté.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 7 — OBLIGATIONS DE L&apos;ORGANISME
          </h2>
          <p className="mt-4">
            Formation conforme au programme ; moyens pédagogiques et
            d&apos;encadrement ; supports fournis ; suivi administratif. Remise :
            convocation, émargement, attestations, certificat, facture acquittée.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 8 — OBLIGATIONS DU CLIENT ET DU STAGIAIRE
          </h2>
          <p className="mt-4">
            Client : informations complètes, paiements à l&apos;échéance, accord
            de prise en charge si financement. Stagiaire : respect du règlement
            intérieur, ponctualité, assiduité, émargement, évaluations, matériel,
            comportement respectueux.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 9 — ANNULATION — REPORT — INTERRUPTION
          </h2>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            9.1 Par l&apos;Organisme
          </h3>
          <p className="mt-2">
            Annulation possible en cas de force majeure, effectifs insuffisants
            (min. 3), indisponibilité formateur. Préavis 7 jours, remboursement
            intégral ou report.
          </p>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            9.2 Par le Client — Inter-entreprises
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Plus de 30 jours : remboursement intégral ou report</li>
            <li>30 à 15 jours : retenue 30%</li>
            <li>14 à 7 jours : retenue 50%</li>
            <li>Moins de 7 jours : retenue 100%</li>
            <li>Non-présentation : facturation intégrale</li>
          </ul>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            9.2 Par le Client — Intra-entreprise
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-6">
            <li>Plus de 21 jours : annulation sans frais</li>
            <li>21 à 14 jours : facturation 50%</li>
            <li>Moins de 14 jours : facturation intégrale</li>
          </ul>
          <h3 className="mt-6 font-semibold text-[var(--accent)]">
            9.3 Remplacement / 9.4 Interruption
          </h3>
          <p className="mt-2">
            Remplacement possible sans frais (préavis 3 jours ouvrés). Interruption
            par le Stagiaire : formation due en totalité, aucun remboursement.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 10 — ÉVALUATION ET SANCTION
          </h2>
          <p className="mt-4">
            Évaluation initiale, formatives, finale. Attestation de présence,
            attestation de fin de formation, certificat de réalisation.
            Questionnaire de satisfaction obligatoire.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 11 — PROPRIÉTÉ INTELLECTUELLE
          </h2>
          <p className="mt-4">
            Supports restent la propriété exclusive de l&apos;Organisme. Usage
            personnel uniquement. Interdit : reproduction, diffusion, exploitation
            commerciale. Contrefaçon sanctionnée (L.335-2 CPI).
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 12 — PROTECTION DES DONNÉES
          </h2>
          <p className="mt-4">
            Traitement pour gestion administrative, documents obligatoires,
            déclarations financeurs. Droits RGPD : accès, rectification,
            opposition, limitation, portabilité. Contact : laureolivie@yahoo.fr.
            Voir Politique de confidentialité sur www.laureolivie.fr.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 13 — ASSURANCE ET RESPONSABILITÉ
          </h2>
          <p className="mt-4">
            Organisme assuré RC professionnelle. Responsabilité limitée aux
            préjudices directs ; non responsable de l&apos;inadéquation,
            résultats non atteints, incidents techniques. Stagiaire : assurance
            RC requise en présentiel.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 14 — FORCE MAJEURE
          </h2>
          <p className="mt-4">
            Suspension en cas de force majeure (catastrophes, grève, épidémie,
            etc.). Information du Client. Si &gt; 30 jours : résiliation possible,
            remboursement au prorata.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 15 — RÉCLAMATION — MÉDIATION
          </h2>
          <p className="mt-4">
            Réclamation par email ou courrier. Accusé de réception sous 48h,
            réponse sous 15 jours ouvrés. Médiation amiable avant action
            judiciaire. Compétence exclusive des tribunaux du siège de
            l&apos;Organisme.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 16 — CLAUSES DIVERSES
          </h2>
          <p className="mt-4">
            Intégralité du contrat ; divisibilité ; renonciation ; modification
            des CGV possible (celles en vigueur à la signature s&apos;appliquent) ;
            droit français.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 17 — RÉFÉRENT HANDICAP
          </h2>
          <p className="mt-4">
            Référent : Laure OLIVIÉ — laureolivie@yahoo.fr.
            Contact au moins 15 jours avant le début pour adaptation. Annuaire
            partenaires handicap disponible sur demande.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            ARTICLE 18 — ACCEPTATION DES CGV
          </h2>
          <p className="mt-4">
            La signature du contrat ou de la convention emporte acceptation sans
            réserve des présentes CGV.
          </p>
        </section>
      </article>

      {/* Pied de page */}
      <div className="mt-16 rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
        <p className="font-semibold text-slate-900">
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
              href="mailto:laureolivie@yahoo.fr"
              className="text-[var(--accent)] hover:underline"
            >
              laureolivie@yahoo.fr
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
        <p className="mt-4 text-sm italic text-slate-500">
          Cet enregistrement ne vaut pas l&apos;agrément de l&apos;État.
        </p>
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
