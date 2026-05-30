// Genera styles/tokens.css desde el source of truth styles/tokens.mjs.
// Ejecutar: `npm run tokens:build` (corre también en el prebuild).
// Importa JS plano: funciona en cualquier versión de Node, sin flags.
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { cssVarMap } from '../styles/tokens.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));

const lines = Object.entries(cssVarMap).map(([k, v]) => `  ${k}: ${v};`);
const css = `/* AUTO-GENERADO desde styles/tokens.mjs — no editar a mano. */
/* Regenerar: npm run tokens:build */
:root {
${lines.join('\n')}
}
`;

writeFileSync(resolve(__dirname, '../styles/tokens.css'), css, 'utf8');
console.log(`tokens.css generado (${Object.keys(cssVarMap).length} variables)`);
