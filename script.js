(function () {
  document.documentElement.classList.add("js");

  var navToggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  var menuButtons = document.querySelectorAll("[data-menu-button]");

  function closeMenus(except) {
    menuButtons.forEach(function (button) {
      var group = button.closest(".nav-group");
      if (group !== except) {
        group.classList.remove("is-open");
        button.setAttribute("aria-expanded", "false");
      }
    });
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  menuButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.stopPropagation();
      var group = button.closest(".nav-group");
      var open = group.classList.toggle("is-open");
      closeMenus(group);
      button.setAttribute("aria-expanded", String(open));
    });
  });

  document.addEventListener("click", function () {
    closeMenus();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMenus();
      if (nav && navToggle) {
        nav.classList.remove("is-open");
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      }
    }
  });

  var revealItems = document.querySelectorAll("[data-reveal]");
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px 140px 0px" }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
})();
