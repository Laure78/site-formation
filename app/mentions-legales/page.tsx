import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Mentions légales — OFC Création d\'Entreprise',
  description:
    "Mentions légales OFC : éditeur Laure Olivié, siège Guyancourt, hébergement O2switch, RGPD. Organisme formation IA BTP certifié Qualiopi. Informations à jour.",
  path: '/mentions-legales',
  keywords: ['mentions légales OFC', 'organisme formation Qualiopi', 'RGPD formation BTP'],
});

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="font-display text-4xl font-bold text-slate-900">
        Mentions légales
      </h1>
      <p className="mt-4 text-slate-600">
        Informations légales et réglementaires
      </p>

      <article className="mt-12 space-y-12 text-slate-600">
        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            1. ÉDITEUR DU SITE
          </h2>
          <p className="mt-4 font-semibold text-slate-900">
            OFC CRÉATION D&apos;ENTREPRISE
          </p>
          <ul className="mt-4 space-y-2">
            <li>Forme juridique : Société par Actions Simplifiée (SAS)</li>
            <li>Capital social : 10,00 €</li>
            <li>Siège social : 6 Rue Henri Dunant – 78280 Guyancourt</li>
            <li>SIREN : 905 244 281</li>
            <li>SIRET : 905 244 281 00010</li>
            <li>RCS : Versailles</li>
            <li>N° de déclaration d&apos;activité : 11 78 85 15 078</li>
            <li>
              Organisme certifié Qualiopi : Certificat n° 520911-1, valide du
              16/01/2025 au 15/01/2028
            </li>
            <li>Catégorie d&apos;action : L.6313-1 – 1° Actions de formation</li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            2. DIRECTEUR DE PUBLICATION
          </h2>
          <p className="mt-4">
            Laure OLIVIÉ, Présidente de OFC CRÉATION D&apos;ENTREPRISE
          </p>
          <p className="mt-2">
            Email :{' '}
            <a
              href="mailto:laureolivie@yahoo.fr"
              className="text-[var(--accent)] hover:underline"
            >
              laureolivie@yahoo.fr
            </a>
          </p>
          <p className="mt-2">
            Téléphone :{' '}
            <a
              href="tel:+33695661818"
              className="text-[var(--accent)] hover:underline"
            >
              06 95 66 18 18
            </a>
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            3. HÉBERGEMENT DU SITE
          </h2>
          <p className="mt-4">
            Le site est hébergé par Vercel Inc. (ou l&apos;hébergeur actuel du
            site).
          </p>
          <p className="mt-4">
            Pour toute question relative à l&apos;hébergement, vous pouvez
            consulter les informations disponibles sur la plateforme
            d&apos;hébergement utilisée.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            4. PROPRIÉTÉ INTELLECTUELLE
          </h2>
          <p className="mt-4">
            L&apos;ensemble des éléments du site laureolivie.fr (textes, images,
            vidéos, logos, icônes, graphismes, etc.) sont la propriété exclusive
            de OFC CRÉATION D&apos;ENTREPRISE, sauf mention contraire.
          </p>
          <p className="mt-4">
            Toute reproduction, représentation, modification, publication,
            adaptation de tout ou partie des éléments du site, quel que soit le
            moyen ou le procédé utilisé, est interdite sans autorisation écrite
            préalable de OFC CRÉATION D&apos;ENTREPRISE.
          </p>
          <p className="mt-4">
            Toute exploitation non autorisée du site ou de son contenu engage la
            responsabilité civile et/ou pénale de l&apos;utilisateur et pourra
            donner lieu à des poursuites judiciaires conformément aux dispositions
            du Code de la propriété intellectuelle.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            5. DONNÉES PERSONNELLES
          </h2>
          <p className="mt-4">
            Conformément au Règlement Général sur la Protection des Données
            (RGPD) et à la loi Informatique et Libertés, vous disposez d&apos;un
            droit d&apos;accès, de rectification, de suppression et
            d&apos;opposition aux données personnelles vous concernant.
          </p>
          <p className="mt-4">
            Pour exercer ces droits, vous pouvez nous contacter :
          </p>
          <ul className="mt-2 space-y-1">
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
              Par courrier : OFC Création d&apos;Entreprise, 6 Rue Henri Dunant,
              78280 Guyancourt
            </li>
          </ul>
          <p className="mt-4">
            Pour plus d&apos;informations sur le traitement de vos données
            personnelles, consultez notre{' '}
            <Link
              href="/politique-confidentialite"
              className="text-[var(--accent)] hover:underline"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            6. COOKIES
          </h2>
          <p className="mt-4">
            Le site peut utiliser des cookies pour améliorer l&apos;expérience
            utilisateur et analyser le trafic du site. En continuant à naviguer
            sur le site, vous acceptez l&apos;utilisation de cookies conformément
            à notre politique de confidentialité.
          </p>
          <p className="mt-4">
            Vous pouvez configurer votre navigateur pour refuser les cookies, mais
            certaines fonctionnalités du site pourraient ne plus être accessibles.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            7. LIMITATION DE RESPONSABILITÉ
          </h2>
          <p className="mt-4">
            OFC CRÉATION D&apos;ENTREPRISE s&apos;efforce d&apos;assurer
            l&apos;exactitude et la mise à jour des informations diffusées sur le
            site. Toutefois, l&apos;organisme ne peut garantir l&apos;exactitude,
            la précision ou l&apos;exhaustivité des informations mises à
            disposition sur le site.
          </p>
          <p className="mt-4">
            En conséquence, OFC CRÉATION D&apos;ENTREPRISE décline toute
            responsabilité :
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6">
            <li>
              Pour toute imprécision, inexactitude ou omission concernant les
              informations disponibles sur le site
            </li>
            <li>
              Pour tout dommage résultant d&apos;une intrusion frauduleuse d&apos;un
              tiers ayant entraîné une modification des informations mises à
              disposition sur le site
            </li>
            <li>
              Pour les dommages directs ou indirects, quelle qu&apos;en soit la
              cause, l&apos;origine, la nature ou les conséquences, provoqués à
              raison de l&apos;accès de quiconque au site ou de l&apos;impossibilité
              d&apos;y accéder
            </li>
            <li>
              Pour l&apos;utilisation du site et/ou du crédit accordé à une
              quelconque information provenant directement ou indirectement du site
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            8. LIENS EXTERNES
          </h2>
          <p className="mt-4">
            Le site peut contenir des liens vers d&apos;autres sites web. OFC
            CRÉATION D&apos;ENTREPRISE n&apos;exerce aucun contrôle sur ces sites
            et décline toute responsabilité quant à leur contenu et à leur
            accessibilité.
          </p>
          <p className="mt-4">
            La création de liens hypertextes vers le site laureolivie.fr est
            soumise à l&apos;autorisation préalable écrite de OFC CRÉATION
            D&apos;ENTREPRISE.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            9. DROIT APPLICABLE ET JURIDICTION
          </h2>
          <p className="mt-4">
            Les présentes mentions légales sont régies par le droit français. En
            cas de litige et à défaut d&apos;accord amiable, le litige sera porté
            devant les tribunaux français conformément aux règles de compétence en
            vigueur.
          </p>
          <p className="mt-4">
            Tout litige relatif à l&apos;utilisation du site sera soumis aux
            tribunaux compétents du ressort du siège social de OFC CRÉATION
            D&apos;ENTREPRISE, soit les tribunaux de Versailles.
          </p>
        </section>

        <section>
          <h2 className="font-display text-xl font-bold text-slate-900">
            10. CONTACT
          </h2>
          <p className="mt-4">
            Pour toute question concernant les présentes mentions légales, vous
            pouvez nous contacter :
          </p>
          <ul className="mt-4 space-y-1">
            <li>
              Email :{' '}
              <a
                href="mailto:laureolivie@yahoo.fr"
                className="text-[var(--accent)] hover:underline"
              >
                laureolivie@yahoo.fr
              </a>
            </li>
            <li>
              Téléphone :{' '}
              <a
                href="tel:+33695661818"
                className="text-[var(--accent)] hover:underline"
              >
                06 95 66 18 18
              </a>
            </li>
            <li>Adresse : 6 Rue Henri Dunant, 78280 Guyancourt</li>
          </ul>
        </section>
      </article>

      <div className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-600">
        <p>Dernière mise à jour : 29 janvier 2026</p>
        <p className="mt-2 font-semibold text-slate-900">
          © 2025 OFC Création d&apos;Entreprise • Organisme
          certifié Qualiopi
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
