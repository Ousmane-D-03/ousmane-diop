# CLAUDE.md — Site de candidature Alpha to Omega

## Ce qu'est ce projet

Un site personnel qui **constitue** une candidature de stage chez Alpha to Omega (A2O), une entreprise toulousaine spécialisée web + IA. L'entreprise ne demande ni CV ni lettre de motivation : le site EST la candidature.

Le site sera déployé sur Cloudflare Pages à l'adresse `ousmane-diop.pages.dev` et cette URL sera transmise à l'entreprise.

**Auteur :** Ousmane Sarr Diop, étudiant en Master 1 Informatique (parcours Sciences du Logiciel) à l'Université Toulouse III — Paul Sabatier. Profil backend / DevOps / sécurité applicative.

## Ce que l'entreprise évalue

Ces critères viennent de leurs documents officiels. Ils orientent chaque décision :

1. **Transformer un objectif ouvert en résultat clair.** Le brief est volontairement flou (structure, design, nombre de pages libres). Des choix assumés valent mieux qu'un site qui essaie de tout couvrir.
2. **Comprendre leurs missions**, pas réciter des motivations génériques.
3. **Utiliser l'IA avec un regard critique** — savoir reprendre le travail manuellement quand il faut.
4. **Aller jusqu'au déploiement.** Ils veulent « vérifier que vous savez passer d'un projet local à une application accessible sur Internet ».

Conséquence directe : **un site qui sent le template généré par IA est un échec pour cet employeur précisément.** C'est le critère le plus important de ce fichier.

## Stack imposée

- **Astro** — c'est le framework maison de l'entreprise. L'auteur ne le connaît pas encore ; c'est assumé et fait partie de l'exercice.
- Déploiement **Cloudflare Pages** (build déclenché au push sur `main`, commande `npm run build`, sortie `dist/`).
- Pas de framework CSS lourd (pas de Bootstrap, pas de Tailwind sauf demande explicite). CSS écrit à la main, ou les styles scopés d'Astro.
- Pas de base de données, pas de backend. Site statique.

**Important :** la connaissance d'Astro dans les données d'entraînement peut être en retard sur la version actuelle. Vérifier la documentation à jour avant d'utiliser une API Astro, en particulier les collections de contenu et l'adaptateur Cloudflare.

## Direction visuelle — le pipeline

Le site est structuré comme un **pipeline de livraison**, en quatre étapes numérotées. Ce n'est pas un thème décoratif : l'auteur vient du DevOps, et le slogan de l'entreprise est « De A à Z, un seul interlocuteur responsable du résultat ». La forme raconte le fond.

```
01 · Qui je suis  →  02 · Vos missions  →  03 · Mes projets  →  04 · Ma démarche
```

Une seule page, quatre temps, avec un indicateur d'avancement discret qui suit le défilement. **C'est le seul élément interactif du site.**

### Décisions arrêtées

| Élément | Choix |
|---|---|
| Fond | Clair (la majorité des portfolios dev sont sombres — se démarquer) |
| Titres | Space Grotesk (Google Fonts) |
| Corps | Inter (Google Fonts) |
| Accent | Un seul : vert profond. Double lecture — drapeau sénégalais sans faire du drapeau une décoration, et « build passing » d'une CI |
| Structure | Progression verticale en étapes, pas des sections empilées |
| Animation | Une seule dans tout le site |

### Interdits explicites

Ces éléments sont la signature du rendu « IA générique ». Ne jamais les produire :

- Cartes arrondies identiques alignées en grille
- Eyebrow en majuscules au-dessus des titres (`NOS SERVICES`)
- Flèches `→` décoratives en fin de lien ou de carte
- Dégradés, glassmorphism, ombres portées molles, effets de flou
- Icônes génériques : fusée, ampoule, chevrons de code, engrenage
- Le couple fond crème + accent terracotta
- Plusieurs animations, effets d'apparition sur chaque section
- Texte centré sur toute la largeur

Si une proposition ressemble à un template de portfolio développeur, elle est à rejeter.

## Structure de fichiers attendue

```
src/
├── pages/
│   └── index.astro          # page unique
├── layouts/
│   └── Base.astro           # <head>, polices, styles globaux
├── components/
│   ├── Etape.astro          # un temps du pipeline
│   ├── Progression.astro    # indicateur de défilement
│   └── Projet.astro         # une fiche projet
├── content/
│   └── projets/             # collection de contenu — un fichier par projet
└── styles/
    └── global.css           # variables, typographie, reset
```

Les six projets sont des données, pas du HTML dupliqué : les définir en collection de contenu et itérer dessus. Champs : titre, mission liée, description, stack, statut, lien éventuel.

## Contenu

Le contenu rédigé se trouve dans `contenu-site-a2o.md` à la racine du projet. Il fait autorité — ne pas le réécrire, le mettre en forme.

Trois points de vigilance sur le contenu :

- La section « 04 · Ma démarche » sera **écrite par l'auteur lui-même**, pas générée. Prévoir l'emplacement, ne pas rédiger le texte. C'est le seul endroit du site où sa voix compte vraiment, et c'est précisément ce que l'entreprise évalue.
- Les faiblesses sont assumées volontairement dans le texte (« je ne connais pas Astro », « c'est là que j'ai le plus à apprendre » sur le front). Ne pas les adoucir ni les supprimer.
- Les projets sont présentés **par la mission qu'ils éclairent**, pas par leur stack.

## Méthode de travail

- **Commits progressifs.** Un historique qui montre une construction itérative, pas un unique commit « site complet ». L'entreprise peut regarder le dépôt.
- **Tenir `notes.md`** à la racine : à chaque difficulté rencontrée (problème de déploiement, notion Astro mal comprise, choix abandonné), trois lignes. Ces notes alimenteront la section 04.
- **Vérifier le rendu réel** avant de déclarer une section terminée. Pas seulement la validité du code.
- Expliquer chaque décision technique au fil de l'eau — l'auteur doit pouvoir la défendre sans l'avoir subie.

## Accessibilité et performance

L'offre mentionne explicitement « optimisations de performance, d'accessibilité, de SEO technique ». Le site doit être exemplaire sur ces points, c'est un signal en soi :

- HTML sémantique, un seul `<h1>`, hiérarchie de titres correcte
- Contrastes conformes WCAG AA (vérifier l'accent vert sur fond clair)
- Navigation au clavier fonctionnelle, focus visible
- L'animation respecte `prefers-reduced-motion`
- Polices chargées avec `font-display: swap`, préconnexion à Google Fonts
- Balises meta : titre, description, Open Graph
- Pas de JavaScript inutile — Astro n'en envoie aucun par défaut, garder cet avantage
