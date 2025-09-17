// Initialize after DOM is ready (defer set in HTML)
document.addEventListener("DOMContentLoaded", () => {
  // Footer year
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Robust Last Modified (fallback if host doesn't provide it)
  const lm = document.getElementById("lastModified");
  if (lm) {
    const d = new Date(document.lastModified);
    lm.textContent = isNaN(d)
      ? "Unavailable"
      : d.toLocaleString(undefined, {
          year: "numeric", month: "2-digit", day: "2-digit",
          hour: "2-digit", minute: "2-digit", second: "2-digit"
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

    // Close menu after choosing a link (mobile UX nicety)
    nav.addEventListener("click", (e) => {
      if (e.target.matches(".nav__link") && nav.classList.contains("open")) toggle();
    });
  }
});
