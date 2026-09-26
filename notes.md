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
La doc Astro précise que `@astrojs/cloudflare` ne sert qu'au rendu à la demande (SSR). Le site est 100 % statique : `npm run build` produit `dist/`, que Cloudflare sert tel quel. Ajouter l'adaptateur aurait été une dépendance sans usage.

**Cloudflare Pages vs Workers : point ouvert.**
La doc Astro indique que Cloudflare recommande désormais Workers (static assets) pour les nouveaux projets, et renvoie vers un guide de migration depuis Pages. Le brief prévoit Pages et l'URL `ousmane-diop.pages.dev`. Décision à prendre au moment du déploiement.

**Astro est en version 7.3.5**, pas la 5 que j'avais en tête. Pour éviter que `create-astro` touche au dossier existant (fichiers de brief, dépôt git), j'ai généré le template `minimal` dans un dossier temporaire et n'en ai copié que la config (`package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`, `.vscode/`).
Écartés du template : son `CLAUDE.md`/`AGENTS.md` génériques, son README, et les favicons au logo Astro (marqueur typique de site généré depuis un template).

**Polices : préconnexion Google Fonts abandonnée au profit de l'API Fonts d'Astro.**
L'API (stable en v7) télécharge Space Grotesk et Inter au build et les sert depuis `dist/_astro/fonts/`. Résultat vérifié : aucune requête vers Google chez le visiteur, `font-display: swap` appliqué par défaut, préchargement via `<Font preload />`. Moins de connexions tierces, et pas d'IP transmise à Google (sujet RGPD connu).

**Vert du drapeau sénégalais refusé pour l'accent.**
#00853F ne fait que 4,45:1 sur le fond #F7F8F6, sous le seuil WCAG AA (4,5:1). Retenu : #0A5C36, 7,59:1.

**Indicateur de progression : version statique pour l'instant.**
Une simple navigation par ancres vers les quatre étapes, sans JavaScript. Le suivi du défilement viendra une fois la structure validée.
