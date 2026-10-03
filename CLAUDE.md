# CLAUDE.md — Site de candidature Alpha to Omega

## Ce qu'est ce projet

Un site personnel qui **constitue** une candidature de stage chez Alpha to Omega (A2O), une entreprise toulousaine spécialisée web + IA. L'entreprise ne demande ni CV ni lettre de motivation : le site EST la candidature.

Le site est déployé sur **Cloudflare Workers** à l'adresse `https://ousmane-diop.ousmanesarrd.workers.dev` (pas Pages : ne jamais écrire « Cloudflare Pages » ni `pages.dev`).

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
- Déploiement Cloudflare Workers, déclenché au push sur `main` (configuration côté Cloudflare : aucun `wrangler.jsonc` ni workflow dans le dépôt). Site statique, **pas d'adaptateur Cloudflare**.
- CSS écrit à la main, styles scopés d'Astro. Pas de framework CSS.
- Pas de base de données, pas de backend, **aucun JavaScript côté client**.

## Direction visuelle — la maquette

Depuis le 3 octobre 2026, le site suit une maquette de quatre pages, validée par l'auteur **telle quelle**, direction visuelle et contenu compris. Le fichier d'origine (export HTML) est hors du dépôt, dans `../ousmane-diop-sauvegardes/`. L'ancienne version (pipeline vertical, boucle DevOps, mots wolof) reste dans l'historique git, jusqu'au commit `e732241`.

Pages :

| Adresse | Page |
|---|---|
| `/` | Accueil : titre, terminal, en bref, qui je suis, pourquoi ce stage, appel final |
| `/stage/` | Ma lecture de l'offre : les trois axes, ma lecture du cadre, mes questions |
| `/projets/` | Trois projets (collection de contenu), expériences, en apprentissage |
| `/methode/` | Méthode IA : outils, journal de bord, bilan, contact (`#contact`) |
| `/404` | Page introuvable (`noindex`) |

Valeurs de la maquette (dans `src/styles/global.css`) :

- Fond `#f2f3ef`, texte `#0e1116`, accent unique bleu `#2347e0` (6,2:1 sur le fond).
- Titres Bricolage Grotesque (500/700/800), corps IBM Plex Sans (400/500/600), libellés IBM Plex Mono (400/500/600). Romain seulement. Servies par le site via l'API Fonts d'Astro : aucune requête vers Google.
- Coins arrondis, surtitres en chasse fixe majuscules, cartes : c'est la maquette, ne pas « corriger ».

**Écarts autorisés par rapport à la maquette**, uniquement pour l'écran étroit : grilles en `minmax(min(Npx, 100%), 1fr)` pour éviter tout débordement horizontal, marges et espacements réduits sous 600 px. À 1280 px, le rendu doit rester celui de la maquette.

**Une seule animation, demandée par l'auteur : le terminal de l'accueil** (`Terminal.astro`). Les commandes se tapent, les sorties apparaissent, en environ 5 s. Contraintes : texte complet dans le HTML dès le départ, dévoilé seulement par `clip-path` et `opacity` (hauteur fixe, CLS 0) ; CSS uniquement, aucun JavaScript ; déclarée sous `prefers-reduced-motion: no-preference`, sinon terminal complet et immobile ; curseur qui clignote cinq fois puis s'arrête (WCAG 2.2.2). Ne pas en ajouter d'autre.

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

- Le contenu fait foi tel qu'il est dans la maquette, corrigé des faits validés par l'auteur (Workers et non Pages, disponibilité : second semestre, 3 mois).
- **Section 04 = le journal de bord et le bilan de la page Méthode (`src/data/journal.ts`).** Texte écrit par l'auteur, intégré mot pour mot : **ne jamais l'écrire, le reformuler ni le compléter.** Une case vide ne s'affiche pas ; une étape sans case remplie non plus. Seuls textes présents qui ne sont pas de lui : ceux de la maquette (étapes « Maquetter les pages » et « Vérifier », colonne de gauche).
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
- Balises meta : titre, description, Open Graph, URL canonique sur l'adresse Workers.
- Référence Lighthouse : 100 / 100 / 100 / 100 sur les quatre pages, mobile et bureau. Toute baisse doit être signalée.
