"use strict";

const yearElement = document.querySelector("#current-year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

let navigationController;

function initializeNavigation() {
  navigationController?.abort();

  const menuButton = document.querySelector(".site-header__menu");
  if (!menuButton) return;

  const navigationId = menuButton.getAttribute("aria-controls");
  const navigation = navigationId ? document.getElementById(navigationId) : null;
  const header = menuButton.closest(".site-header");
  if (!navigation || !header || !header.contains(navigation)) return;

  const controller = new AbortController();
  const { signal } = controller;
  navigationController = controller;

  const servicesDropdown = navigation.querySelector(".site-header__dropdown");
  const servicesToggle = servicesDropdown?.querySelector(".site-header__dropdown-toggle");

  function closeServicesDropdown(restoreFocus = false) {
    if (!servicesDropdown || !servicesToggle) return;
    servicesDropdown.classList.remove("is-open");
    servicesToggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) servicesToggle.focus();
  }

  function closeNavigation(restoreFocus = false) {
    if (menuButton.getAttribute("aria-expanded") === "true") {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      document.body.classList.remove("navigation-open");
    }

    closeServicesDropdown(false);
    if (restoreFocus) menuButton.focus();
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

  servicesToggle?.addEventListener("click", () => {
    const isOpen = servicesToggle.getAttribute("aria-expanded") === "true";
    servicesDropdown.classList.toggle("is-open", !isOpen);
    servicesToggle.setAttribute("aria-expanded", String(!isOpen));
  }, { signal });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeNavigation();
    }
  }, { signal });

  document.addEventListener("pointerdown", (event) => {
    if (servicesDropdown?.classList.contains("is-open") &&
        event.target instanceof Node &&
        !servicesDropdown.contains(event.target)) {
      closeServicesDropdown();
    }

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
    if (event.key !== "Escape") return;

    if (servicesToggle?.getAttribute("aria-expanded") === "true") {
      closeServicesDropdown(true);
      return;
    }

    closeNavigation(true);
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


function initializeColourCatalogue() {
  const page = document.querySelector(".colours-page");
  if (!page) return;

  const searchInput = page.querySelector("#colour-search-input");
  const clearSearchButton = page.querySelector("#colour-search-clear");
  const filterButtons = Array.from(page.querySelectorAll("[data-colour-filter]"));
  const cards = Array.from(page.querySelectorAll("[data-colour-card]"));
  const resultsStatus = page.querySelector("#colour-results-status");
  const emptyState = page.querySelector("#colour-empty-state");
  const resetButton = page.querySelector("#colour-reset");
  const detailDialog = page.querySelector("#colour-detail-dialog");
  const detailSwatch = page.querySelector("#colour-detail-swatch");
  const detailName = page.querySelector("#colour-detail-name");
  const detailFamily = page.querySelector("#colour-detail-family");
  const detailCode = page.querySelector("#colour-detail-code");
  const detailDescription = page.querySelector("#colour-detail-description");
  const detailClose = page.querySelector("#colour-detail-close");
  const enquireLink = page.querySelector("#colour-detail-enquire");
  const copyButton = page.querySelector("#colour-detail-copy");
  const copyStatus = page.querySelector("#colour-detail-copy-status");

  if (!searchInput || !filterButtons.length || !cards.length || !detailDialog) return;

  const familyNames = {
    neutral: "Whites & creams",
    grey: "Greys",
    blue: "Blues",
    green: "Greens",
    yellow: "Yellows",
    red: "Reds",
    brown: "Browns",
    other: "Other shades"
  };

  let activeFamily = "all";
  let selectedShade = null;

  function applyColourFilters() {
    const query = searchInput.value.trim().toLocaleLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const familyMatches = activeFamily === "all" || card.dataset.colourFamily === activeFamily;
      const searchableText = [
        card.dataset.colourName,
        card.dataset.colourCode,
        card.dataset.colourValue,
        familyNames[card.dataset.colourFamily]
      ].filter(Boolean).join(" ").toLocaleLowerCase();
      const searchMatches = !query || searchableText.includes(query);
      const visible = familyMatches && searchMatches;

      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });

    filterButtons.forEach((button) => {
      const isActive = button.dataset.colourFilter === activeFamily;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    if (clearSearchButton) clearSearchButton.hidden = query.length === 0;
    if (emptyState) emptyState.hidden = visibleCount > 0;

    if (resultsStatus) {
      resultsStatus.textContent = query || activeFamily !== "all"
        ? `Showing ${visibleCount} of ${cards.length} colour samples`
        : `Showing ${visibleCount} colour samples`;
    }
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeFamily = button.dataset.colourFilter || "all";
      applyColourFilters();
    });
  });

  searchInput.addEventListener("input", applyColourFilters);

  clearSearchButton?.addEventListener("click", () => {
    searchInput.value = "";
    applyColourFilters();
    searchInput.focus();
  });

  resetButton?.addEventListener("click", () => {
    activeFamily = "all";
    searchInput.value = "";
    applyColourFilters();
    searchInput.focus();
  });

  page.querySelectorAll("[data-inspiration-filter]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      activeFamily = link.dataset.inspirationFilter || "all";
      searchInput.value = "";
      applyColourFilters();
      page.querySelector("#colour-catalogue")?.scrollIntoView({ behavior: "smooth", block: "start" });
      searchInput.focus({ preventScroll: true });
    });
  });

  function openShadeDetails(card) {
    selectedShade = {
      name: card.dataset.colourName || "Colour sample",
      family: familyNames[card.dataset.colourFamily] || "Colour",
      reference: card.dataset.colourCode || "",
      value: (card.dataset.colourValue || "#ffffff").toUpperCase(),
      description: card.querySelector(".colour-card__description")?.textContent.trim() || ""
    };

    detailSwatch.style.backgroundColor = selectedShade.value;
    detailName.textContent = selectedShade.name;
    detailFamily.textContent = selectedShade.family;
    detailCode.textContent = `Sample reference: ${selectedShade.reference} · HEX preview: ${selectedShade.value}`;
    detailDescription.textContent = selectedShade.description;

    if (enquireLink) {
      const params = new URLSearchParams({
        colour: selectedShade.name,
        ref: selectedShade.reference,
        hex: selectedShade.value,
        family: selectedShade.family
      });
      enquireLink.href = `contact.html?${params.toString()}`;
    }

    if (copyStatus) copyStatus.textContent = "";
    if (typeof detailDialog.showModal === "function") detailDialog.showModal();
    else detailDialog.setAttribute("open", "");
  }

  page.querySelector("#colour-grid")?.addEventListener("click", (event) => {
    const card = event.target instanceof Element ? event.target.closest("[data-colour-card]") : null;
    const grid = page.querySelector("#colour-grid");
    if (card && grid?.contains(card) && !card.hidden) openShadeDetails(card);
  });

  function closeShadeDetails() {
    if (typeof detailDialog.close === "function" && detailDialog.open) detailDialog.close();
    else detailDialog.removeAttribute("open");
  }

  detailClose?.addEventListener("click", closeShadeDetails);
  detailDialog.addEventListener("click", (event) => {
    if (event.target === detailDialog) closeShadeDetails();
  });

  copyButton?.addEventListener("click", async () => {
    if (!selectedShade || !copyStatus) return;

    const lines = [
      `Colour: ${selectedShade.name}`,
      `Family: ${selectedShade.family}`,
      `Sample reference: ${selectedShade.reference}`,
      `HEX preview: ${selectedShade.value}`
    ];

    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard access is unavailable");
      await navigator.clipboard.writeText(lines.join("\n"));
      copyStatus.textContent = "Shade details copied.";
    } catch {
      copyStatus.textContent = "Copy is unavailable here. Please note the shade details.";
    }
  });
  
  applyColourFilters();
}

function initializeColourInspirationPhotos() {
  document.querySelectorAll("[data-photo-slot] .colour-inspiration-photo__image").forEach((image) => {
    const media = image.closest("[data-photo-slot]");
    const showPhoto = () => media?.classList.add("has-photo");
    image.addEventListener("load", showPhoto, { once: true });
    image.addEventListener("error", () => {
      image.hidden = true;
      media?.classList.remove("has-photo");
    }, { once: true });
    if (image.complete && image.naturalWidth > 0) showPhoto();
  });
}

function initializeColourContactPrefill() {
  const messageField = document.querySelector("#message");
  if (!messageField) return;

  const params = new URLSearchParams(window.location.search);
  const colour = params.get("colour");
  if (!colour) return;

  const reference = params.get("ref") || "";
  const hex = params.get("hex") || "";
  const family = params.get("family") || "";
  const messageLines = [
    "Hello Fesolux, I would like to enquire about this colour:",
    `Colour: ${colour}`,
    family ? `Colour family: ${family}` : "",
    reference ? `Sample reference: ${reference}` : "",
    hex ? `HEX preview: ${hex}` : "",
    "",
    "Please confirm its availability and whether a sample can be requested."
  ].filter((line, index, list) => line !== "" || (index > 0 && list[index - 1] !== ""));
  messageField.value = messageLines.join("\n");

  const context = document.querySelector("#colour-enquiry-context");
  if (context) context.hidden = false;
}

initializeColourCatalogue();
initializeColourInspirationPhotos();
initializeColourContactPrefill();

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    initializeNavigation();
  }
});
