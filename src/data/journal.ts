// Section 04 — le journal de bord de la page Méthode IA.
//
// Texte de l'auteur : à remplir par lui, mot pour mot. Une case dont le
// texte est vide ('') ne s'affiche pas ; une étape sans aucune case remplie
// non plus, et les numéros des étapes affichées se suivent.
// Seuls textes déjà présents : ceux de la maquette (étapes 02 et 04).

export interface Case {
	libelle: string;
	texte: string;
}

export interface Etape {
	titre: string;
	// Deux cases : à gauche ce que l'IA a proposé (ou ce qui a été testé),
	// à droite ce que j'ai fait (ou le résultat).
	cases: [Case, Case];
}

export const journal: Etape[] = [
	{
		titre: 'Lire et découper le brief',
		cases: [
			{ libelle: 'L’IA a proposé', texte: '' },
			{ libelle: 'Ce que j’ai fait', texte: '' },
		],
	},
	{
		titre: 'Maquetter les pages',
		cases: [
			{
				libelle: 'L’IA a proposé',
				texte:
					'Quatre maquettes de pages et une structure de contenus, à partir de l’offre et de mon CV.',
			},
			{ libelle: 'Ce que j’ai fait', texte: '' },
		],
	},
	{
		titre: 'Développer en Astro',
		cases: [
			{ libelle: 'L’IA a proposé', texte: '' },
			{ libelle: 'Ce que j’ai fait', texte: '' },
		],
	},
	{
		titre: 'Vérifier',
		cases: [
			{
				libelle: 'Ce que j’ai testé',
				texte: 'Lighthouse, navigation au clavier, affichage mobile, liens.',
			},
			{ libelle: 'Résultat', texte: '' },
		],
	},
];

// Les deux encadrés sous le journal. Même règle : vides, ils ne s'affichent pas.
export const bilan: Case[] = [
	{ libelle: 'Difficultés rencontrées', texte: '' },
	{ libelle: 'Choix techniques', texte: '' },
];
