async function init() {
    try {
        await import("./menu.js");
        console.log("menu.js loaded");
        await import("./outer-slider.js");
        console.log("outer-slider.js loaded");
        await import("./slick.min.js");
        console.log("slick.min.js loaded");
        await import("./photo-carousel.js");
        console.log("photo-carousel.js loaded");
        await import("./show-all-services.js");
        console.log("show-all-services.js loaded");
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
