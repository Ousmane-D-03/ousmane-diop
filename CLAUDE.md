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

- **Astro 7** — c'est le framework maison de l'entreprise. L'auteur ne le connaît pas encore ; c'est assumé et fait partie de l'exercice.
- Node 24 (`.node-version`), Astro exige ≥ 22.12.
- Déploiement **Cloudflare Pages** (build déclenché au push sur `main`, commande `npm run build`, sortie `dist/`).
- Pas de framework CSS lourd (pas de Bootstrap, pas de Tailwind sauf demande explicite). CSS écrit à la main, ou les styles scopés d'Astro.
- Pas de base de données, pas de backend. Site statique : **pas d'adaptateur Cloudflare** (il ne sert qu'au rendu à la demande).

**Important :** la connaissance d'Astro dans les données d'entraînement peut être en retard sur la version actuelle. Vérifier la documentation à jour avant d'utiliser une API Astro, en particulier les collections de contenu et l'adaptateur Cloudflare.

## Direction visuelle — le pipeline

Le site est structuré comme un **pipeline de livraison**, en quatre étapes numérotées. Ce n'est pas un thème décoratif : l'auteur vient du DevOps, et le slogan de l'entreprise est « De A à Z, un seul interlocuteur responsable du résultat ». La forme raconte le fond.

```
01 · Qui je suis  →  02 · Vos missions  →  03 · Mes projets  →  04 · Ma démarche
```

Deux niveaux :

- **`/` — accueil.** Un écran plein : le nom, l'accroche et le bouton « Découvrir » en un seul bloc centré (texte aligné à gauche). En fond, trois mots wolof (Jàng, Liggéey, Jokko), cinq fois chacun à des tailles différentes, dérivent lentement (`Derive.astro`). C'est la seule page avec une décoration en mouvement.
- **`/candidature/` — contenu.** Les quatre temps du pipeline, avec la navigation collante. L'indicateur d'avancement est **une petite boucle de l'infini (cycle DevOps)** dans la navigation collante, à droite : un point la parcourt selon la position de lecture et la portion parcourue se colore en vert. Indicateur, sans libellés, **pas un plan de contenu** : les quatre sections ne sont pas associées aux étapes du cycle. Pas d'illustration d'ouverture (une grande boucle avec les huit étapes a été essayée puis retirée) : la page s'ouvre sur le nom, l'accroche et la navigation, puis directement sur la section 01.
  Plus de trait vertical ni de jalons. **Page calme** : c'est celle qu'ils lisent pour juger la compréhension des missions. La hiérarchie passe par des procédés statiques :
  - **Exergues** (`Exergue.astro`) : deux ou trois phrases du texte, reprises mot pour mot en grande échelle, sur toute la largeur de la grille. Placés *avant* leur phrase source (ils l'annoncent, ils ne la répètent pas juste après). `aria-hidden` : la phrase est déjà dans le texte.
  - **Surlignage** statique vert pâle (`<mark>`, `#cfe7d7`) sur quelques mots de l'étape 02.
  - **Étiquette forte** pour « En lien avec : … » (fond vert, texte clair, coins carrés).
  - **Mots wolof** : composant `Wolof.astro` (mot en accent, `lang="wo"`, traduction visible). Aucun mot wolof n'est dans le texte actuel : à utiliser seulement dans un texte écrit par l'auteur.
- **`/404`** : page introuvable (`404.astro`, `noindex`). Sans elle, Cloudflare Pages servirait l'accueil avec un code 200 pour toute adresse inconnue.

### Mouvement : ce qui existe, et rien d'autre

| Où | Quoi | Technique |
|---|---|---|
| Accueil | Dérive continue des mots de fond | CSS (`transform`), aucun JS |
| Contenu (navigation) | Point et trait qui parcourent la petite boucle selon le défilement | CSS (`animation-timeline: scroll()` sur `offset-distance` et `stroke-dashoffset`), aucun JS. Secours (mouvement réduit ou navigateur sans animation liée au défilement) : le script de `Progression.astro` place le point au début de la section en cours, sans animation |
| Entre les deux pages | Transition d'entrée (0,7 s, courbe douce) : le nom et l'accroche glissent, le reste apparaît en fondu | Transitions de vue natives (`@view-transition`), aucun JS, pas de `<ClientRouter />`. Le nom et l'accroche doivent garder **les mêmes proportions sur les deux pages** (même interligne, même coupure), sinon le glissement saute |

Tous sont désactivés par `prefers-reduced-motion: reduce` (la dérive s'arrête, éléments visibles et fixes ; le point de la boucle se place par section, sans animation ; la navigation est instantanée). **Ne pas en ajouter d'autre.**

Seul JavaScript du site : `Progression.astro` (étape active en `aria-current`, position de secours du point). Positions des sections mesurées dans un `ResizeObserver` et mémorisées ; au défilement, seul `scrollY` est lu (aucun calcul de mise en page forcé).

### Décisions arrêtées

| Élément | Choix |
|---|---|
| Fond | Clair (la majorité des portfolios dev sont sombres — se démarquer) |
| Titres | Space Grotesk, auto-hébergée via l'API Fonts d'Astro (aucune requête vers Google) |
| Corps | Inter, idem |
| Accent | Un seul : vert profond. Double lecture — drapeau sénégalais sans faire du drapeau une décoration, et « build passing » d'une CI |
| Accent (valeur) | `#0a5c36` : 7,59:1 sur le fond. Le vert du drapeau `#00853f` est refusé (4,45:1, sous AA) |
| Structure | Progression verticale en étapes, pas des sections empilées. Grille éditoriale sur bureau : colonne étroite des numéros, colonne du texte ; une colonne en mobile |
| Rythme | Écart entre étapes (6 à 9rem) nettement plus grand qu'à l'intérieur d'une étape |
| Coins | Carrés partout (bouton, étiquettes) |
| Mouvement | Ceux listés ci-dessus, pas plus |
| Logos d'outils | **Aucun**, nulle part. Les règles de marque de Docker, GitHub, PostgreSQL, Spring interdisent de les recolorer (Python : accord préalable ; Vue.js : licence CC BY-NC-SA) ; en couleurs de marque, ils formeraient une constellation de logos. Ne pas en réintroduire |
| Interdits d'animation (page de contenu) | Soulignement qui se trace, texte lettre par lettre (typewriter), révélation au défilement |

### Interdits explicites

Ces éléments sont la signature du rendu « IA générique ». Ne jamais les produire :

- Cartes arrondies identiques alignées en grille
- Eyebrow en majuscules au-dessus des titres (`NOS SERVICES`)
- Flèches `→` décoratives en fin de lien ou de carte
- Dégradés, glassmorphism, ombres portées molles, effets de flou
- Icônes génériques : fusée, ampoule, chevrons de code, engrenage
- Le couple fond crème + accent terracotta
- Toute animation au-delà de celles listées, et en particulier les effets d'apparition sur chaque section au défilement
- Texte centré sur toute la largeur

Si une proposition ressemble à un template de portfolio développeur, elle est à rejeter.

## Structure de fichiers attendue

```
src/
├── pages/
│   ├── index.astro          # accueil plein écran
│   ├── candidature.astro    # les quatre étapes (/candidature/)
│   └── 404.astro            # page introuvable (noindex)
├── layouts/
│   └── Base.astro           # <head>, polices, styles globaux
├── components/
│   ├── Derive.astro         # fond animé de l'accueil (mots wolof)
│   ├── Etape.astro          # un temps du pipeline
│   ├── Progression.astro    # navigation collante + boucle du cycle DevOps
│   ├── Exergue.astro        # phrase clé en grande échelle
│   ├── Projet.astro         # une fiche projet
│   └── Wolof.astro          # mot wolof + traduction visible
├── content/
│   └── projets/             # collection de contenu — un fichier par projet
├── content.config.ts        # schéma de la collection (loader glob)
└── styles/
    └── global.css           # variables, typographie, reset, transitions de vue
public/                      # favicon et apple-touch-icon (la boucle), og.png (nom, accroche, boucle avec les huit étapes)
```

Les six projets sont des données, pas du HTML dupliqué : les définir en collection de contenu et itérer dessus. Champs : titre, angle, mission liée, ordre, stack, statut, lien éventuel ; la description est le corps du fichier Markdown. La stack est gardée dans les données mais **n'est pas affichée** (les projets sont présentés par mission).

## Contenu

Le contenu rédigé se trouve dans `contenu-site-a2o.md` à la racine du projet (fichier local, exclu du dépôt par `.gitignore`). Il fait autorité — ne pas le réécrire, le mettre en forme.

Trois points de vigilance sur le contenu :

- La section « 04 · Ma démarche » sera **écrite par l'auteur lui-même**, pas générée. Prévoir l'emplacement, ne pas rédiger le texte. C'est le seul endroit du site où sa voix compte vraiment, et c'est précisément ce que l'entreprise évalue.
- Les faiblesses sont assumées volontairement dans le texte (« je ne connais pas Astro », « c'est là que j'ai le plus à apprendre » sur le front). Ne pas les adoucir ni les supprimer.
- Les projets sont présentés **par la mission qu'ils éclairent**, pas par leur stack.

## Méthode de travail

- **Commits progressifs.** Un historique qui montre une construction itérative, pas un unique commit « site complet ». L'entreprise peut regarder le dépôt.
- **Tenir `notes.md`** à la racine (fichier local, exclu du dépôt) : à chaque difficulté rencontrée (problème de déploiement, notion Astro mal comprise, choix abandonné), trois lignes. Ces notes alimenteront la section 04.
- **Vérifier le rendu réel** avant de déclarer une section terminée. Pas seulement la validité du code.
- Expliquer chaque décision technique au fil de l'eau — l'auteur doit pouvoir la défendre sans l'avoir subie.

## Accessibilité et performance

L'offre mentionne explicitement « optimisations de performance, d'accessibilité, de SEO technique ». Le site doit être exemplaire sur ces points, c'est un signal en soi :

- HTML sémantique, un seul `<h1>`, hiérarchie de titres correcte
- Contrastes conformes WCAG AA (vérifier l'accent vert sur fond clair)
- Navigation au clavier fonctionnelle, focus visible
- Chaque mouvement respecte `prefers-reduced-motion`
- Les éléments décoratifs (fond de l'accueil) sont `aria-hidden`, et les mots y sont écrits en CSS (`content: attr(data-mot)`), pas dans le HTML
- Polices auto-hébergées (API Fonts d'Astro), `font-display: swap`, préchargement du romain seulement
- Balises meta : titre, description, Open Graph
- Pas de JavaScript inutile — Astro n'en envoie aucun par défaut, garder cet avantage
- Référence Lighthouse : 100 / 100 / 100 / 100 sur les deux pages, mobile et bureau. Toute modification qui fait baisser un score doit être signalée
