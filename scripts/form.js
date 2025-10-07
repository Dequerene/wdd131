import { products } from "./products.js";

const year = document.querySelector('#year');
const lastmod = document.querySelector('#lastmod');
year.textContent = new Date().getFullYear();
lastmod.textContent = new Date(document.lastModified).toLocaleString();

const select = document.querySelector('#product');
products.forEach(p => {
  const opt = document.createElement('option');
  opt.value = p.id;           
  opt.textContent = p.name;    
  select.appendChild(opt);
});

const form = document.querySelector('#reviewForm');
form.addEventListener('submit', (e) => {
  if (!select.value) {
    select.focus();
    e.preventDefault();
  }
});
