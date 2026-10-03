// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	// Adresse réelle du site, déployé sur Cloudflare Workers. Sert aux URL
	// canoniques et à l’image Open Graph, qui exigent une adresse absolue.
	site: 'https://ousmane-diop.ousmanesarrd.workers.dev',
	// CSS toujours intégré à la page : quelques Ko dupliqués d’une page à
	// l’autre coûtent moins qu’une requête qui bloque l’affichage (au-delà de
	// 4 Ko, Astro le sortait dans un fichier séparé).
	build: { inlineStylesheets: 'always' },
	// Polices téléchargées au build et servies depuis le site :
	// aucune requête vers Google chez le visiteur.
	fonts: [
		{
			provider: fontProviders.google(),
			name: 'Bricolage Grotesque',
			cssVariable: '--font-titres',
			weights: [500, 700, 800],
			subsets: ['latin'],
			fallbacks: ['Segoe UI', 'system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Sans',
			cssVariable: '--font-corps',
			weights: [400, 500, 600],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['Segoe UI', 'system-ui', 'sans-serif'],
		},
		{
			provider: fontProviders.google(),
			name: 'IBM Plex Mono',
			cssVariable: '--font-mono',
			weights: [400, 500, 600],
			styles: ['normal'],
			subsets: ['latin'],
			fallbacks: ['ui-monospace', 'Menlo', 'monospace'],
		},
	],
});
