# Audit occurrences artisan(s) — post Lot 3 bis

Date: 2026-04-25 22:11:21

Total occurrences restantes: 212
- Ne pas toucher (URL/slug/identifiant/titre officiel): 196
- À remplacer (texte visible): 16

| Fichier | Ligne | Contexte | Recommandation |
|---|---:|---|---|
| `app/admin/media-dashboard/page.tsx` | 131 | Les articles générés incluent des ancres vers : /formations, /formation-ia-artisans-btp, /ia-devis-batiment, /prendre-rdv | Ne pas toucher (URL/slug/identifiant technique) |
| `app/blog/[slug]/page.tsx` | 422 | href="/formation-ia-artisans-btp" | Ne pas toucher (URL/slug/identifiant technique) |
| `app/checklist-ia-btp/page.tsx` | 57 | href="/formation-ia-artisans-btp" | Ne pas toucher (URL/slug/identifiant technique) |
| `app/checklist-prompts-btp/page.tsx` | 126 | <Link href="/formation-ia-artisans-btp" className="font-medium text-[#166534] hover:underline"> | Ne pas toucher (URL/slug/identifiant technique) |
| `app/communaute-formateurs/page.tsx` | 198 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/contact/page.tsx` | 282 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT et IA pour votre entreprise BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/etudes-de-cas/ffb-csfe/page.tsx` | 54 | image: '/images/rencontres-artisans-ia-ffb-atelier.jpg', | Ne pas toucher (URL/slug/identifiant technique) |
| `app/etudes-de-cas/ffb-csfe/page.tsx` | 254 | src="/images/rencontres-artisans-ia-ffb-atelier.jpg" | Ne pas toucher (URL/slug/identifiant technique) |
| `app/etudes-de-cas/ffb-csfe/page.tsx` | 255 | alt="Atelier « Les Rencontres des Artisans » — L'IA au service des équipes du bâtiment : participants en salle de formation avec ordinateurs portables, sous le bandeau FFB." | Ne pas toucher (nom officiel/citation partenaire) |
| `app/etudes-de-cas/ffb-csfe/page.tsx` | 263 | « Les Rencontres des Artisans » — L&apos;IA au service des équipes du bâtiment | Ne pas toucher (nom officiel/citation partenaire) |
| `app/expert-ia-btp/page.tsx` | 223 | { title: 'ChatGPT & IA pour entreprises BTP', href: '/formation-ia-artisans-btp', desc: '4 h — TPE & PME' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/financement-constructys-100-ia-btp/page.tsx` | 181 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/financement-constructys-formation-ia-btp/page.tsx` | 130 | <Link href="/formation-ia-artisans-btp" className="font-medium text-white underline-offset-2 hover:underline"> | Ne pas toucher (URL/slug/identifiant technique) |
| `app/financement-constructys-formation-ia-btp/page.tsx` | 574 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formation-claude-ai-btp/page.tsx` | 82 | "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation"; | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formation-claude-ai-btp/page.tsx` | 444 | formation <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] underline">ChatGPT pour entreprises BTP</Link>. | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formation-claude-ai-btp/page.tsx` | 784 | { href: "/formation-ia-artisans-btp", label: "ChatGPT pour entreprises BTP" }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formation-ia-artisans-btp/page.tsx` | 18 | path: '/formation-ia-artisans-btp', | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formation-ia-artisans-btp/page.tsx` | 52 | '@id': `${baseUrl}/formation-ia-artisans-btp#service`, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formation-ia-artisans-btp/page.tsx` | 114 | { name: 'Formation IA pour entreprises BTP', path: '/formation-ia-artisans-btp' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formation-ia-artisans-btp/page.tsx` | 119 | <JsonLd id="schema-breadcrumb-artisans-btp" schema={breadcrumbJsonLd} /> | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formation-ia-artisans-btp/page.tsx` | 120 | <JsonLd id="schema-service-artisans-btp" schema={serviceJsonLd} /> | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formation-ia-btp-paris/page.tsx` | — | Canonique Paris (ex `-2026` → 301) | Ne pas toucher |
| `app/formations/ia-pme-btp/page.tsx` | 196 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formations/ia-rh-btp/page.tsx` | 306 | href="https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement" | Ne pas toucher (URL/slug/identifiant technique) |
| `app/formations/ia-rh-btp/page.tsx` | 311 | L&apos;IA pour les artisans et TPE : Recruter sa main-d&apos;œuvre efficacement | Ne pas toucher (titre officiel LinkedIn Learning) |
| `app/ia-conducteur-travaux/page.tsx` | 202 | <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] hover:underline"> | Ne pas toucher (URL/slug/identifiant technique) |
| `app/ia-conducteur-travaux/page.tsx` | 232 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/ia-devis-batiment/page.tsx` | 536 | <Link href="/formation-ia-artisans-btp" className="text-[var(--accent)] hover:underline"> | Ne pas toucher (URL/slug/identifiant technique) |
| `app/ia-devis-batiment/page.tsx` | 566 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/install-pwa/page.tsx` | 72 | href="/formation-ia-artisans-btp" | Ne pas toucher (URL/slug/identifiant technique) |
| `app/offres/page.tsx` | 73 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/outils-ia-btp/page.tsx` | 46 | href: '/blog/chatgpt-prompts-artisans-btp', | Ne pas toucher (URL/slug/identifiant technique) |
| `app/outils-ia-btp/page.tsx` | 66 | href: '/blog/5-cas-usage-chatgpt-artisans-btp', | Ne pas toucher (URL/slug/identifiant technique) |
| `app/page.tsx` | 918 | L&apos;IA pour les artisans et TPE&nbsp;: Recruter sa main-d&apos;œuvre efficacement | Ne pas toucher (titre officiel LinkedIn Learning) |
| `app/page.tsx` | 922 | href="https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement" | Ne pas toucher (URL/slug/identifiant technique) |
| `app/prendre-rdv/page.tsx` | 76 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `app/ressources/ia-btp/10-cas-usage-concrets/page.tsx` | 427 | href="/formation-ia-artisans-btp" | Ne pas toucher (URL/slug/identifiant technique) |
| `app/sitemap.ts` | 311 | { url: `${baseUrl}/formation-ia-artisans-btp`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 }, | Ne pas toucher (URL/slug/identifiant technique) |
| `components/AllerPlusLoin.tsx` | 14 | { href: '/formation-ia-artisans-btp', label: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `components/LinkedInLearningEmbed.tsx` | 9 | 'https://www.linkedin.com/learning/embed/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement?autoplay=true&claim=AQGQO6MNxFDuwwAAAZzX7Q8QyT | Ne pas toucher (URL/slug/identifiant technique) |
| `components/LinkedInLearningEmbed.tsx` | 11 | 'https://fr.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement', | Ne pas toucher (URL/slug/identifiant technique) |
| `components/LinkedInLearningEmbed.tsx` | 12 | title: "L'IA pour les artisans et TPE : Recruter sa main-d'œuvre efficacement", | Ne pas toucher (titre officiel LinkedIn Learning) |
| `components/LinkedInLearningEmbed.tsx` | 13 | firstLessonTitle: "Bienvenue dans « L'IA pour les artisans et TPE : recruter sa main-d'œuvre efficacement »", | Ne pas toucher (titre officiel LinkedIn Learning) |
| `components/LinkedInLearningEmbed.tsx` | 43 | ? 'bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement' | Remplacer (texte visible) |
| `components/VisioDecouverteCalendlyLink.tsx` | 9 | * @see https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation | Ne pas toucher (URL/slug/identifiant technique) |
| `components/blog/BlogIndexView.tsx` | 35 | '5-cas-usage-chatgpt-artisans-btp', | Remplacer (texte visible) |
| `components/blog/BlogIndexView.tsx` | 205 | <Link href="/formation-ia-artisans-btp" className="text-sm font-medium text-[#377CF3] hover:underline"> | Ne pas toucher (URL/slug/identifiant technique) |
| `components/formations/FormationCityPage.tsx` | 314 | { href: '/formation-ia-artisans-btp', label: 'IA pour votre métier dans le bâtiment' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `components/landing/ArticlesFormationLies.tsx` | 11 | href: '/blog/5-cas-usage-chatgpt-artisans-btp', | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-5-cas-usage-chatgpt-artisans-btp.json` | 2 | "slug": "5-cas-usage-chatgpt-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-analyse-dce-ia-exemple-reel.json` | 120 | "content": "<p><strong>OFC Création d'Entreprise</strong> propose la formation <strong>Répondre aux appels d'offres avec l'IA (BTP-02)</strong>, une session de 4 heures 100 % finançable Constructys (plafonds et règles sur <a href=\"https:// | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-appels-d-offres-btp-l-ia-comme-assistant-741614-8.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-appels-d-offres-btp-l-ia-comme-assistant-741628-8.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-appels-d-offres-btp-l-ia-comme-assistant.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-automatiser-emails-clients-btp-ia.json` | 35 | "formationHref": "/chatgpt-artisans-btp" | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-automatiser-vos-emails-clients-avec-l-ia-741613-9.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-automatiser-vos-emails-clients-avec-l-ia-741627-9.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-automatiser-vos-emails-clients-avec-l-ia-741632-9.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-automatiser-vos-emails-clients-avec-l-ia.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-artisans-btp-usages.json` | 2 | "slug": "chatgpt-artisans-btp-usages", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-artisans-btp-usages.json` | 100 | "content": "<h2>Se former à ChatGPT pour professionnels du BTP BTP avec OFC Création d'Entreprise</h2>\n<p>OFC Création d'Entreprise propose une formation IA BTP de 4 heures, 100 % finançable Constructys, spécialement conçue pour les profes | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-artisans-erreurs-a-eviter-741598-8.json` | 2 | "slug": "chatgpt-pour-artisans-erreurs-a-eviter-741598-8", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-artisans-erreurs-a-eviter-741612-8.json` | 2 | "slug": "chatgpt-pour-artisans-erreurs-a-eviter-741612-8", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-artisans-erreurs-a-eviter-741612-8.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-artisans-erreurs-a-eviter-741612-8.json` | 84 | "path": "/chatgpt-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-artisans-erreurs-a-eviter-741617-8.json` | 2 | "slug": "chatgpt-pour-artisans-erreurs-a-eviter-741617-8", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-artisans-erreurs-a-eviter-741617-8.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-artisans-erreurs-a-eviter-741617-8.json` | 84 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-artisans-erreurs-a-eviter.json` | 2 | "slug": "chatgpt-pour-artisans-erreurs-a-eviter", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-artisans-erreurs-a-eviter.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-pme-btp-erreurs-a-eviter-741631-8.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-pour-pme-btp-erreurs-a-eviter.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-chatgpt-prompts-artisans-btp.json` | 2 | "slug": "chatgpt-prompts-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-claude-ai-btp-5-interfaces-chat-cowork-code.json` | 21 | "chatgpt-prompts-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-claude-ai-memoire-technique-erreurs-btp.json` | 99 | "content": "<p><strong>OFC Création d'Entreprise</strong> propose la formation <strong>Répondre aux appels d'offres avec l'IA (BTP-02)</strong> — 4 h, finançable <strong>Constructys</strong>, pour chefs d'affaires, conducteurs de travaux et | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-carreleur.json` | 77 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-carreleur.json` | 85 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-charpentier.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-chauffagiste.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-couvreur.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-electricien.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-macon.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-menuisier.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-menuisier.json` | 84 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-peintre.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-comment-utiliser-chatgpt-pour-vos-devis-plombier.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-carreleur.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-charpentier.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-chauffagiste.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-chauffagiste.json` | 84 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-couvreur.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-electricien.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-macon.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-menuisier.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-peintre.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-peintre.json` | 84 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-devis-en-15-min-le-guide-plombier.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-dossier-constructys-2026-etapes.json` | 68 | "content": "<p>Pour chaque formation organisée avec <strong>OFC Création d'Entreprise</strong>, vous recevez systématiquement :</p><ul class=\"list-disc pl-6 space-y-1 text-slate-700\"><li>La convention de formation pré-remplie prête à sign | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-financement-constructys-formation-ia-btp-2026.json` | 96 | "content": "<h2>Se former à l'IA BTP avec OFC Création d'Entreprise</h2>\n<p>Formation IA BTP <strong>4 heures</strong>, conçue pour le bâtiment et les travaux publics : devis et chiffrage, analyse CCTP/DCE, comptes rendus chantier, appels  | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-financement-constructys-mode-d-emploi-741611-9.json` | 77 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-financement-constructys-mode-d-emploi-741611-9.json` | 85 | "path": "/chatgpt-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-financement-constructys-mode-d-emploi-741616-9.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-financement-constructys-mode-d-emploi-741616-9.json` | 84 | "path": "/chatgpt-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-financement-constructys-mode-d-emploi-741630-9.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-financement-constructys-mode-d-emploi.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741597-8.json` | 84 | "path": "/chatgpt-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741611-8.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741616-8.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-formation-ia-btp-ce-qu-il-faut-savoir-en-2026-741630-8.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-formation-ia-btp-ce-qu-il-faut-savoir-en-2026.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-formation-ia-intra-btp-constructys-2026.json` | 113 | "content": "<p>La formation intra est le point de départ le plus efficace pour ancrer l'IA dans vos pratiques terrain. Une fois votre équipe formée sur Claude AI, les mêmes compétences s'appliquent directement à vos <a href=\"/ia-conducteur | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-gagner-temps-devis-ia-btp.json` | 36 | "formationHref": "/chatgpt-artisans-btp" | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-analyse-cctp-methode.json` | 95 | "content": "<p><strong>OFC Création d'Entreprise</strong> propose la formation <strong>Répondre aux appels d'offres avec l'IA (BTP-02)</strong>, une session de 4 heures finançable <strong>Constructys</strong>, pour les chefs d'affaires, con | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-artisans-par-ou-commencer.json` | 2 | "slug": "ia-artisans-par-ou-commencer", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-conducteur-travaux-usages.json` | 107 | "content": "<p><strong>OFC Création d'Entreprise</strong> propose la formation <strong>L'IA au service du bâtiment (BTP-01)</strong> et <strong>L'IA au service des Travaux Publics (BTP-04)</strong>, deux sessions de 4 heures finançables Con | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-carreleur-5-gains-de-temps-concrets.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-carreleur-5-gains-de-temps-concrets.json` | 84 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-charpentier-5-gains-de-temps-concrets.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-chauffagiste-5-gains-de-temps-concrets.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-couvreur-5-gains-de-temps-concrets.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-electricien-5-gains-de-temps-concrets.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-macon-5-gains-de-temps-concrets.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-menuisier-5-gains-de-temps-concrets.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-peintre-5-gains-de-temps-concrets.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-et-plombier-5-gains-de-temps-concrets.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-ia-planning-chantier-btp.json` | 109 | "content": "<p><strong>OFC Création d'Entreprise</strong> propose un module de formation IA BTP de 4 h, finançable <strong>Constructys</strong>, pour conducteurs de travaux et dirigeants PME BTP.</p><p>Contenu : méthode en 5 étapes sur un c | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-carreleurs.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-carreleurs.json` | 84 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-charpentiers.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-chauffagistes.json` | 77 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-chauffagistes.json` | 85 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-couvreurs.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-electriciens.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-macons.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-menuisiers.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-peintres.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-peintres.json` | 84 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-l-ia-va-t-elle-remplacer-les-plombiers.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-outils-ia-btp-chatgpt-claude-gemini.json` | 45 | "chatgpt-prompts-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-outils-ia-btp-chatgpt-claude-gemini.json` | 75 | "content": "<h3>1. ChatGPT — l&apos;outil IA le plus connu, idéal pour commencer</h3><p><strong>Lien officiel :</strong> <a href=\"https://chatgpt.com\" rel=\"noopener noreferrer\" target=\"_blank\">https://chatgpt.com</a></p><p>ChatGPT est | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-outils-ia-btp-chatgpt-claude-gemini.json` | 133 | "content": "<p>OFC Création d&apos;Entreprise propose une <a href=\"/formations\" class=\"text-[var(--accent)] font-medium underline\">formation IA BTP</a> de 4 heures, éligible au financement Constructys, pour les professionnels du bâtimen | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-recrutement-btp-l-ia-pour-attirer-les-talents-741614-9.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-recrutement-btp-l-ia-pour-attirer-les-talents-741628-9.json` | 76 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-recrutement-btp-l-ia-pour-attirer-les-talents.json` | 77 | "path": "https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation", | Ne pas toucher (URL/slug/identifiant technique) |
| `content/generated/article-recrutement-btp-l-ia-pour-attirer-les-talents.json` | 85 | "path": "/formation-ia-artisans-btp", | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/a-propos-partners-grid.ts` | 13 | "Laure Olivié a animé des formations IA BTP pour la FFB Grand Paris, la FFB Île-de-France Est, la FFB Île-de-France Ouest (78-91-95), la FFB Artisans, la Chambre Syndicale Française de l'Étanchéité (CSFE), le CNAM Entreprise, Lefebvre Dallo | Ne pas toucher (nom officiel/citation partenaire) |
| `lib/a-propos-partners-grid.ts` | 38 | name: 'FFB Artisans', | Ne pas toucher (nom officiel/citation partenaire) |
| `lib/agent/content-sources.ts` | 66 | { path: '/formation-ia-artisans-btp', title: 'ChatGPT pour entreprises BTP', content: 'Formation ChatGPT pour dirigeants et équipes du bâtiment et des travaux publics. Devis, emails, CR chantier. 4h pratiques.' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/blog-carrousel-a-article.ts` | 10 | slug: 'formation-ia-artisans-batiment-programme-objectifs-livrables', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/blog-claude-btp-2026-articles.ts` | 123 | '5-cas-usage-chatgpt-artisans-btp', | Remplacer (texte visible) |
| `lib/blog-claude-btp-2026-articles.ts` | 434 | '5-cas-usage-chatgpt-artisans-btp', | Remplacer (texte visible) |
| `lib/blog-claude-btp-2026-articles.ts` | 501 | '5-cas-usage-chatgpt-artisans-btp', | Remplacer (texte visible) |
| `lib/blog-claude-btp-2026-articles.ts` | 585 | '5-cas-usage-chatgpt-artisans-btp', | Remplacer (texte visible) |
| `lib/blog-ia-devis-batiment-chiffrage-automatise.ts` | 31 | '5-cas-usage-chatgpt-artisans-btp', | Remplacer (texte visible) |
| `lib/blog-lsr-ao-modules-articles.ts` | 213 | 'formation-ia-artisans-batiment-programme-objectifs-livrables', | Remplacer (texte visible) |
| `lib/blog.ts` | 1084 | formationHref: '/formation-ia-artisans-btp', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/blog.ts` | 1224 | '5-cas-usage-chatgpt-artisans-btp', | Remplacer (texte visible) |
| `lib/blog.ts` | 1403 | '5-cas-usage-chatgpt-artisans-btp', | Remplacer (texte visible) |
| `lib/blog.ts` | 1409 | slug: '5-cas-usage-chatgpt-artisans-btp', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/blog.ts` | 1594 | relatedSlugs: ['5-cas-usage-chatgpt-artisans-btp', 'financer-formation-ia-btp-constructys'], | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/blog.ts` | 1650 | relatedSlugs: ['5-cas-usage-chatgpt-artisans-btp'], | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/blog.ts` | 2110 | if (s.includes('formation-ia-artisans-batiment-programme')) return 'metiers'; | Remplacer (texte visible) |
| `lib/calendly.ts` | 7 | 'https://calendly.com/formation-ia-artisans-btp-appel-decouverte/appel_decouverte_formation'; | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/calendly.ts` | 15 | 'https://calendly.com/formation-ia-artisans-btp-appel-decouverte?hide_gdpr_banner=1'; | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/client-logos.ts` | 37 | id: 'ffb-artisan', | Remplacer (texte visible) |
| `lib/client-logos.ts` | 38 | name: 'FFB Artisan', | Ne pas toucher (nom officiel/citation partenaire) |
| `lib/client-logos.ts` | 43 | caption: 'FFB Artisan', | Ne pas toucher (nom officiel/citation partenaire) |
| `lib/faq.ts` | 45 | "Emails, relances, modèles de courriers, synthèses de réunion, brouillons de rapports et classement d'informations — avec anonymisation et bonnes pratiques de confidentialité enseignées en session. Idéal pour dirigeants, conducteurs de trav | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/faq.ts` | 106 | a: 'On part de vos documents réels (devis, CR chantier, emails) : prompts adaptés au vocabulaire BTP, relecture humaine et bonnes pratiques confidentialité. Le <a href="/formations">catalogue formations IA BTP</a> et la page <a href="/forma | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/faq.ts` | 167 | a: 'Aucun prérequis technique pour suivre une formation ChatGPT BTP. Conçue pour dirigeants de TPE/PME, conducteurs de travaux et équipes support sans compétence informatique. Méthode 100 % pratique : travail sur vos vrais documents (devis, | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/faq.ts` | 242 | a: 'Oui. Nos formations sont conçues pour des professionnels du BTP sans prérequis technique. On travaille sur vos vrais documents : devis, emails, comptes rendus. Méthode 100 % pratique — voir <a href="/formation-ia-artisans-btp">ChatGPT p | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/faq.ts` | 352 | a: 'La formation est calibrée pour le BTP : vocabulaire du bâtiment (CCTP, DTU, mémoire technique, comptes rendus de chantier), exercices sur vos vrais documents, méthodes éprouvées avec des entreprises du secteur. Voir aussi <a href="/form | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/faq.ts` | 380 | a: 'La formation est calibrée pour le BTP : vocabulaire du bâtiment (CCTP, DTU, mémoire technique, comptes rendus de chantier), exercices sur vos vrais documents, méthodes éprouvées avec des entreprises du secteur. Voir aussi <a href="/form | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/faq.ts` | 587 | a: 'Oui. Les prompts sont des trames à adapter à votre métier (plombier, électricien, maçon...). La formation vous apprend à créer vos propres prompts — voir <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a>.', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/faq.ts` | 667 | a: 'Oui. Intervenante LinkedIn Learning : « <a href="https://www.linkedin.com/learning/l-ia-pour-le-btp-des-solutions-concretes-pour-vos-chantiers" target="_blank" rel="noopener noreferrer">L\'IA pour le BTP, des solutions concrètes pour vo | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/faq.ts` | 699 | a: 'Oui. Les professionnels du BTP gagnent en moyenne 3 à 5h/semaine en automatisant devis, emails, CR chantier et appels d\'offres avec ChatGPT — voir <a href="/formation-ia-artisans-btp">ChatGPT pour entreprises BTP</a> et <a href="/forma | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/gsc-redirects-2026.ts` | 67 | source: '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741612-8', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/gsc-redirects-2026.ts` | 68 | destination: '/blog/chatgpt-pour-artisans-erreurs-a-eviter', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/gsc-redirects-2026.ts` | 72 | source: '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741617-8', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/gsc-redirects-2026.ts` | 73 | destination: '/blog/chatgpt-pour-artisans-erreurs-a-eviter', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/gsc-redirects-2026.ts` | 110 | source: '/formation-chatgpt-artisan-electricien', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/gsc-redirects-2026.ts` | 137 | '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741612-8', | Remplacer (texte visible) |
| `lib/gsc-redirects-2026.ts` | 138 | '/blog/chatgpt-pour-artisans-erreurs-a-eviter-741617-8', | Remplacer (texte visible) |
| `lib/gsc-redirects-2026.ts` | 149 | '/formation-chatgpt-artisan-electricien', | Remplacer (texte visible) |
| `lib/internal-links.ts` | 62 | chatgptArtisans: '/formation-ia-artisans-btp', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/linkedin-learning-a-propos-embeds.ts` | 21 | 'https://www.linkedin.com/learning/embed/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement?autoplay=false&claim=AQH45jl6UPho-gAAAZ2NEmIzC | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/linkedin-learning-a-propos-embeds.ts` | 25 | 'https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement/bienvenue-dans-l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement?trk=embed_lil', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/linkedin-learning-a-propos-embeds.ts` | 29 | 'https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement?trk=embed_lil', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/media-machine/clusters.ts` | 22 | id: 'ia-artisans', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/media-machine/clusters.ts` | 28 | id: 'artisans-devis', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/media-machine/clusters.ts` | 38 | id: 'artisans-emails', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/media-machine/clusters.ts` | 47 | id: 'artisans-metier', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/media-machine/config.ts` | 23 | path: '/formation-ia-artisans-btp', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/media-machine/internal-links.ts` | 30 | if (clusterId.includes('artisans')) { | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/photos.ts` | 93 | /** À propos — Les Rencontres des Artisans FFB (atelier IA bâtiment) */ | Ne pas toucher (nom officiel/citation partenaire) |
| `lib/photos.ts` | 95 | src: '/images/rencontres-artisans-ia-ffb-btp.jpg', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/photos.ts` | 97 | 'Atelier FFB Les Rencontres des Artisans — intelligence artificielle au service des équipes du bâtiment, formation animée par Laure Olivié', | Ne pas toucher (nom officiel/citation partenaire) |
| `lib/photos.ts` | 186 | src: '/images/laure-cours-ia-artisans-tpe-video-1.png', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/photos.ts` | 193 | src: '/images/laure-cours-ia-artisans-tpe-video-2.png', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/photos.ts` | 239 | src: '/images/laure-olivie-formation-ia-batiment-salle.png', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/photos.ts` | 346 | src: '/images/carte-catalogue-ia-batiment-btp-01.png', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/photos.ts` | 428 | src: '/images/formation-ia-batiment-salle-public.png', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/seo-architecture.ts` | 26 | id: 'chatgpt-artisans', | Remplacer (texte visible) |
| `lib/seo-architecture.ts` | 27 | path: '/formation-ia-artisans-btp', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/seo-architecture.ts` | 44 | { id: 'ia-artisans', path: '/blog/ia-artisans', name: 'IA pour entreprises BTP', pillarId: 'chatgpt-artisans' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/seo-architecture.ts` | 46 | { id: 'chatgpt-btp', path: '/blog/chatgpt-btp', name: 'ChatGPT BTP', pillarId: 'chatgpt-artisans' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/seo-architecture.ts` | 63 | chatgptArtisans: { path: '/formation-ia-artisans-btp', anchor: 'ChatGPT pour entreprises BTP' }, | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/seo-links.ts` | 154 | href: 'https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement', | Ne pas toucher (URL/slug/identifiant technique) |
| `lib/seo.ts` | 816 | 'https://www.linkedin.com/learning/l-ia-pour-les-artisans-et-tpe-recruter-sa-main-d-oeuvre-efficacement', | Ne pas toucher (URL/slug/identifiant technique) |
