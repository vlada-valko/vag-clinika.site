let currentlyVisibleCard = null; 

document.querySelectorAll(".services__card").forEach((card, index) => {
    const btn = card.querySelector(".show-price");
    const seePrices = card.querySelector(".see-prices");
    const collapse = card.querySelector(".collapse");
    const priceBlock = card.querySelector(".services__card-price");

    card.style.order = index + 1;

    if (!btn || !seePrices || !collapse || !priceBlock) return;

    btn.addEventListener("click", () => {
        if (currentlyVisibleCard && currentlyVisibleCard !== card) {
            const currentlyVisibleBtn = currentlyVisibleCard.querySelector(".show-price");
            currentlyVisibleCard.classList.remove("price-visible");

            currentlyVisibleCard.querySelector(".see-prices").style.display = "block";
            currentlyVisibleCard.querySelector(".collapse").style.display = "none";
            currentlyVisibleCard.querySelector(".services__card-price").style.display = "none";
        }

        const isVisible = card.classList.toggle("price-visible");

        seePrices.style.display = isVisible ? "none" : "block";
        collapse.style.display = isVisible ? "block" : "none";
        priceBlock.style.display = isVisible ? "block" : "none";

        if (isVisible && window.innerWidth > 1150) {
            if (parseInt(card.style.order) % 2 === 0) {
                card.style.order = parseInt(card.style.order) - 2;
            }
        } else if (!isVisible && window.innerWidth > 1150) {
            card.style.order = index + 1; 
        }

        if (isVisible) {
            currentlyVisibleCard = card;
        } else {
            currentlyVisibleCard = null;
        }
    });
});
