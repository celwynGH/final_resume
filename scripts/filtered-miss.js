document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("main-nav");
  const gallery = document.querySelector(".gallery");

  // Toggle menu
  hamburger.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    hamburger.textContent = isOpen ? "✕" : "☰";
    hamburger.setAttribute("aria-expanded", isOpen);
  });

  // Auto close when clicking links (mobile)
  mainNav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        hamburger.textContent = "☰";
        hamburger.setAttribute("aria-expanded", false);
      }
    });
  });

  // Footer dynamic year + last modified
  document.getElementById("copyright-year").textContent = new Date().getFullYear();
  document.getElementById("last-modified").textContent = document.lastModified;

  // ---------- Temple Data ----------
  const temples = [
    {
      templeName: "Davao Philippines",
      location: "Davao Philippines",
      dedicated: "2020, November, 14",
      area: 18450,
      imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/davao-philippines-temple/davao-philippines-temple-11690.jpg"
    },
    {
      templeName: "Cagayan de Oro Philippines",
      location: "Cagayan de Oro Philippines",
      dedicated: "2024, August, 31",
      area: 18449,
      imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/cagayan-de-oro-philippines-temple/cagayan-de-oro-philippines-temple-50369.jpg"
    },
    {
      templeName: "Alabang Philippines",
      location: "Alabang Philippines",
      dedicated: "2026, January, 18",
      area: 0,
      imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/alabang-philippines-temple/alabang-philippines-temple-8191.jpg"
    },
    {
      templeName: "San Jose Del Monte Philippines",
      location: "San Jose Del Monte Philippines",
      dedicated: "No date yet",
      area: 0,
      imageUrl: "No image URL yet"
    },
    {
      templeName: "Manila Philippines",
      location: "Manila Philippines",
      dedicated: "1984, September, 25-27",
      area: 26683,
      imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/_temp/029-Manila-Philippines-Temple.jpg"
    },
    {
      templeName: "Urdaneta Philippines",
      location: "Urdaneta Philippines",
      dedicated: "2024, April, 28",
      area: 32604,
      imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/urdaneta-philippines-temple/urdaneta-philippines-temple-45874-main.jpg"
    },
    {
      templeName: "Tuguegarao City Philippines",
      location: "Tuguegarao City Philippines",
      dedicated: "No date yet",
      area: 18850,
      imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/tuguegarao-city-philippines-temple/tuguegarao-city-philippines-temple-57610-main.jpg"
    },
    {
      templeName: "Tacloban City Philippines",
      location: "Tacloban City Philippines",
      dedicated: "No date yet",
      area: 21407,
      imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/tacloban-city-philippines-temple/tacloban-city-philippines-temple-55808-main.jpg"
    },
    {
      templeName: "Cebu City Philippines",
      location: "Cebu City Philippines",
      dedicated: "2010, June, 13",
      area: 29556,
      imageUrl:
        "https://churchofjesuschristtemples.org/assets/img/temples/_temp/133-Cebu-City-Philippines-Temple.jpg"
    }
  ];

  // ---------- Helper: Extract Year ----------
  function getDedicatedYear(dedicated) {
    const yearMatch = dedicated.match(/\d{4}/);
    return yearMatch ? parseInt(yearMatch[0]) : null;
  }

  // ---------- Function to Display ----------
  function displayTemples(filteredTemples) {
    gallery.innerHTML = ""; // clear old cards

    filteredTemples.forEach(t => {
      const card = document.createElement("figure");
      card.innerHTML = `
        <h3>${t.templeName}</h3>
        <p><strong>Location:</strong> ${t.location}</p>
        <p><strong>Dedicated:</strong> ${t.dedicated}</p>
        <p><strong>Size:</strong> ${t.area} sq ft</p>
        <img src="${t.imageUrl}" alt="${t.templeName}" loading="lazy">
      `;
      gallery.appendChild(card);
    });
  }

  // ---------- Filters ----------
  function filterTemples(criteria) {
    let filtered;
    switch (criteria) {
      case "old":
        filtered = temples.filter(t => {
          const year = getDedicatedYear(t.dedicated);
          return year && year < 1900;
        });
        break;
      case "new":
        filtered = temples.filter(t => {
          const year = getDedicatedYear(t.dedicated);
          return year && year > 2000;
        });
        break;
      case "large":
        filtered = temples.filter(t => t.area > 90000);
        break;
      case "small":
        filtered = temples.filter(t => t.area > 0 && t.area < 10000);
        break;
      default: // home
        filtered = temples;
    }
    displayTemples(filtered);
  }

  // ---------- Event Listeners for Menu ----------
  document.querySelectorAll("#main-nav a").forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const choice = link.textContent.toLowerCase();
      filterTemples(choice);
      document.querySelector("main h1").textContent = link.textContent;
    });
  });

  // Load all temples by default
  filterTemples("home");
});
