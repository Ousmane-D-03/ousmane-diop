import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un fichier Markdown par projet. Le corps du fichier est la description.
const projets = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/projets' }),
	schema: ({ image }) =>
		z.object({
		titre: z.string(),
		ordre: z.number(),
		// Projet mis en avant : pleine largeur, illustration à droite.
		vedette: z.boolean().default(false),
		// Pastilles au-dessus du titre (nature du projet, période, statut).
		// Le ton fixe la couleur : sombre, gris, ou ambre pour « en conception ».
		pastilles: z
			.array(z.object({ texte: z.string(), ton: z.enum(['sombre', 'gris', 'ambre']).default('gris') }))
			.default([]),
		stack: z.array(z.string()).default([]),
		// Schéma propre au projet, dessiné par un composant dédié.
		illustration: z.enum(['pipeline', 'serverless']).optional(),
		lien: z.object({ libelle: z.string(), url: z.url() }).optional(),
		// Image du projet (capture, diagramme), servie depuis public/. Dimensions
		// déclarées pour réserver la place avant chargement (aucun décalage).
		image: z
			.object({ src: z.string(), alt: z.string(), largeur: z.number(), hauteur: z.number() })
			.optional(),
		// Captures d'écran (preuves), dans src/assets : Astro les convertit en
		// AVIF et WebP à plusieurs largeurs, avec leurs dimensions.
		captures: z
			.array(z.object({ src: image(), alt: z.string(), legende: z.string() }))
			.default([]),
		}),
});

export const collections = { projets };
