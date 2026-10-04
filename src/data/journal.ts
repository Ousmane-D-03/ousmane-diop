// Section 04 — le journal de bord de la page Méthode IA.
//
// Texte de l'auteur, intégré mot pour mot : ne jamais le réécrire, le
// reformuler ni le compléter. Seule la typographie est ajustée : apostrophes
// courbes, espaces insécables, majuscule en début de case (le libellé est
// séparé du texte).
//
// Une case sans texte ne s'affiche pas ; une étape sans case remplie non
// plus, et les numéros des étapes affichées se suivent.

export interface Case {
	libelle: string;
	// Un paragraphe par élément.
	paragraphes: string[];
	// « gauche » : ce que l'IA a proposé, ce qui a été testé (fond gris).
	// « droite » : ce que l'auteur a fait ou constaté (fond bleu pâle).
	cote: 'gauche' | 'droite';
}

export interface Etape {
	titre: string;
	cases: Case[];
	// Étape « Déployer » : la chaîne git push → build → adresse du site.
	chaine?: boolean;
}

export const journal: Etape[] = [
	{
		titre: 'Lire et découper le brief',
		cases: [
			{
				libelle: 'L’IA a proposé',
				paragraphes: ['Une synthèse de l’offre en trois axes.'],
				cote: 'gauche',
			},
			{
				libelle: 'Ce que j’ai fait',
				paragraphes: [
					'Relu l’offre moi-même, décidé l’angle — me présenter comme quelqu’un qui vient du backend plutôt que comme un développeur front, et assumer ce que je ne sais pas encore faire.',
				],
				cote: 'droite',
			},
		],
	},
	{
		titre: 'Concevoir',
		cases: [
			{
				libelle: 'L’IA a proposé',
				paragraphes: ['Des maquettes de pages et une structure de contenus.'],
				cote: 'gauche',
			},
			{
				libelle: 'Ce que j’ai fait',
				paragraphes: [
					'Rejeté une version entière parce qu’elle faisait trop IA. Refusé les soulignements qui se tracent à l’apparition, devenus un tic des sites générés. Demandé que la boucle du cycle DevOps passe en grand plutôt qu’en petit logo dans la navigation, puis décidé de la retirer : la page tenait sans elle.',
				],
				cote: 'droite',
			},
		],
	},
	{
		titre: 'Développer',
		cases: [
			{
				libelle: 'Ce qui a coincé',
				paragraphes: [
					'La barre de progression restait pleine dès le haut de page alors que le code source était correct. C’est au build que le minifieur avait fusionné deux déclarations CSS en une forme que le navigateur rejette en silence, sans erreur dans la console. Le problème n’était visible qu’en lisant le style réellement appliqué dans le navigateur. Corrigé en écrivant les propriétés une par une.',
					'La transition entre les pages a demandé de la ralentir dix fois pour voir trois défauts invisibles à vitesse normale : le nom qui se dédoublait, l’accroche aussi, et un glissement saccadé causé par une différence d’interligne entre les deux pages.',
				],
				cote: 'droite',
			},
		],
	},
	{
		titre: 'Vérifier',
		cases: [
			{
				libelle: 'Ce que j’ai testé',
				paragraphes: ['Lighthouse, navigation au clavier, affichage mobile, liens.'],
				cote: 'gauche',
			},
			{
				libelle: 'Ce que ça a donné',
				paragraphes: [
					'Une capture « mobile » à 390 px montrait du texte coupé — en réalité Edge en mode headless impose une largeur minimale de 504 px et rogne l’image. Le défaut venait de l’outil de test, pas du site. En relisant les règles de marque des logos, j’ai constaté que trois d’entre eux (Docker, GitHub Actions, PostgreSQL) étaient affichés en gris, ce que leurs règles interdisent : je les ai tous retirés. Et le vert du drapeau sénégalais (#00853F), prévu comme couleur d’accent, atteint 4,45:1 sur le fond — sous le seuil de 4,5:1 exigé pour du texte. J’ai retenu un vert plus profond, #0A5C36, à 7,59:1.',
				],
				cote: 'droite',
			},
		],
	},
	{
		titre: 'Déployer',
		chaine: true,
		cases: [
			{
				libelle: 'Ce qui a coincé',
				paragraphes: [
					'Après neuf commits poussés, le site en ligne montrait toujours l’ancienne version. Cloudflare surveillait la branche master alors que je poussais sur main. Rien dans les journaux ne le disait : il fallait aller lire le réglage « Branch control » dans la configuration du Worker.',
				],
				cote: 'droite',
			},
		],
	},
];

// En bas de page, hors du journal.
export const retiens: Case = {
	libelle: 'Ce que j’en retiens',
	paragraphes: [
		'Mon travail a surtout consisté à décider ce qu’on gardait, puis à contrôler ce que le navigateur affichait vraiment, pas ce que le code promettait. L’IA produit vite du code qui a l’air juste, et c’est justement ce qui oblige à vérifier.',
	],
	cote: 'droite',
};

// Les deux encadrés de la maquette, en attente de texte : vides, ils ne
// s'affichent pas.
export const bilan: Case[] = [
	{ libelle: 'Difficultés rencontrées', paragraphes: [], cote: 'gauche' },
	{ libelle: 'Choix techniques', paragraphes: [], cote: 'gauche' },
];
