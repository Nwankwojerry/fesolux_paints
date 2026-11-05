"use strict";

const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

let navigationController;

function initializeNavigation() {
  navigationController?.abort();

  const menuButton = document.querySelector(".site-header__menu");
  if (!menuButton) {
    return;
  }

  const navigationId = menuButton.getAttribute("aria-controls");
  const navigation = navigationId ? document.getElementById(navigationId) : null;
  const header = menuButton.closest(".site-header");

  if (!navigation || !header || !header.contains(navigation)) {
    return;
  }

  const controller = new AbortController();
  const { signal } = controller;
  navigationController = controller;

  function closeNavigation(restoreFocus = false) {
    if (menuButton.getAttribute("aria-expanded") !== "true") {
      return;
    }

    navigation.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    document.body.classList.remove("navigation-open");

    if (restoreFocus) {
      menuButton.focus();
    }
  }

  menuButton.addEventListener("click", () => {
    if (menuButton.getAttribute("aria-expanded") === "true") {
      closeNavigation();
      return;
    }

    navigation.classList.add("is-open");
    menuButton.setAttribute("aria-expanded", "true");
    menuButton.setAttribute("aria-label", "Close navigation");
    document.body.classList.add("navigation-open");
  }, { signal });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeNavigation();
    }
  }, { signal });

  document.addEventListener("pointerdown", (event) => {
    if (
      menuButton.getAttribute("aria-expanded") === "true" &&
      event.target instanceof Node &&
      !navigation.contains(event.target) &&
      !menuButton.contains(event.target)
    ) {
      closeNavigation();
    }
  }, { signal });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeNavigation(true);
    }
  }, { signal });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeNavigation();
    }
  }, { signal });

  window.addEventListener("pagehide", () => {
    closeNavigation();
    controller.abort();
  }, { signal, once: true });
}

initializeNavigation();


function initializeCatalogue() {
  const filterButtons = Array.from(document.querySelectorAll("[data-category-filter]"));
  const productGrid = document.querySelector("#catalogue-product-grid");
  const emptyState = document.querySelector("#catalogue-empty-state");

  if (!filterButtons.length || !productGrid) {
    return;
  }

  const productCards = Array.from(productGrid.querySelectorAll("[data-product-category]"));

  function applyFilter(category) {
    let visibleCount = 0;

    productCards.forEach((card) => {
      const matches = category === "all" || card.dataset.productCategory === category;
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.categoryFilter === category;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }

    scheduleReadMoreMeasurement();
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyFilter(button.dataset.categoryFilter || "all");
    });
  });

  function measureReadMore() {
    productCards.forEach((card) => {
      if (card.hidden) return;

      const details = card.querySelector(".catalogue-product-card__details");
      const readMoreButton = card.querySelector("[data-read-more]");
      if (!details || !readMoreButton) return;

      const wasExpanded = details.classList.contains("is-expanded");
      details.classList.remove("is-expanded");

      const textBlocks = Array.from(details.querySelectorAll(
        ".catalogue-product-card__description, .catalogue-product-card__recommendation"
      ));
      const hasOverflow = textBlocks.some((block) => block.scrollHeight > block.clientHeight + 1);

      if (hasOverflow) {
        readMoreButton.hidden = false;
        if (wasExpanded) {
          details.classList.add("is-expanded");
          readMoreButton.setAttribute("aria-expanded", "true");
          readMoreButton.textContent = "Read less";
        } else {
          readMoreButton.setAttribute("aria-expanded", "false");
          readMoreButton.textContent = "Read more";
        }
      } else {
        details.classList.remove("is-expanded");
        readMoreButton.hidden = true;
        readMoreButton.setAttribute("aria-expanded", "false");
        readMoreButton.textContent = "Read more";
      }
    });
  }

  let measurementFrame = 0;
  function scheduleReadMoreMeasurement() {
    if (measurementFrame) {
      cancelAnimationFrame(measurementFrame);
    }
    measurementFrame = requestAnimationFrame(() => {
      measurementFrame = 0;
      measureReadMore();
    });
  }

  productGrid.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-read-more]") : null;
    if (!button || !productGrid.contains(button)) return;

    const detailsId = button.getAttribute("aria-controls");
    const details = detailsId ? document.getElementById(detailsId) : null;
    if (!details || !productGrid.contains(details)) return;

    const isExpanded = details.classList.toggle("is-expanded");
    button.setAttribute("aria-expanded", String(isExpanded));
    button.textContent = isExpanded ? "Read less" : "Read more";
  });

  window.addEventListener("resize", scheduleReadMoreMeasurement, { passive: true });
  window.addEventListener("load", scheduleReadMoreMeasurement, { once: true });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(scheduleReadMoreMeasurement);
  }

  applyFilter("all");
  scheduleReadMoreMeasurement();
}

initializeCatalogue();

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    initializeNavigation();
  }
});
