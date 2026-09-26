# Contenu du site de candidature — Alpha to Omega

> Document de travail. Sections 1 à 3 rédigées, à relire et corriger.
> Section 4 : structure fournie, **à écrire de ta main**.

---

## Section 1 — Qui je suis

**Titre de page / accroche :**

> Ousmane Sarr Diop
> Je viens du backend et de l'infrastructure. Je veux apprendre le web du côté de la production.

**Corps :**

Je suis étudiant en Master Informatique à l'Université Toulouse III — Paul Sabatier, parcours Sciences du Logiciel. Avant Toulouse, j'ai étudié à Orléans et obtenu ma licence à Bordeaux. Je suis sénégalais, le wolof et le français sont mes deux langues maternelles.

Ma spécialisation ne vient pas d'un cursus : je l'ai construite à côté. Quand j'ai constaté que ma formation ne couvrait pas les sujets qui m'intéressaient vraiment — l'infrastructure, l'automatisation, la sécurité applicative — j'ai financé et suivi le DevOps Bootcamp de TechWorld with Nana, je prépare la certification AWS Solutions Architect Associate, et j'ai mené plusieurs projets de bout en bout pour mettre tout ça en pratique.

Ce que j'aime dans ce métier, c'est le moment où quelque chose passe de « ça marche sur ma machine » à « c'est en ligne et ça tient ». Le reste — le langage, le framework — s'apprend.

---

## Section 2 — Ce que j'ai compris de vos missions

**Intro de section :**

Votre offre décrit trois blocs de missions. Voici comment je les lis, ce que j'apporte sur chacun, et ce que je ne sais pas encore faire.

### Bloc 1 — Concevoir, développer et faire évoluer des sites web

*C'est le cœur du stage, et c'est là que j'ai le plus à apprendre.*

J'ai développé des interfaces : une application de traitement d'images avec un front Vue.js et TypeScript sur un backend Spring Boot, un CMS complet en Laravel pour une entreprise de conseil. Je sais lire du HTML, du CSS, du JavaScript et du TypeScript, structurer une application en couches, consommer et exposer des API REST, et travailler avec Git et GitHub au quotidien.

Mais je ne me suis jamais spécialisé côté front, et je ne connais pas Astro. Votre offre dit qu'il peut s'apprendre pendant le stage — c'est précisément ce qui m'intéresse. Ce site est d'ailleurs mon premier vrai exercice dans cette direction.

Il y a un point sur lequel j'arrive avec un angle particulier : le recueil du besoin. J'ai souvent été le client — celui qui sait ce qu'il veut sans savoir le formuler en termes techniques. Je connais la frustration des deux côtés de cette conversation. Apprendre à être de l'autre côté, à reformuler un besoin flou en périmètre clair, fait partie de ce que je viens chercher.

### Bloc 2 — Déploiement, exploitation et automatisation

*C'est ce que je fais déjà.*

Sur mes projets, la chaîne de livraison n'est pas une étape finale mais une partie de la conception. Sur Xëy Invest, une plateforme de financement participatif que j'ai développée de bout en bout, j'ai construit une pipeline GitHub Actions complète : tests automatisés, build et publication d'images Docker, et trois contrôles de sécurité exécutés à chaque commit — détection de secrets exposés, analyse statique du code, scan de vulnérabilités des images.

J'ai aussi déployé une API serverless sur AWS (Lambda, API Gateway, DynamoDB, CloudWatch) en Infrastructure as Code, et un site statique sur S3 avec distribution CloudFront, certificat SSL et déploiement automatisé. Lors d'un stage au ministère de l'Éducation nationale du Sénégal, j'ai écrit des scripts d'automatisation Linux pour remplacer des tâches faites à la main, et encadré des stagiaires de licence sur ces sujets.

Les briques que vous mentionnez et que je n'ai pas encore pratiquées : Cloudflare en production, la gestion de noms de domaine et de certificats sur des sites clients, et le diagnostic d'incidents sur des systèmes que je n'ai pas construits moi-même. C'est différent de déboguer son propre code, et c'est une des choses que je veux apprendre ici.

### Bloc 3 — Gouvernance numérique et organisation IT

*Environ 25 % du stage, et ça ne me dérange pas du tout — au contraire.*

Recenser les applications et services d'une organisation, identifier qui en est responsable, documenter les données et les dépendances, transformer un état des lieux en actions priorisées : c'est un travail de modélisation avant d'être un travail de documentation. Il faut comprendre un système existant, poser les bonnes questions, et le rendre lisible.

C'est exactement la démarche que j'ai suivie sur SunuDossier, un projet de dossier patient partagé entre établissements de santé que je conçois actuellement. Avant d'écrire une ligne de code, j'ai modélisé l'ensemble en UML — diagrammes de classes et de cas d'utilisation — en explicitant les rôles, les droits d'accès, la journalisation des accès aux données sensibles et les dépendances entre modules. La contrainte de confidentialité des données de santé m'a obligé à traiter ces questions dès la conception, pas après.

Je ne prétends pas connaître le RGPD ni pouvoir produire un avis juridique. Votre offre est claire là-dessus : il s'agit d'apprendre à poser les bonnes questions et à structurer l'existant. C'est un travail que j'aime.

---

## Section 3 — Mes projets, mis en regard de vos missions

> Présentés par la mission qu'ils éclairent, pas par leur stack.

### Jokko — piloter une IA sur un projet complet
**En lien avec : l'IA comme outil de travail**

Une application modulaire pour le quotidien économique sénégalais : carnet de crédit du commerçant, tontine, transferts de la diaspora, démarches administratives, prix agricoles, suivi de santé familial. Fonctionnement hors-ligne avec synchronisation, interface en wolof, accès USSD pour les téléphones basiques.

Neuf cycles de développement, une architecture que j'ai conçue et une IA aux commandes du code. Ce que j'en retiens n'est pas le volume produit, mais la discipline que ça demande : relire, vérifier sur un vrai appareil, refuser un rapport trop optimiste.

*Projet en cours.*

### Xëy Invest — intégration continue et sécurité applicative
**En lien avec : CI/CD, sécurité, logs**

Plateforme de financement participatif inspirée de la tontine sénégalaise. Backend FastAPI, PostgreSQL, Redis, conteneurisation Docker. Pipeline GitHub Actions avec tests automatisés, build et publication d'images, et contrôles de sécurité intégrés (Gitleaks, Bandit, Trivy).

→ [Code sur GitHub]

### API de traduction serverless — cloud et Infrastructure as Code
**En lien avec : cloud, automatisation, optimisation des coûts**

API REST serverless sur AWS : Lambda en Python, API Gateway, DynamoDB pour le cache, CloudWatch pour le monitoring. Déploiement en Infrastructure as Code avec SAM et CloudFormation.

Le cache n'était pas un choix esthétique : les appels répétés à l'API externe étaient le principal poste de coût. En architecture serverless, une décision de conception est aussi une décision de facture.

### SunuDossier — cadrer avant de coder
**En lien avec : cartographie, gouvernance, documentation**

Dossier patient partagé entre établissements de santé publics. Modélisation UML complète avant tout développement : classes, cas d'utilisation, rôles et droits d'accès, journalisation des accès, mode hors-ligne.

*Phase de conception.*

### Traitement d'images — développement web
**En lien avec : développement d'interfaces**

Application de gestion et de traitement d'images avec recherche par similarité visuelle. Backend Spring Boot et PostgreSQL, front Vue.js et TypeScript.

### Stage DevOps — automatisation Linux
**En lien avec : automatisations simples, documentation**

Ministère de l'Éducation nationale du Sénégal. Scripts d'automatisation pour la gestion de fichiers et la configuration système, en remplacement de tâches manuelles. Encadrement technique de stagiaires de licence et animation d'une présentation d'introduction à Linux.

---

## Section 4 — Comment j'ai construit ce site

> **À écrire de ta main.** Voici les points à couvrir et des questions pour t'aider,
> mais les phrases doivent être les tiennes. C'est le seul endroit du site où
> ça compte vraiment.

### Point 1 — Quels outils, à quelles étapes

À couvrir factuellement : quel(s) outil(s) d'IA, et pour quoi exactement.
Distingue les étapes : réflexion sur la structure, rédaction du contenu,
écriture du code, design, résolution de problèmes, déploiement.

*Question pour t'aider :* si tu devais dire à quel pourcentage chaque partie
du site vient de toi et de l'IA, que dirais-tu — et pourquoi ce n'est pas
la bonne façon de poser la question ?

### Point 2 — Ce que tu as repris à la main, et pourquoi

C'est le point le plus important de la section.

*Questions pour t'aider :*
- Quelle proposition de l'IA as-tu refusée, et sur quoi t'es-tu basé pour trancher ?
- Y a-t-il un moment où le rendu était correct techniquement mais ne te convenait pas ?
- Qu'est-ce que tu as dû corriger après avoir vu le résultat en vrai ?

### Point 3 — Ce que tu as appris de ton expérience avec l'IA (Jokko)

Deux moments concrets que tu peux raconter :

- **L'hypothèse fausse.** Sur Jokko, une direction produit entière a été
  construite sur l'idée de financer des smartphones via les boutiques de
  quartier. Tu as fait remarquer que les boutiquiers ne vendent pas de
  téléphones — ce qui était exact, et invalidait tout le raisonnement.
  *Ce que ça t'a appris sur la vérification des propositions d'une IA ?*

- **Le rapport contre la réalité.** Tu as systématiquement refusé de valider
  un module sur un rapport écrit, en exigeant de le voir tourner sur ton
  téléphone. C'est comme ça qu'ont été trouvés une grille de modules illisible
  et un statut de cotisation qui ne se mettait pas à jour — deux choses
  qu'aucun test automatisé n'avait vues.
  *Pourquoi as-tu insisté là-dessus ?*

### Point 4 — Les difficultés rencontrées sur ce site

Optionnel selon le doc, mais fortement recommandé : c'est ici que se voit
la différence entre quelqu'un qui a généré un site et quelqu'un qui l'a
construit. Note au fur et à mesure ce qui coince réellement pendant la
réalisation — un problème de déploiement Cloudflare, une notion Astro
mal comprise, un choix technique abandonné.

**Conseil :** tiens un carnet pendant la construction. Ces notes valent
plus qu'un souvenir reconstitué à la fin.

---

## Éléments pratiques à ne pas oublier

- Liens : GitHub, LinkedIn
- Mention des outils IA utilisés (obligatoire)
- Le site doit être en ligne sur Cloudflare Pages au moment de la candidature
- Transmission via candidatures.alpha2omegaconsulting.com
- Contact : François Rodriguez
- Un historique de commits progressif plutôt qu'un seul commit « site complet »
