#!/usr/bin/env node
'use strict';

const fs = require('fs');

const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: npm run publish -- content/blog/2026/my-post.md');
  process.exit(1);
}

if (!fs.existsSync(filePath)) {
  console.error(`File not found: ${filePath}`);
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Verify it's a draft
if (!/draft:\s*true/i.test(content)) {
  console.error('This post is not marked as draft:true — nothing to do.');
  process.exit(1);
}

const now = new Date();
const pad = n => String(n).padStart(2, '0');
const newDate = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:00+00:00`;

// Update date
content = content.replace(/^(date:\s*).*$/m, `$1${newDate}`);

// Flip draft
content = content.replace(/^(draft:\s*)true/m, `${`draft: false`}`);

// Extract fields for warnings
const tagsMatch = content.match(/^tags:\s*\[([^\]]*)\]/m);
const hasTags = tagsMatch && tagsMatch[1].trim().length > 0;

const imageMatch = content.match(/^featured_image:\s*"?([^"\n]+)"?/m);
const hasImage = imageMatch && imageMatch[1].trim().length > 0;

const titleMatch = content.match(/^title:\s*(.+)$/m);
const urlMatch = content.match(/^url:\s*(.+)$/m);
const title = titleMatch ? titleMatch[1].trim() : '(unknown)';
const url = urlMatch ? urlMatch[1].trim() : '(unknown)';

fs.writeFileSync(filePath, content);

console.log(`\n✓ Published: ${filePath}`);
console.log(`  Title:  ${title}`);
console.log(`  URL:    ${url}`);
console.log(`  Date:   ${newDate}\n`);

if (!hasTags)  console.warn('  ⚠  Warning: tags is empty — add tags before deploying');
if (!hasImage) console.warn('  ⚠  Warning: featured_image is empty — add an image before deploying');
if (!hasTags || !hasImage) console.log('');
