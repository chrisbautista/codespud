#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

const files = walk(path.join('content', 'blog'));
const drafts = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  if (!/draft:\s*true/i.test(content)) continue;

  const titleMatch = content.match(/^title:\s*(.+)$/m);
  const dateMatch  = content.match(/^date:\s*(.+)$/m);
  const tagsMatch  = content.match(/^tags:\s*\[([^\]]*)\]/m);
  const imageMatch = content.match(/^featured_image:\s*"?([^"\n]*)"?/m);

  const title = titleMatch ? titleMatch[1].trim() : '(no title)';
  const dateStr = dateMatch ? dateMatch[1].trim() : null;
  const hasTags = tagsMatch && tagsMatch[1].trim().length > 0;
  const hasImage = imageMatch && imageMatch[1].trim().length > 0;

  let age = '?';
  if (dateStr) {
    const created = new Date(dateStr);
    const days = Math.floor((Date.now() - created) / 86400000);
    age = isNaN(days) ? '?' : `${days}d`;
  }

  drafts.push({ title, file, age, hasTags, hasImage });
}

if (drafts.length === 0) {
  console.log('\nNo draft posts found.\n');
  process.exit(0);
}

console.log(`\nDraft posts (${drafts.length}):\n`);

const titleW = Math.min(50, Math.max(...drafts.map(d => d.title.length), 5));
const header = `${'Title'.padEnd(titleW)}  ${'Age'.padStart(5)}  Tags  Image  File`;
console.log(header);
console.log('-'.repeat(header.length));

for (const d of drafts) {
  const t = d.title.length > titleW ? d.title.slice(0, titleW - 1) + '…' : d.title.padEnd(titleW);
  const tags  = d.hasTags  ? ' ✓   ' : ' ✗   ';
  const image = d.hasImage ? '  ✓   ' : '  ✗   ';
  console.log(`${t}  ${d.age.padStart(5)}  ${tags}${image} ${d.file}`);
}

console.log('');
