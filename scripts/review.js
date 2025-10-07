const year = document.querySelector('#year');
const lastmod = document.querySelector('#lastmod');
year.textContent = new Date().getFullYear();
lastmod.textContent = new Date(document.lastModified).toLocaleString();

const params = new URLSearchParams(location.search);
const summary = document.querySelector('#summary');

const getAll = (key) => params.getAll(key).filter(Boolean);

const entries = [
  ['Product', params.get('product')],
  ['Rating', params.get('rating')],
  ['Installed', params.get('installed')],
  ['Useful features', getAll('features').join(', ') || '—'],
  ['Written review', params.get('review') || '—'],
  ['Your name', params.get('username') || '—']
];

for (const [label, value] of entries) {
  const dt = document.createElement('dt');
  const dd = document.createElement('dd');
  dt.textContent = label;
  dd.textContent = value;
  summary.append(dt, dd);
}

const KEY = 'w05-review-count';
const count = Number(localStorage.getItem(KEY) || 0) + 1;
localStorage.setItem(KEY, count);
document.querySelector('#reviewCount').textContent = count;
