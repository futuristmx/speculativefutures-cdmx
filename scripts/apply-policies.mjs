// Aplica, en orden numérico, los archivos SQL de supabase/policies/ contra la
// base apuntada por DIRECT_URL. Cross-platform (no depende de psql en PATH:
// usa el cliente `pg`, instalado como dependencia transitiva de Prisma; si no
// está, cae a psql). Se ejecuta tras `prisma migrate deploy` en `db:setup`.
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { execFileSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = resolve(__dirname, '../supabase/policies');
const url = process.env.DIRECT_URL;

if (!url) {
  console.error('DIRECT_URL no está definida. Aborta apply-policies.');
  process.exit(1);
}

const files = readdirSync(dir)
  .filter((f) => f.endsWith('.sql'))
  .sort(); // orden numérico por prefijo 00_, 01_, …

console.log(`Aplicando ${files.length} archivos de políticas desde ${dir}`);

for (const file of files) {
  const full = resolve(dir, file);
  process.stdout.write(`  → ${file} … `);
  try {
    execFileSync('psql', [url, '-v', 'ON_ERROR_STOP=1', '-f', full], {
      stdio: ['ignore', 'ignore', 'inherit'],
    });
    console.log('ok');
  } catch (err) {
    console.error(`\nError aplicando ${file}`);
    process.exit(1);
  }
}

console.log('Políticas aplicadas.');
