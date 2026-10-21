/* =========================================================
   Personal portfolio: script.js
   Three small features, each in its own section:
   1. Mobile menu open/close
   2. Highlight the current section in the navigation
   3. Show the current year in the footer
   ========================================================= */

// Tell the CSS that JavaScript is working (the mobile menu styles depend on this)
document.documentElement.classList.add("js");

/* ---------- 1. Mobile menu ---------- */
const navToggle = document.getElementById("nav-toggle");
const siteNav = document.getElementById("site-nav");

function setMenu(isOpen) {
  siteNav.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
}

navToggle.addEventListener("click", function () {
  const isOpen = navToggle.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

// Close the menu after choosing a link
siteNav.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    setMenu(false);
  });
});

// Close the menu with the Escape key and return focus to the button
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
    setMenu(false);
    navToggle.focus();
  }
});

/* ---------- 2. Highlight the current section in the nav ---------- */
const navLinks = document.querySelectorAll(".site-nav a");
const sections = document.querySelectorAll("main section[id]");

function highlightLink(sectionId) {
  navLinks.forEach(function (link) {
    const isCurrent = link.getAttribute("href") === "#" + sectionId;
    link.classList.toggle("active", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "true");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          highlightLink(entry.target.id);
        }
      });
    },
    // A section counts as "current" when it crosses the middle of the screen
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
}

/* ---------- 3. Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
