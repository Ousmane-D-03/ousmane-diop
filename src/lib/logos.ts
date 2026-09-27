// Les six logos d'outils (Simple Icons 16.32.0, sans <title> : décoratifs).
// Clé : le nom tel qu'il apparaît dans le champ `stack` des projets.
// Pas d'AWS : absent de Simple Icons, et le logo officiel ne peut pas être recoloré.
import Docker from '../assets/logos/docker.svg';
import GithubActions from '../assets/logos/githubactions.svg';
import Python from '../assets/logos/python.svg';
import FastApi from '../assets/logos/fastapi.svg';
import Linux from '../assets/logos/linux.svg';
import PostgreSql from '../assets/logos/postgresql.svg';

export type Logo = typeof Docker;

export const logos: Record<string, Logo> = {
	Docker,
	'GitHub Actions': GithubActions,
	Python,
	FastAPI: FastApi,
	Linux,
	PostgreSQL: PostgreSql,
};
