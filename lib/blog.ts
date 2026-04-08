/**
 * Blog / Ressources — Articles SEO pour formation IA BTP
 * Fusionne les articles statiques + générés (content/generated/)
 */

import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { INTERNAL_LINKS, getAnchor } from '@/lib/seo-links';
import { estimateWordCountFromPlainText } from '@/lib/seo';
import { blogArticlesClaudeBtp2026 } from '@/lib/blog-claude-btp-2026-articles';
import { blogArticlesLsrAoModules } from '@/lib/blog-lsr-ao-modules-articles';

/** Prompt optimisé pour affichage dans les articles ressources */
export interface ArticlePrompt {
  titre: string;
  prompt: string;
  usage?: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  /** Si défini, utilisé pour la balise title / Open Graph (le H1 reste `title`) */
  seoTitle?: string;
  description: string;
  date: string;
  /** Si défini, utilisé pour dateModified (schema + meta) — sinon = date de publication */
  dateModified?: string;
  keywords: string[];
  sections: {
    type: 'paragraph' | 'definition' | 'list' | 'faq' | 'cta' | 'prompts' | 'html';
    content: string | string[] | ArticlePrompt[];
    title?: string;
    formationHref?: string;
    /** Lien externe vers la communauté formateurs (groupe Facebook) */
    ctaCommunauteHref?: string;
  }[];
  relatedSlugs?: string[];
}

/** Estimation du nombre de mots pour schema Article JSON-LD (GEO) */
export function estimateWordCountFromArticle(article: BlogArticle): number {
  const parts: string[] = [article.title, article.description];
  for (const s of article.sections) {
    const c = s.content;
    if (typeof c === 'string') parts.push(c);
    else if (Array.isArray(c)) {
      for (const item of c) {
        if (typeof item === 'string') parts.push(item);
        else if (
          item &&
          typeof item === 'object' &&
          'titre' in item &&
          'prompt' in item
        ) {
          parts.push(item.titre, item.prompt);
        }
      }
    }
  }
  return estimateWordCountFromPlainText(parts.join(' '));
}

export const BLOG_ARTICLES: BlogArticle[] = [
  ...blogArticlesClaudeBtp2026,
  ...blogArticlesLsrAoModules,
  // Avril 2026 — Brief chiffré adoption IA BTP (Plein Sens, Orisha, marchés)
  {
    slug: 'adoption-ia-btp-2026-chiffres-freins-leviers',
    title: 'Adoption de l\'IA dans le BTP en 2026 : chiffres clés, freins et leviers',
    description:
      'Moins de 10 % des entreprises BTP utilisent l\'IA aujourd\'hui : étude 2026 (621 professionnels), marché européen, 5 usages qui font gagner du temps, freins et recommandations. Par Laure Olivié, formatrice IA BTP.',
    date: '2026-04-06',
    keywords: [
      'IA BTP',
      'adoption intelligence artificielle bâtiment',
      'entreprises BTP IA',
      'Observatoire métiers BTP',
      'formation IA BTP',
      'ChatGPT entreprises BTP',
      'marché IA construction',
      'France TPE PME BTP',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'En 2026, l\'intelligence artificielle reste marginale dans les entreprises du bâtiment et des travaux publics : moins de 10 % des structures l\'utilisent déjà, alors que plus d\'un tiers des dirigeants se disent prêts à adopter. Cet article synthétise les chiffres d\'études récentes (Observatoire des métiers du BTP — 621 répondants, cabinet Plein Sens), le dynamisme du marché européen de l\'IA en construction, les usages qui rapportent le plus, les freins à lever — et les leviers alignés avec une formation courte, pratique et finançable par OPCO Constructys.',
      },
      {
        type: 'paragraph',
        title: 'Les chiffres clés de l\'adoption de l\'IA dans le BTP en France',
        content:
          'L\'étude « Observatoire des métiers du BTP » (2026), menée auprès de 621 professionnels du secteur en France par le cabinet Plein Sens, dresse un état des lieux clair. Côté terrain : moins de 10 % des entreprises BTP utilisent l\'IA aujourd\'hui ; seulement 3 % déclarent un déploiement effectif et 5 % un déploiement en cours. Pourtant la demande existe : 36 % des dirigeants se disent prêts à adopter. Le fossé se comprend : 43,5 % n\'ont jamais essayé ChatGPT et 16 % ne savent pas ce qu\'est l\'IA. Une étude Orisha Construction / InfoPro Digital (2025) souligne en parallèle une progression de +15 points en un an sur l\'intention d\'adoption. Autre lecture : 40 % des dirigeants « n\'y pensent pas du tout », tandis que 70 % utilisent déjà ou envisagent l\'IA — ce qui montre une polarisation entre curieux et distants.',
      },
      {
        type: 'paragraph',
        title: 'Contexte France et marché de l\'IA dans la construction en Europe',
        content:
          'À l\'échelle nationale, tous secteurs confondus, le taux d\'adoption de l\'IA en France s\'établit à environ 10 % (contre 6 % en 2023), en dessous de la moyenne européenne (13 %). Les TPE et PME utilisent l\'IA générative à hauteur d\'environ 31 %, dont 8 % de façon régulière (sources Bpifrance Le Lab, Baromètre France Num 2025). Le marché français de l\'IA croît d\'environ +28,9 % par an ; l\'objectif de 20 milliards d\'euros pour 2030 est souvent cité dans les projections sectorielles. Pour le bâtiment en Europe, les analystes (MarketDataForecast, etc.) estiment le marché de l\'IA appliquée à la construction à environ 1,52 milliard USD en 2025, 1,80 milliard USD en 2026, avec une projection vers 11,38 milliards USD en 2034 — soit un CAGR d\'environ +25,9 % entre 2026 et 2034. L\'Europe représenterait environ 31,2 % du marché mondial en 2025.',
      },
      {
        type: 'list',
        title: 'Taille d\'entreprise : qui adopte, qui résiste ?',
        content: [
          'Micro-entreprises (moins de 10 salariés) : moins de 30 % d\'intention d\'adoption. Frein principal : méconnaissance de l\'IA et des outils accessibles.',
          'PME (10 à 49 salariés) : environ 50 % d\'intention. Souvent déjà convaincues, elles cherchent des formations concrètes et un retour sur investissement lisible.',
          'ETI et grandes entreprises (plus de 50 salariés) : plus de 50 % d\'intention. Déploiements en cours, ROI mesuré sur des pilotes.',
        ],
      },
      {
        type: 'list',
        title: 'Cinq usages déjà observés sur le terrain (2026)',
        content: [
          'Comptes rendus de réunion ou de chantier par dictée vocale : gain typique de l\'ordre de 45 minutes à 5 minutes (environ −89 % du temps) — outils : ChatGPT, Claude.',
          'Analyse de DCE et rédaction de mémoire technique : passage de quelques jours à une vingtaine de minutes sur les premiers jets — Claude, Copilot.',
          'Génération de devis assistée (commande vocale ou texte) : exemples documentés autour de 45 secondes pour un premier jet — solutions IA métiers BTP.',
          'Emails, courriers et relances clients : −20 à 30 % du temps administratif — ChatGPT, Claude.',
          'Comparaison de pièces contractuelles (jusqu\'à plusieurs centaines de pages) : quelques heures au lieu de plusieurs jours grâce aux modèles à contexte étendu (ex. Claude, fenêtres 1M tokens).',
        ],
      },
      {
        type: 'paragraph',
        title: 'Pourquoi ça bloque encore ? Cinq freins majeurs',
        content:
          'L\'Observatoire des métiers du BTP identifie des obstacles récurrents. Premièrement, la méconnaissance : le mot « IA » reste abstrait ou réservé aux grandes entreprises tech. Deuxièmement, une résistance culturelle : le secteur valorise le savoir-faire manuel et la transmission ; l\'idée qu\'un algorithme « aide » à la décision peut heurter des habitudes. Troisièmement, la qualité des données : les informations sont souvent éparpillées, peu structurées — l\'IA ne produit de bonnes sorties qu\'avec des entrées fiables. Quatrièmement, le coût et le ROI : selon des benchmarks internationaux, une très large part des expérimentations ne passe pas en production ; pour un artisan, justifier l\'investissement reste difficile. Cinquièmement, l\'âge des dirigeants : une partie des patrons proches de la retraite hésite à investir dans une technologie dont le retour complet se jouera sur le long terme.',
      },
      {
        type: 'list',
        title: 'Cinq leviers recommandés par l\'Observatoire (et ce qu\'ils impliquent pour vous)',
        content: [
          'Développer la culture numérique : former d\'abord dirigeants et encadrants, avec des cas d\'usage BTP concrets — pas du jargon.',
          'Fiabiliser la donnée : structurer les données internes et les logiciels métiers avant d\'industrialiser l\'IA.',
          'Sécuriser les usages : confidentialité, vérification des réponses, limites de l\'IA générative — thématiques centrales dans une formation sérieuse.',
          'Structurer l\'offre de formation : privilégier des formats courts (par exemple une demi-journée, 4 h), ancrés dans les métiers, éligibles au financement via Constructys pour les entreprises du BTP concernées.',
          'Renforcer la coordination sectorielle : fédérations, organismes de formation, OPPBTP, OPCO — pour éviter la dispersion des messages et des ressources.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Ce que ces chiffres changent pour votre formation (ou votre décision de vous former)',
        content:
          'Le constat est le même sur le terrain que dans les enquêtes : le potentiel est immense, mais l\'adoption est surtout freinée par la méconnaissance — pas par le manque d\'intérêt. Les entreprises qui montent en compétence sur une IA appliquée au BTP (devis, mémoires, DCE, comptes rendus, relances) prennent de l\'avance sur une majorité de concurrents qui n\'ont pas encore franchi le pas. Le premier usage spontané reste souvent la dictée vocale pour les comptes rendus de chantier : c\'est exactement le type de geste que l\'on peut verrouiller dès les premiers modules d\'une formation courte, certifiée Qualiopi et éligible au financement OPCO Constructys dans les conditions en vigueur (plafonds, délais de dossier).',
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          'Les chiffres de cet article sont-ils fiables ? — Ils sont issus d\'études citées en fin d\'article (Observatoire des métiers du BTP 2026, Orisha, sources marché européen). Les pourcentages sont des ordres de grandeur ; les résultats varient selon la taille d\'entreprise et le métier.',
          'Pourquoi si peu d\'entreprises BTP utilisent l\'IA si les dirigeants sont « prêts » ? — Le passage de l\'intention à la pratique quotidienne demande du temps, méthode et souvent une formation. Sans accompagnement, l\'outil reste expérimental.',
          'Quel est le premier levier pour une PME du bâtiment ? — Commencer par un cas d\'usage à forte valeur (souvent compte rendu ou devis), puis standardiser. Les formations courtes sur documents réels accélèrent ce passage.',
          'La formation IA BTP est-elle finançable ? — Les formations certifiées Qualiopi proposées par OFC Création d\'Entreprise peuvent être financées par OPCO Constructys selon les règles applicables à votre entreprise (effectif, plan de développement des compétences, délais de dossier).',
          'L\'IA va-t-elle remplacer les métiers du BTP ? — Non dans les usages réalistes : l\'IA assiste l\'écriture, la synthèse et la préparation ; la validation humaine, la responsabilité technique et la relation client restent centrales.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Sources et références',
        content:
          'Observatoire des métiers du BTP — étude sur la perception et l\'intégration de l\'IA (2026), 621 professionnels, cabinet Plein Sens · Orisha Construction / InfoPro Digital (2025) · FNTP — travaux sur la perception de l\'IA dans le BTP · Bpifrance Le Lab — adoption de l\'IA générative en TPE-PME · Baromètre France Num 2025 · MarketDataForecast — Artificial Intelligence in Construction (Europe) · FrenchWeb, analyses sectorielles BTP 2025-2026 — ainsi que synthèses sectorielles (Graneet, HEXABIM, batiweb, etc.). Les projections de marché sont des estimations ; elles évoluent avec les données publiées.',
      },
      {
        type: 'cta',
        content:
          'Vous voulez passer de l\'intention à la pratique ? Découvrez les formations IA BTP (Qualiopi, financement Constructys selon éligibilité) animées par Laure Olivié — cas réels : devis, DCE, mémoires, chantier.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: [
      'formation-ia-btp-guide-complet-2026',
      'financer-formation-ia-btp-constructys',
      'chatgpt-devis-btp-methode-2026',
    ],
  },

  // Avril 2026 — ChatGPT devis bâtiment en 20 minutes (méthode terrain)
  {
    slug: 'devis-btp-chatgpt-20-minutes',
    title:
      'ChatGPT devis bâtiment : comment je fais tenir un devis en 20 minutes (sans brûler mes prix)',
    description:
      'ChatGPT devis bâtiment : méthode terrain en 4 étapes — données, prompt magique, relecture des prix, variantes. Devis BTP IA, automatiser devis artisan. Prompts peinture, électricité, maçonnerie. Laure Olivié, formation IA BTP finançable Constructys.',
    date: '2026-04-07',
    keywords: [
      'ChatGPT devis bâtiment',
      'devis BTP IA',
      'automatiser devis artisan',
      'ChatGPT devis chiffrage',
      'prompt devis BTP',
      'IA devis bâtiment',
      'formation IA BTP',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Je forme des artisans et des dirigeants du bâtiment depuis des années : ce qui revient le plus souvent, c’est le temps perdu sur les devis. Avec une bonne préparation et un prompt clair, ChatGPT peut vous livrer une base de devis exploitable en une vingtaine de minutes — pas à la place de votre cerveau, mais pour vous éviter la page blanche et la mise en forme. Ce guide reprend exactement ce que je fais valider en formation : préparer ses données, coller le bon modèle, relire les prix à la main, puis adapter selon le type de chantier. Les montants restent votre responsabilité : l’outil propose une structure, vous validez chaque chiffre.',
      },
      {
        type: 'paragraph',
        title: 'Le vrai problème : ce n’est pas le chantier, c’est le papier',
        content:
          'Sur le terrain, vous savez ce que vous allez faire : déposer les câbles, passer les sous-couches, monter les cloisons. Le client, lui, veut un papier qui rassure : un devis détaillé, lisible, avec des lots clairs et des totaux cohérents. Dans les TPE que j’accompagne, on voit souvent 3 à 5 heures par semaine absorbées par la rédaction et la mise au propre des devis — parfois plus quand il y a plusieurs variantes ou un marché un peu technique. Souvent, le blocage n’est même pas le calcul : c’est de reformuler proprement ce que vous avez déjà en tête, de répéter les mêmes mentions légales, d’aligner les libellés pour que le client comprenne ce qu’il paie. La solution que je propose n’est pas magique : c’est ChatGPT utilisé comme assistant de rédaction pour un devis BTP IA, avec une règle d’or que je répète en salle : on automatise le devis artisan pour gagner du temps sur la forme, jamais pour laisser un robot décider du chiffrage à votre place. Quand la méthode est propre, le premier jet sort en environ vingt minutes ; le reste, c’est votre relecture et votre grille tarifaire. C’est exactement l’objectif d’un bon usage de l’outil : moins de fatigue administrative, plus de disponibilité pour les chantiers et les clients.',
      },
      {
        type: 'paragraph',
        title: 'Étape 1 — Préparer vos données (sans ça, ChatGPT invente)',
        content:
          'Avant d’ouvrir ChatGPT, je vous demande de rassembler le strict nécessaire — comme avant un vrai chiffrage. Côté entreprise : raison sociale, coordonnées, numéro SIRET, mentions d’assurance (décennale, RC pro) si vous les mettez en pied de devis. Côté chantier : type de travaux (neuf, rénovation, extension), localisation au moins par commune, contraintes (accès, délais, horaires bruyants), périmètre précis des prestations. Côté argent : votre grille de prix unitaires ou, à défaut, des ordres de grandeur que vous acceptez d’utiliser provisoirement — mais en les étiquetant comme « à valider ». Les conditions commerciales : acompte, délai de validité du devis, modalités de paiement, taux de TVA prévu (10 % ou 20 % selon le cas rénovation / neuf — en cas de doute, notez-le et vérifiez avec votre comptable). Si vous donnez ça à ChatGPT, vous limitez les « prix fantaisistes » ; si vous donnez un vague « refaire la salle de bain », vous obtiendrez un texte joli mais pas ancré dans votre réalité économique.',
      },
      {
        type: 'paragraph',
        title: 'Étape 2 — Le prompt magique (celui que je fais copier en formation)',
        content:
          'Voici le modèle que je donne tel quel aux équipes : vous le copiez, vous remplacez ce qui est entre crochets par vos infos réelles, et vous lisez la sortie comme un brouillon de chantier — pas comme une vérité comptable. L’objectif est un devis lot par lot, avec séparation claire fournitures et main-d’œuvre quand c’est pertinent, TVA explicitée, et mentions légales de base. Si un prix ne figure pas dans votre grille, le modèle doit laisser « à compléter » plutôt que broder un chiffre crédible au hasard.',
      },
      {
        type: 'prompts',
        title: 'Le prompt à coller dans ChatGPT (devis complet, lots, TVA)',
        content: [
          {
            titre: 'Modèle — Devis BTP structuré (lots, fournitures, main d’œuvre, TVA)',
            prompt:
              "Tu es un assistant de rédaction pour une entreprise du bâtiment en France. Rédige un DEVIS professionnel à partir des éléments suivants, sans inventer de normes techniques ni de prix si je ne les fournis pas.\n\nIDENTITÉ ENTREPRISE : [nom, adresse, téléphone, email, SIRET, assurances décennale et RC pro si connues].\n\nCHANTIER : [adresse ou commune], type [neuf / rénovation / extension], délai souhaité [X semaines], contraintes [accès, stationnement, horaires].\n\nPÉRIMÈTRE : [décrire corps d'état par corps d'état : ex. dépose, préparation des supports, fourniture et pose, finitions].\n\nGRILLE DE PRIX (HT) : [coller PU ou table : désignation / unité / PU HT ; ou écrire « PU à saisir » pour chaque ligne si non fourni].\n\nTVA : indiquer pour chaque poste si tu appliques 10 % ou 20 % et pourquoi (travaux sur logement de plus de 2 ans, etc.) ; si tu n'es pas certain, écris « TVA à confirmer selon situation fiscale du chantier ».\n\nSTRUCTURE DU DOCUMENT :\n1) Objet et rappel du périmètre\n2) Détail par LOT avec sous-titres clairs : pour chaque ligne — désignation, quantité, unité, PU HT, total HT\n3) Distinction fournitures / main-d'œuvre lorsque pertinent\n4) Sous-total HT, détail TVA par taux, Total TTC\n5) Conditions : validité du devis [30 jours], acompte [%], solde, délais de paiement\n6) Mentions légales habituelles (décennale, RC Pro) — sans inventer de numéros de police\n\nSTYLE : français professionnel, vocabulaire BTP correct, phrases courtes. Si une information manque pour chiffrer, écris « À compléter par l'entreprise » au lieu d'estimer un montant.",
            usage:
              'Remplacez tout ce qui est entre crochets. Relisez chaque PU et total : ChatGPT ne connaît pas votre marge ni votre saison.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 3 — Personnaliser et vérifier (indispensable sur les prix)',
        content:
          'Le texte généré est une base, pas une offre prête à signer. Je passe toujours en revue les mêmes points avec les stagiaires : d’abord les prix unitaires et les quantités — ChatGPT devis chiffrage peut arrondir ou aligner sur des moyennes trouvées sur internet, ce qui n’a rien à voir avec votre fournisseur local ou votre productivité réelle. Ensuite la TVA : une erreur ici coûte cher au client comme à vous. Puis le descriptif technique : les intitulés de lots doivent coller à ce que vous facturez vraiment (pas de prestation « en trop » qui vous engage). J’ajoute ensuite votre mise en page habituelle : logo, pied de page, numérotation, références aux CGV. Si vous utilisez un logiciel de devis, copiez les lots utiles plutôt que d’envoyer brut le PDF ChatGPT — l’important est de gagner du temps sur la rédaction, pas de créer un second flux bancal. C’est exactement cet enchaînement relecture humaine + outil métier que je valide en formation IA BTP : l’IA accélère, vous tranchez.',
      },
      {
        type: 'paragraph',
        title: 'Étape 4 — Les variantes : rapide vs détaillé, rénovation vs neuf',
        content:
          'Pas besoin du même niveau de détail pour chaque prospect. Pour un petit entretien ou une réparation ciblée, je demande un « devis rapide » : peu de lots, phrases courtes, focus sur déplacement, MO, fourniture principale — le but est d’envoyer vite pour débloquer le planning. Pour une rénovation lourde ou une extension, on passe en « devis détaillé » : lots découpés (dépose, reprise d’étanchéité, isolation, finitions), parce que le client compare souvent plusieurs artisans et que la transparence du poste rassure. Neuf et rénovation ne se traitent pas pareil : en rénovation, j’insiste dans le prompt sur l’imprévu (prises en sous-œuvre, état des supports) pour que le devis dise clairement ce qui est mesuré sur place — ça évite les disputes à l’avancement. Pour le neuf, la structuration par phase ou par corps d’état est souvent plus lisible pour le maître d’ouvrage. Vous pouvez dupliquer le prompt magique et ajouter une ligne « mode : devis synthétique » ou « mode : mémoire technique léger » selon le cas.',
      },
      {
        type: 'prompts',
        title: '3 prompts prêts à l’emploi (peinture, électricité, maçonnerie)',
        content: [
          {
            titre: 'Devis peinture — pièces et surfaces données',
            prompt:
              "Tu es peintre en bâtiment en France. Rédige un devis pour [nombre] pièces, surface totale environ [X] m² de murs et [Y] m² de plafonds. Préparation : lessivage, rebouchages légers, ponçage. Finitions : [mat / satin / acrylique], [nombre] couches. Fourniture des peintures : [oui/non]. Déplacement [zone]. Utilise ma grille PU HT suivante : [coller]. Précise TVA 10 % si travaux sur logement de plus de 2 ans, sinon justifie. Total HT, TVA, TTC. Conditions : validité 30 jours, acompte 30 %.",
            usage: 'Adaptez surfaces, type de pièces (humides ou non) et gamme peinture.',
          },
          {
            titre: 'Devis électricité — tableau et circuits',
            prompt:
              "Tu es électricien qualifié (France). Rédige un devis pour : [rénovation partielle / mise aux normes / extension] — logement [surface] m². Travaux : [ex. remplacement tableau X rangées, circuits éclairage et prises, prises dédiées, mise à la terre]. Fourniture matériel : [marque ou « selon catalogue »]. Main-d'œuvre détaillée par lot. Utilise les PU HT suivants ou laisse « à compléter » : [grille]. Mentionne attestation Consuel si applicable sans inventer de numéro. TVA, totaux, délai d'exécution, validité de l'offre.",
            usage: 'Complétez avec le nombre de points, tableau existant ou neuf, contraintes génie civil.',
          },
          {
            titre: 'Devis maçonnerie — ouvrages et volumes',
            prompt:
              "Tu es maçon en France. Rédige un devis pour [murs / dalle / extension] — [dimensions ou m² / m³]. Béton et armatures : [préciser si fournis]. Fourniture [sable, ciment, parpaings : oui/non]. Main-d'œuvre par étape : fondations, élévation, reprises. Intègre les PU HT : [grille ou à compléter]. Précise délais, conditions météo si travaux extérieurs, TVA 10 % ou 20 % selon contexte. Totaux et acompte.",
            usage: 'Pour les gros œuvres, joindre toujours une visite technique avant engagement ferme.',
          },
        ],
      },
      {
        type: 'list',
        title: 'Erreurs à éviter (les trois pièges que je vois encore trop souvent)',
        content: [
          'Prix fantaisistes — croire le premier total affiché sans passer sur votre grille : ChatGPT est fort en phrases, pas en comptabilité de chantier.',
          'Oublier frais annexes — déplacement, bennes, échafaudage, protections : si vous ne les indiquez pas dans le prompt, ils ne seront pas dans le devis.',
          'Zéro relecture — envoyer tel quel au client : vous engage votre nom ; une ligne de TVA ou un lot mal libellé suffit à créer un conflit.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Pour conclure',
        content:
          'Automatiser devis artisan avec ChatGPT, ce n’est pas tricher : c’est arrêter de partir de zéro à chaque fois. La méthode qui tient la route, je la répète en formation : données propres, prompt magique, relecture des prix, adaptation au type de chantier. Si vous maîtrisez ça, le gain de temps devient réel sans vous exposer sur le fond. Je préfère toujours qu’on travaille sur vos propres exemples (anonymisés) : un devis type de votre métier, une rénovation récurrente, un petit entretien — comme ça, personne ne repart avec un modèle « scolaire » qui ne colle pas à votre entreprise. Et si vous voulez que ce soit votre équipe qui gagne ce réflexe — avec des cas concrets du bâtiment et des consignes pour ne pas coller d’informations sensibles dans l’outil — c’est tout le sens de ma formation IA BTP chez OFC Création d’Entreprise, certifiée Qualiopi et finançable par l’OPCO Constructys dans les conditions habituelles des entreprises du secteur.',
      },
      {
        type: 'cta',
        content:
          'Vous voulez maîtriser ces techniques ? Découvrez ma formation IA BTP finançable Constructys — sessions de 4 h en pratique, prompts et relecture des devis inclus. +1 500 professionnels formés, note 4,85/5.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: ['chatgpt-devis-btp-methode-2026', 'financer-formation-ia-btp-constructys', 'formation-ia-btp-guide-complet-2026'],
  },

  // Avril 2026 — Comparatif ChatGPT / Claude / Gemini pour le BTP
  {
    slug: 'comparatif-chatgpt-claude-gemini-btp',
    title: 'ChatGPT vs Claude vs Gemini : lequel choisir quand on est dans le BTP ?',
    seoTitle: 'Comparatif ChatGPT Claude Gemini BTP — avis terrain | Laure Olivié',
    description:
      'Comparatif ChatGPT Claude Gemini BTP : devis, emails, appels d\'offres, réseaux — avis terrain d\'une formatrice. Quel outil pour les artisans et les TP ? Simplicité, mémoire longue, intégration Google. Laure Olivié.',
    date: '2026-04-08',
    keywords: [
      'comparatif ChatGPT Claude Gemini BTP',
      'ChatGPT vs Claude BTP',
      'Gemini ou ChatGPT bâtiment',
      'IA artisan BTP',
      'Claude mémoire technique',
      'ChatGPT devis BTP',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Ce comparatif ChatGPT Claude Gemini BTP part de la pratique : ce que j’observe en formation avec des artisans, des conducteurs de travaux et des dirigeants de TPE du bâtiment. Aucun outil ne « gagne » sur tout : chacun a des forces selon que vous rédigez un devis, un courrier tendu, un mémoire technique ou un post LinkedIn. L’objectif est de vous éviter de jongler au hasard entre trois abonnements sans critères.',
      },
      {
        type: 'paragraph',
        title: 'Mes stagiaires me posent toujours la même question',
        content:
          'Dès qu’on ouvre le sujet des assistants d’écriture, quelqu’un lève la main : « Alors, c’est lequel le meilleur ? » Je réponds presque toujours la même chose : le meilleur, c’est celui que vous allez vraiment utiliser deux fois par jour, avec une méthode — pas celui qui a la meilleure réputation sur internet. J’utilise ChatGPT, Claude et Gemini au quotidien avec les groupes : pas en mode démo stérile, mais sur des extraits de devis, des brouillons de mails et des morceaux de DCE anonymisés. Ce qui change le résultat, ce n’est pas seulement le logo en haut de la page, c’est la consigne, la relecture humaine et le type de document. Ce que je vous propose ici, c’est un avis terrain, pas un tableau marketing : des tendances que je vois revenir, lesquelles tiennent aussi à l’évolution des modèles (donc à prendre avec le recul du mois en cours). Je n’ai aucun intérêt à vous vendre un « vainqueur » : mon boulot, c’est que vous gagniez du temps sans prendre de risques sur les données sensibles, et que vous sachiez quand passer d’un outil à l’autre.',
      },
      {
        type: 'html',
        title: 'Tableau comparatif synthétique (vue d’ensemble)',
        content:
          '<p class="text-slate-600">Lecture rapide : « Très bon » = je le sors souvent pour ce cas ; « Bon » = ça fait le job avec un bon prompt ; « Correct » = utilisable mais pas mon premier réflexe pour cette tâche.</p>' +
          '<div class="mt-4 overflow-x-auto">' +
          '<table>' +
          '<caption>Comparatif ChatGPT, Claude et Gemini pour le BTP (avis formatrice)</caption>' +
          '<thead><tr><th scope="col">Critère</th><th scope="col">ChatGPT</th><th scope="col">Claude</th><th scope="col">Gemini</th></tr></thead>' +
          '<tbody>' +
          '<tr><th scope="row">Devis / chiffrage</th><td>Très bon — réactif, bon pour structurer lots et TVA si vous fournissez votre grille.</td><td>Très bon — souvent très propre sur les longues listes de postes.</td><td>Bon — pratique si vous êtes déjà tout le jour dans Google Workspace.</td></tr>' +
          '<tr><th scope="row">Rédaction courriers / emails</th><td>Très bon — ton professionnel, variantes courtes.</td><td>Très bon — style posé, moins « punchy » parfois.</td><td>Bon à très bon — s’intègre bien à Gmail / Docs.</td></tr>' +
          '<tr><th scope="row">Appels d’offres (mémoire, CCTP)</th><td>Bon — fenêtre de contexte large en version payante.</td><td>Très bon — confort sur les pièces longues et les relectures.</td><td>Bon — utile pour croiser avec Drive sans copier-coller partout.</td></tr>' +
          '<tr><th scope="row">Simplicité du quotidien</th><td>Très bon — interface familière, grosse communauté, tutos partout.</td><td>Bon — un cran de moins « grand public », mais clair.</td><td>Très bon pour les équipes déjà chez Google.</td></tr>' +
          '</tbody></table></div>',
      },
      {
        type: 'paragraph',
        title: 'Pour les devis et chiffrages : lequel je tends à ouvrir en premier',
        content:
          'Pour un devis ou un chiffrage, j’alterne le plus souvent entre ChatGPT et Claude. ChatGPT, les équipes le connaissent déjà : peu de friction pour coller un brief chantier et demander un découpage en lots avec fournitures / main-d’œuvre. Sur les chantiers « classiques » (rénovation, second œuvre), le résultat est souvent prêt à être repris dans votre logiciel métier après une passe sur les prix. Quand la liste de postes devient longue ou qu’il faut garder la cohérence sur plusieurs pages, Claude me donne fréquemment une mise en forme très lisible — les titres de lots restent stables, moins de mélange entre les lignes. Gemini brille moins sur le « pur » devis quand l’équipe n’est pas déjà dans l’écosystème Google, mais si votre devis vit dans une Sheet partagée, le fait de rester dans le même univers peut faire gagner du temps administratif. À titre personnel, je ne laisse jamais un modèle « inventer » une grille tarifaire : soit vous collez vos PU, soit vous demandez explicitement des champs vides à compléter — sinon vous retrouvez des montants plausibles mais faux. Exemple de prompt que je fais tester en salle (à adapter avec vos chiffres réels) : « Artisan [métier], région [X]. Chantier : [description courte]. Produis un devis en tableau avec colonnes désignation, quantité, unité, PU HT, total HT ; sépare fournitures et MO ; ajoute une ligne TVA 10 % ou 20 % selon le cas annoncé ; ne invente pas de prix si je ne les donne pas — laisse « à compléter ». » Ensuite, on vérifie chaque montant à la main : toujours.',
      },
      {
        type: 'paragraph',
        title: 'Pour les emails et courriers : ton, fermeté, relances',
        content:
          'Sur les mails clients, relances ou courriers un peu délicats (retard de paiement, réserve sur travaux, demande de complément d’information), je trouve ChatGPT très efficace pour produire trois tons : sec, neutre, plus chaleureux — vous choisissez ce qui colle à votre entreprise. Claude a souvent un style un peu plus « posé » ; certaines personnes préfèrent pour les textes où il ne faut pas paraître agressif. Gemini est particulièrement pratique si le brouillon part directement depuis Gmail : moins d’allers-retours entre onglets. Exemple testé avec des stagiaires : « Rédige un email professionnel en français : nous sommes une entreprise du BTP, nous relançons un devis envoyé le [date], travaux prévus [période], ton ferme mais courtois, 120 mots max, objet inclus. » Les trois outils sortent quelque chose d’utilisable ; la différence, c’est souvent le dernier pourcent de « naturel » — d’où l’intérêt de relire en voix haute.',
      },
      {
        type: 'paragraph',
        title: 'Pour les appels d’offres : mémoire technique, CCTP, synthèses',
        content:
          'Là où les dossiers deviennent lourds, la discussion change. Quand on doit résumer des centaines de pages de DCE ou garder le fil entre plusieurs pièces, Claude est souvent celui que je recommande pour une première lecture assistée : les réponses restent généralement bien structurées quand on lui demande un plan, des risques, des points à clarifier avec le maître d’ouvrage. ChatGPT en version payante tient aussi largement le coup grâce à une fenêtre de contexte élevée — je l’utilise beaucoup pour des plans de mémoire en sections (sécurité, méthodologie, moyens humains et matériels). Gemini prend tout son sens si les documents sont déjà dans Google Drive : on réduit les copier-coller hasardeux, ce qui aide à garder une trace propre côté entreprise — à condition que votre organisation accepte ce flux. Prompt type que je donne : « Voici un extrait anonymisé de CCTP. Liste les exigences techniques contraignantes, les interfaces avec d’autres lots, et les points flous à poser en clarification — tableau avec colonne « citation / référence » si le texte le permet. » Puis on croise avec la relecture humaine : l’IA ne remplace pas la visite de chantier ni le visa du responsable.',
      },
      {
        type: 'paragraph',
        title: 'Pour les réseaux sociaux : LinkedIn, Facebook, photos de chantier',
        content:
          'Pour des posts réseaux — chantier terminé, recrutement, sécurité au travail — ChatGPT est souvent le plus rapide pour une accroche courte et des variantes (trois longueurs, trois angles). Claude peut aider si vous voulez un texte un peu plus « narration » sur un projet complexe. Gemini peut proposer des formulations adaptées à une communauté locale ou lier à un événement saisonnier si vous lui donnez le contexte. Exemple : « Photo : rénovation de toiture. Entreprise [spécialité]. Ton authentique, pas marketing. 2 hashtags max. 90 mots. » Je le répète en formation : on ne publie pas une photo de chantier sans accord ; et on ne copie-colle pas d’infos confidentielles dans un outil public.',
      },
      {
        type: 'paragraph',
        title: 'Mon verdict de formatrice BTP',
        content:
          'Si vous devez n’en choisir qu’un pour démarrer : commencez par ChatGPT — la courbe d’apprentissage est souvent la plus douce pour une équipe mixte (bureau et terrain). Ensuite, ajoutez Claude lorsque vous traitez régulièrement des documents longs ou des mémoires où la structure compte autant que le fond. Gardez Gemini dans la boucle si votre entreprise vit déjà dans Gmail, Drive et Calendar : l’intégration fait partie du gain de temps, pas seulement le modèle. Je ne crois pas au « gagnant unique » : je crois au trio testé sur vos vrais cas, avec des règles internes sur les données personnelles et les dossiers sensibles. Honnêtement, les écarts entre modèles se réduisent vite ; ce qui reste stable, c’est votre méthode et votre relecture. Côté abonnements, il n’y a pas de règle unique : certains restent sur des offres gratuites pour démarrer, d’autres passent sur des abonnements payants quand le volume de documents augmente — l’important est de savoir ce que vous payez (confidentialité, historique, accès équipe) et de l’aligner avec votre politique interne.',
      },
      {
        type: 'paragraph',
        title: 'En conclusion',
        content:
          'Ce comparatif ChatGPT Claude Gemini BTP ne remplace pas un essai sur votre bureau : les outils évoluent, et ce qui compte est ce que vous validez devant un client ou dans un marché public. En formation, je vous montre les trois sur vos documents réels — devis, modèles de mails, extraits de pièces — pour que chacun reparte avec une feuille de route claire, sans promesse miracle. Si vous voulez qu’on verrouille ça ensemble avec votre métier (bâtiment, travaux publics, sous-traitance), c’est précisément le programme que je porte chez OFC Création d’Entreprise, avec certification Qualiopi et financement possible via l’OPCO Constructys selon les règles en vigueur.',
      },
      {
        type: 'cta',
        content:
          'En formation, je vous montre les 3 outils sur vos documents réels — devis, courriers, appels d\'offres. Formation IA BTP, Qualiopi, finançable Constructys selon éligibilité.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: [
      'devis-btp-chatgpt-20-minutes',
      'chatgpt-devis-btp-methode-2026',
      'formation-ia-btp-guide-complet-2026',
    ],
  },

  // Avril 2026 — IA mémoire technique & appels d'offres BTP (Module 5)
  {
    slug: 'ia-memoire-technique-appel-offres-guide-2026',
    title: 'Comment rédiger un mémoire technique BTP avec l\'IA — Guide complet 2026',
    seoTitle: 'IA mémoire technique appel d\'offres — guide BTP 2026 | Laure Olivié',
    description:
      'IA mémoire technique appel d\'offres : analyser le DCE, structurer le mémoire, prompts CCTP/RC, critères d\'attribution, relecture. Mémoire technique BTP IA, ChatGPT. Finançable Constructys. Laure Olivié.',
    date: '2026-04-09',
    keywords: [
      'IA mémoire technique appel d\'offres',
      'mémoire technique BTP IA',
      'rédiger mémoire technique ChatGPT',
      'appel d\'offres BTP intelligence artificielle',
      'DCE CCTP mémoire technique',
      'critères d\'attribution BTP',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Ce guide sur l\'IA mémoire technique appel d\'offres s\'adresse aux dirigeants et chargés d\'affaires des PME du bâtiment et des travaux publics qui répondent à des marchés publics ou privés : comment utiliser ChatGPT ou un assistant IA pour accélérer l\'analyse du DCE et la rédaction du mémoire, sans jamais déléguer la responsabilité du fond. Je m\'appuie sur le Module 5 de ma formation « Répondre aux appels d\'offres avec l\'IA » : analyse DCE, plan aligné sur la note technique, sections clés, relecture. Les pièces officielles (RC, CCTP, DPGF) restent votre référence ; l\'IA structure et reformule à partir de ce que vous lui fournissez.',
      },
      {
        type: 'paragraph',
        title: 'Pourquoi le mémoire technique mérite autant d\'attention',
        content:
          'Sur la plupart des marchés de travaux, la note technique représente souvent 40 à 60 % de la notation globale — parfois plus selon les pondérations du règlement de consultation. Pourtant, dans les PME que je forme, je vois encore trop souvent le mémoire rédigé à la dernière minute, avec des passages génériques qui ne répondent pas précisément aux critères d\'attribution. Ce n\'est pas un manque de compétence métier : c\'est un manque de temps et de méthode. Entre le chiffrage, le planning chantier et le courrier du jour, le dossier d\'offre passe au second plan — alors que c\'est pourtant lui qui doit démontrer que vous avez compris le CCTP et que vous savez organiser les moyens. L\'intelligence artificielle ne remplace pas votre expertise : elle vous aide à structurer plus vite, à ne rien oublier dans le RC, et à aligner chaque paragraphe sur les sous-critères de la note technique. Le bon réflexe, c\'est de traiter le mémoire comme un chantier : avec un planning, des jalons et une relecture finale par quelqu\'un qui connaît le marché.',
      },
      {
        type: 'paragraph',
        title: 'Ce que l\'IA peut faire (et ne peut pas faire) dans un mémoire technique',
        content:
          'Ce qu\'elle peut faire : synthétiser des extraits du DCE pour en sortir une grille de critères et de délais ; proposer un plan de mémoire cohérent avec les rubriques demandées dans le RC ; rédiger des brouillons de sections à partir de vos données (effectifs, matériel, références de chantiers) ; reformuler pour gagner en clarté ; générer des listes de points de vigilance (interfaces entre lots, contraintes de phasage). Ce qu\'elle ne peut pas faire à votre place : signer une méthode qu\'elle n\'a pas vue sur le terrain ; garantir une faisabilité prix sans votre DPGF ; inventer des références ou des effectifs crédibles ; interpréter seule une clause ambiguë du CCAP — il faut alors une relecture humaine, voire une question au maître d\'ouvrage. Autre point sensible : ne collez pas des données personnelles, des prix confidentiels ou des pièces entières dans un outil public sans cadre d\'entreprise. En formation, je fais travailler les équipes sur des extraits anonymisés et sur des consignes de confidentialité claires.',
      },
      {
        type: 'paragraph',
        title: 'Étape 1 — Analyser le DCE avec l\'IA',
        content:
          'Avant d\'écrire une ligne du mémoire, il faut savoir ce que le pouvoir adjudicateur attend vraiment. Je commence toujours par le règlement de la consultation (RC) : critères d\'attribution, pondération, sous-critères, pièces à produire, format de remise. Ensuite le CCTP pour votre lot : exigences techniques, délais, interfaces, normes. L\'IA sert à transformer ces dizaines de pages en fiche de travail : exigences classées par thème, points qui alimentent directement les sections du mémoire, et liste des « mots attendus » issus du lexique du marché. Si vous lui donnez des extraits ciblés plutôt que le PDF entier, vous gardez le contrôle et vous réduisez le bruit.',
      },
      {
        type: 'prompts',
        title: 'Prompt — Synthèse DCE pour préparer le mémoire (RC + extraits CCTP)',
        content: [
          {
            titre: 'Extraction critères, exigences et délais',
            prompt:
              "Tu es un assistant pour une entreprise du BTP en France. À partir des extraits suivants du règlement de consultation et du CCTP (collés ci-dessous), produis :\n1) Un tableau des critères d'attribution et sous-critères avec leur pondération si elle figure au texte.\n2) La liste des exigences techniques obligatoires pour le lot [PRÉCISER LE LOT] avec référence d'article ou de paragraphe si présente dans les extraits.\n3) Les délais d'exécution ou phasage imposés.\n4) Les pièces à fournir explicitement mentionnées pour la note technique.\n5) Les points flous ou contradictoires à clarifier avec le MOA/MOE.\nNe invente pas d'information absente des extraits. Texte des extraits :\n\n[COLLER EXTRAITS ANONYMISÉS]",
            usage:
              'Collez uniquement les parties utiles du DCE. Vérifiez chaque pondération sur le document officiel.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 2 — Structurer le plan du mémoire',
        content:
          'Le plan doit refléter la grille de notation : si le RC impose une trame ou des intitulés, respectez-les à la lettre. Sinon, alignez vos titres sur les sous-critères (souvent : compréhension du besoin, méthodologie, moyens humains et matériels, planning, QSE, références). L\'IA peut proposer une arborescence avec sous-parties et indication de ce que chaque section doit démontrer par rapport au CCTP. Je demande systématiquement une colonne « lien avec critère / sous-critère » pour éviter les développements hors sujet. N\'oubliez pas les annexes listées au RC (certificats, organisationnel QSE, fiches matériel) : le plan du mémoire n\'est pas seulement du texte, c\'est aussi la liste des preuves que vous allez joindre.',
      },
      {
        type: 'prompts',
        title: 'Prompt — Plan de mémoire aligné sur les critères d\'attribution',
        content: [
          {
            titre: 'Trame détaillée + lien avec la note technique',
            prompt:
              "Voici les critères et sous-critères d'attribution (copiés du RC) :\n[COLLER]\n\nVoici le périmètre du lot et les contraintes principales du CCTP :\n[COLLER]\n\nPropose un plan de mémoire technique en niveaux (I, II, III) avec pour chaque section : objectif, contenu attendu, et renvoi au(x) sous-critère(s) concerné(s). Ajoute une ligne « pièces / illustrations recommandées » par section. Langage : français professionnel BTP. Ne pas dépasser la structure demandée par le RC si une trame imposée existe.",
            usage: 'Adaptez le niveau de détail à la note maximale du mémoire.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 3 — Rédiger les sections clés du mémoire',
        content:
          'Une fois le plan validé, je fais rédiger les blocs un par un — jamais le mémoire entier en un seul jet sans relecture intermédiaire. La présentation de l\'entreprise doit coller aux attentes du marché (effectifs, savoir-faire, références pertinentes par nature et ampleur). La méthodologie d\'exécution doit montrer que vous avez compris les interfaces et le phasage. Le planning prévisionnel doit être cohérent avec les délais du CCTP et votre organisation interne. Les moyens humains et matériels doivent être vérifiables : pas d\'effectifs « au doigt mouillé ». La démarche QSE doit reprendre vos process réels (planification des contrôles, gestion des déchets, coordination sécurité). Pour chaque rubrique, je fournis à l\'IA des données brutes (chiffres, listes, noms de matériel) et je lui demande une mise en forme argumentative, pas l\'inverse.',
      },
      {
        type: 'prompts',
        title: 'Prompts par section (à alimenter avec vos données réelles)',
        content: [
          {
            titre: 'Présentation de l\'entreprise',
            prompt:
              "Rédige la section « Présentation de l'entreprise » d'un mémoire technique pour un marché de travaux en France. Données à intégrer (véritables uniquement) : raison sociale, forme juridique, année de création, effectif moyen annuel, compétences clés, zone géographique d'intervention, références de chantiers [LISTE AVEC ANNÉES ET MONTANTS / NATURE]. Ton : professionnel, factuel, sans marketing creux. 400 à 600 mots. Terminer par une phrase liant l'expérience au besoin du marché décrit ici : [RÉSUMÉ BESOIN CCTP EN 3 PHRASES].",
            usage: 'Vérifiez chaque référence et chiffre avant envoi.',
          },
          {
            titre: 'Méthodologie d\'exécution',
            prompt:
              "Rédige la section « Méthodologie d'exécution des travaux » pour le lot [LOT]. Contraintes CCTP à respecter : [COLLER POINTS CLÉS]. Décris : phasage, interfaces avec autres lots, gestion des accès, gestion des nuisances, contrôles qualité sur ouvrages clés. Indique les risques identifiés et les mesures associées. Ne pas inventer de procédures internes : si une info manque, insère [à compléter par l'entreprise]. 500 à 800 mots, style technique BTP.",
            usage: 'Alignez sur le phasage réellement envisageable.',
          },
          {
            titre: 'Planning prévisionnel',
            prompt:
              "À partir des durées et jalons suivants (à valider par l'entreprise) : [LISTE TÂCHES + DURÉES], produis un planning sous forme de tableau : tâche, durée, dépendances, jalon, semaine cible. Ajoute un paragraphe sur les marges et le chemin critique. Mentionne les contraintes de calendrier imposées par le CCTP : [COLLER]. Si les dates sont indicatives, précise-le clairement.",
            usage: 'Exportez ensuite vers votre outil planning habituel.',
          },
          {
            titre: 'Moyens humains et matériels',
            prompt:
              "Rédige la section « Moyens humains et matériels ». Effectifs : [NOMBRE + PROFILS]. Matériel principal : [LISTE]. Moyens de levage / équipements spécifiques : [LISTE]. Précise ce qui est déjà en possession de l'entreprise vs location prévue. Ne pas gonfler les quantités : si une ressource n'est pas assurée, écris « à confirmer ». Conclure sur la capacité à tenir le délai global du marché.",
            usage: 'Cohérence obligatoire avec le planning et le prix.',
          },
          {
            titre: 'Démarche QSE (Qualité, Sécurité, Environnement)',
            prompt:
              "Rédige la section QSE : politique qualité et sécurité applicable au chantier, coordination SPS (selon rôle attendu), gestion des déchets, mesures environnementales (nuisances, protection des sols, etc.). Références aux certifications ou documents d'entreprise : [PRÉCISER ISO, PPSPS, modes opératoires — sans inventer de numéros]. Intègre les exigences du CCTP suivantes : [COLLER EXIGENCES QSE]. Ton factuel, conforme aux usages BTP.",
            usage: 'Recoupez avec votre coordinateur QSE ou votre modèle interne.',
          },
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 4 — Personnaliser et vérifier',
        content:
          'Un mémoire « IA » se reconnaît quand les phrases sont fluides mais un peu trop générales, ou quand deux sections se contredisent sur les effectifs. La relecture humaine est obligatoire : faites-la faire par quelqu\'un qui n\'a pas écrit le brouillon — idéalement le conducteur de travaux ou le dirigeant. Vérifiez la cohérence avec votre offre de prix : méthode, durées, moyens. Contrôlez que chaque critère de la note technique est couvert au moins une fois, de façon explicite. Préparez les pièces justificatives citées : une référence de chantier doit être traçable ; un plan d\'installation doit exister. Enfin, adaptez le style au pouvoir adjudicateur : un marché hospitalier n\'a pas les mêmes attentes qu\'un lot de voirie. Le Module 5 de la formation insiste sur cette étape : l\'IA accélère le brouillon, l\'entreprise valide le pli.',
      },
      {
        type: 'paragraph',
        title: 'Note technique, DPGF et critères : faire tenir l\'ensemble',
        content:
          'Dans beaucoup de marchés, la note technique n\'est qu\'une partie du dossier : le prix et le détail quantitatif (DPGF ou bordereau de prix) portent le reste de la notation ou des sous-critères liés au « rapport qualité / prix ». Ce que je vérifie systématiquement avec les PME en formation, c\'est l\'alignement : les durées annoncées dans le mémoire doivent être compatibles avec votre planning chiffré ; les moyens matériels listés doivent être cohérents avec les postes de location ou d\'amortissement ; les quantités ou périmètres évoqués dans la méthode ne doivent pas contredire votre quantitatif. Un écart visible entre le discours technique et les chiffres du DPGF est l\'un des signaux les plus négatifs pour un jury. L\'IA peut vous aider à produire un tableau de cohérence « critère → extrait mémoire → renvoi DPGF » si vous lui fournissez les bons éléments — sans jamais les substituer à votre contrôle interne. Pensez aussi aux critères d\'exclusion : un mémoire brillant ne compense pas une pièce administrative manquante ou une erreur de forme de dépôt.',
      },
      {
        type: 'html',
        title: 'Kit IA appels d\'offres BTP (PDF gratuit)',
        content:
          '<p class="text-slate-600">Pour aller plus loin avec des fiches méthode et des rappels sur l\'analyse du DCE et la rédaction du mémoire, <strong>téléchargez notre kit IA appels d\'offres BTP (PDF gratuit)</strong> : support complémentaire à la formation.</p>' +
          '<ul class="mt-4 list-disc pl-6 text-slate-600">' +
          '<li><a href="/formations/ia-appels-offre-btp/Kit_IA_AO_BTP_7_prompts.html">Kit IA appels d\'offres BTP — 7 prompts (HTML, imprimer en PDF)</a></li>' +
          '<li><a href="/formations/ia-appels-offre-btp/Support_complementaire_AO_BTP.pdf">Support complémentaire AO BTP (PDF)</a></li>' +
          '<li><a href="/formations/ia-appels-offre-btp/Programme_Formation_LSR_AO_BTP_2026.pdf">Programme détaillé de la formation AO (PDF)</a></li>' +
          '<li><a href="/formations/ia-appels-offre-btp">Page formation « Répondre aux appels d\'offres avec l\'IA »</a> — Module 5 mémoire technique, finançable Constructys</li>' +
          '</ul>',
      },
      {
        type: 'prompts',
        title: '5 prompts prêts à l\'emploi pour votre mémoire technique (versions complètes)',
        content: [
          {
            titre: '1 — Cartographie « critère → contenu du mémoire »',
            prompt:
              "À partir du RC et de la grille de notation ci-dessous (copier-coller), crée une table : pour chaque sous-critère, indique quelles sections du mémoire doivent y répondre, quelles pièces justificatives suggérer, et un exemple de phrase de conclusion par section. Signale les trous si un sous-critère n'est couvert par aucune section prévue.\n\n[COLLER RC / GRILLE]",
            usage: 'Gardez cette table comme checklist avant envoi.',
          },
          {
            titre: '2 — Synthèse risques & interfaces (CCTP)',
            prompt:
              "À partir des extraits CCTP suivants concernant le lot [LOT], liste les risques techniques, interfaces avec autres corps d'état, et contraintes de réception. Pour chaque point, propose une réponse courte « comment nous traitons ce point dans l'exécution » en 2 phrases maximum. Ne pas inventer de solutions : si l'info manque, écris « à traiter après visite ».\n\n[COLLER EXTRAITS]",
            usage: 'Alimente la méthodologie et la QSE.',
          },
          {
            titre: '3 — Paragraphe « valeur technique » lié au prix',
            prompt:
              "Rédige un paragraphe (150 à 200 mots) expliquant la cohérence entre l'offre de prix et la méthode proposée : organisation, optimisation des durées, choix de matériaux ou techniques sans divulguer de secrets industriels. Données : [RÉSUMÉ OFFRE TECHNIQUE] + [POINTS CLÉS CHIFFRAGE SANS MONTANTS CONFIDENTIELS SI BESOIN]. Évite le jargon vide ; reste factuel.",
            usage: 'Souvent utile quand le RC demande une articulation prix / technique.',
          },
          {
            titre: '4 — Checklist relecture avant dépôt',
            prompt:
              "Génère une checklist de relecture pour un dossier d'offre BTP : cohérence mémoire / DPGF, présence des attestations, orthographe des références, respect du format de remise, signatures, mentions RGPD si données personnelles, version PDF conforme. Adapte à la liste de pièces suivante : [COLLER LISTE DU RC].",
            usage: 'À imprimer ou cocher en équipe.',
          },
          {
            titre: '5 — Lettre de pli / note de synthèse pour le jury',
            prompt:
              "Rédige une note de synthèse d'une page maximum pour accompagner le mémoire : rappel du besoin compris, trois arguments différenciants de l'entreprise, engagement sur délais et QSE, sans répéter tout le mémoire. Contexte marché : [2 PHRASES]. Points forts à mettre en avant : [LISTE VALIDÉE PAR L'ENTREPRISE].",
            usage: 'Utile quand une courte note est autorisée ou recommandée.',
          },
        ],
      },
      {
        type: 'list',
        title: 'Erreurs fatales à éviter',
        content: [
          'Copier-coller un mémoire d\'un autre marché sans l\'aligner sur le CCTP et les critères du RC — le jury le détecte vite, et vous perdez la note sur la compréhension du besoin.',
          'Laisser l\'IA inventer des effectifs, références ou certifications : une incohérence avec le DC4 ou les attestations élimine la confiance et peut engager votre responsabilité.',
          'Oublier de répondre explicitement à un sous-critère de la note technique — même un bon discours général ne remplace pas la trace d\'un critère non traité.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Dernier mot',
        content:
          'Rédiger un mémoire technique BTP avec l\'IA, ce n\'est pas court-circuiter le métier : c\'est libérer du temps sur la mise en forme et la structuration pour concentrer votre intelligence sur le fond — risques, moyens, cohérence avec le prix. En formation, j\'anime le Module 5 précisément sur cette chaîne : DCE, plan, rédaction, relecture, avec des prompts testés en salle et des consignes de confidentialité. Si vous voulez monter en puissance sur les appels d\'offres avec votre équipe, l\'offre « Répondre aux appels d\'offres avec l\'IA » est certifiée Qualiopi et peut être financée par l\'OPCO Constructys dans le cadre habituel du plan de développement des compétences — je vous accompagne pour cadrer le besoin et le nombre de participants.',
      },
      {
        type: 'cta',
        content:
          'Formez votre équipe à l\'IA pour les appels d\'offres et les mémoires techniques — en présentiel, sur vos DCE anonymisés. Formation certifiée Qualiopi, finançable Constructys selon éligibilité.',
        formationHref: '/formations/ia-appels-offre-btp',
      },
    ],
    relatedSlugs: [
      'comparatif-chatgpt-claude-gemini-btp',
      'chatgpt-devis-btp-methode-2026',
      'financer-formation-ia-btp-constructys',
    ],
  },

  // Veille annuelle — intelligence artificielle BTP (à mettre à jour chaque année)
  {
    slug: 'ia-btp-2026-tendances',
    title: 'L\'IA dans le BTP en 2026 — Chiffres, tendances et ce qui change pour les artisans',
    seoTitle: 'Intelligence artificielle BTP 2026 : tendances, chiffres, terrain | Laure Olivié',
    description:
      'Intelligence artificielle BTP 2026 : adoption, 5 tendances (devis, agents IA, AO, BIM, formation), impacts PME. Observatoire métiers BTP, McKinsey, Constructys. Veille annuelle. Laure Olivié.',
    date: '2026-04-10',
    keywords: [
      'intelligence artificielle BTP 2026',
      'IA BTP tendances',
      'adoption IA bâtiment',
      'formation IA BTP Constructys',
      'IA générative devis BTP',
      'BIM IA',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'Cette veille sur l\'intelligence artificielle BTP en 2026 synthétise des études publiques et retours de terrain : où en est l\'adoption dans le bâtiment et les travaux publics, quelles tendances structurent l\'année, et ce que cela change pour une PME. Dernière mise à jour : avril 2026 — l\'article est pensé pour être révisé chaque année (chiffres, sources, exemples). Je m\'appuie notamment sur l\'Observatoire des métiers du BTP (étude 2026, cabinet Plein Sens), sur des analyses internationales du secteur construction (McKinsey), et sur les indicateurs français (Bpifrance, Baromètre France Num) complétés par le contexte OPCO Constructys.',
      },
      {
        type: 'paragraph',
        title: 'L\'IA n\'est plus un sujet de conférence : elle est sur les chantiers (et dans les bureaux d\'études)',
        content:
          'Il y a trois ans, quand je parlais d\'IA avec des patrons d\'artisanat, on me répondait encore « on verra plus tard ». En 2026, le débat a changé de nature : ce n\'est plus « si » on s\'y met, mais « sur quels cas concrets » on commence — devis, compte rendu, lecture de pièces marchés, modèles BIM. Sur le terrain, le téléphone filme, la tablette envoie des photos, et le bureau d\'études reçoit des volumes de données qu\'un seul cerveau ne peut plus traiter à la main. L\'IA ne pose pas encore les carreaux à votre place : en revanche, elle accélère fortement tout ce qui est écriture, synthèse et préparation de dossiers. Mon angle est celui d\'une formatrice qui voit passer chaque semaine des équipes du BTP : pas de promesse miracle, mais des gains de temps mesurables quand la méthode et la relecture humaine sont au rendez-vous.',
      },
      {
        type: 'paragraph',
        title: 'Les chiffres clés de l\'IA dans le BTP en 2026 (sources vérifiables)',
        content:
          'France — adoption dans le BTP : l\'étude « Observatoire des métiers du BTP » (2026), réalisée auprès de 621 professionnels par le cabinet Plein Sens pour l\'Observatoire, indique que moins de 10 % des entreprises du secteur utilisent déjà l\'IA, avec seulement 3 % de déploiements effectifs et 5 % en cours — tout en notant 36 % de dirigeants se déclarant prêts à adopter. Le fossé s\'explique en partie par la méconnaissance : 43,5 % n\'ont jamais essayé ChatGPT et 16 % ne savent pas ce qu\'est l\'IA (même source). Synthèse et téléchargements : voir la fiche publiée sur le site de l\'Observatoire des métiers du BTP (metiers-btp.fr). Une enquête Orisha Construction / InfoPro Digital (2025) souligne une progression marquée de l\'intention d\'adoption en un an. Échelle nationale tous secteurs : le taux d\'adoption de l\'IA en France avoisine 10 % (contre 6 % en 2023), en dessous de la moyenne européenne d\'environ 13 % (Bpifrance Le Lab ; Baromètre France Num 2025). Côté TPE-PME, l\'IA générative concerne environ 31 % des structures, dont 8 % de façon régulière (mêmes sources). International — construction : McKinsey décrit l\'IA comme une « prochaine frontière » des technologies pour le secteur, avec un potentiel notable sur les tâches à forte intensité documentaire (gestion de projet, documentation, préparation d\'offres) tout tant que les freins en compétences et en organisation sont levés. Marché européen « IA dans la construction » : les analystes (ex. MarketDataForecast) citaient un marché européen de l\'ordre d\'environ 1,5 à 1,8 milliard USD en 2025-2026, avec des trajectoires de croissance annuelle élevées à l\'échelle de la décennie — ordres de grandeur à suivre année après année. Côté financement des compétences, l\'OPCO Constructys publie chaque année un rapport d\'activité détaillant le volume d\'accompagnement des branches (stagiaires formés, engagements PDC, etc.) : la dynamique de formation reste massive ; la demande de compétences « numériques et transition » y tient une place croissante dans les feuilles de route sectorielles.',
      },
      {
        type: 'paragraph',
        title: 'Tendance 1 — IA générative pour les devis et chiffrages',
        content:
          'C\'est l\'usage le plus cité en salle : décrire un chantier en langage naturel et obtenir un premier jet de devis structuré (lots, fournitures, main d\'œuvre, TVA). Les équipes gagnent du temps sur la mise en forme — pas sur la responsabilité du prix. L\'enjeu 2026 : intégrer ces brouillons aux logiciels métiers et verrouiller une grille tarifaire interne pour éviter les « prix plausibles mais faux » générés par défaut.',
      },
      {
        type: 'paragraph',
        title: 'Tendance 2 — Assistants IA spécialisés BTP (GPTs, agents, copilotes)',
        content:
          'Au-delà du chat généraliste, on voit se répandre des assistants entraînés ou paramétrés sur des corpus métiers : modèles de courriers, checklists sécurité, rappels réglementaires. Le risque à éviter : croire qu\'un « agent » remplace une visite de chantier. Le bon usage, observé en formation, est d\'ancrer l\'outil dans des consignes d\'entreprise (ton, mentions légales, interdiction de coller des données sensibles dans un service public non validé).',
      },
      {
        type: 'paragraph',
        title: 'Tendance 3 — IA et appels d\'offres (analyse DCE, mémoires techniques)',
        content:
          'Les dossiers lourds (CCTP, RC, pièces graphiques) poussent les PME à chercher des synthèses rapides et des plans de mémoire alignés sur les critères d\'attribution. Les modèles à grande fenêtre de contexte aident à parcourir des extraits — à condition de travailler sur des parties anonymisées et de garder la validation humaine sur chaque engagement contractuel.',
      },
      {
        type: 'paragraph',
        title: 'Tendance 4 — IA + BIM + jumeaux numériques',
        content:
          'Sur les projets complexes, l\'intersection BIM / simulation / données de chantier progresse : l\'IA aide à détecter des incohérences, à proposer des variantes d\'implantation ou à prioriser des contrôles — surtout là où les maquettes numériques sont déjà structurées. Pour une petite entreprise, le point d\'entrée est souvent plus modeste (extraction de quantités, documentation), mais la trajectoire sectorielle est claire : plus de données structurées, plus d\'usages possibles.',
      },
      {
        type: 'paragraph',
        title: 'Tendance 5 — Formation IA BTP : demande en hausse et financement via l\'OPCO',
        content:
          'Côté terrain, je constate une demande forte de formats courts, pratiques, avec des cas réels — pas des slides génériques. Les dispositifs de prise en charge par l\'OPCO Constructys (plan de développement des compétences, règles par branche et taille d\'entreprise) restent le levier principal pour les structures du BTP ; les montants et plafonds évoluent : vérifiez les barèmes en vigueur sur constructys.fr et le rapport d\'activité annuel. L\'explosion n\'est pas « un chiffre magique sur l\'IA seule », mais une montée en puissance des compétences numériques dans un secteur déjà très formé, avec une place croissante pour l\'IA dans les catalogues et les priorités entreprises.',
      },
      {
        type: 'list',
        title: 'Ce que ça change concrètement pour une PME du bâtiment',
        content: [
          'Le rythme : les dossiers administratifs (devis, réponses clients, synthèses marchés) peuvent être traités plus vite — à condition d\'avoir nommé un référent interne et des règles de relecture.',
          'Les compétences : la valeur se déplace un peu du « savoir taper vite » vers le « savoir cadrer un prompt, vérifier une sortie, sécuriser les données ».',
          'La différenciation : les entreprises qui standardisent quelques usages (compte rendu, devis type, extraction DCE) gagnent en régularité par rapport à celles qui improvisent au cas par cas.',
        ],
      },
      {
        type: 'paragraph',
        title: 'Mon avis de formatrice (1 500+ professionnels formés)',
        content:
          'Ce qui fonctionne : partir d\'un vrai document (anonymisé), un cas d\'usage par session, et une règle claire — « l\'IA propose, l\'humain valide ». Ce qui échoue : vouloir tout automatiser du jour au lendemain, ou laisser des juniors envoyer des réponses sans contrôle métier. Les équipes les plus satisfaites sont celles qui ont désigné un pilote, fixé des modèles de prompts et partagé une charte simple (données personnelles, clients, montants). Je ne vends pas d\'outil : je fais gagner du temps avec des pratiques reproductibles. Si vous lisez cette veille dans deux ans, comparez surtout l\'évolution des chiffres d\'adoption et des offres éditeurs — pas seulement le buzz.',
      },
      {
        type: 'paragraph',
        title: 'Sources et références (à actualiser lors des republications annuelles)',
        content:
          'Observatoire des métiers du BTP — Étude sur la perception et l\'intégration de l\'IA dans les entreprises du BTP (2026), réalisée avec Plein Sens — fiche et téléchargements sur metiers-btp.fr · Orisha Construction / InfoPro Digital (2025) · McKinsey — Artificial intelligence: Construction technology\'s next frontier (Engineering, Construction & Building Materials) · Bpifrance Le Lab — adoption de l\'IA générative en TPE-PME · Baromètre France Num 2025 · MarketDataForecast et analystes du marché « AI in Construction » (Europe) — projections à interpréter comme ordres de grandeur · OPCO Constructys — rapport d\'activité et barèmes de financement (constructys.fr). Les pourcentages et marchés varient selon les méthodes d\'enquête ; croisez toujours avec les publications officielles mises à jour.',
      },
      {
        type: 'cta',
        content:
          'Passez à l\'action — formez vos équipes à l\'IA sur des cas BTP réels (devis, chantier, appels d\'offres). Formations certifiées Qualiopi, finançables Constructys selon éligibilité. +1 500 professionnels formés.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: [
      'adoption-ia-btp-2026-chiffres-freins-leviers',
      'ia-memoire-technique-appel-offres-guide-2026',
      'formation-ia-btp-guide-complet-2026',
    ],
  },

  // Article GEO #1 : Guide complet formation IA BTP 2026
  {
    slug: 'formation-ia-btp-guide-complet-2026',
    title: 'Formation IA BTP : guide complet 2026',
    description:
      '1592 professionnels formés. Formation IA BTP certifiée Qualiopi, financement 100% Constructys. TPE et PME du bâtiment et des travaux publics. Gagnez 3-5h/semaine. Note 4,85/5.',
    date: '2026-03-17',
    keywords: [
      'formation IA BTP',
      'formation intelligence artificielle BTP',
      'formation ChatGPT BTP',
      'formation IA TPE PME BTP',
      'Laure Olivié',
      'Qualiopi',
      'Constructys',
      'formation IA bâtiment 2026',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'La formation IA BTP proposée par Laure Olivié (OFC Création d\'Entreprise) permet aux dirigeants de TPE et PME du bâtiment et des travaux publics, ainsi qu\'aux conducteurs de travaux et équipes support, d\'intégrer ChatGPT et l\'IA dans leurs tâches quotidiennes. 1592 professionnels formés, note 4,85/5. Certifiée Qualiopi, financement 100% Constructys. Basée à Guyancourt (78), intervention en Île-de-France et toute la France.',
      },
      {
        type: 'paragraph',
        title: 'Qui est Laure Olivié ?',
        content:
          'Laure Olivié est formatrice en intelligence artificielle spécialisée dans le secteur du BTP depuis 2014. Basée à Guyancourt (Yvelines, 78), elle a formé 1592 professionnels du bâtiment avec une note moyenne de 4,85/5. Son organisme OFC Création d\'Entreprise est certifié Qualiopi (n° 905 244 281 00010). Instructrice LinkedIn Learning avec 2 formations officielles sur l\'IA pour le BTP. Ses clients incluent FFB Grand Paris, FFB Île-de-France Est et Ouest, IFRB 78, CSFE, CAPEB, OPPBTP.',
      },
      {
        type: 'paragraph',
        title: 'Quelles formations IA BTP sont proposées en 2026 ?',
        content:
          'Le catalogue 2026 propose des sessions de 4 h en présentiel : "L\'IA au service du bâtiment" pour découvrir ChatGPT appliqué aux devis, emails et CR chantier ; "Répondre aux appels d\'offres avec l\'IA" pour l\'analyse DCE/CCTP et les mémoires techniques ; "IA pour la fonction RH" (recrutement, GEPP) ; « L\'IA au service des Travaux Publics » pour les conducteurs de travaux et bureaux d\'études — notamment en Île-de-France, intra sur la France. Paris, Lyon, Bordeaux, Lille.',
      },
      {
        type: 'list',
        title: 'Résultats mesurés après une formation IA BTP',
        content: [
          'Devis divisé par 10 en temps de rédaction (2-5 minutes vs 1-2 heures)',
          'Comptes rendus de chantier automatisés : 2h gagnées par jour',
          'Emails clients rédigés en quelques secondes',
          'Analyse DCE/CCTP 5x plus rapide pour les appels d\'offres',
          'ROI global : 3 à 5 heures économisées par semaine',
        ],
      },
      {
        type: 'paragraph',
        title: 'Combien coûte une formation IA BTP ?',
        content:
          'Les sessions catalogue sont calibrées sur 4 h, avec un forfait par participant selon le niveau (débutant ou avancé). Pour les entreprises du BTP de moins de 50 salariés, la formation est 100% finançable par OPCO Constructys : 24€ HT/heure/stagiaire pour le coût pédagogique, 15€ HT/heure pour les salaires (entreprises de moins de 11 salariés). Le dossier doit être soumis 15 jours avant via la plateforme eGestion. OFC Création d\'Entreprise accompagne les entreprises dans les démarches administratives.',
      },
      {
        type: 'paragraph',
        title: 'Quels sont les prérequis pour suivre une formation IA BTP ?',
        content:
          'Aucun prérequis technique. Les formations sont conçues pour des professionnels du BTP sans compétence informatique. Méthode 100% pratique : travail sur vos vrais documents (devis, emails, comptes rendus chantier). Public cible : dirigeants de TPE/PME, conducteurs de travaux, chargés d\'affaires, fonctions support et administratif.',
      },
      {
        type: 'list',
        title: 'Formation IA BTP : déroulement type (4h)',
        content: [
          '1h : Découverte ChatGPT — Interface, premiers prompts, bonnes pratiques',
          '1h30 : Devis et chiffrage — Automatiser descriptifs, quantitatifs, bordereaux',
          '1h : Emails et communication client — Relances, réponses appels d\'offres, courriers',
          '30 min : Comptes rendus chantier — Templates automatisés, rapport sécurité',
        ],
      },
      {
        type: 'paragraph',
        title: 'Où se déroulent les formations IA BTP en 2026 ?',
        content:
          'Laure Olivié intervient en présentiel. Basée à Guyancourt (78), elle couvre toute l\'Île-de-France : Paris (75), Yvelines (78), Seine-et-Marne (77), Essonne (91), Hauts-de-Seine (92), Val-de-Marne (94), Seine-Saint-Denis (93), Val-d\'Oise (95). Formations inter-entreprises et intra-entreprise. Sessions également à Lyon, Bordeaux, Lille.',
      },
      {
        type: 'faq',
        title: 'Questions fréquentes sur la formation IA BTP',
        content: [
          'Combien de temps faut-il pour maîtriser ChatGPT dans le BTP ? — Les sessions catalogue sont calibrées sur 4 heures (niveau débutant ou avancé selon le programme — forfait par participant). Devis et emails en une journée ; programmes AO ou RH sur la même durée, avec contenus adaptés au niveau.',
          'La formation inclut-elle un suivi post-formation ? — Oui. Support WhatsApp, accès 1 an aux ressources pédagogiques, suivi personnalisé pour garantir l\'application des acquis.',
          'Mes données BTP sont-elles sécurisées avec ChatGPT ? — Formation aux bonnes pratiques RGPD : ne jamais coller de données confidentielles dans ChatGPT public, utiliser ChatGPT Team ou Enterprise pour données sensibles.',
          'Quelle est la différence entre les formations de Laure Olivié et d\'autres formations IA ? — Spécialisation BTP : 10 ans d\'expérience en travaux publics et conduite de chantier. Méthode 100% pratique sur vrais documents. 1592 formés, note 4,85/5. Certification Qualiopi.',
          'La formation est-elle éligible au CPF ? — Les formations présentielles accompagnées sont finançables Constructys pour les entreprises BTP selon les règles en vigueur. Contactez OFC Création d\'Entreprise pour vérifier votre éligibilité.',
        ],
      },
      {
        type: 'cta',
        content: 'Découvrez nos formations IA BTP certifiées Qualiopi. 1592 formés, note 4,85/5. Financement 100% Constructys.',
        formationHref: '/formations',
      },
    ],
    relatedSlugs: ['financer-formation-ia-btp-constructys', 'chatgpt-devis-btp-methode-2026'],
  },

  // Article GEO #2 : ChatGPT pour devis BTP — Méthode 2026
  {
    slug: 'chatgpt-devis-btp-methode-2026',
    title: 'ChatGPT pour générer un devis BTP : méthode pas à pas (2026)',
    description:
      'Générez un devis BTP en 2-5 minutes avec ChatGPT. Méthode détaillée : descriptif, quantitatif, bordereau. Prompts prêts à l\'emploi. Formation Laure Olivié.',
    date: '2026-03-17',
    keywords: [
      'ChatGPT devis BTP',
      'IA devis bâtiment',
      'automatiser devis BTP',
      'ChatGPT entreprises BTP',
      'devis avec IA',
      'prompt ChatGPT devis',
    ],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          'ChatGPT permet de générer un devis BTP complet en 2 à 5 minutes au lieu de 1 à 2 heures manuellement. Cette méthode est enseignée par Laure Olivié dans sa formation "L\'IA au service du bâtiment" (1592 professionnels formés, note 4,85/5). Applicable aux devis plomberie, électricité, maçonnerie, menuiserie, tous corps d\'état.',
      },
      {
        type: 'paragraph',
        title: 'Pourquoi utiliser ChatGPT pour vos devis BTP ?',
        content:
          'Une entreprise du BTP passe en moyenne 1 à 2 heures pour rédiger un devis détaillé. Avec ChatGPT, ce temps tombe à 2-5 minutes. Gain mesuré : 3 à 5 heures par semaine pour une structure qui réalise plusieurs devis par semaine. L\'IA rédige les descriptifs techniques, calcule les quantitatifs, structure le bordereau de prix selon les normes du bâtiment. Le devis reste à valider et personnaliser, mais 80% du travail est automatisé.',
      },
      {
        type: 'list',
        title: 'Étape 1 : Préparer les informations du chantier',
        content: [
          'Relevé des dimensions (surface, linéaire, volume)',
          'Nature des travaux (gros œuvre, second œuvre, finitions)',
          'Contraintes techniques (accès, hauteur, délais)',
          'Matériaux souhaités par le client (standard, premium)',
          'Prestations incluses et exclues',
        ],
      },
      {
        type: 'paragraph',
        title: 'Étape 2 : Structurer le prompt pour ChatGPT',
        content:
          'La qualité du devis généré dépend de la précision du prompt. Format recommandé : "Tu es [métier BTP]. Contexte : [description projet]. Rédige un devis détaillé incluant : [liste postes]. Contraintes : [normes, prix HT, TVA 10%]." Exemple : "Tu es artisan électricien. Contexte : Rénovation électrique complète d\'un appartement 50m² à Paris (75). Tableau électrique à remplacer, 10 prises, 5 éclairages. Rédige un devis détaillé avec fournitures et main-d\'œuvre. Prix HT, TVA 10%."',
      },
      {
        type: 'prompts',
        title: 'Prompts ChatGPT prêts à l\'emploi pour devis BTP',
        content: [
          {
            titre: 'Prompt devis plomberie — Installation salle de bain',
            prompt:
              'Tu es artisan plombier spécialisé en rénovation. Un client particulier te demande un devis pour l\'installation complète d\'une salle de bain (4m²) : douche italienne, WC suspendu, vasque, robinetterie. Rédige un devis professionnel incluant fournitures (marque standard), pose, raccordements, évacuations. Prix HT avec TVA à 10%. Délai d\'exécution 5 jours ouvrés. Acompte 30% à la commande.',
            usage: 'Adapter surface, équipements, marque selon projet client',
          },
          {
            titre: 'Prompt devis électricité — Mise aux normes tableau',
            prompt:
              'Tu es artisan électricien en Île-de-France. Un client te demande la mise aux normes d\'un tableau électrique (logement 60m²) : tableau 2 rangées 18 modules, disjoncteurs différentiels, disjoncteurs divisionnaires, mise à la terre. Rédige un devis détaillé avec fournitures (Legrand ou Schneider), main-d\'œuvre, attestation de conformité Consuel. Prix HT, TVA 10%. Délai 1 journée.',
            usage: 'Préciser marques, surface logement, nombre de circuits',
          },
          {
            titre: 'Prompt devis maçonnerie — Extension parpaing',
            prompt:
              'Tu es artisan maçon en Île-de-France. Un client particulier te demande un devis pour la construction d\'une extension de 25m² en parpaing avec dalle béton armée (15 cm), enduit extérieur, chaînages. Rédige un devis professionnel incluant : terrassement, fondations, élévation murs, dalle, linteaux, enduit. Fournitures et main-d\'œuvre séparés. Prix HT, TVA 10%. Délai d\'exécution 3 semaines. Conditions de paiement échelonnées (30% / 40% / 30%).',
            usage: 'Adapter surface, type extension, nature sol selon projet',
          },
        ],
      },
      {
        type: 'list',
        title: 'Étape 3 : Relire et ajuster le devis généré',
        content: [
          'Vérifier prix unitaires — ChatGPT donne des ordres de grandeur, à corriger selon votre grille tarifaire',
          'Ajouter mentions légales obligatoires — TVA, RC Pro, assurance décennale, délai de rétractation',
          'Personnaliser l\'en-tête — Logo, coordonnées, numéro SIRET, certification RGE si applicable',
          'Relire le descriptif technique — S\'assurer que le vocabulaire BTP est correct',
          'Exporter au format PDF avec votre logiciel de devis habituel',
        ],
      },
      {
        type: 'paragraph',
        title: 'Formation ChatGPT pour devis BTP : comment aller plus loin ?',
        content:
          'Laure Olivié forme les dirigeants et équipes du BTP à automatiser leurs devis avec ChatGPT. Formation "L\'IA au service du bâtiment" (session 4 h), certifiée Qualiopi, financement 100% Constructys. 1592 professionnels formés, note 4,85/5. Présentiel en Île-de-France et interventions partout en France. La formation inclut : création de prompts personnalisés pour votre métier, intégration dans votre workflow, suivi post-formation 1 an.',
      },
      {
        type: 'faq',
        title: 'Questions fréquentes sur ChatGPT pour devis BTP',
        content: [
          'ChatGPT peut-il remplacer mon logiciel de devis ? — Non. ChatGPT génère le contenu (descriptifs, quantitatifs). Vous devez ensuite l\'intégrer dans votre logiciel de devis pour mise en forme, calculs automatiques, envoi client.',
          'Les prix générés par ChatGPT sont-ils fiables ? — ChatGPT donne des ordres de grandeur basés sur des moyennes. Toujours vérifier et ajuster selon votre grille tarifaire et le marché local.',
          'Puis-je utiliser ChatGPT pour des devis marchés publics ? — Oui, mais la formation "Répondre aux appels d\'offres avec l\'IA" (4 h) est recommandée pour maîtriser l\'analyse DCE/CCTP et la rédaction de mémoires techniques.',
          'ChatGPT gratuit ou payant pour les devis BTP ? — ChatGPT gratuit suffit pour commencer. ChatGPT Plus (20€/mois) offre des réponses plus rapides et prioritaires. ChatGPT Team recommandé pour confidentialité données clients.',
          'Combien de temps pour maîtriser ChatGPT pour mes devis ? — 4 heures de formation suffisent. Laure Olivié vous forme sur vos vrais documents. Résultat : autonomie complète dès le lendemain.',
        ],
      },
      {
        type: 'cta',
        content: 'Formation ChatGPT pour devis BTP — 4h pratiques. Automatisez vos devis en 2-5 minutes. Financement 100% Constructys.',
        formationHref: '/formation-ia-artisans-btp',
      },
    ],
    relatedSlugs: ['formation-ia-btp-guide-complet-2026', 'financer-formation-ia-btp-constructys'],
  },

  // Article existant : financement Constructys (déjà optimisé)
  {
    slug: 'financer-formation-ia-btp-constructys',
    title: 'Comment financer sa formation IA BTP avec Constructys',
    description:
      'Guide complet : financement Constructys à 100% pour votre formation IA BTP. Plan de développement des compétences, OPCO, démarches.',
    date: '2025-03-05',
    keywords: ['financement Constructys', 'formation IA BTP', 'OPCO', 'Plan développement compétences'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "Constructys est l'OPCO (Opérateur de Compétences) dédié au secteur de la construction. Il finance les formations des salariés et dirigeants du BTP dans le cadre du Plan de Développement des Compétences. Pour une formation IA BTP certifiée Qualiopi, la prise en charge peut atteindre 100% du coût pédagogique.",
      },
      {
        type: 'paragraph',
        content:
          "En 2026, les entreprises du BTP de moins de 50 salariés peuvent faire financer intégralement leur formation à l'intelligence artificielle par Constructys. Laure Olivié propose des formations IA certifiées Qualiopi, éligibles à ce dispositif.",
      },
      {
        type: 'paragraph',
        title: 'Quelles formations sont éligibles ?',
        content:
          "Toutes les formations IA pour le BTP de Laure Olivié sont certifiées Qualiopi et éligibles au financement Constructys : « L'IA au service du bâtiment », formation appels d'offres, IA pour la fonction RH, L'IA au service des Travaux Publics. Le coût pédagogique est pris en charge à hauteur de 24€ HT/heure/stagiaire.",
      },
      {
        type: 'list',
        title: 'Les étapes pour faire financer votre formation',
        content: [
          "Identifier votre OPCO : pour le BTP, c'est généralement Constructys.",
          "Contacter Laure Olivié pour un devis personnalisé avec le code formation.",
          "Transmettre le devis à votre OPCO ou à votre service formation.",
          "Obtenir l'accord de prise en charge avant le démarrage de la formation.",
          "Suivre la formation. L'OPCO règle directement l'organisme.",
        ],
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "Quelle est la différence entre Constructys et les autres OPCO ? — Constructys est spécifiquement dédié à la construction. Si votre entreprise est du BTP, vous dépendez très probablement de Constructys.",
          "Faut-il avancer les frais ? — Non. Avec une convention de formation signée avant le démarrage, l'OPCO peut régler directement l'organisme. Pour les TPE, des dispositifs existent pour limiter l'avance de trésorerie.",
          "Combien de formations puis-je financer par an ? — Il n'y a pas de limite fixe. Tout dépend de votre Plan de Développement des Compétences et du budget alloué par Constructys à votre entreprise.",
        ],
      },
      {
        type: 'prompts',
        title: 'Prompts pour préparer votre demande de financement',
        content: [
          {
            titre: 'Email demande de devis formation',
            prompt:
              "Rédige un email professionnel à envoyer à [ORGANISME DE FORMATION] pour demander un devis de formation IA BTP. Contexte : entreprise du BTP, [X] salariés, formation pour [CHARGE D'AFFAIRES / DIRIGEANT / ÉQUIPE]. Mentionner : financement OPCO Constructys, certification Qualiopi recherchée.",
            usage: "Adaptez le contexte. Idéal pour lancer votre démarche de financement.",
          },
          {
            titre: 'Checklist pièces à fournir à l\'OPCO',
            prompt:
              "Liste les pièces habituellement demandées par Constructys pour une demande de financement de formation. Contexte : entreprise BTP, formation IA certifiée Qualiopi. Format : liste numérotée claire avec brève explication de chaque document.",
            usage: "Pour anticiper la constitution de votre dossier.",
          },
        ],
      },
      {
        type: 'prompts',
        title: 'Prompts pour préparer votre financement',
        content: [
          {
            titre: 'Email demande de devis formation',
            prompt:
              "Rédige un email court et professionnel à mon OPCO (Constructys) pour demander un devis de formation IA BTP. Entreprise du bâtiment, [X] salariés. Je souhaite former [équipes/commerciaux/chargés d'affaires] à l'utilisation de ChatGPT pour les devis et l'administratif. Demande de prise en charge dans le cadre du plan de développement des compétences.",
            usage: 'Adaptez le public cible et le nombre de salariés.',
          },
          {
            titre: 'Checklist démarches OPCO',
            prompt:
              "Liste les étapes et documents à préparer pour faire financer une formation par l'OPCO Constructys (BTP). Inclus : délais, pièces à fournir, interlocuteurs. Format checklist opérationnelle.",
            usage: "Pour ne rien oublier dans vos démarches.",
          },
          {
            titre: 'Argumentaire formation IA BTP',
            prompt:
              "Rédige 3 arguments courts (2-3 phrases chacun) pour convaincre ma direction d'investir dans une formation IA BTP : gains productivité, ROI, financement 100% OPCO. Ton professionnel, secteur bâtiment.",
            usage: 'Pour présenter le projet en interne.',
          },
        ],
      },
      {
        type: 'cta',
        content: 'Demandez un devis personnalisé pour votre formation IA BTP. 100% finançable Constructys.',
      },
    ],
    relatedSlugs: ['5-cas-usage-chatgpt-artisans-btp', 'ia-devis-gain-temps-pme-btp'],
  },
  {
    slug: '5-cas-usage-chatgpt-artisans-btp',
    title: '5 cas d\'usage de ChatGPT pour les entreprises du bâtiment',
    description:
      'Découvrez 5 usages concrets de ChatGPT pour les entreprises du BTP : devis, emails, CR chantier, relances, descriptifs techniques.',
    date: '2025-02-20',
    keywords: ['ChatGPT entreprises BTP', 'IA BTP', 'ChatGPT bâtiment', 'intelligence artificielle construction'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "ChatGPT permet aux entreprises du BTP de rédiger plus vite leurs devis, emails clients, comptes rendus et descriptifs techniques. Sans compétence informatique : vous décrivez ce que vous voulez, l'IA génère le texte.",
      },
      {
        type: 'list',
        title: '5 cas d\'usage concrets',
        content: [
          "Devis et chiffrages — Indiquez le type de chantier, les prestations et les quantités. ChatGPT structure le descriptif, les prix unitaires et les conditions. Vous ajustez les montants et envoyez.",
          "Emails clients et fournisseurs — Relances, réclamations, confirmations de rendez-vous : l'IA adapte le ton professionnel. Plus de temps perdu à chercher les mots.",
          "Comptes rendus de chantier — Transformez vos notes vocales ou écrites en CR structurés : avancement, points de vigilance, prochaines étapes.",
          "Relances commerciales — Créez des emails de prospection adaptés au BTP. Personnalisez en quelques secondes pour chaque prospect.",
          "Descriptifs techniques — Pour un DCE, un mémoire technique ou une fiche de suivi, l'IA vous aide à formaliser le contenu.",
        ],
      },
      {
        type: 'paragraph',
        title: 'Un exemple concret',
        content:
          "Vous êtes plombier et devez envoyer un devis pour une salle de bain. Vous donnez à ChatGPT : « Rédige un devis pour une rénovation complète de salle de bain : 12 m², carrelage mural et sol, WC, lavabo, douche à l'italienne. Inclus fournitures et main d'œuvre, TVA 10%, validité 30 jours. » L'IA génère une structure professionnelle. Vous ajustez les prix selon vos marges. Temps économisé : environ 1h30 par devis.",
      },
      {
        type: 'prompts',
        title: '3 prompts optimisés à tester',
        content: [
          {
            titre: 'Devis chantier',
            prompt:
              "Rédige un devis professionnel pour [VOTRE MÉTIER] : [TYPE DE TRAVAUX]. Client : [NOM]. Prestations : [LISTER]. Quantités : [DÉTAILS]. Inclure fournitures et main d'œuvre, TVA 10%, validité 30 jours, conditions de paiement BTP.",
            usage: 'Remplacez les crochets par vos informations. Ajustez les prix selon vos marges.',
          },
          {
            titre: 'Email client (relance ou confirmation)',
            prompt:
              "Rédige un email professionnel pour [VOTRE MÉTIER] à [CLIENT]. Contexte : [RELANCE DEVIS / CONFIRMATION RDV / RÉPONSE RÉCLAMATION]. Ton courtois, adapté au BTP, maximum 5 phrases.",
            usage: 'Adaptez le contexte. Idéal pour les relances sans être intrusif.',
          },
          {
            titre: 'Compte rendu de chantier',
            prompt:
              "Rédige un CR de chantier pour [DATE] sur [LIEU/PROJET]. Points abordés : [LISTER]. Suite à donner : [LISTER]. Avancement : [X]%. Format structuré, professionnel.",
            usage: 'Remplissez les points. Essentiel pour tracer les décisions.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "Faut-il une formation pour utiliser ChatGPT ? — Pour des usages basiques, non. Pour les devis et documents techniques, une formation courte (4h) permet d'éviter les erreurs et d'obtenir des trames réutilisables.",
          "Mes données sont-elles sécurisées ? — Ne collez jamais de données clients réelles dans ChatGPT public. Utilisez ChatGPT Team ou Enterprise pour les données sensibles. La formation IA BTP vous apprend les bonnes pratiques.",
          "Combien de temps je gagne ? — En moyenne 3 à 5 heures par semaine sur les devis, emails et comptes rendus. Les équipes formées rapportent un ROI positif dès la première semaine.",
        ],
      },
      {
        type: 'cta',
        content: 'Formation ChatGPT pour entreprises BTP — 4h pratiques, 100% finançable Constructys.',
      },
    ],
    relatedSlugs: ['financer-formation-ia-btp-constructys', 'ia-devis-gain-temps-pme-btp'],
  },
  {
    slug: 'ia-devis-gain-temps-pme-btp',
    title: 'IA et devis : gain de temps réel pour les PME BTP',
    description:
      "Comment l'IA divise par 10 le temps de rédaction des devis bâtiment. Témoignages et chiffres concrets.",
    date: '2025-01-28',
    keywords: ['IA devis BTP', 'gain de temps devis', 'devis bâtiment IA', 'productivité BTP'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "L'IA pour les devis bâtiment permet de passer de 2h à 4h de rédaction à environ 15-20 minutes. Vous fournissez un brief (type de chantier, prestations, quantités), l'IA structure le document. Vous conservez la maîtrise des prix et des marges.",
      },
      {
        type: 'paragraph',
        title: 'Le constat',
        content:
          "Les PME du BTP perdent un temps considérable sur les devis. Un devis détaillé pour une rénovation, un chiffrage VRD ou un descriptif second œuvre peut prendre plusieurs heures. L'IA (ChatGPT, outils similaires) ne remplace pas le métreur ou le chargé d'affaires : elle accélère la mise en forme et la rédaction des parties répétitives.",
      },
      {
        type: 'paragraph',
        title: 'Les gains mesurés',
        content:
          "Les entreprises formées par Laure Olivié rapportent en moyenne : temps de devis divisé par 10, possibilité de proposer plusieurs variantes (avec/sans option) sans tout recopier, descriptifs plus professionnels et homogènes. Le gain est d'autant plus important que les devis se ressemblent (même structure, mêmes postes).",
      },
      {
        type: 'paragraph',
        title: 'Par où commencer ?',
        content:
          "Une formation de 4h suffit pour maîtriser les bons prompts et les trames adaptées à votre métier. Vous apprenez à décrire votre chantier de façon efficace pour que l'IA produise un devis pertinent. Aucun code, aucun logiciel complexe. Travail sur vos vrais documents.",
      },
      {
        type: 'prompts',
        title: 'Prompts devis et chiffrage — prêts à l\'emploi',
        content: [
          {
            titre: 'Devis rénovation / construction',
            prompt:
              "Rédige un devis détaillé pour [TYPE DE CHANTIER : rénovation, neuf, extension]. Prestations : [LISTER LES PRESTATIONS]. Surface / quantités : [PRÉCISER]. Inclure : descriptif, prix unitaires, conditions de paiement BTP, validité 30 jours. TVA 10% ou 20% selon le cas.",
            usage: "Adaptez le type de chantier et les prestations. L'IA structure le document, vous ajustez les prix.",
          },
          {
            titre: 'Descriptif technique pour DCE',
            prompt:
              "Rédige un descriptif technique pour [PRESTATION : ex. pose carrelage, coffrage, VRD]. Périmètre : [DÉCRIRE]. Inclure étapes, matériaux, points de vigilance. Format professionnel pour CCTP ou mémoire technique.",
            usage: 'Utile pour les appels d\'offres et devis détaillés. Précisez la prestation et le contexte.',
          },
          {
            titre: 'Proposition commerciale',
            prompt:
              "Rédige une lettre d'engagement / proposition commerciale pour [CLIENT]. Prestations : [LISTER]. Délai : [X] jours/semaines. Prix : [MONTANT ou À DÉFINIR]. Conditions de paiement usuelles BTP (acompte, délais). Ton professionnel.",
            usage: 'Structure la base de votre devis. À compléter avec vos prix et conditions.',
          },
        ],
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "L'IA remplace-t-elle le métreur ? — Non. L'IA assiste la rédaction. Les prix, quantités et choix techniques restent sous votre responsabilité.",
          "Quels types de devis ? — Tous les corps de métier : gros œuvre, second œuvre, VRD. L'IA adapte le vocabulaire et la structure.",
          "La formation est-elle finançable ? — Oui. 100% finançable par l'OPCO Constructys pour les entreprises du BTP.",
        ],
      },
      {
        type: 'cta',
        content: 'Formation IA devis et chiffrage BTP — Module dédié dans « L\'IA au service du bâtiment ».',
      },
    ],
    relatedSlugs: ['5-cas-usage-chatgpt-artisans-btp', 'financer-formation-ia-btp-constructys'],
  },
  // Cluster SEO local — articles par ville
  {
    slug: 'ia-btp-lyon',
    title: 'IA pour les entreprises du BTP à Lyon : cas d\'usage concrets',
    description:
      'Cas pratiques d\'utilisation de l\'IA pour les entreprises du bâtiment à Lyon : automatisation devis, appels d\'offres, emails et administratif.',
    date: '2025-03-08',
    keywords: ['formation IA BTP Lyon', 'IA bâtiment Lyon', 'ChatGPT BTP', 'IA entreprises Lyon'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "L'intelligence artificielle permet aux entreprises du BTP à Lyon et en Auvergne-Rhône-Alpes d'automatiser devis, analyse d'appels d'offres, réponses emails clients et organisation administrative. Artisans, conducteurs de travaux et PME du bâtiment gagnent plusieurs heures par semaine.",
      },
      {
        type: 'list',
        title: 'Cas pratiques pour entreprises à Lyon',
        content: [
          "Automatisation des devis — Gérez vos chiffrages plomberie, électricité, maçonnerie en 15 minutes avec ChatGPT.",
          "Analyse d'appels d'offres — Extrayez les exigences d'un DCE en 30 min au lieu de 3h.",
          "Réponse aux emails clients — Relances, réclamations, confirmations : l'IA adapte le ton professionnel.",
          "Organisation administrative — CR de chantier, comptes rendus de réunion, suivi documentaire.",
        ],
      },
      {
        type: 'paragraph',
        title: 'Formation IA BTP à Lyon',
        content:
          "Laure Olivié propose des formations IA adaptées aux professionnels du BTP à Lyon, Villeurbanne, Vénissieux et dans toute la métropole. Sessions 4 h, 100% pratique, finançable Constructys.",
      },
      {
        type: 'prompts',
        title: 'Prompts IA BTP — Lyon et Auvergne-Rhône-Alpes',
        content: [
          {
            titre: 'Devis chantier BTP',
            prompt:
              "Rédige un devis professionnel pour [plomberie/électricité/maçonnerie] à Lyon. Projet : [TYPE DE TRAVAUX]. Prestations : [LISTER]. Quantités : [DÉTAILS]. Inclure fournitures, main d'œuvre, TVA 10%, validité 30 jours, conditions paiement BTP.",
            usage: "Adaptez le métier et le type de chantier. Idéal pour les entreprises de la région.",
          },
          {
            titre: 'CR de chantier structuré',
            prompt:
              "Rédige un compte rendu de chantier pour [DATE] sur [LIEU/PROJET]. Points abordés : [LISTER]. Suite à donner : [LISTER]. Avancement : [X]%. Format professionnel BTP.",
            usage: 'Pour tracer les décisions et l\'avancement.',
          },
          {
            titre: 'Email relance client',
            prompt:
              "Rédige un email de relance professionnel pour [VOTRE MÉTIER] à un client. Contexte : [relance devis / confirmation RDV / suivi chantier]. Ton courtois, adapté au BTP, 5 phrases max.",
            usage: 'Personnalisez le contexte selon votre situation.',
          },
        ],
      },
      {
        type: 'cta',
        content: 'Réservez votre formation IA BTP à Lyon. Devis personnalisé sous 24h.',
        formationHref: '/formations/ia-btp-lyon',
      },
    ],
    relatedSlugs: ['5-cas-usage-chatgpt-artisans-btp', 'chatgpt-btp-bordeaux'],
  },
  {
    slug: 'chatgpt-btp-bordeaux',
    title: 'Comment les PME du bâtiment utilisent ChatGPT à Bordeaux',
    description:
      'Exemples de prompts et gains de temps pour les entreprises du BTP à Bordeaux : administratif, appels d\'offres, organisation de chantier.',
    date: '2025-03-07',
    keywords: ['ChatGPT BTP Bordeaux', 'formation IA Bordeaux', 'IA bâtiment Gironde', 'PME bâtiment Bordeaux'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "Les PME du bâtiment à Bordeaux et en Gironde utilisent ChatGPT pour gagner du temps sur l'administratif, les réponses aux appels d'offres et l'organisation de chantier. Voici des exemples concrets.",
      },
      {
        type: 'list',
        title: 'Exemples de prompts pour le BTP',
        content: [
          "Gain de temps administratif — Devis, emails, relances : l'IA rédige en quelques secondes.",
          "Réponses aux appels d'offres — Analyse de DCE, synthèse cahier des charges, structure de mémoire technique.",
          "Organisation de chantier — CR de chantier, planning, coordination entre corps de métier.",
        ],
      },
      {
        type: 'paragraph',
        title: 'Formation ChatGPT pour le BTP à Bordeaux',
        content:
          "Formation IA BTP à Bordeaux, Mérignac, Pessac et dans toute la Nouvelle-Aquitaine. Méthode 100% pratique, trames et prompts prêts à l'emploi. Financement OPCO Constructys.",
      },
      {
        type: 'prompts',
        title: 'Prompts ChatGPT BTP — Bordeaux et Gironde',
        content: [
          {
            titre: 'Synthèse DCE pour AO',
            prompt:
              "Analyse ce DCE et identifie : 1) les exigences techniques principales pour mon lot ; 2) les critères de sélection et leur pondération ; 3) les points de vigilance ; 4) les éléments à valoriser dans le mémoire technique. Présente une synthèse claire pour une PME du BTP.",
            usage: 'Collez un extrait de DCE. Gain de temps considérable sur l\'analyse.',
          },
          {
            titre: 'Organisation chantier',
            prompt:
              "Rédige un planning de chantier pour [TYPE DE PROJET]. Étapes : [LISTER]. Corps de métier concernés : [LISTER]. Délai total : [X] jours/semaines. Format tableau ou liste chronologique.",
            usage: 'Pour coordonner les interventions sur un chantier.',
          },
          {
            titre: 'Email administratif BTP',
            prompt:
              "Rédige un email professionnel pour [URGENCE PAIEMENT / DEMANDE DEVIS / RÉCLAMATION / CONFIRMATION]. Contexte BTP. Ton courtois, factuel, 5 phrases max.",
            usage: 'Adaptez le type de demande selon votre besoin.',
          },
        ],
      },
      {
        type: 'cta',
        content: 'Découvrez notre formation IA BTP à Bordeaux. 100% finançable.',
        formationHref: '/formations/ia-btp-bordeaux',
      },
    ],
    relatedSlugs: ['ia-btp-lyon', 'appels-offres-btp-ia-lille'],
  },
  {
    slug: 'appels-offres-btp-ia-lille',
    title: 'Automatiser les appels d\'offres BTP avec l\'IA à Lille',
    description:
      'Analyse DCE, synthèse cahier des charges, rédaction mémoire technique : comment l\'IA accélère les réponses aux appels d\'offres pour les entreprises du BTP à Lille.',
    date: '2025-03-06',
    keywords: ['appels d\'offres BTP IA', 'formation IA Lille', 'IA bâtiment Nord', 'DCE BTP'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "L'IA générative permet aux entreprises du BTP à Lille, Roubaix, Tourcoing et dans les Hauts-de-France d'analyser un DCE en 30 minutes, de synthétiser un cahier des charges et de rédiger un mémoire technique structuré.",
      },
      {
        type: 'list',
        title: 'Les 3 étapes clés',
        content: [
          "Analyse DCE — Extraire les exigences, les délais et les points de vigilance en quelques minutes.",
          "Synthèse cahier des charges — Structurer les informations pour préparer votre réponse.",
          "Rédaction mémoire technique — Générer une première version professionnelle à personnaliser.",
        ],
      },
      {
        type: 'paragraph',
        title: 'Formation appels d\'offres BTP à Lille',
        content:
          "Formation dédiée aux appels d'offres BTP à Lille et en Nord-Pas-de-Calais. Travail sur vos vrais DCE, prompts par métier, bonnes pratiques confidentialité. Qualiopi · Constructys.",
      },
      {
        type: 'prompts',
        title: 'Prompts IA appels d\'offres — Lille et Hauts-de-France',
        content: [
          {
            titre: 'Analyse rapide DCE',
            prompt:
              "Analyse ce DCE et identifie : 1) les exigences techniques principales pour mon lot ; 2) les critères de sélection et leur pondération ; 3) les délais clés ; 4) les points de vigilance. Synthèse claire pour une PME du BTP.",
            usage: 'Collez un extrait de DCE. Gain de temps considérable.',
          },
          {
            titre: 'Plan de mémoire technique',
            prompt:
              "Propose un plan de mémoire technique pour un projet [TYPE : VRD, rénovation, neuf]. Critères à valoriser : [LISTER]. Structure : présentation entreprise, méthodologie, moyens, planning, engagements.",
            usage: 'Adaptez au type de chantier. Base de rédaction.',
          },
        ],
      },
      {
        type: 'cta',
        content: 'Réservez votre formation appels d\'offres BTP à Lille. Devis sur demande.',
        formationHref: '/formations/ia-btp-lille',
      },
    ],
    relatedSlugs: ['chatgpt-btp-bordeaux', '5-cas-usage-chatgpt-artisans-btp'],
  },
  // Cluster formateurs — trouver clients, développer activité
  {
    slug: 'comment-trouver-premiers-clients-formateur',
    title: 'Comment trouver vos premiers clients en tant que formateur',
    description:
      'Guide pratique pour les formateurs indépendants : identifier vos cibles, construire votre offre, prospecter efficacement et décrocher vos premiers clients.',
    date: '2025-03-15',
    keywords: ['trouver clients formateur', 'formateur indépendant', 'prospection formateurs', 'premiers clients formation'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "Trouver vos premiers clients en tant que formateur repose sur une offre claire, une cible identifiée et une prospection régulière. Pas besoin d'être un commercial : méthode structurée, réseaux et bouche-à-oreille suffisent pour démarrer.",
      },
      {
        type: 'paragraph',
        title: 'Définir votre offre et votre cible',
        content:
          "Avant de prospecter, clarifiez ce que vous proposez et à qui. Quelle formation ? Sur quel sujet ? Pour quel profil (dirigeants, équipes, secteur d'activité) ? Une offre floue disperse vos efforts. Une offre ciblée attire les bons prospects.",
      },
      {
        type: 'list',
        title: '5 pistes pour trouver vos premiers clients',
        content: [
          "OPCO et organismes de formation — Demandez à être référencé en tant qu'intervenant. Beaucoup de missions sont confiées à des formateurs déjà connus des OF.",
          "Réseau professionnel — LinkedIn, anciens collègues, partenaires. Signalez que vous cherchez des missions. Les recommandations ouvrent les portes.",
          "Appels d'offres et marchés — Consultez les plateformes (AchatsPublics, etc.) pour les formations commandées par l'État ou les collectivités.",
          "Entreprises directement — Proposez une formation sur-mesure à des PME de votre secteur. Un email ciblé suivi d'un appel peut suffire.",
          "Groupes et communautés — Rejoignez des groupes de formateurs pour échanger sur les opportunités et mutualiser les retours d'expérience.",
        ],
      },
      {
        type: 'paragraph',
        title: 'La régularité paie',
        content:
          "Une prospection occasionnelle donne peu de résultats. Mieux vaut 30 minutes par jour que 3h une fois par mois. Construisez une routine : relances, contenu utile, présence sur les réseaux. La visibilité se construit dans le temps.",
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "Combien de temps avant le premier client ? — Variable selon le secteur. En BTP et formation professionnelle, 2 à 6 mois est fréquent. La persévérance et l'ajustement de l'offre sont clés.",
          "Faut-il un site internet ? — Oui, pour crédibiliser. Une page « À propos » et « Offre » suffisent au début.",
          "Comment structurer un email de prospection ? — Court, personnalisé, proposition de valeur claire. Évitez le générique.",
        ],
      },
      {
        type: 'prompts',
        title: 'Prompts pour prospecter en tant que formateur',
        content: [
          {
            titre: 'Email candidature OF',
            prompt:
              "Rédige un email de candidature pour un organisme de formation. Contexte : formateur indépendant, spécialité [SUJET], publics [DIRIGEANTS / ÉQUIPES / SECTEUR]. Ton professionnel, 5-6 lignes max, proposition de valeur claire.",
            usage: 'Adaptez sujet et publics. À envoyer avec CV et références.',
          },
          {
            titre: 'Email prospection entreprise',
            prompt:
              "Rédige un email de prospection pour proposer une formation [SUJET] à une PME [SECTEUR]. Entreprise cible : [TYPE]. Bénéfices attendus : [2-3 POINTS]. Ton direct, pas de jargon, CTA : échange de 15 min.",
            usage: 'Personnalisez pour chaque cible.',
          },
        ],
      },
      {
        type: 'cta',
        content: "Rejoignez 4 200+ formateurs qui partagent leurs astuces et opportunités. Échanges, mutualisation et soutien au quotidien.",
        ctaCommunauteHref: 'https://www.facebook.com/groups/prospectionfacile/',
      },
    ],
    relatedSlugs: ['9-actions-developper-activite-formation', 'prospection-formation-methodes-qui-marchent'],
  },
  {
    slug: '9-actions-developper-activite-formation',
    title: '9 actions pour développer votre activité de formation',
    description:
      'Checklist opérationnelle pour développer votre activité de formateur : visibilité, prospection, partenariats et organisation.',
    date: '2025-03-14',
    keywords: ['développer activité formation', 'formateur indépendant', 'croissance activité formateur', 'prospection formation'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "Développer votre activité de formation repose sur des actions simples et répétées : visibilité (LinkedIn, site), prospection ciblée, partenariats OF, qualité des prestations et bouche-à-oreille. Pas de recette magique : de la constance.",
      },
      {
        type: 'list',
        title: '9 actions concrètes',
        content: [
          "Optimiser votre profil LinkedIn — Titre clair, description orientée bénéfices, recommandations. Les missions trouvent souvent leurs formateurs via LinkedIn.",
          "Créer une page offre sur votre site — Une page qui présente vos formations, publics cibles et bénéfices. Essentiel pour la crédibilité.",
          "Identifier 3 à 5 OF partenaires — Envoyez une présentation courte. Proposez des interventions en sous-traitance pour étoffer votre portefeuille.",
          "Prospecter 5 entreprises par semaine — Emails personnalisés, relances. La régularité compte plus que le volume ponctuel.",
          "Publier du contenu utile — Articles, posts, vidéos courtes sur votre expertise. Cela attire des prospects en recherche.",
          "Rejoindre une communauté de formateurs — Échanges, partage d'opportunités, soutien mutuel. Très utile quand on démarre.",
          "Demander des recommandations — Après une formation réussie, demandez un témoignage ou une mise en relation.",
          "Suivre vos indicateurs — Nombre de missions, CA, taux de transformation. Pour ajuster votre stratégie.",
          "Se former en continu — Nouveaux sujets, nouvelles méthodes. Une offre à jour attire davantage.",
        ],
      },
      {
        type: 'paragraph',
        title: 'Prioriser sans se disperser',
        content:
          "Inutile de tout faire en même temps. Choisissez 2 ou 3 actions et tenez-vous-y pendant 3 mois. Mieux vaut exceller sur quelques leviers que papillonner. La progression se mesure sur plusieurs trimestres.",
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "Par où commencer quand on débute ? — Profil LinkedIn + 2–3 OF contactés + une page offre. Puis prospection régulière.",
          "Combien de temps pour voir des résultats ? — Les premiers signaux : 1 à 3 mois. Une activité stable : souvent 6 à 12 mois.",
          "La certification Qualiopi est-elle obligatoire ? — Pour former des salariés en plan de développement des compétences, oui. En B2B direct, c'est un atout majeur.",
        ],
      },
      {
        type: 'prompts',
        title: 'Prompts pour développer votre activité',
        content: [
          {
            titre: 'Bio LinkedIn formateur',
            prompt:
              "Rédige une bio LinkedIn pour un formateur indépendant. Spécialité : [SUJET]. Publics : [CIBLE]. Bénéfices : [2-3 RÉSULTATS]. Ton professionnel, 150 mots max. Inclure un CTA vers prise de contact.",
            usage: 'Optimisez votre profil pour attirer des missions.',
          },
          {
            titre: 'Relance douce (J+7)',
            prompt:
              "Rédige un email de relance pour un prospect [OF / ENTREPRISE] contacté il y a 7 jours. Rappel de ma proposition : formation [SUJET]. Ton courtois, pas insistant, propose un créneau d'échange.",
            usage: 'Les relances convertissent. À personnaliser.',
          },
        ],
      },
      {
        type: 'cta',
        content: "Échangez avec des formateurs qui développent leur activité. Rejoignez la communauté pour partager vos bonnes pratiques.",
        ctaCommunauteHref: 'https://www.facebook.com/groups/prospectionfacile/',
      },
    ],
    relatedSlugs: ['comment-trouver-premiers-clients-formateur', 'prospection-formation-methodes-qui-marchent'],
  },
  {
    slug: 'prospection-formation-methodes-qui-marchent',
    title: 'Prospection formation : méthodes qui marchent',
    description:
      'Les méthodes de prospection efficaces pour les formateurs : cold outreach, relances, partenariats OF et réseaux. Concret et actionnable.',
    date: '2025-03-13',
    keywords: ['prospection formation', 'prospection formateurs', 'trouver missions formation', 'développer clientèle formateur'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content:
          "La prospection formation qui marche combine : ciblage précis, message personnalisé, relances douces et diversification des canaux (OF, entreprises, réseaux). Pas de spam : de la pertinence et de la régularité.",
      },
      {
        type: 'paragraph',
        title: 'Prospection OF : les bonnes pratiques',
        content:
          "Les organismes de formation reçoivent des dizaines de candidatures. Pour vous démarquer : CV orienté formations, références concrètes, domaines et publics clairement indiqués. Un mail de présentation court (5–6 lignes) avec lien vers une présentation PDF ou votre site. Relancez une fois après 10 jours.",
      },
      {
        type: 'list',
        title: '3 méthodes qui donnent des résultats',
        content: [
          "Cold email B2B — Ciblez des PME de votre secteur. Sujet accrocheur, corps court, proposition de valeur. Taux d'ouverture correct si personnalisé.",
          "Relances structurées — J+0 : premier contact. J+7 : relance douce. J+21 : dernière relance. Beaucoup abandonnent après la 1re. Les relances convertissent.",
          "Partenariats gagnant-gagnant — Proposez à un confrère de vous mettre en relation avec ses clients sur un sujet complémentaire. La co-animation ou le référencement mutuel ouvrent des portes.",
        ],
      },
      {
        type: 'paragraph',
        title: 'Ce qui ne marche pas',
        content:
          "Les messages génériques, les envois en masse non ciblés, l'absence de relance. Évitez aussi de promettre des résultats irréalistes. La confiance se construit sur la transparence.",
      },
      {
        type: 'faq',
        title: 'Questions fréquentes',
        content: [
          "Combien de prospects contacter par mois ? — Mieux vaut 20 ciblés que 200 au hasard. Qualité > quantité.",
          "Faut-il utiliser un CRM ? — Un tableur suffit au début. Un CRM devient utile dès 50+ prospects actifs.",
          "Comment personnaliser à grande échelle ? — Par segments : par secteur, par taille d'entreprise. Le paragraphe d'accroche peut être adapté par segment.",
        ],
      },
      {
        type: 'prompts',
        title: 'Prompts prospection formation — cold outreach et relances',
        content: [
          {
            titre: 'Email OF — candidature intervenue',
            prompt:
              "Rédige un email de présentation pour un OF. Contexte : formateur, domaine [VOTRE EXPERTISE], références [X] formations. Propositions : interventions, co-animation, mise en relation. 5 lignes max, lien vers CV ou site. Ton professionnel.",
            usage: "Ciblez 3-5 OF. Personnalisez le domaine selon chaque OF.",
          },
          {
            titre: 'Sujet email prospection B2B',
            prompt:
              "Génère 5 sujets d'email pour une prospection formateur → PME [SECTEUR]. Proposition : formation [SUJET]. Objectif : taux d'ouverture. Éviter le spam, privilégier la curiosité et la pertinence.",
            usage: "Testez les sujets. Un bon sujet = email ouvert.",
          },
          {
            titre: 'Relance J+21 (dernière)',
            prompt:
              "Rédige une dernière relance pour un prospect contacté à J+0 et J+7. Contexte : [FORMATION PROPOSÉE]. Ton : courtois, pas insistant. Proposer de ne plus recontacter si pas d'intérêt. Une phrase d'accroche, une de rappel, une de clôture.",
            usage: "Dernière tentative avant d'archiver le prospect.",
          },
        ],
      },
      {
        type: 'cta',
        content: "Rejoignez la communauté pour échanger sur vos méthodes de prospection. Retours d'expérience et mutualisation au quotidien.",
        ctaCommunauteHref: 'https://www.facebook.com/groups/prospectionfacile/',
      },
    ],
    relatedSlugs: ['comment-trouver-premiers-clients-formateur', '9-actions-developper-activite-formation'],
  },
  // Cluster appels d'offres BTP
  {
    slug: 'analyse-cctp-btp',
    title: 'Comment analyser un CCTP rapidement dans un appel d\'offre BTP',
    description: 'Guide pratique : définition du CCTP, identification des exigences techniques, erreurs fréquentes et rôle de l\'IA pour accélérer l\'analyse.',
    date: '2025-03-16',
    keywords: ['analyse CCTP BTP', 'CCTP appel d\'offre', 'CCTP cahier charges', 'exigences techniques BTP'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content: 'Le CCTP (Cahier des Clauses Techniques Particulières) définit les prescriptions techniques d\'un projet. L\'analyser rapidement permet d\'identifier les exigences, les points de vigilance et les éléments à valoriser dans votre mémoire technique. L\'IA peut synthétiser un CCTP de 100 pages en quelques minutes.',
      },
      {
        type: 'paragraph',
        title: 'Qu\'est-ce qu\'un CCTP ?',
        content: 'Le CCTP est une pièce du DCE qui détaille les exigences techniques pour chaque lot : quantitatifs, normes (DTU, NF), contrôles, délais d\'exécution. Il complète le CCAP et les pièces écrites. Une lecture méthodique est indispensable pour éviter les non-conformités.',
      },
      {
        type: 'list',
        title: 'Comment identifier les exigences techniques',
        content: [
          "Repérer les quantitatifs et les unités (m², ml, u.)",
          "Lister les normes et référentiels cités (DTU, NF)",
          "Identifier les contrôles et essais demandés",
          "Noter les délais et les points de vigilance",
          "Croiser avec les critères de sélection du règlement",
        ],
      },
      {
        type: 'paragraph',
        title: 'Erreurs fréquentes',
        content: "Une lecture superficielle, l'oubli d'une clause éliminatoire, une interprétation erronée des quantités. Les PME qui n'ont pas le temps d'analyser en détail prennent des risques. L'IA permet de produire une première synthèse systématique, à compléter par votre expertise.",
      },
      {
        type: 'paragraph',
        title: 'Comment l\'IA peut aider',
        content: "Coller un extrait de CCTP dans ChatGPT et demander une synthèse des exigences, des critères de sélection et des points de vigilance. Vous obtenez une fiche de travail en quelques secondes. Consultez notre formation IA appels d'offres BTP pour maîtriser ces usages.",
      },
      {
        type: 'prompts',
        title: 'Prompts pour analyser un CCTP avec l\'IA',
        content: [
          {
            titre: 'Synthèse CCTP complète',
            prompt:
              "Analyse ce CCTP et identifie : 1) les exigences techniques principales ; 2) les critères de sélection ; 3) les points de vigilance ; 4) les éléments à valoriser dans le mémoire technique. Présente une synthèse claire pour une PME du BTP.",
            usage: 'Collez un extrait de CCTP. Gain de temps considérable sur la lecture.',
          },
          {
            titre: 'Extraction normes et quantitatifs',
            prompt:
              "Liste les normes (DTU, NF) et les quantitatifs (m², ml, u.) mentionnés dans ce CCTP pour le lot [VOTRE LOT]. Format : tableau ou liste structurée. Indique les contrôles demandés.",
            usage: 'Pour préparer votre chiffrage et vérifier la conformité.',
          },
          {
            titre: 'Checklist clauses éliminatoires',
            prompt:
              "Identifie les clauses éliminatoires ou à ne pas manquer dans ce CCTP. Liste les éléments qui pourraient faire rejeter le dossier si non respectés. Format : liste de vigilance.",
            usage: "Évitez les erreurs fatales à l'analyse.",
          },
        ],
      },
      {
        type: 'cta',
        content: 'Formation IA appels d\'offres BTP — Analysez un DCE en 30 min. 100% finançable Constructys.',
      },
    ],
    relatedSlugs: ['memoire-technique-btp-exemple', 'repondre-appel-offre-travaux', 'ia-btp-analyse-dce'],
  },
  {
    slug: 'memoire-technique-btp-exemple',
    title: 'Exemple de mémoire technique BTP : structure et bonnes pratiques',
    description: 'Structure d\'un mémoire technique, critères évalués, erreurs à éviter et rôle de l\'IA pour rédiger plus rapidement.',
    date: '2025-03-16',
    keywords: ['mémoire technique BTP', 'exemple mémoire technique', 'réponse appel d\'offre BTP', 'structure mémoire technique'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content: 'Le mémoire technique présente votre méthodologie, vos moyens et vos références pour réaliser le projet. Il est souvent le critère le plus pondéré. Une structure claire et des arguments adaptés au cahier des charges font la différence. L\'IA peut générer un plan et assister la rédaction.',
      },
      {
        type: 'list',
        title: 'Structure d\'un mémoire technique',
        content: [
          "Présentation de l'entreprise et références",
          "Compréhension du projet et méthodologie",
          "Moyens humains et matériels",
          "Planification et organisation",
          "Engagements et points de vigilance",
        ],
      },
      {
        type: 'paragraph',
        title: 'Critères évalués',
        content: "Le jury note la clarté, l'adéquation à l'appel d'offres, la cohérence des arguments. Chaque rubrique doit répondre explicitement aux critères du règlement. Adaptez le vocabulaire au maître d'ouvrage.",
      },
      {
        type: 'paragraph',
        title: 'Erreurs fréquentes',
        content: "Mémoire trop générique, oubli de critères, texte illisible ou trop long. Les PME manquent souvent de temps pour soigner la rédaction. L'IA permet de produire des premières versions à personnaliser.",
      },
      {
        type: 'prompts',
        title: 'Prompts pour rédiger un mémoire technique avec l\'IA',
        content: [
          {
            titre: 'Plan de mémoire technique',
            prompt:
              "Propose un plan de mémoire technique pour un appel d'offres [TYPE DE PROJET : VRD, second œuvre, réhabilitation...]. Critères à respecter : [LISTER LES CRITÈRES DU RÈGLEMENT]. Structure : présentation entreprise, méthodologie, moyens, planification, engagements.",
            usage: 'Adaptez au type de chantier. Base pour structurer votre rédaction.',
          },
          {
            titre: 'Rédaction section méthodologie',
            prompt:
              "Rédige la section « Méthodologie » d'un mémoire technique pour [VOTRE LOT]. Contexte : [BRIEF DU PROJET]. Inclure : phases de travail, points de vigilance, adaptation au CCTP. Ton professionnel, 3-4 paragraphes.",
            usage: "Fournissez vos éléments. L'IA structure et reformule.",
          },
          {
            titre: 'Valorisation des références',
            prompt:
              "Reformule ces références chantiers en format professionnel pour un mémoire technique : [VOS RÉFÉRENCES]. Mettre en avant les chantiers similaires, les volumes, les maîtres d'ouvrage. Format bullet points ou paragraphes courts.",
            usage: 'Transformez vos notes en argumentaire convaincant.',
          },
        ],
      },
      {
        type: 'cta',
        content: 'Formation IA pour rédiger vos mémoires techniques plus vite. Qualiopi · Constructys.',
      },
    ],
    relatedSlugs: ['analyse-cctp-btp', 'repondre-appel-offre-travaux', 'ia-btp-analyse-dce'],
  },
  {
    slug: 'repondre-appel-offre-travaux',
    title: 'Comment répondre à un appel d\'offre travaux : guide pour les PME du BTP',
    description: 'Étapes de réponse, analyse du DCE, constitution du dossier et rôle du mémoire technique. Guide opérationnel pour les entreprises du bâtiment.',
    date: '2025-03-16',
    keywords: ['répondre appel d\'offre travaux', 'appel d\'offre BTP', 'DCE BTP', 'constitution dossier AO'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content: "Répondre à un appel d'offre travaux implique d'analyser le DCE, constituer le dossier (formulaires, pièces, mémoire technique) et respecter les délais. Une méthodologie structurée et l'IA peuvent diviser par 5 le temps d'analyse.",
      },
      {
        type: 'list',
        title: 'Les étapes de réponse',
        content: [
          "Vérifier l'éligibilité (lots, critères d'exclusion)",
          "Analyser le DCE et le CCTP pour votre lot",
          "Identifier les critères de sélection et leur pondération",
          "Constituer le dossier (formulaires, attestations, mémoire)",
          "Relire et vérifier avant dépôt",
        ],
      },
      {
        type: 'paragraph',
        title: 'Analyse du DCE',
        content: "Le DCE contient le règlement, le CCTP, les pièces écrites, les plans. Priorisez les sections qui concernent votre lot. L'IA peut synthétiser les exigences en quelques minutes à partir d'extraits.",
      },
      {
        type: 'paragraph',
        title: 'Rôle du mémoire technique',
        content: "Le mémoire technique est souvent le critère le plus important. Il valorise votre expertise et démontre votre capacité à réaliser le projet. Soignez la structure et l'argumentaire.",
      },
      {
        type: 'prompts',
        title: 'Prompts pour répondre à un appel d\'offre travaux',
        content: [
          {
            titre: 'Checklist éligibilité',
            prompt:
              "À partir de ce règlement de consultation, liste : 1) les critères d'exclusion (ce qui élimine automatiquement) ; 2) les pièces obligatoires à fournir ; 3) les délais clés (dépôt, ouverture). Format checklist exploitable.",
            usage: "Collez l'extrait pertinent. Évitez les dossiers incomplets.",
          },
          {
            titre: 'Synthèse multi-sections DCE',
            prompt:
              "J'ai extrait les sections suivantes de mon DCE : [COLLER EXTRAITS]. Synthétise en une fiche unique : exigences techniques, critères de sélection pondérés, délais, points de vigilance pour mon lot [VOTRE LOT]. Priorise les éléments à traiter en premier.",
            usage: 'Consolidez votre analyse. Gain de temps sur les DCE longs.',
          },
          {
            titre: 'Structure dossier de candidature',
            prompt:
              "Propose un plan de constitution du dossier pour cet appel d'offres. Lot concerné : [VOTRE LOT]. Inclure : formulaire, pièces administratives, mémoire technique, annexes. Checklist avec statut (à faire / fait) et ordre recommandé.",
            usage: "Pour ne rien oublier avant la date limite.",
          },
        ],
      },
      {
        type: 'cta',
        content: 'Formation IA appels d\'offres BTP — 4 h opérationnelles. 100% finançable.',
      },
    ],
    relatedSlugs: ['analyse-cctp-btp', 'memoire-technique-btp-exemple', 'ia-btp-analyse-dce'],
  },
  {
    slug: 'ia-btp-analyse-dce',
    title: 'Comment utiliser l\'IA pour analyser un DCE dans le BTP',
    description: 'Structure d\'un DCE, analyse rapide avec l\'IA, synthèse des exigences. Guide pour chargés d\'affaires et bureaux d\'études.',
    date: '2025-03-16',
    keywords: ['IA analyse DCE', 'analyse DCE BTP', 'ChatGPT DCE', 'synthèse DCE IA'],
    sections: [
      {
        type: 'definition',
        title: 'En bref',
        content: "Le DCE (Dossier de Consultation des Entreprises) regroupe l'ensemble des documents d'un appel d'offres. L'IA générative permet d'extraire les exigences, les délais et les critères de sélection en quelques minutes au lieu de plusieurs heures.",
      },
      {
        type: 'paragraph',
        title: 'Structure d\'un DCE',
        content: "Règlement de consultation, CCAP, CCTP, pièces écrites, plans. Chaque section impose des contraintes. L'analyse systématique est longue ; l'IA accélère la première lecture en produisant des synthèses par section.",
      },
      {
        type: 'list',
        title: 'Analyse rapide avec l\'IA',
        content: [
          "Coller des extraits de DCE dans ChatGPT ou un outil équivalent",
          "Demander une synthèse des exigences, délais et critères",
          "Obtenir une fiche de travail structurée",
          "Compléter avec votre expertise et vos notes",
        ],
      },
      {
        type: 'paragraph',
        title: 'Synthèse des exigences',
        content: "L'IA liste les points à ne pas manquer : normes, contrôles, pièces à fournir. Vous priorisez selon votre lot et votre méthodologie. Ne partagez jamais de données confidentielles dans des outils publics.",
      },
      {
        type: 'prompts',
        title: 'Prompts pour analyser un DCE avec l\'IA',
        content: [
          {
            titre: 'Synthèse DCE par section',
            prompt:
              "Analyse ce DCE et identifie : 1) les exigences techniques principales pour mon lot ; 2) les critères de sélection et leur pondération ; 3) les points de vigilance ; 4) les éléments à valoriser dans le mémoire technique. Présente une synthèse claire pour une PME du BTP.",
            usage: 'Collez un extrait de DCE. Gain de temps considérable sur l\'analyse.',
          },
          {
            titre: 'Extraction délais et pièces',
            prompt:
              "Liste tous les délais (dépôt, ouverture, durée validité) et les pièces à fournir mentionnés dans ce document. Format : tableau avec date/élément et statut (à faire / récupéré). Contexte : réponse appel d'offres BTP.",
            usage: "Pour planifier la constitution de votre dossier.",
          },
          {
            titre: 'Comparatif critères de sélection',
            prompt:
              "Les critères de sélection de ce DCE sont : [COLLER]. Explique ce que le maître d'ouvrage valorise dans chaque critère. Propose des axes d'argumentation pour le mémoire technique. Adapté au lot [VOTRE LOT].",
            usage: 'Pour aligner votre réponse sur les attentes du jury.',
          },
        ],
      },
      {
        type: 'cta',
        content: 'Formation IA appels d\'offres BTP — Analyse DCE en 30 min. Qualiopi.',
      },
    ],
    relatedSlugs: ['analyse-cctp-btp', 'memoire-technique-btp-exemple', 'repondre-appel-offre-travaux'],
  },
];

function loadGeneratedArticles(): BlogArticle[] {
  const dir = join(process.cwd(), 'content', 'generated');
  if (!existsSync(dir)) return [];
  try {
    const files = readdirSync(dir).filter(
      (f) => f.startsWith('article-') && f.endsWith('.json')
    );
    return files.map((f) => {
      const raw = readFileSync(join(dir, f), 'utf-8');
      const a = JSON.parse(raw) as BlogArticle & { internalLinks?: unknown };
      return {
        slug: a.slug,
        title: a.title,
        description: a.description,
        date: a.date,
        keywords: a.keywords ?? [],
        sections: a.sections ?? [],
        relatedSlugs: a.relatedSlugs ?? [],
      };
    });
  } catch {
    return [];
  }
}

/** Catégories du blog — tri et filtrage */
export const BLOG_CATEGORIES = {
  devis: 'Devis & chiffrage',
  'appels-offres': 'Appels d\'offres',
  financement: 'Financement OPCO',
  chatgpt: 'ChatGPT & bonnes pratiques',
  metiers: 'IA par métier',
  rh: 'RH & recrutement',
  productivite: 'Productivité & emails',
  regions: 'Formations par région',
  formateurs: 'Formateurs & prospection',
} as const;

export type BlogCategoryId = keyof typeof BLOG_CATEGORIES;

/** Liens commerciaux contextuels — 4–5 pages par article, ancres SEO variées */
export function getCommercialLinksForArticle(slug: string): { href: string; label: string }[] {
  const cat = getArticleCategory(slug);
  const links: { href: string; label: string }[] = [];
  // Base : formations + RDV sur tous les articles
  links.push({ href: INTERNAL_LINKS.formations.path, label: getAnchor('formations') });
  links.push({ href: INTERNAL_LINKS.prendreRdv.path, label: getAnchor('prendreRdv') });
  switch (cat) {
    case 'financement':
      links.push(
        { href: INTERNAL_LINKS.financementConstructys.path, label: getAnchor('financementConstructys') },
        { href: INTERNAL_LINKS.financement100.path, label: getAnchor('financement100') },
      );
      break;
    case 'devis':
      links.push(
        { href: INTERNAL_LINKS.iaDevis.path, label: getAnchor('iaDevis') },
        { href: INTERNAL_LINKS.diagnostic.path, label: getAnchor('diagnostic') },
      );
      break;
    case 'regions':
      links.push(
        { href: '/formation-ia-btp-paris-2026', label: 'Formation IA BTP Paris 2026' },
        { href: INTERNAL_LINKS.diagnostic.path, label: getAnchor('diagnostic') },
      );
      break;
    case 'appels-offres':
      links.push(
        { href: INTERNAL_LINKS.appelsOffres.path, label: getAnchor('appelsOffres') },
        { href: INTERNAL_LINKS.iaConducteur.path, label: getAnchor('iaConducteur') },
      );
      break;
    case 'rh':
      links.push(
        { href: INTERNAL_LINKS.formations.path, label: getAnchor('formations', 1) },
        { href: '/formations/ia-rh-btp', label: 'Formation IA RH BTP' },
        { href: INTERNAL_LINKS.diagnostic.path, label: getAnchor('diagnostic') },
      );
      break;
    case 'productivite':
      links.push(
        { href: INTERNAL_LINKS.iaDevis.path, label: getAnchor('iaDevis', 1) },
        { href: INTERNAL_LINKS.chatgptArtisans.path, label: getAnchor('chatgptArtisans') },
        { href: INTERNAL_LINKS.checklist.path, label: getAnchor('checklist') },
      );
      break;
    case 'metiers':
      links.push(
        { href: INTERNAL_LINKS.chatgptArtisans.path, label: getAnchor('chatgptArtisans') },
        { href: INTERNAL_LINKS.iaDevis.path, label: getAnchor('iaDevis') },
        { href: INTERNAL_LINKS.diagnostic.path, label: getAnchor('diagnostic') },
      );
      break;
    case 'formateurs':
      links.push(
        { href: INTERNAL_LINKS.communauteFormateurs.path, label: getAnchor('communauteFormateurs') },
        { href: '/formation-ia-btp-paris-2026', label: 'Formation IA BTP Paris 2026' },
        { href: INTERNAL_LINKS.financement100.path, label: getAnchor('financement100') },
      );
      break;
    default:
      links.push(
        { href: INTERNAL_LINKS.chatgptArtisans.path, label: getAnchor('chatgptArtisans') },
        { href: INTERNAL_LINKS.diagnostic.path, label: getAnchor('diagnostic') },
      );
  }
  return links;
}

/** Détermine la catégorie d'un article à partir du slug */
export function getArticleCategory(slug: string): BlogCategoryId {
  const s = slug.toLowerCase();
  if (s.includes('formateur') || s.includes('premiers-clients') || s.includes('prospection-formation') || s.includes('developper-activite')) return 'formateurs';
  if (s.includes('appels-d-offres') || s.includes('appels-offres') || s.includes('cctp') || s.includes('memoire-technique') || s.includes('repondre-appel') || s.includes('analyse-dce')) return 'appels-offres';
  if (s.includes('financement') || s.includes('financer-formation') || s.includes('formation-ia-btp-ce-qu-il')) return 'financement';
  if (s.includes('recrutement')) return 'rh';
  if (s.includes('conducteur-travaux')) return 'appels-offres';
  if (s.includes('formation-ia-artisans-batiment-programme')) return 'metiers';
  if (s.includes('7-cas-usage-ia-btp') || s.includes('5-assistants-ia-btp')) return 'metiers';
  if (s.includes('guide-claude-ia-btp') || s.includes('mcp-claude-model')) return 'metiers';
  if (s.includes('prompts-linkedin-btp')) return 'productivite';
  if (s.includes('adoption-ia-btp') || s.includes('ia-btp-2026')) return 'metiers';
  if (s.includes('garage-automobile') || s.includes('garage-auto')) return 'metiers';
  if (s.includes('gagner-temps-devis') || s.includes('devis-ia')) return 'devis';
  if (s.includes('avis-google') || s.includes('organisation-chantier')) return 'productivite';
  if (s.includes('emails') || s.includes('automatiser-vos') || s.includes('emails-clients')) return 'productivite';
  if (s.includes('lyon') || s.includes('bordeaux') || s.includes('lille')) return 'regions';
  if (s.includes('devis') || s.includes('ia-devis')) return 'devis';
  if (s.includes('ia-et-') || s.includes('remplacer-les')) return 'metiers';
  if (s.includes('chatgpt') || s.includes('erreurs') || s.includes('cas-usage')) return 'chatgpt';
  return 'chatgpt'; // défaut : ChatGPT & bonnes pratiques
}

/** Articles liés pour maillage interne — relatedSlugs en priorité, complété par même catégorie */
export function getRelatedArticlesForDisplay(slug: string, limit = 6): BlogArticle[] {
  const all = getAllArticles();
  const current = all.find((a) => a.slug === slug);
  if (!current) return [];
  const cat = getArticleCategory(slug);
  const used = new Set<string>([slug]);
  const result: BlogArticle[] = [];
  // Priorité : relatedSlugs
  for (const s of current.relatedSlugs ?? []) {
    const a = all.find((x) => x.slug === s);
    if (a && !used.has(a.slug)) {
      result.push(a);
      used.add(a.slug);
    }
  }
  // Compléter avec articles de la même catégorie
  const sameCategory = all.filter((a) => getArticleCategory(a.slug) === cat && !used.has(a.slug));
  for (const a of sameCategory) {
    if (result.length >= limit) break;
    result.push(a);
    used.add(a.slug);
  }
  // Si encore de la place : autres catégories proches
  const otherCategory = getArticleCategory(slug) === 'devis' ? 'chatgpt' : 'devis';
  if (result.length < limit) {
    const others = all.filter(
      (a) => getArticleCategory(a.slug) === otherCategory && !used.has(a.slug)
    );
    for (const a of others) {
      if (result.length >= limit) break;
      result.push(a);
      used.add(a.slug);
    }
  }
  return result.slice(0, limit);
}

/** Articles groupés par catégorie */
export function getArticlesByCategory(): Record<BlogCategoryId, BlogArticle[]> {
  const articles = getAllArticles();
  const grouped = Object.fromEntries(
    (Object.keys(BLOG_CATEGORIES) as BlogCategoryId[]).map((id) => [id, [] as BlogArticle[]])
  ) as Record<BlogCategoryId, BlogArticle[]>;
  for (const a of articles) {
    const cat = getArticleCategory(a.slug);
    grouped[cat].push(a);
  }
  return grouped;
}

/** Tous les articles : statiques + générés (publiés automatiquement) */
export function getAllArticles(): BlogArticle[] {
  const generated = loadGeneratedArticles();
  const staticSlugs = new Set(BLOG_ARTICLES.map((a) => a.slug));
  const generatedFiltered = generated.filter((a) => !staticSlugs.has(a.slug));
  const all = [...BLOG_ARTICLES, ...generatedFiltered];
  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticle(slug: string): BlogArticle | undefined {
  return getAllArticles().find((a) => a.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllArticles().map((a) => a.slug);
}
