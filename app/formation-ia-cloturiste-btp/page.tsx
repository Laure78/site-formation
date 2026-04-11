import { FAQAnswer } from '@/components/landing/FAQAnswer';
import Link from 'next/link';
import { ArrowRight, Check, Phone } from 'lucide-react';
import { AllerPlusLoin } from '@/components/AllerPlusLoin';
import { RdvLink } from '@/components/RdvLink';
import { ShortAnswerBlock } from '@/components/landing/ShortAnswerBlock';
import { createPageMetadata, getFAQSchema, SITE_CONFIG, sitePhoneDisplaySuffix } from '@/lib/seo';
import { CALENDLY_BOOKING_URL } from '@/lib/calendly';
import { PublicPhoneCta } from '@/components/PublicPhoneCta';

const PATH = '/formation-ia-cloturiste-btp';

export const metadata = createPageMetadata({
  title: 'Formation IA Clôturiste BTP Île-de-France — Laure Olivié',
  description:
    'Automatisez vos devis clôtures, portails, grillages. Formation Qualiopi finançable Constructys.',
  path: PATH,
  keywords: [
    'formation IA clôturiste',
    'ChatGPT devis clôture',
    'portail motorisé devis',
    'grillage poseur IA',
    'formation IA BTP',
    'OPCO Constructys',
    'Qualiopi BTP',
    'automatisme portail',
  ],
  openGraphType: 'article',
});

const PROMPT_DEVIS = `Crée un devis pour cette clôture (Île-de-France) :
- Linéaire clôture : 50m
- Type panneau : PVC gris lisse, hauteur 1,8m
- Poteaux : alu, espacés 2m (donc 26 poteaux)
- Portail battant : 3,5m double battant, motorisé (Somfy), interphone
- Accès facile, terrain plat
- Délai : 3 semaines
- Budget client estimé : 9 000€

Pour chaque élément :
1. Description technique
2. Quantité
3. Prix unitaire HT
4. Sous-total

Sections : panneaux, poteaux, quincaillerie/motorisation, portail, mise en place, électricité (si automatisme), délai, conditions de paiement.

Format : tableau, pro, prêt à imprimer ou envoyer email.`;

const PROMPT_VARIANTES = `Mon client trouve le devis à 9 000€ trop élevé. Il demande des alternatives entre 6 500€ et 7 500€.

Propose-moi 3 variantes :
1. "Clôture standard" : panneaux PVC blanc (moins cher que gris), pas de portail automatisé (battant manuel simple)
2. "Phasage" : clôture panneaux + portail battant simple maintenant, motorisation reportée plus tard
3. "Autre matériau" : grillage galvanisé renforcé au lieu de PVC (moins cher, plus rustique)

Pour chaque :
- Montant HT indicatif (à recalculer avec mes PU)
- Description et avantages/inconvénients
- Montant potentiel de l'automatisme en phase 2 (si phasage)

Format court, pour envoyer directement au client.`;

const PROMPT_TEMPLATES = `Crée-moi 4 templates de devis clôture réutilisables (Grand Paris) :

1. **Clôture résidentielle simple** : 50m PVC gris 1,8m, poteaux alu, pas de portail
2. **Clôture + portail motorisé** : 50m PVC, portail 3,5m motorisé, interphone
3. **Grillage agricole** : 100m grillage galvanisé 1,5m, poteaux bois 2m
4. **Rénovation portail** : remplacement panneau portail battant 4m, motorisation

Pour chaque template :
- Description type (dimensions, matériaux, équipements)
- Lots avec quantités de base
- Formule de calcul (pour adapter à la longueur réelle)
- Prix de base (quand je mets à jour tarifs, je change juste ces valeurs de base)

Format : tableau avec [PARAMÈTRE] = variable à adapter.`;

const PROMPT_SUIVI = `Mon client demande : "Pourquoi le portail motorisé est-il une part importante du budget ? Peut-on partir sur un portail battant manuel pour le moment, puis ajouter la motorisation plus tard ?"

Rédige pour moi :
1. Email de réponse (chaleureux, professionnel)
2. Variante de devis « sans motorisation » avec nouveau montant indicatif
3. Estimation indicative du coût d'une motorisation en phase 2
4. Une phrase sur la faisabilité technique d'ajouter la motorisation ultérieurement (sans langage commercial agressif)

Ton : neutre, informatif, respectueux du choix du client.`;

const FAQ_ITEMS = [
  {
    q: 'Normes (hauteur, poteaux, espacements) : que peut faire ChatGPT ?',
    a: "L'IA peut proposer des ordres de grandeur ou des listes de points de contrôle si vous précisez le contexte. Les règles applicables (PLU, copropriété, voisinage, prescriptions locales) doivent être vérifiées par vous et, si besoin, par les autorités ou un conseil.",
  },
  {
    q: "ChatGPT peut-il évaluer la difficulté d'un terrain ?",
    a: "Partiellement : à partir de votre description (pente, type de sol, accès), l'IA peut suggérer des postes ou une fourchette de main-d'œuvre. La validation se fait toujours sur place.",
  },
  {
    q: "L'IA peut-elle aider pour un dossier de permis ou de déclaration lié à une clôture ?",
    a: "Elle peut aider à structurer un texte ou une liste de pièces à partir de vos informations. La décision des services compétents et la conformité juridique ne peuvent pas être remplacées par un outil généraliste.",
  },
  {
    q: 'Comment financer la formation si je suis artisan clôturiste ?',
    a: "OFC Création d'Entreprise est certifiée Qualiopi et enregistrée Constructys. Le financement dépend de votre situation et des règles du plan de développement des compétences — étude de dossier au cas par cas.",
  },
  {
    q: "L'IA va-t-elle remplacer les clôturistes ?",
    a: "Non. L'IA accélère la rédaction des devis et des mails ; la pose, les mesures et le jugement de chantier restent au métier.",
  },
  {
    q: 'Faut-il être bon en informatique ?',
    a: "Non. On formule les demandes en français, avec des prompts que vous réutilisez et adaptez.",
  },
];

const SOMMAIRE = [
  { href: '#le-probleme', label: 'Le problème : devis répétitifs et prospection limitée' },
  { href: '#la-solution', label: 'La solution : l’IA pour structurer vos devis' },
  { href: '#methode', label: 'Méthode pas à pas avec prompts ChatGPT' },
  { href: '#resultats', label: 'Résultats concrets et témoignages' },
  { href: '#faq', label: 'FAQ — questions des clôturistes sur l’IA' },
  { href: '#a-propos', label: 'Qui est Laure Olivié ?' },
  { href: '#rdv', label: 'Réservez votre visio découverte gratuite' },
];

export default function FormationIaCloturisteBtpPage() {
  const faqSchema = getFAQSchema(FAQ_ITEMS);

  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <nav className="mb-8 text-sm text-slate-600">
        <Link href="/" className="text-[var(--accent)] hover:underline">
          Accueil
        </Link>
        {' / '}
        <Link href="/formations" className="text-[var(--accent)] hover:underline">
          Formations
        </Link>
        {' / '}
        <span className="text-slate-900">Formation IA clôturiste BTP</span>
      </nav>

      <article>
        <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
          Formation IA pour clôturistes et poseurs de portails —{' '}
          <span className="text-[var(--accent)]">gagnez du temps sur les devis et le suivi client</span>
        </h1>
        <p className="mt-6 text-xl text-slate-600">
          Objectif : <strong>libérer jusqu’à environ 2 h par semaine</strong> sur devis, variantes et réponses aux
          prospects. <strong>Île-de-France</strong> & <strong>Grand Paris</strong> — <strong>Qualiopi</strong>, finançable{' '}
          <strong>Constructys</strong> selon éligibilité.
        </p>

        <div className="mt-8">
          <ShortAnswerBlock>
            L’IA aide à structurer tableaux de devis et courriers ; les prix, marques, conformité et faisabilité terrain
            restent sous votre responsabilité. Toujours relire avant envoi au client.
          </ShortAnswerBlock>
        </div>

        <nav
          aria-label="Sommaire"
          className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6"
        >
          <h2 className="font-display text-lg font-bold text-slate-900">Sommaire</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
            {SOMMAIRE.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="text-[var(--accent)] underline hover:no-underline">
                  {label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <section id="le-probleme" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            Le problème : devis répétitifs et temps perdu
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Vous êtes <strong>clôturiste</strong> ou <strong>poseur de portails</strong> en Île-de-France ou Grand Paris :
            chaque dossier repose sur des combinaisons récurrentes (linéaire, panneaux ou grillage, poteaux,
            quincaillerie, automatisme, serrure).
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">Sans aide à la rédaction, le temps part souvent en :</p>
          <ul className="mt-4 space-y-3">
            {[
              'Visite et mesures (longueur, hauteur, accès, poteaux existants).',
              'Chiffrage : lots, fournitures, main-d’œuvre, délais.',
              'Mise à jour des tarifs fournisseurs et des gammes.',
              'Allers-retours avec le client : variantes, objections, relances.',
            ].map((item) => (
              <li key={item} className="flex gap-3 text-slate-700">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent)]" strokeWidth={1.5} />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-slate-600 leading-relaxed">
            Beaucoup de demandes ne se transforment pas en commandes : d’où l’intérêt de réduire le coût administratif par
            devis tout en gardant une réponse rapide et lisible.
          </p>
        </section>

        <section id="la-solution" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">
            La solution : l’IA pour structurer vos devis
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            ChatGPT peut aider à : produire un premier jet de devis à partir de paramètres, proposer des variantes (matériaux,
            phasage), préparer des modèles réutilisables, rédiger des mails de suivi — sous votre validation et avec vos
            tarifs.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">1. Devis structuré</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Tableaux par lots : panneaux, poteaux, motorisation, pose.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">2. Variantes</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Comparaisons rapides quand le client serre le budget ou change de gamme.
          </p>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">3. Templates et suivi</h3>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Modèles par type de chantier ; réponses aux questions fréquentes.
          </p>
        </section>

        <aside className="mt-10 rounded-2xl border-l-4 border-[var(--accent)] bg-slate-50 p-6 md:p-8">
          <p className="font-medium text-slate-900">Aller plus loin</p>
          <p className="mt-2 text-slate-600">
            <a href="#rdv" className="font-semibold text-[var(--accent)] underline hover:no-underline">
              Réservez votre visio découverte gratuite
            </a>{' '}
            — 30 minutes pour voir comment adapter ces usages à votre portefeuille clôture / portail.
          </p>
        </aside>

        <section id="methode" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Méthode pas à pas</h2>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 1 : créer un devis clôture rapidement
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_DEVIS}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 2 : proposer des variantes pour optimiser
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_VARIANTES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 3 : générer des devis types réutilisables
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_TEMPLATES}
          </pre>

          <h3 className="mt-8 font-display text-xl font-semibold text-slate-900">
            Étape 4 : suivi client et réponses aux objections
          </h3>
          <pre className="mt-4 overflow-x-auto whitespace-pre-wrap rounded-xl bg-slate-100 p-4 text-sm text-slate-800 leading-relaxed">
            {PROMPT_SUIVI}
          </pre>
        </section>

        <section id="resultats" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Résultats concrets</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Ordres de grandeur possibles — <strong>variables</strong> selon le nombre de demandes et votre temps de
            relecture :
          </p>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <caption className="sr-only">
                Temps indicatif avant / après usage de l’IA sur un dossier clôture / portail
              </caption>
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="p-3 font-semibold text-slate-900">Tâche</th>
                  <th className="p-3 font-semibold text-slate-900">Sans IA</th>
                  <th className="p-3 font-semibold text-slate-900">Avec IA</th>
                  <th className="p-3 font-semibold text-slate-900">Gain typique</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-b border-slate-100">
                  <td className="p-3">Devis détaillé</td>
                  <td className="p-3">Long</td>
                  <td className="p-3">Tableau proposé</td>
                  <td className="p-3">Important</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Variantes</td>
                  <td className="p-3">Recalcul manuel</td>
                  <td className="p-3">Options cadrées</td>
                  <td className="p-3">Modéré à fort</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Templates mensuels</td>
                  <td className="p-3">Repartir de zéro</td>
                  <td className="p-3">Modèles à actualiser</td>
                  <td className="p-3">Modéré</td>
                </tr>
                <tr className="border-b border-slate-100">
                  <td className="p-3">Mails / objections</td>
                  <td className="p-3">Rédaction</td>
                  <td className="p-3">Brouillon</td>
                  <td className="p-3">Modéré</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            Aucun gain en heures par mois n’est garanti : tout dépend du volume de devis et de la qualité de vos contrôles.
          </p>

          <blockquote className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-slate-700 italic leading-relaxed">
              « Je passe moins de temps sur la mise en forme. Je peux répondre plus vite aux demandes — en gardant la main sur
              les prix et la pose. »
            </p>
            <footer className="mt-4 text-sm font-medium text-slate-900">
              — Clôturiste, témoignage de formation (FFB Île-de-France)
            </footer>
          </blockquote>
        </section>

        <section id="faq" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">FAQ — clôturistes et IA</h2>
          <div className="mt-8 space-y-6">
            {FAQ_ITEMS.map(({ q, a }) => (
              <div key={q} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-slate-900">{q}</h3>
                <p className="mt-2 text-slate-600 leading-relaxed"><FAQAnswer content={a} /></p>
              </div>
            ))}
          </div>
        </section>

        <section id="a-propos" className="scroll-mt-24 mt-14">
          <h2 className="font-display text-2xl font-bold text-slate-900">Qui est Laure Olivié ?</h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Laure Olivié</strong> accompagne depuis <strong>2023</strong> artisans et dirigeants du BTP pour
            utiliser ChatGPT sur la productivité (devis, communication, appels d’offres).{' '}
            <strong>OFC Création d’Entreprise</strong> est certifié <strong>Qualiopi</strong> ; plus de{' '}
            <strong>{SITE_CONFIG.statsPersonnesFormees} professionnels</strong> formés, satisfaction moyenne{' '}
            <strong>4,85/5</strong>.
          </p>
          <p className="mt-4 text-slate-600 leading-relaxed">
            <strong>Références :</strong> FFB Grand Paris, FFB Île-de-France, CSFE, CAPEB.
          </p>
        </section>

        <section id="rdv" className="scroll-mt-24 mt-14 rounded-2xl bg-[var(--accent)] p-8 text-white md:p-10">
          <h2 className="font-display text-2xl font-bold">Visio découverte gratuite (30 min)</h2>
          <p className="mt-4 text-blue-100 leading-relaxed">
            Devis clôture, variantes, modèles réutilisables : démonstration sur un cas type. Vous repartez avec des prompts à
            adapter à vos gammes et tarifs.
          </p>
          <div className="mt-8 flex flex-wrap gap-4" id="cta-calendly">
            <RdvLink className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-[var(--accent)] hover:bg-blue-50">
              Réserver votre visio découverte
              <ArrowRight size={20} strokeWidth={1.5} />
            </RdvLink>
            <PublicPhoneCta className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10" />
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-white px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Contact
            </Link>
          </div>
          <p className="mt-6 text-sm text-blue-100">
            <a href={`mailto:${SITE_CONFIG.email}`} className="underline hover:text-white">
              {SITE_CONFIG.email}
            </a>
          </p>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Formation IA clôturiste — Île-de-France & Grand Paris
          </h2>
          <p className="mt-4 text-sm text-slate-600 leading-relaxed">
            OFC Création d’Entreprise · Certifiée Qualiopi · SIRET {SITE_CONFIG.siret} · NDA 11788515078 ·{' '}
            {SITE_CONFIG.email}{sitePhoneDisplaySuffix()}
          </p>
        </section>

        <AllerPlusLoin
          links={[
            { href: '/formations', label: 'Catalogue formations IA BTP' },
            { href: '/formation-ia-macon-paysagiste-btp', label: 'Formation IA maçon paysagiste BTP' },
            { href: '/formation-ia-paysagiste-btp', label: 'Formation IA paysagiste BTP' },
            { href: '/ia-devis-batiment', label: 'IA devis bâtiment' },
            { href: '/financement-constructys-formation-ia-btp', label: 'Financement Constructys' },
            { href: CALENDLY_BOOKING_URL, label: 'Prendre rendez-vous' },
          ]}
        />
      </article>
    </div>
  );
}
