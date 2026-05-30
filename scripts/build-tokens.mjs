// Genera styles/tokens.css desde el source of truth styles/tokens.ts.
// Ejecutar: `npm run tokens:build` (corre también en el prebuild).
//
// No importa el .ts (eso requeriría la flag experimental de Node y rompe en
// Node 20). En su lugar parsea el bloque `cssVarMap` del archivo como texto y
// resuelve las referencias a `color.*` / `font.*` declaradas arriba. Así
// funciona en cualquier versión de Node sin flags.
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const tokensPath = resolve(__dirname, '../styles/tokens.ts');
const src = readFileSync(tokensPath, 'utf8');

// 1) Recolecta constantes simples `nombre: '#valor'` dentro de los objetos
//    `color`, `font`, etc., para resolver referencias tipo color.mint400.
const consts = {};
for (const block of [
  'color',
  'font',
  'tracking',
  'space',
  'radius',
  'motion',
  'layout',
]) {
  const re = new RegExp(`export const ${block} = \\{([\\s\\S]*?)\\n\\} as const;`);
  const m = src.match(re);
  if (!m) continue;
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^\s*([A-Za-z0-9_]+):\s*'([^']*)'/);
    if (mm) consts[`${block}.${mm[1]}`] = mm[2];
  }
}

// 2) Extrae el cuerpo de cssVarMap.
const mapMatch = src.match(/export const cssVarMap[^=]*=\s*\{([\s\S]*?)\n\};/);
if (!mapMatch) {
  console.error('No se encontró cssVarMap en styles/tokens.ts');
  process.exit(1);
}

const entries = [];
for (const line of mapMatch[1].split('\n')) {
  // '--var': valor,   donde valor es 'literal' o referencia color.x / font.x
  const m = line.match(/^\s*'([^']+)':\s*(.+?),?\s*$/);
  if (!m) continue;
  const key = m[1];
  let raw = m[2].trim();
  let value;
  if (raw.startsWith("'")) {
    value = raw.slice(1, raw.lastIndexOf("'"));
  } else if (consts[raw] !== undefined) {
    value = consts[raw];
  } else {
    console.error(`No se pudo resolver el valor de ${key}: ${raw}`);
    process.exit(1);
  }
  entries.push(`  ${key}: ${value};`);
}

const css = `/* AUTO-GENERADO desde styles/tokens.ts — no editar a mano. */
/* Regenerar: npm run tokens:build */
:root {
${entries.join('\n')}
}
`;

writeFileSync(resolve(__dirname, '../styles/tokens.css'), css, 'utf8');
console.log(`tokens.css generado (${entries.length} variables)`);
