// scripts/gen-meta.mjs
// Runs on `npm run prebuild`. Captures the last 15 real commits from git
// into src/site/buildmeta.json so the site ships an honest, build-time
// snapshot of the repo. The committed buildmeta.json doubles as the runtime
// fallback, so first paint never breaks.
// If git is unavailable (no repo, no git), the existing file is left
// untouched and the script exits 0 so builds never break.

import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { writeFileSync } from 'node:fs';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const out = join(root, 'src', 'site', 'buildmeta.json');

const MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];

try {
  // NUL separator: subjects can contain spaces but never NUL.
  const raw = execFileSync('git', ['log', '--format=%h%x00%s', '-15'], { cwd: root, encoding: 'utf8' });
  const commits = raw
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .map((line) => {
      const [hash, ...rest] = line.split('\0');
      return { hash, subject: rest.join('') };
    })
    .filter((c) => c.hash && c.subject);
  if (!commits.length) process.exit(0);

  const now = new Date();
  const meta = {
    builtAt: now.toISOString(),
    buildDate: `${MONTHS[now.getMonth()]} ${now.getDate()}, ${now.getFullYear()}`,
    commits,
  };
  writeFileSync(out, JSON.stringify(meta, null, 2) + '\n');
  console.log(`buildmeta: ${commits.length} commits -> ${out}`);
} catch (e) {
  // No git (or git failed): keep the existing snapshot untouched.
  process.exit(0);
}
