#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new-post -- "My Post Title"');
  process.exit(1);
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const now = new Date();
const year = now.getFullYear();
const pad = n => String(n).padStart(2, '0');
const dateStr = `${year}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:00+00:00`;

const slug = slugify(title);
const urlPath = `/${year}/${slug}/`;

const frontmatter = `---
title: ${title}
author: chris
type: post
date: ${dateStr}
url: ${urlPath}
redirect_from:
  - /${slug}/
featured_image: ""
featured_image_attribution: ""
tags: []
draft: true
---

`;

const dir = path.join('content', 'blog', String(year));
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const filePath = path.join(dir, `${slug}.md`);
if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, frontmatter);
console.log(`\n✓ Created: ${filePath}\n`);
console.log(`  Title:  ${title}`);
console.log(`  URL:    ${urlPath}`);
console.log(`  Draft:  true\n`);
