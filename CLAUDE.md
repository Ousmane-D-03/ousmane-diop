# CLAUDE.md — Site de candidature Alpha to Omega

## Ce qu'est ce projet

Un site personnel qui **constitue** une candidature de stage chez Alpha to Omega (A2O), une entreprise toulousaine spécialisée web + IA. L'entreprise ne demande ni CV ni lettre de motivation : le site EST la candidature.

Le site est déployé sur **Cloudflare Pages** à l'adresse `https://ousmane-diop.pages.dev` (le formulaire de candidature exige une adresse en `.pages.dev`). Un ancien déploiement Workers (`ousmane-diop.ousmanesarrd.workers.dev`) existe encore ; ce n'est plus l'adresse du site.

**Auteur :** Ousmane Sarr Diop, étudiant en Master 1 Informatique (parcours Sciences du Logiciel) à l'Université Toulouse III — Paul Sabatier. Profil backend / DevOps / sécurité applicative.

## Ce que l'entreprise évalue

Ces critères viennent de leurs documents officiels :

1. **Transformer un objectif ouvert en résultat clair.**
2. **Comprendre leurs missions**, pas réciter des motivations génériques.
3. **Utiliser l'IA avec un regard critique** — savoir reprendre le travail manuellement quand il faut.
4. **Aller jusqu'au déploiement.** Passer d'un projet local à une application accessible sur Internet.

## Stack

- **Astro 7** — le framework maison de l'entreprise. Vérifier la documentation à jour avant d'utiliser une API Astro (collections de contenu, API Fonts).
- Node 24 (`.node-version`), Astro exige ≥ 22.12.
- Déploiement Cloudflare Pages, déclenché au push sur `main` (preset Astro : `npm run build`, sortie `dist/`, Node lu dans `.node-version` ; aucun `wrangler.jsonc` ni workflow dans le dépôt). Site statique, **pas d'adaptateur Cloudflare**. Pages sert `404.html` d'office.
- CSS écrit à la main, styles scopés d'Astro. Pas de framework CSS.
- Pas de base de données, pas de backend, **aucun JavaScript côté client**.

## Direction visuelle — la maquette

Depuis le 3 octobre 2026, le site suit une maquette de quatre pages. Sa **direction visuelle** est validée telle quelle ; son **texte** a été réécrit le 4 octobre avec les formulations de l'auteur (voir Contenu). Le fichier d'origine (export HTML) est hors du dépôt, dans `../ousmane-diop-sauvegardes/`. L'ancienne version (pipeline vertical, boucle DevOps, mots wolof) reste dans l'historique git, jusqu'au commit `e732241`.

Pages :

| Adresse | Page |
|---|---|
| `/` | Accueil : titre, terminal, en bref, qui je suis (avec l'anecdote master/main), pourquoi ce stage, appel final |
| `/stage/` | Ma lecture de l'offre : les trois blocs (mission de l'offre, puis mon texte), mes questions |
| `/projets/` | Trois projets (collection de contenu), expériences, en apprentissage |
| `/methode/` | Méthode IA : deux outils, journal de bord, ce que j'en retiens, contact (`#contact`) |
| `/404` | Page introuvable (`noindex`) |

Valeurs de la maquette (dans `src/styles/global.css`) :

- Fond `#f2f3ef`, texte `#0e1116`, accent unique bleu `#2347e0` (6,2:1 sur le fond).
- Titres Bricolage Grotesque (500/700/800), corps IBM Plex Sans (400/500/600), libellés IBM Plex Mono (400/500/600). Romain seulement. Servies par le site via l'API Fonts d'Astro : aucune requête vers Google.
- Coins arrondis, surtitres en chasse fixe majuscules, cartes : c'est la maquette, ne pas « corriger ».

**Écarts autorisés par rapport à la maquette**, uniquement pour l'écran étroit : grilles en `minmax(min(Npx, 100%), 1fr)` pour éviter tout débordement horizontal, marges et espacements réduits sous 600 px. À 1280 px, le rendu doit rester celui de la maquette.

**Une seule animation, demandée par l'auteur : le terminal de l'accueil** (`Terminal.astro`). Les commandes se tapent, les sorties apparaissent, en environ 6 s. **Contenu réel uniquement** : de vraies commandes git sur le dépôt et leur vraie sortie (premiers commits, commit `bb17609`), rien d'inventé. Contraintes : texte complet dans le HTML dès le départ, dévoilé seulement par `clip-path` (hauteur fixe, CLS 0 ; **jamais d'opacité sur du texte** : à mi-transparence, son contraste réel tombe à 1,2:1 et Lighthouse l'a compté sur le site en ligne) ; CSS uniquement, aucun JavaScript ; déclarée sous `prefers-reduced-motion: no-preference`, sinon terminal complet et immobile ; curseur qui clignote cinq fois puis s'arrête (WCAG 2.2.2). Ne pas en ajouter d'autre.

## Structure de fichiers

```
src/
├── pages/         index, stage, projets, methode, 404
├── layouts/       Base.astro (head, polices, meta)
├── components/    EnTete, PiedDePage, Bouton, Terminal, Projet,
│                  PipelineCI, SchemaServerless
├── content/projets/   un fichier Markdown par projet
├── content.config.ts  schéma de la collection
├── data/journal.ts    journal de bord et bilan de la page Méthode
└── styles/global.css  variables, base, motifs communs (.conteneur, .surtitre…)
public/            favicon.ico, apple-touch-icon.png, og.png (monogramme OSD)
```

## Contenu

- Le texte reprend les formulations de l'auteur (`contenu-site-a2o.md`) : « Ma spécialisation ne vient pas d'un cursus : je l'ai construite à côté », « je ne connais pas Astro », « c'est là que j'ai le plus à apprendre », « j'ai souvent été le client, celui qui sait ce qu'il veut sans savoir le dire en termes techniques », « ça marche sur ma machine » → « c'est en ligne et ça tient ». Disponibilité : second semestre, 3 mois.
- **Ce qui fait « texte généré », à ne pas réintroduire** : tirets longs (—) dans la prose (virgule, deux-points, parenthèses ou deux phrases à la place) ; titres-slogans et titres à deux-points qui annoncent une révélation ; structures par trois et cartes numérotées 01/02/03 ; paragraphes tous de la même longueur. L'irrégularité est voulue : on doit entendre quelqu'un.
- **Section 04 = le journal de bord de la page Méthode et « Ce que j’en retiens » (`src/data/journal.ts`). Écrite par l’auteur le 3 octobre 2026, intégrée mot pour mot : ne jamais la réécrire, la reformuler ni la compléter.** Seule la typographie est ajustée (apostrophes, espaces insécables, majuscule en début de case). Gabarit : une case pleine largeur, ou deux cases en 1/3 – 2/3 sur écran large ; une case vide ne s’affiche pas. Les encadrés « Difficultés rencontrées » et « Choix techniques » restent vides, donc masqués, tant que l’auteur ne les a pas écrits. Les trois tirets longs de ce texte sont les siens : ne pas y toucher sans son accord.
- Aucun crochet `[ ]` ne doit apparaître sur le site : pas d'emplacement à remplir visible.
- Liens honnêtes : un libellé ne promet pas plus que sa cible (« Voir mon GitHub » pointe vers le profil, pas vers un dépôt).
- `contenu-site-a2o.md` et `notes.md` : fichiers locaux, exclus du dépôt, sauvegardés dans `../ousmane-diop-sauvegardes/`.

## Méthode de travail

- **Commits progressifs**, un par étape logique. L'entreprise peut regarder le dépôt.
- **Tenir `notes.md`** à la racine (local) : chaque difficulté, en quelques lignes. Matière première de la section 04.
- **Vérifier le rendu réel** (captures à 1280 et 390 px) avant de déclarer une page terminée.
- Expliquer chaque décision technique : l'auteur doit pouvoir la défendre.

## Accessibilité et performance

- HTML sémantique, un seul `<h1>` par page, hiérarchie de titres correcte.
- Contrastes WCAG AA, focus visible, navigation au clavier, `aria-current` sur la page courante.
- Balises meta : titre, description, Open Graph, URL canonique sur `ousmane-diop.pages.dev`.
- Référence Lighthouse : 100 / 100 / 100 / 100 sur les quatre pages, mobile et bureau. Toute baisse doit être signalée.
