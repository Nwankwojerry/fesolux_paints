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

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    initializeNavigation();
  }
});
