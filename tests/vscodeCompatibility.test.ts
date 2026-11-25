import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Compile against the oldest supported API, not a newer API that a caret
// dependency may silently select. Packaging also rejects newer declarations.
test('VS Code declarations are pinned to the minimum supported API', () => {
  const manifest = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
  assert.match(manifest.engines.vscode, /^\^\d+\.\d+\.\d+$/);
  assert.equal(manifest.devDependencies['@types/vscode'], manifest.engines.vscode.slice(1));
});
