import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Un fichier Markdown par projet. Le corps du fichier est la description.
const projets = defineCollection({
	loader: glob({ pattern: '*.md', base: './src/content/projets' }),
	schema: z.object({
		titre: z.string(),
		// Ce que le projet montre, tel que formulé dans le titre du contenu.
		angle: z.string(),
		// La mission de l'offre qu'il éclaire (« En lien avec : … »).
		mission: z.string(),
		ordre: z.number(),
		stack: z.array(z.string()).default([]),
		statut: z.enum(['en-cours', 'conception']).optional(),
		lien: z.object({ libelle: z.string(), url: z.url() }).optional(),
	}),
});

export const collections = { projets };
