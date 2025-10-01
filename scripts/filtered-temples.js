// -------------------------------
// W04 Enhanced Temple Picture Album
// Meets rubric: dynamic cards, filters, lazy images, a11y, footer meta
// -------------------------------

// 1) Data (7 originals + 3 added)
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg",
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg",
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg",
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg",
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg",
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg",
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg",
  },
  // Added 3
  {
    templeName: "Salt Lake Utah",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 382207,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg",
  },
  {
    templeName: "Rome Italy",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg",
  },
  {
    templeName: "Durban South Africa",
    location: "Durban, South Africa",
    dedicated: "2020, February, 16",
    area: 19869,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/durban-south-africa-temple/durban-south-africa-temple-7936-main.jpg",
  },
  {
    templeName: "Houston Texas Temple",
    location: "Houston Texas, United States",
    dedicated: "2000, August, 26",
    area: 33970,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/houston-texas-temple/houston-texas-temple-23480-main.jpg",
  },
  {
    templeName: "Brasilia Brazil Temple",
    location: "Brasilia, Brazil",
    dedicated: "2023, September, 17",
    area: 25000,
    imageUrl:
      "https://churchofjesuschristtemples.org/assets/img/temples/brasilia-brazil-temple/brasilia-brazil-temple-39184-icon.jpg",
  }

];

// 2) Utilities
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const yearFrom = (dedicated) => {
  const y = String(dedicated).split(',')[0].trim();
  const n = parseInt(y, 10);
  return Number.isFinite(n) ? n : NaN;
};
function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else if (v != null) node.setAttribute(k, v);
  });
  children.forEach((c) => node.append(c));
  return node;
}

// Optional: validate data for missing keys (helps debugging)
function validateTemples(arr) {
  const required = ["templeName", "location", "dedicated", "area", "imageUrl"];
  arr.forEach((t, i) => {
    const missing = required.filter((k) => !(k in t));
    if (missing.length) console.warn(`[Temples] Item ${i} missing keys:`, missing, t);
  });
}
validateTemples(temples);

// 3) Render logic
const cards = $("#cards");
const title = $("#results-title");

function renderTempleCard(t) {
  const {
    templeName = "Unknown Temple",
    location = "Unknown",
    dedicated = "Unknown",
    area = 0,
    imageUrl = "",
  } = t || {};

  const img = el("img", {
    src: imageUrl,
    alt: `${templeName} Temple exterior`,
    loading: "lazy",
    width: 400,
    height: 250,
  });

  const dl = el("dl", {}, [
    el("dt", { text: "Location" }), el("dd", { text: location }),
    el("dt", { text: "Dedicated" }), el("dd", { text: dedicated }),
    el("dt", { text: "Area" }), el("dd", { text: `${Number(area).toLocaleString()} ft²` }),
  ]);

  const meta = el("div", { class: "meta" }, [el("h3", { text: templeName }), dl]);
  return el("article", { class: "card", role: "listitem" }, [img, meta]);
}

function renderList(list, heading = "Home") {
  cards.setAttribute("aria-busy", "true");
  title.textContent = heading;
  cards.replaceChildren();
  list.forEach((t) => cards.append(renderTempleCard(t)));
  cards.setAttribute("aria-busy", "false");
}

// 4) Filters
const FILTERS = {
  all: () => temples,
  old: () => temples.filter((t) => yearFrom(t.dedicated) < 1900),
  new: () => temples.filter((t) => yearFrom(t.dedicated) >= 2000),
  large: () => temples.filter((t) => Number(t.area) >= 90000),
  small: () => temples.filter((t) => Number(t.area) < 10000),
};

function activate(btn) {
  $$(".nav__btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
  btn.setAttribute("aria-pressed", "true");
}

$$(".nav__btn").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    const key = e.currentTarget.dataset.filter;
    activate(e.currentTarget);
    const titles = {
      all: "Home",
      old: "Temples Dedicated before 1900",
      new: "Temples Dedicated from 2000",
      large: "Large Temples (≥ 90,000 ft²)",
      small: "Small Temples (< 10,000 ft²)",
    };
    renderList(FILTERS[key](), titles[key]);
  })
);

// 5) Footer + Hamburger (DOM ready)
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Robust Last Modified
  const lm = document.getElementById("lastModified");
  if (lm) {
    const d = new Date(document.lastModified);
    lm.textContent = isNaN(d)
      ? "Unavailable"
      : d.toLocaleString(undefined, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
  }

  // Hamburger toggle (mobile)
  const btn = document.getElementById("hamburger");
  const nav = document.getElementById("primary-nav");
  if (btn && nav) {
    const toggle = () => {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
      btn.textContent = open ? "✖" : "☰";
    };
    btn.addEventListener("click", toggle);

    // Close menu after choosing a filter button
    nav.addEventListener("click", (e) => {
      if (e.target.matches(".nav__btn") && nav.classList.contains("open")) toggle();
    });
  }
});

// Initial render
renderList(temples);
