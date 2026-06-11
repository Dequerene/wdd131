const destinations = [
  {
    name: "Maputo",
    category: "city",
    image: "images/maputo.webp",
    description: "Maputo is the capital city of Mozambique. It is known for its markets, music, seafood, architecture, and coastal views."
  },
  {
    name: "Tofo Beach",
    category: "beach",
    image: "images/tofo.webp",
    description: "Tofo Beach is a popular coastal destination with beautiful sand, ocean activities, and a relaxed atmosphere."
  },
  {
    name: "Gorongosa National Park",
    category: "nature",
    image: "images/gorongosa.webp",
    description: "Gorongosa National Park is one of Mozambique's most important natural areas, with wildlife, landscapes, and conservation programs."
  }
];

const tips = [
  "Try local foods such as matapa, xima, grilled fish, and peri-peri chicken.",
  "Respect local customs and greet people politely before asking questions.",
  "The dry season is often a good time to visit because travel conditions are easier.",
  "Carry cash when visiting smaller towns because card payments may not always be available."
];

function setFooterDates() {
  const year = document.querySelector("#currentyear");
  const modified = document.querySelector("#lastModified");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (modified) {
    modified.textContent = `Last Modified: ${document.lastModified}`;
  }
}

function toggleMenu() {
  const menuButton = document.querySelector("#menuButton");
  const navigation = document.querySelector("#navigation");

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      navigation.classList.toggle("open");

      if (navigation.classList.contains("open")) {
        menuButton.textContent = "✕";
      } else {
        menuButton.textContent = "☰";
      }
    });
  }
}

function createDestinationCard(destination) {
  return `
    <article class="card">
      <img src="${destination.image}" alt="${destination.name}" loading="lazy" width="400" height="260">
      <div class="card-content">
        <h3>${destination.name}</h3>
        <p>${destination.description}</p>
      </div>
    </article>
  `;
}

function displayFeaturedDestinations() {
  const featuredContainer = document.querySelector("#featuredDestinations");

  if (featuredContainer) {
    featuredContainer.innerHTML = destinations.map(createDestinationCard).join("");
  }
}

function displayDestinations(filter = "all") {
  const destinationContainer = document.querySelector("#destinationCards");

  if (destinationContainer) {
    let filteredDestinations = destinations;

    if (filter !== "all") {
      filteredDestinations = destinations.filter((destination) => destination.category === filter);
    }

    destinationContainer.innerHTML = filteredDestinations.map(createDestinationCard).join("");
  }
}

function setupFilters() {
  const filterButtons = document.querySelectorAll(".filterButton");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      displayDestinations(filter);
    });
  });
}

function displayVisitCount() {
  const visitCountElement = document.querySelector("#visitCount");

  if (visitCountElement) {
    let visits = Number(localStorage.getItem("mozambiqueVisitCount")) || 0;
    visits += 1;
    localStorage.setItem("mozambiqueVisitCount", visits);
    visitCountElement.textContent = visits;
  }
}

function displayRandomTip() {
  const travelTip = document.querySelector("#travelTip");

  if (travelTip) {
    const randomIndex = Math.floor(Math.random() * tips.length);
    travelTip.textContent = tips[randomIndex];
  }
}

function setupTipButton() {
  const tipButton = document.querySelector("#tipButton");

  if (tipButton) {
    tipButton.addEventListener("click", displayRandomTip);
  }
}

function setupContactForm() {
  const form = document.querySelector("#contactForm");
  const formMessage = document.querySelector("#formMessage");

  if (form && formMessage) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const name = document.querySelector("#name").value.trim();
      const interest = document.querySelector("#interest").value;
      const message = document.querySelector("#message").value.trim();

      if (name !== "" && interest !== "" && message !== "") {
        localStorage.setItem("travelerName", name);
        localStorage.setItem("travelerInterest", interest);

        formMessage.textContent = `Thank you, ${name}. Your interest in ${interest} travel has been saved.`;
        form.reset();
      } else {
        formMessage.textContent = "Please complete all required fields.";
      }
    });
  }
}

setFooterDates();
toggleMenu();
displayFeaturedDestinations();
displayDestinations();
setupFilters();
displayVisitCount();
displayRandomTip();
setupTipButton();
setupContactForm();