document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("main-nav");

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
});
