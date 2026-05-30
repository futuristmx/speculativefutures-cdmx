// Genera styles/tokens.css desde el source of truth styles/tokens.ts.
// Ejecutar: `npm run tokens:build` (corre también en el prebuild).
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { register } from 'node:module';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Carga el módulo TS de tokens vía tsx loader si está disponible; si no,
// usa una importación dinámica que Node resuelve con su soporte de TS.
const { cssVarMap } = await import('../styles/tokens.ts');

const lines = Object.entries(cssVarMap).map(([k, v]) => `  ${k}: ${v};`);
const css = `/* AUTO-GENERADO desde styles/tokens.ts — no editar a mano. */
/* Regenerar: npm run tokens:build */
:root {
${lines.join('\n')}
}
`;

const out = resolve(__dirname, '../styles/tokens.css');
writeFileSync(out, css, 'utf8');
console.log(`tokens.css generado (${Object.keys(cssVarMap).length} variables)`);
