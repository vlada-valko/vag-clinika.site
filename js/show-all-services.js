const showAllServices = document.querySelector(".show-all-services");
const servicesBlock = document.querySelector(".services");

let initialHeight = servicesBlock ? servicesBlock.offsetHeight : 0;

function toggleServicesBlock(isFullHeight = true) {
    if (!servicesBlock) return;

    if (isFullHeight) {
        const contentHeight = servicesBlock.scrollHeight;
        servicesBlock.style.height = contentHeight + "px";
        servicesBlock.addEventListener("transitionend", function handler() {
            servicesBlock.classList.add("full-height");
            servicesBlock.style.height = "";
            servicesBlock.removeEventListener("transitionend", handler);
        });
    } else {
        if (window.innerWidth <= 1000) {
            servicesBlock.style.transition = "height 0.3s ease";
            servicesBlock.style.height = servicesBlock.scrollHeight + "px";

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    servicesBlock.style.height = initialHeight + "px"; 
                });
            });

            servicesBlock.addEventListener("transitionend", function handler() {
                servicesBlock.style.transition = "";
                servicesBlock.removeEventListener("transitionend", handler);
            });
        } else {
            servicesBlock.style.height = "";
        }
    }
}

if (showAllServices && servicesBlock) {
    showAllServices.addEventListener("click", () => {
        if (servicesBlock.classList.contains("full-height")) {
            servicesBlock.style.height = servicesBlock.scrollHeight + "px";

            setTimeout(() => {
                servicesBlock.style.height = initialHeight + "px"; 
            }, 20);

            servicesBlock.scrollIntoView({ behavior: "smooth" });

            servicesBlock.addEventListener("transitionend", function handler() {
                servicesBlock.classList.remove("full-height");
                servicesBlock.style.height = "";
                servicesBlock.removeEventListener("transitionend", handler);
            });
        } else {
            toggleServicesBlock(true);
        }
    });
}

function expandServicesForCard(card) {
    if (window.innerWidth > 1000 || !servicesBlock) return;
    if (servicesBlock.classList.contains("full-height")) return;

    const cardBottom = card.offsetTop + card.offsetHeight;
    const currentHeight = servicesBlock.offsetHeight;

    if (cardBottom > currentHeight) {
        servicesBlock.style.height = (cardBottom + 60) + "px";
    }
}

function collapseServicesIfNoVisiblePrices() {
    if (window.innerWidth > 1000 || !servicesBlock) return;

    const anyOpen = document.querySelector(".services__card.price-visible");
    if (!anyOpen && !servicesBlock.classList.contains("full-height")) {
        toggleServicesBlock(false);
    }
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (
            mutation.type === "attributes" &&
            mutation.attributeName === "class" &&
            mutation.target.classList.contains("services__card")
        ) {
            const card = mutation.target;
            if (card.classList.contains("price-visible")) {
                expandServicesForCard(card);
            } else {
                collapseServicesIfNoVisiblePrices();
            }
        }
    });
});

document.querySelectorAll(".services__card").forEach((card) => {
    observer.observe(card, { attributes: true });
});
