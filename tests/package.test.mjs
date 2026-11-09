// SPDX-License-Identifier: MIT
// SPDX-FileCopyrightText: 2026 The evidence-rungs authors
// Original offline artifact checks. No model, provider or network access.
import assert from 'node:assert/strict';
import test from 'node:test';
import {readFileSync, readdirSync, lstatSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {resolve, relative, posix} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const licenceFor = file => file === 'LICENSE' || file === '.gitattributes' || file.endsWith('.mjs') || file.endsWith('.yml') ? 'MIT' : 'CC-BY-4.0';
const required = ['README.md', 'README.de.md', 'COMPATIBILITY.md', 'LICENSE', 'LICENSE-docs', 'NOTICE', 'NOTICE.md', 'skills/evidence-rungs/SKILL.md', 'tests/package.test.mjs', '.github/workflows/test.yml', '.gitattributes'];
const safeName = name => typeof name === 'string' && name.length > 0 && !name.includes('\\') && !name.includes(':') && !name.startsWith('/') && name.split('/').every(bit => bit && bit !== '.' && bit !== '..');

function collect(directory) {
  const files = new Map();
  function walk(folder) {
    for (const item of readdirSync(folder, {withFileTypes: true})) {
      // A GitHub checkout adds Git metadata; it is not part of the release payload.
      if (folder === directory && item.name === '.git') continue;
      const path = resolve(folder, item.name), stat = lstatSync(path);
      assert.ok(!stat.isSymbolicLink(), 'no symlinks');
      if (stat.isDirectory()) walk(path);
      else {
        assert.ok(stat.isFile() && stat.nlink === 1 && stat.size <= 100000, 'bounded regular files');
        files.set(relative(directory, path).replaceAll('\\', '/'), readFileSync(path));
      }
    }
  }
  walk(directory);
  return files;
}

function checkManifest(files) {
  const manifest = JSON.parse(files.get('manifest.json'));
  assert.equal(manifest.format, 3);
  assert.ok(['candi' + 'date', 'release'].includes(manifest.mode));
  const proposed = manifest.mode === 'candi' + 'date';
  assert.equal(manifest.version, proposed ? '0.1.0' + '-rc' : '0.1.0');
  assert.equal(manifest.licenseStatus, proposed ? 'proposed' : 'adopted');
  assert.ok(Array.isArray(manifest.files) && manifest.files.length > 0);
  const names = manifest.files.map(row => row.file);
  assert.ok(names.every(safeName), 'safe manifest paths');
  assert.equal(new Set(names).size, names.length, 'unique paths');
  assert.deepEqual([...files.keys()].sort(), [...names, 'manifest.json'].sort(), 'exact inventory');
  for (const file of required) assert.ok(files.has(file), 'required file: ' + file);
  assert.ok(files.has(proposed ? 'LICENSE-' + 'PROPOSAL.md' : 'LICENSING.md'), 'rights scope notice');
  for (const row of manifest.files) {
    assert.ok(Number.isSafeInteger(row.bytes) && row.bytes >= 0 && row.bytes <= 100000);
    assert.match(row.sha256, /^[a-f0-9]{64}$/u);
    const bytes = files.get(row.file);
    assert.equal(bytes.length, row.bytes, 'size: ' + row.file);
    assert.equal(hash(bytes), row.sha256, 'digest: ' + row.file);
    assert.equal(row.licenseStatus, proposed ? 'proposed' : 'adopted');
    assert.equal(row[proposed ? 'proposedSpdxLicenseId' : 'spdxLicenseId'], licenceFor(row.file));
  }
  return manifest;
}

function checkLinks(files) {
  for (const [file, bytes] of files) {
    if (!file.endsWith('.md')) continue;
    for (const match of bytes.toString('utf8').matchAll(/\]\(([^)]+)\)/gu)) {
      const link = match[1];
      if (/^https:\/\//u.test(link)) continue; // External pages are never fetched.
      assert.ok(!link.startsWith('/') && !link.includes('\\') && !link.includes(':'), 'relative links only');
      const target = posix.normalize(posix.join(posix.dirname(file), link.split('#')[0]));
      assert.ok(safeName(target) && files.has(target), 'local link: ' + file);
    }
  }
}

function checkNotices(files, manifest) {
  const code = files.get('LICENSE').toString('utf8'), prose = files.get('LICENSE-docs').toString('utf8');
  assert.ok(code.includes('MIT License') && code.includes('Permission is hereby granted,'));
  if (manifest.mode === 'release') {
    assert.ok(prose.includes('Attribution 4.0 International'));
    assert.ok(code.includes(manifest.rightsHolder) && prose.includes(manifest.rightsHolder));
    for (const [file, bytes] of files) {
      let text = bytes.toString('utf8');
      if (file.endsWith('.mjs')) {
        assert.ok(text.startsWith('// SPDX-License-Identifier: MIT\n// SPDX-FileCopyrightText: 2026 ' + manifest.rightsHolder + '\n'), 'code header: ' + file);
      } else if (file.endsWith('.yml') || file === '.gitattributes') {
        assert.ok(text.startsWith('# SPDX-License-Identifier: MIT\n# SPDX-FileCopyrightText: 2026 ' + manifest.rightsHolder + '\n'), 'config header: ' + file);
      } else if (file.endsWith('.md')) {
        if (file === 'skills/evidence-rungs/SKILL.md') text = text.replace(/^---\n[\s\S]+?\n---\n/u, '');
        assert.ok(text.startsWith('<!-- SPDX-License-Identifier: CC-BY-4.0 -->\n<!-- SPDX-FileCopyrightText: 2026 ' + manifest.rightsHolder + ' -->\n'), 'prose header: ' + file);
      }
    }
  } else {
    assert.ok(code.includes('NOT ' + 'ADOPTED') && prose.includes('NOT ' + 'ADOPTED'), 'proposed licences are not grants');
  }
}

function checkPrivacy(files) {
  // Selected regressions only, not a universal privacy or secret detector.
  const forbiddenDirectory = new RegExp('^(?:' + ['r' + 'uns', 'l' + 'ab', 'b' + 'ench', 'm' + 'emory', '\\.c' + 'ache'].join('|') + ')(?:/|$)', 'iu');
  const patterns = [
    /(?:[a-z]:[\\/]Users[\\/]|\/(?:home|Users)\/)[a-z0-9._-]+/iu,
    /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/iu,
    /\bsk-(?:proj-|ant-)?[a-z0-9_-]{16,}\b/iu,
    /\bgh[pousr]_[a-z0-9]{20,}\b/iu,
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u,
    new RegExp('["\x27](?:raw_' + 'response|provider_' + 'output)["\x27]\\s*:', 'u'),
  ];
  for (const [file, bytes] of files) {
    assert.ok(!forbiddenDirectory.test(file), 'no private data directories');
    const text = new TextDecoder('utf-8', {fatal: true, ignoreBOM: true}).decode(bytes);
    assert.ok(!text.includes('\r') && !text.startsWith('\ufeff'), 'UTF-8 LF without BOM');
    assert.ok(patterns.every(pattern => !pattern.test(text)), 'private-content pattern: ' + file);
  }
}

const files = collect(root);
test('manifest: exact inventory, paths, sizes, hashes and licence scopes', () => checkManifest(files));
test('skill: matching name and no automatic tool grant', () => {
  const text = files.get('skills/evidence-rungs/SKILL.md').toString('utf8');
  assert.match(text, /^---\nname: evidence-rungs\n/u);
  assert.ok(!/^allowed-tools:/mu.test(text));
  assert.ok(text.includes('List only sources actually opened, each with its publication, update/version date, or otherwise its retrieval date.'));
  assert.ok(files.get('README.md').toString('utf8').includes('Source opened ≠ claim true.'));
});
test('links: every local Markdown file target exists', () => checkLinks(files));
test('notices: code and text licences remain distinct', () => checkNotices(files, checkManifest(files)));
test('privacy: selected content patterns and private directories are absent', () => checkPrivacy(files));
test('CI: runs this offline suite without package installation or credentials', () => {
  const workflow = files.get('.github/workflows/test.yml').toString('utf8');
  assert.ok(workflow.includes('node --test tests/package.test.mjs'));
  assert.ok(workflow.includes('contents: read') && workflow.includes('node-version: 22'));
  assert.doesNotMatch(workflow, /secrets\.|npm (?:install|ci)|pull_request_target/u);
  const attributes = files.get('.gitattributes').toString('utf8');
  assert.deepEqual(attributes.split('\n').filter(line => line && !line.startsWith('#')), ['* text eol=lf'], 'checkout preserves manifest bytes even with autocrlf enabled');
});
test('negative controls: changed bytes and extra or missing files fail', () => {
  for (const change of [
    copy => copy.set('README.md', Buffer.from(copy.get('README.md') + 'changed')),
    copy => copy.set('unexpected.txt', Buffer.from('unexpected')),
    copy => copy.delete('NOTICE'),
  ]) { const copy = new Map(files); change(copy); assert.throws(() => checkManifest(copy)); }
});
test('negative controls: traversal, duplicate path and wrong licence fail', () => {
  for (const change of [
    manifest => { manifest.files[0].file = '../outside'; },
    manifest => { manifest.files[1].file = manifest.files[0].file; },
    manifest => { const row = manifest.files.find(row => row.file.endsWith('.mjs')); row[manifest.mode === 'candi' + 'date' ? 'proposedSpdxLicenseId' : 'spdxLicenseId'] = 'CC-BY-4.0'; },
  ]) {
    const copy = new Map(files), manifest = JSON.parse(copy.get('manifest.json'));
    change(manifest); copy.set('manifest.json', Buffer.from(JSON.stringify(manifest)));
    assert.throws(() => checkManifest(copy));
  }
});
test('negative controls: broken local link and missing licence notice fail', () => {
  const links = new Map(files); links.set('README.md', Buffer.from('[missing](missing.md)'));
  assert.throws(() => checkLinks(links));
  const notices = new Map(files); notices.set('LICENSE', Buffer.from('missing'));
  assert.throws(() => checkNotices(notices, JSON.parse(files.get('manifest.json'))));
  const manifest = JSON.parse(files.get('manifest.json'));
  if (manifest.mode === 'release') for (const file of ['README.md', '.github/workflows/test.yml', 'skills/evidence-rungs/SKILL.md', '.gitattributes']) {
    const changed = new Map(files);
    changed.set(file, Buffer.from(files.get(file).toString('utf8').replace(/^(?:<!-- |# )SPDX-License-Identifier:[^\n]+\n/mu, '')));
    assert.throws(() => checkNotices(changed, manifest), 'missing header: ' + file);
  }
});
test('negative controls: synthetic private path, contact, key and raw field fail', () => {
  for (const text of ['C:' + '/Us' + 'ers/synthetic/file', 'synthetic' + '@' + 'example.org', 'sk-' + 'z'.repeat(32), '{"provider_' + 'output":"invented"}']) {
    assert.throws(() => checkPrivacy(new Map([['sample.txt', Buffer.from(text)]])));
  }
  assert.throws(() => checkPrivacy(new Map([['r' + 'uns/sample.txt', Buffer.from('invented')]])));
});
