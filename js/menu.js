const btnBurger = document.querySelector(".header__menu-burger");
const burgerLine = document.querySelector(".menu-burger-lines");
const navBlock = document.querySelector(".header__menu-and-social-media");
let navLinks = Array.from(document.querySelectorAll(".header__menu-item-li"));
let socialMediaLinks = Array.from(document.querySelectorAll(".social-media__item"));

let isAnimating = false;

window.addEventListener("load", () => {
    resetMenuState();
    initializeMenuAnimation();
    addLinkClickHandlers(); 
});

document.body.addEventListener("htmx:afterSwap", () => {
    resetMenuState();
    updateSelectors();
    initializeMenuAnimation();
    addLinkClickHandlers();
});

function initializeMenuAnimation() {
    navLinks.forEach((link) => link.classList.remove("nav-visible"));
    socialMediaLinks.forEach((link) => link.classList.remove("nav-visible"));
}

function updateSelectors() {
    navLinks = Array.from(document.querySelectorAll(".header__menu-item li"));
    socialMediaLinks = Array.from(document.querySelectorAll(".social-media__item"));
}

btnBurger.addEventListener("click", (event) => {
    event.preventDefault();
    if (isAnimating) return;

    isAnimating = true;

    const isMenuOpen = navBlock.classList.contains("nav-visible");

    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

function openMenu() {
    resetMenuState(); 
    navBlock.classList.add("nav-visible");
    burgerLine.classList.add("nav-visible");
    btnBurger.classList.add("nav-visible");

    navLinks.forEach((link, index) => {
        setTimeout(() => link.classList.add("nav-visible"), index * 100);
    });

    setTimeout(() => {
        socialMediaLinks
            .slice()
            .reverse()
            .forEach((link, index) => {
                setTimeout(() => link.classList.add("nav-visible"), index * 50);
            });
    }, navLinks.length * 100);

    setTimeout(() => {
        isAnimating = false;
    }, (navLinks.length + socialMediaLinks.length) * 50);
}

function closeMenu() {
    navLinks.forEach((link, index) => {
        setTimeout(() => link.classList.remove("nav-visible"), index * 50);
    });

    setTimeout(() => {
        socialMediaLinks
            .slice()
            .reverse()
            .forEach((link, index) => {
                setTimeout(() => link.classList.remove("nav-visible"), index * 50);
            });
    }, navLinks.length * 50);

    setTimeout(() => {
        resetMenuState();
        isAnimating = false;
    }, (navLinks.length + socialMediaLinks.length) * 50);
}

function resetMenuState() {
    navBlock.classList.remove("nav-visible");
    burgerLine.classList.remove("nav-visible");
    btnBurger.classList.remove("nav-visible");

    navLinks.forEach((link) => link.classList.remove("nav-visible"));
    socialMediaLinks.forEach((link) => link.classList.remove("nav-visible"));
}

function addLinkClickHandlers() {
    const menuLinks = document.querySelectorAll(".header__menu-item li a");
    if (menuLinks) {
        menuLinks.forEach((link) => {
            link.addEventListener("click", () => {
                closeMenu();
            });
        });
    }
}