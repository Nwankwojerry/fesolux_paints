"use strict";

const yearElement = document.querySelector("#current-year");
const menuButton = document.querySelector(".site-header__menu");
const navigation = document.querySelector("#primary-navigation");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement && navigation.classList.contains("is-open")) {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
    }
  });
}
