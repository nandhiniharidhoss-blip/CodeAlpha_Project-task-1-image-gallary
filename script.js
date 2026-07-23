document.addEventListener("DOMContentLoaded", () => {
  // Lightbox Elements
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("lightbox-close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  // Gallery Cards and State Variables
  const cards = Array.from(document.querySelectorAll(".gallery .card"));
  let visibleCards = [...cards];
  let currentIndex = 0;

  // --- Helper for Fullscreen ---
  function openInFullScreen(element) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari / iOS */
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
      element.msRequestFullscreen();
    }
  }

  function exitFullScreen() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  // --- Helper to Update Displayed Image ---
  function updateLightboxImage() {
    const img = visibleCards[currentIndex].querySelector("img");
    if (img) {
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || "Gallery Image";
    }
  }

  // --- Lightbox Functions ---

  // Open Lightbox & Request Fullscreen
  function openLightbox(index) {
    if (visibleCards.length === 0) return;
    currentIndex = index;
    updateLightboxImage();
    lightbox.style.display = "flex";

    // Trigger native device full screen mode
    openInFullScreen(lightbox);
  }

  // Close Lightbox & Exit Fullscreen
  function closeLightbox() {
    lightbox.style.display = "none";
    lightboxImg.src = "";
    exitFullScreen();
  }

  // Show Next Image
  function showNext() {
    if (visibleCards.length === 0) return;
    currentIndex = (currentIndex + 1) % visibleCards.length;
    updateLightboxImage();
  }

  // Show Previous Image
  function showPrev() {
    if (visibleCards.length === 0) return;
    currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
    updateLightboxImage();
  }

  // --- Event Listeners ---

  // Touch / Click card to trigger full screen lightbox
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const indexInVisible = visibleCards.indexOf(card);
      if (indexInVisible !== -1) {
        openLightbox(indexInVisible);
      }
    });
  });

  // Control Buttons
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeLightbox();
  });

  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // Prevent modal close click
    showNext();
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    showPrev();
  });

  // Close when tapping outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Exit full screen event listener (handles system back gesture/ESC key)
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      lightbox.style.display = "none";
    }
  });

  // Keyboard Controls
  document.addEventListener("keydown", (e) => {
    if (lightbox.style.display === "flex") {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
  });

  // --- Filter & Search Functions ---

  function updateVisibleCards() {
    visibleCards = cards.filter(card => card.style.display !== "none");
  }

  window.filterGallery = function(category) {
    cards.forEach((card) => {
      if (category === "all" || card.classList.contains(category)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    const searchInput = document.getElementById("search");
    if (searchInput) searchInput.value = "";
    
    updateVisibleCards();
  };

  window.searchImages = function() {
    const searchInput = document.getElementById("search");
    if (!searchInput) return;

    const query = searchInput.value.toLowerCase().trim();
    cards.forEach((card) => {
      const title = card.querySelector("h3") ? card.querySelector("h3").textContent.toLowerCase() : "";
      if (title.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });

    updateVisibleCards();
  };
});
