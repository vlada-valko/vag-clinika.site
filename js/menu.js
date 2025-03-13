const btnBurger = document.querySelector(".header__menu-burger");
const burgerLine = document.querySelector(".menu-burger-lines");
const navBlock = document.querySelector(".header__menu-and-social-media");
let navLinks = Array.from(document.querySelectorAll(".header__menu-item-li"));
let socialMediaLinks = Array.from(document.querySelectorAll(".social-media__item"));

let isAnimating = false;

// Скидаємо меню до початкового стану після завантаження сторінки
window.addEventListener("load", () => {
    resetMenuState();
    initializeMenuAnimation();
    addLinkClickHandlers(); // Додаємо обробники подій до посилань
});

// Слухаємо подію після завантаження контенту через HTMX
document.body.addEventListener("htmx:afterSwap", () => {
    resetMenuState();
    updateSelectors();
    initializeMenuAnimation();
    addLinkClickHandlers(); // Додаємо обробники подій до посилань
});

// Ініціалізація анімації меню
function initializeMenuAnimation() {
    navLinks.forEach((link) => link.classList.remove("nav-visible"));
    socialMediaLinks.forEach((link) => link.classList.remove("nav-visible"));
}

// Оновлюємо вибрані елементи
function updateSelectors() {
    navLinks = Array.from(document.querySelectorAll(".header__menu-item li"));
    socialMediaLinks = Array.from(document.querySelectorAll(".social-media__item"));
}

// Обробник для кнопки бургера
btnBurger.addEventListener("click", (event) => {
    event.preventDefault();
    if (isAnimating) return; // Якщо вже йде анімація - ігноруємо клік

    isAnimating = true;

    const isMenuOpen = navBlock.classList.contains("nav-visible");

    if (isMenuOpen) {
        closeMenu();
    } else {
        openMenu();
    }
});

// Функція для відкриття меню
function openMenu() {
    resetMenuState(); // Спочатку скидаємо всі стани

    // Відкриваємо меню
    navBlock.classList.add("nav-visible");
    burgerLine.classList.add("nav-visible");
    btnBurger.classList.add("nav-visible");

    // Пункти меню з'являються по черзі
    navLinks.forEach((link, index) => {
        setTimeout(() => link.classList.add("nav-visible"), index * 100);
    });

    // Соціальні мережі з'являються після меню
    setTimeout(() => {
        socialMediaLinks
            .slice()
            .reverse()
            .forEach((link, index) => {
                setTimeout(() => link.classList.add("nav-visible"), index * 50);
            });
    }, navLinks.length * 100);

    // Затримка для завершення анімації
    setTimeout(() => {
        isAnimating = false;
    }, (navLinks.length + socialMediaLinks.length) * 50);
}

// Функція для закриття меню
function closeMenu() {
    // Пункти меню зникають по черзі
    navLinks.forEach((link, index) => {
        setTimeout(() => link.classList.remove("nav-visible"), index * 50);
    });

    // Соціальні мережі зникають після меню
    setTimeout(() => {
        socialMediaLinks
            .slice()
            .reverse()
            .forEach((link, index) => {
                setTimeout(() => link.classList.remove("nav-visible"), index * 50);
            });
    }, navLinks.length * 50);

    // Після завершення анімації скидаємо все
    setTimeout(() => {
        resetMenuState();
        isAnimating = false;
    }, (navLinks.length + socialMediaLinks.length) * 50);
}

// Функція для скидання стану меню
function resetMenuState() {
    navBlock.classList.remove("nav-visible");
    burgerLine.classList.remove("nav-visible");
    btnBurger.classList.remove("nav-visible");

    navLinks.forEach((link) => link.classList.remove("nav-visible"));
    socialMediaLinks.forEach((link) => link.classList.remove("nav-visible"));
}

// Додаємо обробники подій до посилань
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