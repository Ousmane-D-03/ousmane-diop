# Notes de construction

Carnet tenu pendant la réalisation. Difficultés, notions mal comprises, choix abandonnés.

---

## 2026-09-26 — Initialisation

**Node.js absent de la machine.** `node` introuvable (ni dans le PATH, ni dans Program Files, ni via nvm/fnm).
Astro exige Node ≥ 22.12.0, version paire uniquement (les versions impaires comme 23 ne sont pas supportées).
Installation nécessaire avant de pouvoir lancer `npm create astro`.

**Collections de contenu : l'API a changé par rapport à ce que je connaissais.**
La config se place dans `src/content.config.ts` (et non plus `src/content/config.ts`).
Chaque collection déclare un `loader` (`glob()` importé depuis `astro/loaders`) ; `z` s'importe depuis `astro/zod`. Les entrées exposent un `id` (dérivé du nom de fichier) ; l'ancien champ `slug` n'existe plus en tant que tel.

**Adaptateur Cloudflare : abandonné, inutile ici.**
Le brief demandait de vérifier « l'adaptateur Cloudflare », ce qui laissait supposer qu'il en fallait un. La doc Astro dit le contraire pour un site comme celui-ci : `@astrojs/cloudflare` sert au rendu à la demande, c'est-à-dire générer une page côté serveur au moment de la requête.
Ici, aucune page n'en a besoin : pas de backend, pas de base, pas de contenu qui change selon le visiteur. `npm run build` produit des fichiers HTML/CSS/polices dans `dist/`, et n'importe quel hébergeur statique les sert tels quels, Pages comme Workers.
L'ajouter aurait coûté une dépendance, de la configuration et une surface de mise à jour pour une fonctionnalité non utilisée. Ne pas l'ajouter garde aussi la question Pages/Workers ouverte : le même `dist/` convient aux deux.

**Cloudflare Pages vs Workers : point ouvert.**
La doc Astro indique que Cloudflare recommande désormais Workers (static assets) pour les nouveaux projets, et renvoie vers un guide de migration depuis Pages. Le brief prévoit Pages et l'URL `ousmane-diop.pages.dev`. Décision à prendre au moment du déploiement.

**Astro est en version 7.3.5**, pas la 5 que j'avais en tête. Pour éviter que `create-astro` touche au dossier existant (fichiers de brief, dépôt git), j'ai généré le template `minimal` dans un dossier temporaire et n'en ai copié que la config (`package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.vscode/`).
Écartés du template : son `CLAUDE.md`/`AGENTS.md` génériques, son README, et les favicons au logo Astro (marqueur typique de site généré depuis un template).

**Polices : préconnexion Google Fonts abandonnée au profit de l'API Fonts d'Astro.**
Le brief prévoyait le chargement classique : `<link>` vers fonts.googleapis.com, avec une préconnexion pour gagner du temps. En lisant la doc Astro 7, j'ai trouvé une API Fonts stable qui télécharge les polices au build et les sert depuis le site (`dist/_astro/fonts/`).
Pourquoi c'est mieux :
- Performance : le navigateur n'ouvre pas de connexion vers deux domaines Google (DNS + TLS) avant de pouvoir afficher le texte. L'argument historique « la police est déjà en cache grâce à un autre site » ne tient plus : les navigateurs cloisonnent leur cache par site depuis 2020 (Chrome 86).
- RGPD : charger une police depuis Google transmet l'adresse IP du visiteur à un tiers sans son consentement. Le tribunal régional de Munich (LG München I, janvier 2022) a condamné un site pour exactement ça. C'est le genre de question que pose le bloc « gouvernance numérique » de l'offre : quelles données sortent, vers qui.
- Moins de choses à maintenir : pas de balises de préconnexion à écrire, `font-display: swap` et le préchargement (`<Font preload />`) sont gérés par Astro.
Vérifié dans le HTML généré : 12 déclarations `font-display: swap`, zéro occurrence de googleapis/gstatic, trois fichiers woff2 servis localement.
Conséquence : la ligne « préconnexion à Google Fonts » du CLAUDE.md devient sans objet.

**Vert du drapeau sénégalais refusé pour l'accent.**
Le choix du vert venait d'une idée (double lecture drapeau / « build passing »), pas d'une mesure. Or l'accent sert aussi à écrire du texte (numéros d'étape, liens, lignes « En lien avec »), donc il doit être lisible.
J'ai calculé le rapport de contraste avec la formule WCAG (luminance relative de chaque couleur, puis (L1 + 0,05) / (L2 + 0,05)) plutôt que de le juger à l'œil :
- #00853F (vert du drapeau) : 4,45:1 sur le fond #F7F8F6. Sous le seuil AA de 4,5:1 pour le texte courant. Il passerait sur blanc pur (4,74:1), mais de justesse.
- #0B6E3F : 5,94:1, conforme AA.
- #0A5C36 : 7,59:1, conforme AA et même AAA (7:1).
Retenu : #0A5C36. Le lien au drapeau reste lisible (c'est un vert profond de la même famille), et la marge au-dessus du seuil évite de repasser en échec si le fond bouge un peu.
Même vérification pour le gris secondaire #5B615C : 5,96:1.

**Indicateur de progression : version statique pour l'instant.**
Une simple navigation par ancres vers les quatre étapes, sans JavaScript. Le suivi du défilement viendra une fois la structure validée.

---

## 2026-09-26 — Contenu et collection de projets

**Trait du pipeline qui continuait après l'étape 04.** Le trait était un `border-left` sur chaque section : il allait forcément jusqu'en bas de la dernière. Remplacé par un pseudo-élément dont la hauteur, sur la dernière étape seulement, s'arrête au centre du jalon. La position du jalon est une variable CSS partagée par le jalon et le trait, pour qu'ils ne puissent pas se désaligner.

**Stack : stockée dans la collection, pas affichée.** Le CLAUDE.md prévoit un champ `stack`. Les descriptions rédigées citent déjà les technologies : les réafficher en liste ferait doublon, et remettrait la stack au premier plan alors que les projets sont présentés par mission. Le champ est rempli uniquement avec les technologies citées dans le texte (vide pour Jokko, qui n'en cite aucune).

**Lien GitHub de Xëy Invest : absent.** Le contenu indique « → [Code sur GitHub] » sans URL. Pas d'URL inventée : le champ `lien` est prêt mais commenté. La flèche `→` du contenu n'est pas reprise (interdite par le CLAUDE.md).

**Capture « mobile » trompeuse.** La capture à 390 px montrait du texte coupé à droite. En mesurant `innerWidth`, Edge headless impose en fait un minimum de 504 px et rogne l'image : le défaut venait de l'outil, pas du site. Rendu réel vérifié dans une iframe de 390 px : pas de débordement.

**Typographie française.** Le Markdown des projets transforme automatiquement les apostrophes en ’, pas le texte écrit directement dans le `.astro` : deux styles d'apostrophe cohabitaient sur la page. Et un guillemet « se retrouvait seul en fin de ligne. Uniformisé : apostrophes typographiques partout, `&nbsp;` avant `:` et `%` et à l'intérieur des guillemets. Aucun mot modifié.

---

## 2026-09-26 — Indicateur de progression

**Barre en CSS pur, étape active en JS minimal.** La barre qui suit le défilement utilise `animation-timeline: scroll()` : aucune ligne de JavaScript. Vérifié sur caniuse avant de choisir : Chrome/Edge 115+, Firefox 159+, Safari 26+, environ 87 % des visiteurs. Pour les autres, `@supports` masque la barre et la navigation reste utilisable.
Le marquage de l'étape en cours (`aria-current="location"`) passe par un script d'environ 600 octets : un lecteur d'écran annonce l'étape courante, ce qu'une solution 100 % CSS ne permet pas.

**IntersectionObserver abandonné au profit d'un écouteur de défilement.** L'observateur ne signale une section que lorsqu'elle traverse une zone de l'écran. La section 04, courte et en bas de page, n'atteint jamais cette zone : elle ne serait jamais marquée active. L'écouteur calcule « dernière section dont le haut a passé 40 % de l'écran », avec un cas explicite pour le bas de page. Limité à un calcul par image affichée (`requestAnimationFrame`).

**Bug du minifieur CSS.** Écrit avec le raccourci `animation: avancement linear both` suivi de `animation-timeline: scroll(root)`, le CSS était fusionné au build en `animation: linear both avancement scroll(root)`. Edge rejette cette forme : la barre s'affichait pleine largeur en permanence. Invisible en lisant le code source, visible seulement en lisant le style calculé dans le navigateur (`animation-name: none`). Corrigé en écrivant les propriétés détaillées, que le minifieur laisse intactes.

**Outil de vérification, deuxième fois.** Les captures d'Edge headless sur une page défilée (URL avec ancre) sortaient blanches. Remplacé par Playwright piloté sur l'Edge installé, qui permet de défiler, d'appuyer sur Tab, d'émuler `prefers-reduced-motion` et de lire les styles calculés. Tests passés : barre à 0 / 0,5 / 1 selon la position, barre absente en mouvement réduit, ordre de tabulation, titre non masqué sous la navigation après un saut d'ancre.

**Navigation sur deux lignes en mobile.** Sous 34rem, seuls les numéros sont visibles ; les titres sont masqués visuellement mais restent dans le nom accessible des liens (« 03 Mes projets »).

**Décalage de colonne causé par l'unité `ch`.** La largeur de colonne (`68ch`) dépend de la taille de police de l'élément. La liste de navigation ayant une police plus petite, sa colonne était plus étroite et décalée de 43 px. Taille de police déplacée sur les liens ; alignement mesuré à 323 px pour navigation, titre et trait.
