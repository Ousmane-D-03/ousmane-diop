---
titre: API de traduction serverless
angle: cloud et Infrastructure as Code
mission: cloud, automatisation, optimisation des coûts
ordre: 3
stack: [AWS Lambda, Python, API Gateway, DynamoDB, CloudWatch, SAM, CloudFormation]
---

API REST serverless sur AWS&nbsp;: Lambda en Python, API Gateway, DynamoDB pour le cache, CloudWatch pour le monitoring. Déploiement en Infrastructure as Code avec SAM et CloudFormation.

Le cache n’était pas un choix esthétique&nbsp;: les appels répétés à l’API externe étaient le principal poste de coût. En architecture serverless, une décision de conception est aussi une décision de facture.
