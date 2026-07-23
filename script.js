// Wait for DOM content to load
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

    // --- Lightbox Functions ---

    // Open Lightbox at a specific index
    function openLightbox(index) {
        if (visibleCards.length === 0) return;
        currentIndex = index;
        const img = visibleCards[currentIndex].querySelector("img");
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "Gallery Image";
        lightbox.style.display = "flex";
    }

    // Close Lightbox
    function closeLightbox() {
        lightbox.style.display = "none";
        lightboxImg.src = "";
    }

    // Show Next Image
    function showNext() {
        if (visibleCards.length === 0) return;
        currentIndex = (currentIndex + 1) % visibleCards.length;
        openLightbox(currentIndex);
    }

    // Show Previous Image
    function showPrev() {
        if (visibleCards.length === 0) return;
        currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
        openLightbox(currentIndex);
    }

    // --- Event Listeners ---

    // Click event for each card to open lightbox
    cards.forEach((card) => {
        card.addEventListener("click", () => {
            const indexInVisible = visibleCards.indexOf(card);
            if (indexInVisible !== -1) {
                openLightbox(indexInVisible);
            }
        });
    });

    // Control Button Clicks
    closeBtn.addEventListener("click", closeLightbox);
    nextBtn.addEventListener("click", showNext);
    prevBtn.addEventListener("click", showPrev);

    // Close when clicking outside the image container
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard Navigation (Esc, Left Arrow, Right Arrow)
    document.addEventListener("keydown", (e) => {
        if (lightbox.style.display === "flex") {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "ArrowLeft") showPrev();
        }
    });

    // --- Filtering & Search Global Helper Functions ---

    // Helper to update visible cards list for lightbox navigation
    function updateVisibleCards() {
        visibleCards = cards.filter(card => card.style.display !== "none");
    }

    // Global Category Filter
    window.filterGallery = function(category) {
        cards.forEach((card) => {
            if (category === "all" || card.classList.contains(category)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
        // Clear search input on category filter change
        document.getElementById("search").value = "";
        updateVisibleCards();
    };

    // Global Search Functionality
    window.searchImages = function() {
        const query = document.getElementById("search").value.toLowerCase().trim();
        
        cards.forEach((card) => {
            const title = card.querySelector("h3").textContent.toLowerCase();
            if (title.includes(query)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
        updateVisibleCards();
    };
});
