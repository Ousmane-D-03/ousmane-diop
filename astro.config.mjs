// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://ousmane-diop.pages.dev',
	// CSS toujours intégré à la page : sur deux pages, quelques Ko dupliqués
	// coûtent moins qu’une requête qui bloque l’affichage (au-delà de 4 Ko,
	// Astro le sortait dans un fichier séparé).
	build: { inlineStylesheets: 'always' },
	// Polices téléchargées au build et servies depuis le site :
	// aucune requête vers Google chez le visiteur.
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Space Grotesk',
			cssVariable: '--font-titres',
			weights: [500, 700],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'Inter',
			cssVariable: '--font-corps',
			weights: [400, 600],
			styles: ['normal', 'italic'],
			subsets: ['latin'],
			fallbacks: ['sans-serif'],
		},
	],
});
