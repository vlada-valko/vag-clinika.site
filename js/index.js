async function init() {
    try {
        await import("./menu.js");
        await import("./outer-slider.js");
        await import("./slick.min.js");
        await import("./prices.js");
        await import("./photo-carousel.js");
        await import("./show-all-services.js");
        await import("./price-show.js");
    } catch (error) {
        console.error("Error loading scripts:", error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const scrollToTopButton = document.getElementById("scrollToTop");

    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            scrollToTopButton.style.display = "flex";
        } else {
            scrollToTopButton.style.display = "none";
        }
    });

    scrollToTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
    let loadedPartialsCount = 0;

    if (totalPartials === 0) {
        init(); 
    } else {
        document.body.addEventListener('htmx:afterOnLoad', () => {
            loadedPartialsCount++;
            if (loadedPartialsCount >= totalPartials) init();
        });
    }
});
