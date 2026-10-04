---
titre: API de traduction serverless
ordre: 2
pastilles:
  - { texte: AWS · 2025, ton: gris }
illustration: serverless
---

API REST serverless sur AWS : Lambda en Python, API Gateway, DynamoDB pour le cache, CloudWatch pour le monitoring. Déploiement en Infrastructure as Code avec SAM et CloudFormation.

Le cache n’était pas un choix esthétique : les appels répétés à l’API externe étaient le principal poste de coût. En architecture serverless, une décision de conception est aussi une décision de facture.
