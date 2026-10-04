---
titre: Xëy Invest
ordre: 1
vedette: true
pastilles:
  - { texte: Projet personnel, ton: sombre }
  - { texte: 2025 – 2026, ton: gris }
stack: [FastAPI, PostgreSQL, Redis, Docker, GitHub Actions]
illustration: pipeline
captures:
  - src: ../../assets/projets/xey-historique-echecs.png
    alt: "Historique des exécutions du workflow ci.yml de Xëy Invest sur GitHub Actions, le 17 juillet : trois échecs (« espace probleme : yaml syntaxe », « trivy : parametres », « coreection trivy: syntaxe/format »), puis la réussite « trivy : ref valide »."
    legende: "Trois échecs avant la réussite : la syntaxe YAML, les paramètres de Trivy, puis son format."
  - src: ../../assets/projets/xey-pipeline-reussi.png
    alt: "Exécution n° 15 du pipeline Xëy Invest sur GitHub Actions, réussie : quatre jobs au vert (backend_ci, frontend_ci, security, docker_build), durée totale 2 min 23 s."
    legende: "L’exécution réussie : quatre jobs, 2 min 23 s."
lien: { libelle: Voir le code sur GitHub, url: https://github.com/Ousmane-D-03/xey_invest }
---

Plateforme de financement participatif inspirée de la tontine sénégalaise. Backend FastAPI, PostgreSQL, Redis, conteneurisation Docker. Pipeline GitHub Actions avec tests automatisés, build et publication d’images, et contrôles de sécurité intégrés (Gitleaks, Bandit, Trivy).

Prochaine étape : le déploiement continu vers un serveur de production.
