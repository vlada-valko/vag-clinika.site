let currentlyVisibleCard = null; // Змінна для зберігання поточно відкритої картки

document.querySelectorAll(".services__card").forEach((card, index) => {
    const btn = card.querySelector(".show-price");
    const seePrices = card.querySelector(".see-prices");
    const collapse = card.querySelector(".collapse");
    const priceBlock = card.querySelector(".services__card-price");

    // Початкове значення order
    card.style.order = index + 1;

    if (!btn || !seePrices || !collapse || !priceBlock) return;

    btn.addEventListener("click", () => {
        // Якщо є інша картка, що відкрито, закрити її
        if (currentlyVisibleCard && currentlyVisibleCard !== card) {
            const currentlyVisibleBtn = currentlyVisibleCard.querySelector(".show-price");
            currentlyVisibleCard.classList.remove("price-visible");

            // Сховати ціни в іншій картці
            currentlyVisibleCard.querySelector(".see-prices").style.display = "block";
            currentlyVisibleCard.querySelector(".collapse").style.display = "none";
            currentlyVisibleCard.querySelector(".services__card-price").style.display = "none";
        }

        const isVisible = card.classList.toggle("price-visible");

        // Оновлення відображення блоків
        seePrices.style.display = isVisible ? "none" : "block";
        collapse.style.display = isVisible ? "block" : "none";
        priceBlock.style.display = isVisible ? "block" : "none";

        // Зміна order тільки на екранах ширше 1150 пікселів
        if (isVisible && window.innerWidth > 1150) {
            if (parseInt(card.style.order) % 2 === 0) {
                card.style.order = parseInt(card.style.order) - 2; // Зменшуємо order на 3
            }
        } else if (!isVisible && window.innerWidth > 1150) {
            card.style.order = index + 1; // Повертаємо початковий order
        }

        if (isVisible) {
            // Записуємо поточну відкриту картку
            currentlyVisibleCard = card;
        } else {
            currentlyVisibleCard = null; // Скидаємо поточну відкриту картку
        }
    });
});
