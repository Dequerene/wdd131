const temples = [
  {
    templeName: "Aba Nigeria Temple",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/aba-nigeria-temple/aba-nigeria-temple-5087-main.jpg"
  },
  {
    templeName: "Manti Utah Temple",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/manti-utah-temple/manti-utah-temple-40551-main.jpg"
  },
  {
    templeName: "Payson Utah Temple",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/payson-utah-temple/payson-utah-temple-38451-main.jpg"
  },
  {
    templeName: "Yigo Guam Temple",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
  },
  {
    templeName: "Washington D.C. Temple",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
  },
  {
    templeName: "Lima Peru Temple",
    location: "Lima, Peru",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
  },
  {
    templeName: "Mexico City Mexico Temple",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl:  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 6",
    area: 253015,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/salt-lake-temple/salt-lake-temple-15669-main.jpg"
  },
  {
    templeName: "Rome Italy Temple",
    location: "Rome, Italy",
    dedicated: "2019, March, 10",
    area: 41010,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/rome-italy-temple/rome-italy-temple-2642-main.jpg"
  },
  {
    templeName: "Kinshasa Democratic Republic of the Congo Temple",
    location: "Kinshasa, Democratic Republic of the Congo",
    dedicated: "2019, April, 14",
    area: 12000,
    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/kinshasa-democratic-republic-of-the-congo-temple/kinshasa-democratic-republic-of-the-congo-temple-3533-main.jpg"
  }
];

const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const menuButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");
const templeCards = document.querySelector("#temple-cards");
const pageTitle = document.querySelector("#page-title");
const navLinks = document.querySelectorAll("nav a");

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

function getDedicatedYear(temple) {
  return Number(temple.dedicated.split(",")[0]);
}

function createInfoParagraph(labelText, valueText) {
  const paragraph = document.createElement("p");
  const label = document.createElement("span");

  label.classList.add("label");
  label.textContent = labelText;

  paragraph.appendChild(label);
  paragraph.appendChild(document.createTextNode(` ${valueText}`));

  return paragraph;
}

function createTempleCard(temple) {
  const card = document.createElement("section");
  const name = document.createElement("h2");
  const image = document.createElement("img");

  card.classList.add("temple-card");

  name.textContent = temple.templeName;

  image.src = temple.imageUrl;
  image.alt = temple.templeName;
  image.loading = "lazy";
  image.decoding = "async";
  image.width = 400;
  image.height = 300;

  card.appendChild(name);
  card.appendChild(createInfoParagraph("Location:", temple.location));
  card.appendChild(createInfoParagraph("Dedicated:", temple.dedicated));
  card.appendChild(createInfoParagraph("Size:", `${temple.area.toLocaleString()} sq ft`));
  card.appendChild(image);

  return card;
}

function displayTemples(filteredTemples) {
  templeCards.innerHTML = "";

  filteredTemples.forEach((temple) => {
    templeCards.appendChild(createTempleCard(temple));
  });
}

function setActiveLink(filter) {
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.filter === filter);
  });
}

function applyFilter(filter) {
  let filteredTemples = temples;
  let title = "Home";

  if (filter === "old") {
    filteredTemples = temples.filter((temple) => getDedicatedYear(temple) < 1900);
    title = "Old Temples";
  } else if (filter === "new") {
    filteredTemples = temples.filter((temple) => getDedicatedYear(temple) > 2000);
    title = "New Temples";
  } else if (filter === "large") {
    filteredTemples = temples.filter((temple) => temple.area > 90000);
    title = "Large Temples";
  } else if (filter === "small") {
    filteredTemples = temples.filter((temple) => temple.area < 10000);
    title = "Small Temples";
  }

  pageTitle.textContent = title;
  displayTemples(filteredTemples);
  setActiveLink(filter);
}

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    const filter = event.target.dataset.filter;
    applyFilter(filter);

    navigation.classList.remove("open");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
  });
});

menuButton.addEventListener("click", () => {
  navigation.classList.toggle("open");

  const isOpen = navigation.classList.contains("open");

  menuButton.textContent = isOpen ? "✕" : "☰";
  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
});

applyFilter("home");