import { PageMetierBTP } from '@/components/PageMetierBTP';
import { createMetierBtpPageMetadata } from '@/lib/formation-ia-metier-idf';
import { LINKS } from '@/lib/internal-links';

export const revalidate = 3600;

const PATH = '/formation-ia-peintre-btp';

const SEO_DESCRIPTION =
  'Formation IA pour le BTP : ChatGPT aide le peintre sur devis surfaces, relances SAV et CR de visite. Présentiel IDF — organisme certifié Qualiopi, finançable Constructys.';

export const metadata = createMetierBtpPageMetadata('peintre', {
  title: 'Formation IA peintre BTP en Île-de-France',
  description: SEO_DESCRIPTION,
  descriptionFinal: true,
  path: PATH,
  openGraphType: 'website',
});

export default function FormationIaPeintreBtpPage() {
  return (
    <PageMetierBTP
      metier="peintre"
      norme="DTU 59.1"
      path={PATH}
      h1="Formation IA peintre BTP — ChatGPT et DTU 59.1"
      problemes={[
        'Le devis peinture se joue au m² et au détail : murs, plafonds, boiseries, radiateurs, fonds, impression, sous-couche, finition — et le client veut un prix par pièce, pas un forfait flou.',
        'Le métré réel (ouvertures déduites, hauteurs sous plafond, états de supports) se fait sur place ; le soir, on recolle les notes dans un tableau Word ou un tableur, avec des oublis de protection ou de lessivage.',
        'Relances de devis non signés, CR de visite (humidité, cloques, faïençage) et mails SAV « la teinte n’est pas la même » partent tard, souvent recopiés d’un ancien chantier.',
        'Sans cadre, ChatGPT invente un cycle de séchage, une compatibilité acrylique / glycéro ou un rendement au litre — alors que le DTU 59.1 et les fiches produits priment.',
      ]}
      casUsage={[
        {
          titre: 'Devis par pièce (surfaces)',
          description:
            'Structure de postes murs / plafonds / boiseries à partir de cotes relevées — pas les prix ni le métré définitif.',
        },
        {
          titre: 'Tableau de métré à compléter',
          description:
            'Colonnes pièce, support, m², couches, pertes — vous remplissez les quantités après visite.',
        },
        {
          titre: 'Relance de devis',
          description:
            'Mail court, ton professionnel, rappel du périmètre (pièces, finitions) et de la date de validité.',
        },
        {
          titre: 'CR de visite et SAV',
          description:
            'Constats supports (humidité, cloques, reprises) puis mail client factuel, sans reconnaissance de faute.',
        },
      ]}
      etapesMethode={[
        {
          titre: 'Structurer un devis peinture par pièce',
          prompt: `Tu es peintre en bâtiment en France. Données relevées (à ne pas inventer) :
- Pièces : [LISTE : salon, chambres, dégagement…]
- Surfaces approximatives : [murs X m², plafonds Y m², boiseries Z ml — ou « à compléter après métré »]
- État des supports : [neuf / ancien / traces d’humidité / à lessiver / à poncer]
- Finitions souhaitées : [mat, velours, satiné, laque — teintes si connues]
- Contraintes : [occupé, hauteurs, radiateurs, protections sols]

Propose UNIQUEMENT la STRUCTURE du devis (intitulés de postes, pas les prix) :
1. Installation / protection
2. Préparation (lessivage, rebouchage, ponçage, impression)
3. Couches par support (murs, plafonds, boiseries)
4. Finitions et nettoyage

Rappelle de croiser le DTU 59.1 et les fiches produits. N’invente ni rendements au litre, ni cycles de séchage, ni quantités définitives : indiquer [à métrer / à valider sur fiche].`,
        },
        {
          titre: 'Préparer un tableau de métré (sans remplacer le relevé)',
          prompt: `Contexte chantier : [ADRESSE ANONYMISÉE], type : [logement / bureaux / parties communes].
Pièces listées : [LISTE].

Génère un TABLEAU (markdown) à remplir sur place, colonnes :
- Pièce
- Support (mur, plafond, boiserie, radiateur)
- Nature du fond (plâtre, plaque, ancien film, bois)
- Longueur × hauteur ou m² brut
- Déductions (portes, fenêtres) — laisser vide
- m² net [à calculer après relevé]
- Nb de couches prévu [à confirmer]
- Observations (humidité, cloques, reprises)

Consigne : ne calcule aucune surface si une cote manque. Ajoute une ligne « coefficient de perte / chutes : [à renseigner selon produit] ». Rappel : l’IA structure le tableau ; le métré et la conformité DTU 59.1 restent à l’entreprise.`,
        },
        {
          titre: 'Relancer un devis peinture non signé',
          prompt: `Devis envoyé le [DATE], n° [NUMÉRO], montant HT [X €] (ne pas modifier le montant).
Périmètre : [pièces et finitions].
Client : [particulier / syndic / entreprise].
Point d’attention : [validité, planning, teinte à confirmer, accès].

Rédige un mail de relance :
- objet clair
- rappel factuel du devis (pièces, pas un nouveau chiffrage)
- une question fermée (validation, visite échantillons, report)
- prochaine étape (signature, rendez-vous nuancier)

Ton courtois, sans pression. N’invente pas de remise. Mentionne que les surfaces définitives suivent le métré validé et le DTU 59.1.`,
        },
        {
          titre: 'Compte rendu de visite — supports et humidité',
          prompt: `Notes de visite brutes : [NOTES : pièces, traces, mesures d’humidité si faites, photos mentionnées, accès].
Ne pas inventer de mesures ni de causes.

Rédige un CR professionnel :
1. Contexte (date, personnes présentes, pièces visitées)
2. Constats par pièce / par support (état du film, cloques, faïençage, salissures)
3. Points à clarifier (fuite, ventilation, délai de séchage du fond — [à confirmer])
4. Suites proposées (devis séparé préparation, échantillons, planning)

Ton factuel. Ne pas conclure à une non-conformité DTU 59.1 sans relevé. Toute référence normative : [à compléter].`,
        },
        {
          titre: 'Mail SAV — teinte, cloques ou retouches',
          prompt: `Signalement client : [teinte différente / cloques / traces / retouches demandées].
Ce qui a été fait : [LISTE : produit, pièces, date].
Ce qui reste ouvert : [visite, échantillon, reprise éventuelle].
Preuves : [photos oui/non — ne pas inventer].

Rédige un mail SAV :
- accusé de réception
- rappel du périmètre réalisé
- demande d’accès ou de photos ciblées
- proposition de visite (créneau [à fixer])
- phrase : aucune reprise ni reconnaissance de responsabilité sans constat sur place

Ton calme et professionnel. Ne pas diagnostiquer un défaut de produit ou un non-respect du DTU 59.1 à la place de l’entreprise.`,
        },
      ]}
      gains={[
        { tache: 'Structure de devis par pièce', sansIa: '45–60 min', avecIa: '10–15 min' },
        { tache: 'Tableau de métré à compléter sur place', sansIa: '30 min', avecIa: '5–10 min' },
        { tache: 'Relance de devis', sansIa: '15–20 min', avecIa: '3–5 min' },
        { tache: 'CR de visite / mail SAV', sansIa: '30–40 min', avecIa: '8–12 min' },
      ]}
      faq={[
        {
          q: 'ChatGPT peut-il remplacer le métré peinture ?',
          r: 'Non. L’IA structure brouillons et tableaux (pièces, supports, colonnes m²). Le relevé, les déductions et les quantités définitives se font sur place. Elle ne remplace ni le métré ni la conformité normative (DTU 59.1).',
        },
        {
          q: 'L’IA applique-t-elle le DTU 59.1 et choisit-elle les produits ?',
          r: 'Non. Le DTU 59.1 et les fiches fabricants (rendements, séchage, compatibilité des films) restent votre référence. ChatGPT peut titrer des postes ou lister des questions à trancher — jamais valider une sous-couche ou une teinte à votre place.',
        },
        {
          q: 'Où se déroulent les sessions pour les peintres ?',
          r: 'En présentiel en Île-de-France uniquement, sur vos cas anonymisés (devis, CR, SAV). La visio découverte sert à cadrer le besoin, pas à remplacer la session.',
        },
        {
          q: 'Le financement Constructys est-il possible ?',
          r: 'Financement OPCO possible selon éligibilité (Constructys notamment). OFC Création d’Entreprise est certifié Qualiopi. Aucun financement n’est automatique : le dossier suit les règles en vigueur.',
        },
        {
          q: 'Comment traiter un SAV « cloques » ou « teinte différente » avec ChatGPT ?',
          r: 'Pour organiser les faits, demander des photos et proposer une visite — pas pour diagnostiquer un défaut ou reconnaître une faute. Le constat terrain et le DTU 59.1 restent décisifs.',
        },
      ]}
      maillage={[
        {
          href: LINKS.formations,
          label: 'Catalogue des formations IA pour le BTP',
        },
        {
          href: LINKS.iaDevis,
          label: 'IA pour devis bâtiment',
        },
        {
          href: LINKS.formationIaBtpYvelines78,
          label: 'Formation IA BTP Yvelines (78)',
        },
        {
          href: LINKS.blogChatgptPeintreBatiment,
          label: 'ChatGPT peintre bâtiment — devis, métré et relances',
        },
      ]}
    />
  );
}
