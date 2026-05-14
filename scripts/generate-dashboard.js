#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ── helpers ──────────────────────────────────────────────────────────────────

function walk(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, results);
    else if (entry.name.endsWith('.md')) results.push(full);
  }
  return results;
}

function parseFrontmatter(content) {
  const m = content.match(/^---\n([\s\S]*?)\n---/);
  if (!m) return {};
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^(\w[\w_-]*):\s*(.*)/);
    if (!kv) continue;
    const [, k, v] = kv;
    if (v.startsWith('[')) {
      fm[k] = v.replace(/[\[\]]/g, '').split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
    } else {
      fm[k] = v.replace(/^["']|["']$/g, '').trim();
    }
  }
  return fm;
}

// ── collect data ──────────────────────────────────────────────────────────────

const files = walk(path.join('content', 'blog'));
const posts = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const fm = parseFrontmatter(content);
  if (!fm.title) continue;
  posts.push({
    file,
    title: fm.title,
    date: fm.date || '',
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    draft: fm.draft === 'true' || fm.draft === true,
    featured_image: fm.featured_image || '',
    url: fm.url || '',
  });
}

const published = posts.filter(p => !p.draft);
const drafts    = posts.filter(p => p.draft);

// posts per year
const byYear = {};
for (const p of published) {
  const y = p.date ? p.date.slice(0, 4) : 'unknown';
  byYear[y] = (byYear[y] || 0) + 1;
}

// tag frequency
const tagFreq = {};
for (const p of published) {
  for (const t of p.tags) {
    tagFreq[t] = (tagFreq[t] || 0) + 1;
  }
}
const topTags = Object.entries(tagFreq).sort((a, b) => b[1] - a[1]).slice(0, 20);

// avg cadence (recent 2 years)
const recentPosts = published
  .filter(p => p.date && p.date >= '2022')
  .sort((a, b) => a.date.localeCompare(b.date));
let cadenceNote = '';
if (recentPosts.length >= 2) {
  const first = new Date(recentPosts[0].date);
  const last  = new Date(recentPosts[recentPosts.length - 1].date);
  const weeks = (last - first) / (7 * 86400000);
  const perWeek = (recentPosts.length / weeks).toFixed(2);
  cadenceNote = `~${perWeek} posts/week (${recentPosts.length} posts over last ${Math.round(weeks)} weeks)`;
}

// draft pipeline detail
const now = Date.now();
const draftRows = drafts.map(d => {
  const created = d.date ? new Date(d.date) : null;
  const age = created && !isNaN(created) ? Math.floor((now - created) / 86400000) : null;
  return {
    title: d.title,
    file: d.file,
    age: age !== null ? age : '?',
    hasTags: d.tags.length > 0,
    hasImage: d.featured_image.length > 0,
  };
});

// ── content ideas (derived from topic clusters) ───────────────────────────────

const ideas = [
  { topic: 'Accessibility', ideas: [
    'ARIA live regions deep dive',
    'Building an accessible modal from scratch',
    'Focus trap patterns without a library',
    'Color contrast tools comparison 2026',
    'Accessibility in design tokens',
  ]},
  { topic: 'CSS', ideas: [
    'Cascade layers in real projects',
    ':has() selector patterns you\'ll actually use',
    'CSS anchor positioning for tooltips',
    'Container queries cookbook',
    'Modern CSS reset for 2026',
  ]},
  { topic: 'JavaScript', ideas: [
    'Web Animations API vs CSS transitions',
    'Intersection Observer practical patterns',
    'Custom events for component communication',
    'AbortController beyond fetch',
  ]},
  { topic: 'TypeScript', ideas: [
    'Template literal types in practice',
    'The satisfies operator explained',
    'Branded types for runtime safety',
    'Infer keyword patterns',
  ]},
  { topic: 'Tooling / DevOps', ideas: [
    'Vite plugin guide for beginners',
    'VS Code extensions for accessibility testing',
    'Git hooks to enforce code standards',
    'GitHub Actions for Gatsby deploys',
  ]},
  { topic: 'Frontend Patterns', ideas: [
    'Compound component pattern in React',
    'Headless components with render props',
    'CSS-only toggle switches',
    'Skeleton loaders without a library',
  ]},
];

// ── build HTML ────────────────────────────────────────────────────────────────

const yearLabels = JSON.stringify(Object.keys(byYear).sort());
const yearData   = JSON.stringify(Object.keys(byYear).sort().map(y => byYear[y]));
const tagLabels  = JSON.stringify(topTags.map(t => t[0]));
const tagData    = JSON.stringify(topTags.map(t => t[1]));

function draftRowsHTML() {
  if (draftRows.length === 0) return '<p class="empty">No drafts in pipeline.</p>';
  return `<table>
    <thead><tr><th>Title</th><th>Age</th><th>Tags</th><th>Image</th><th>File</th></tr></thead>
    <tbody>
    ${draftRows.map(d => `<tr>
      <td>${esc(d.title)}</td>
      <td class="age">${d.age === '?' ? '?' : d.age + 'd'}</td>
      <td class="status">${d.hasTags ? '✓' : '<span class="warn">✗</span>'}</td>
      <td class="status">${d.hasImage ? '✓' : '<span class="warn">✗</span>'}</td>
      <td class="filepath"><a href="vscode://file/${path.resolve(d.file)}">${esc(d.file)}</a></td>
    </tr>`).join('\n')}
    </tbody>
  </table>`;
}

function ideasHTML() {
  return ideas.map(group => `
    <div class="idea-group">
      <h3>${esc(group.topic)}</h3>
      <ul>${group.ideas.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
    </div>
  `).join('');
}

function esc(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

const recentPublished = published
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 5);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Codespud Publishing Dashboard</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4/dist/chart.umd.min.js"></script>
<style>
  :root {
    --bg: #0f1117; --surface: #1a1d27; --border: #2a2d3a;
    --text: #e2e8f0; --muted: #8892a4; --accent: #7c6af7;
    --green: #4ade80; --warn: #f59e0b; --red: #f87171;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: var(--bg); color: var(--text); font-family: system-ui, sans-serif; font-size: 14px; }
  header { padding: 24px 32px 16px; border-bottom: 1px solid var(--border); display: flex; align-items: baseline; gap: 16px; }
  header h1 { font-size: 20px; font-weight: 700; color: var(--accent); }
  header .meta { color: var(--muted); font-size: 12px; }
  .layout { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 24px 32px; }
  .full { grid-column: 1 / -1; }
  .card { background: var(--surface); border: 1px solid var(--border); border-radius: 10px; padding: 20px; }
  .card h2 { font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; color: var(--muted); margin-bottom: 16px; }
  .stats-row { display: flex; gap: 24px; flex-wrap: wrap; }
  .stat { display: flex; flex-direction: column; gap: 4px; }
  .stat .value { font-size: 32px; font-weight: 700; color: var(--accent); }
  .stat .label { font-size: 12px; color: var(--muted); }
  .cadence { margin-top: 12px; font-size: 12px; color: var(--muted); }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: .06em; color: var(--muted); padding: 6px 8px; border-bottom: 1px solid var(--border); }
  td { padding: 8px 8px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  td.age { color: var(--muted); font-variant-numeric: tabular-nums; }
  td.status { text-align: center; color: var(--green); }
  td.filepath { font-family: monospace; font-size: 11px; color: var(--muted); word-break: break-all; }
  td.filepath a { color: var(--accent); text-decoration: none; }
  td.filepath a:hover { text-decoration: underline; }
  span.warn { color: var(--warn); }
  .empty { color: var(--muted); font-style: italic; }
  .ideas-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
  .idea-group h3 { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: .06em; color: var(--accent); margin-bottom: 8px; }
  .idea-group ul { list-style: none; display: flex; flex-direction: column; gap: 6px; }
  .idea-group li { font-size: 13px; color: var(--text); padding-left: 12px; position: relative; }
  .idea-group li::before { content: '→'; position: absolute; left: 0; color: var(--muted); }
  canvas { max-height: 220px; }
  .recent-list { display: flex; flex-direction: column; gap: 8px; }
  .recent-item { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .recent-item .post-title { color: var(--text); }
  .recent-item .post-date { font-size: 11px; color: var(--muted); white-space: nowrap; }
</style>
</head>
<body>
<header>
  <h1>Codespud Publishing Dashboard</h1>
  <span class="meta">Generated ${new Date().toLocaleString()}</span>
</header>
<div class="layout">

  <div class="card">
    <h2>Overview</h2>
    <div class="stats-row">
      <div class="stat"><span class="value">${published.length}</span><span class="label">Published</span></div>
      <div class="stat"><span class="value">${drafts.length}</span><span class="label">Drafts</span></div>
      <div class="stat"><span class="value">${posts.length}</span><span class="label">Total posts</span></div>
      <div class="stat"><span class="value">${topTags.length}</span><span class="label">Unique tags</span></div>
    </div>
    ${cadenceNote ? `<p class="cadence">${esc(cadenceNote)}</p>` : ''}
  </div>

  <div class="card">
    <h2>Recent Published</h2>
    <div class="recent-list">
      ${recentPublished.map(p => `<div class="recent-item">
        <span class="post-title">${esc(p.title)}</span>
        <span class="post-date">${p.date.slice(0, 10)}</span>
      </div>`).join('')}
    </div>
  </div>

  <div class="card">
    <h2>Posts per Year</h2>
    <canvas id="yearChart"></canvas>
  </div>

  <div class="card">
    <h2>Top Tags</h2>
    <canvas id="tagChart"></canvas>
  </div>

  <div class="card full">
    <h2>Draft Pipeline</h2>
    ${draftRowsHTML()}
  </div>

  <div class="card full">
    <h2>Content Ideas</h2>
    <div class="ideas-grid">${ideasHTML()}</div>
  </div>

</div>
<script>
const chartDefaults = {
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { color: '#8892a4' }, grid: { color: '#2a2d3a' } },
    y: { ticks: { color: '#8892a4', stepSize: 1 }, grid: { color: '#2a2d3a' } },
  },
};

new Chart(document.getElementById('yearChart'), {
  type: 'bar',
  data: {
    labels: ${yearLabels},
    datasets: [{ data: ${yearData}, backgroundColor: '#7c6af7', borderRadius: 4 }],
  },
  options: { ...chartDefaults, responsive: true },
});

new Chart(document.getElementById('tagChart'), {
  type: 'bar',
  data: {
    labels: ${tagLabels},
    datasets: [{ data: ${tagData}, backgroundColor: '#4ade80', borderRadius: 4 }],
  },
  options: {
    ...chartDefaults,
    indexAxis: 'y',
    responsive: true,
    scales: {
      x: { ticks: { color: '#8892a4' }, grid: { color: '#2a2d3a' } },
      y: { ticks: { color: '#e2e8f0', font: { size: 11 } }, grid: { display: false } },
    },
  },
});
</script>
</body>
</html>`;

const outFile = 'dashboard.html';
fs.writeFileSync(outFile, html);
console.log(`\n✓ Dashboard written to ${outFile}`);

// open in default browser
try {
  const opener = process.platform === 'darwin' ? 'open'
               : process.platform === 'win32'  ? 'start'
               : 'xdg-open';
  execSync(`${opener} ${outFile}`);
} catch (_) {
  console.log(`  Open it manually: ${path.resolve(outFile)}`);
}
console.log('');
