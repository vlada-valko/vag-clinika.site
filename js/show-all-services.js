const showAllServices = document.querySelector(".show-all-services");
const servicesBlock = document.querySelector(".services");
const btn = document.getElementById("show-price");

// Функція для відкриття servicesBlock
function toggleServicesBlock(isFullHeight = true) {
    if (isFullHeight) {
        // Розгортаємо на всю висоту
        const contentHeight = servicesBlock.scrollHeight;
        servicesBlock.style.height = contentHeight + "px";
        servicesBlock.addEventListener("transitionend", function () {
            servicesBlock.classList.add("full-height");
            servicesBlock.style.height = ''; // Скидаємо висоту після анімації
        });
    } else {
        // Перевіряємо ширину екрану перед тим, як встановлювати висоту 1400px
        if (window.innerWidth <= 1000) {
            servicesBlock.style.height = "1400px";
        } else {
            servicesBlock.style.height = ""; // Не встановлюємо 1400px, залишаємо за замовчуванням
        }
    }
}

if (showAllServices && servicesBlock) {
    // Розгортання/згортання по кліку на showAllServices
    showAllServices.addEventListener("click", () => {
        // Якщо блок вже повністю відкритий, то будемо його закривати
        if (servicesBlock.classList.contains("full-height")) {
            servicesBlock.style.height = servicesBlock.scrollHeight + "px"; 
            setTimeout(() => {
                servicesBlock.style.height = "0"; 
            }, 20); 

            servicesBlock.scrollIntoView({ behavior: "smooth" });

            servicesBlock.addEventListener("transitionend", () => {
                servicesBlock.classList.remove("full-height");
                servicesBlock.style.height = ''; // Скидаємо висоту після анімації
            });
        } else {
            // Якщо блок ще не повністю відкритий, розгортаємо його повністю
            toggleServicesBlock(true); // Викликаємо для повного розгортання
        }
    });
}

if (btn) {
    // Розгортання по кліку на btn на 400px або іншу висоту, якщо ширина екрану більше 1000px
    btn.addEventListener("click", () => {
        // Перевіряємо ширину екрану
        if (window.innerWidth <= 1000) {
            // Перевіряємо, чи блок не в стані full-height (не розгорнутий на всю висоту)
            if (!servicesBlock.classList.contains("full-height")) {
                // Перевіряємо, чи не розгорнутий блок більше на 400px
                if (parseInt(servicesBlock.style.height) !== 1400) {
                    toggleServicesBlock(false); // Розгортаємо лише на 400px
                }
            }
        } else {
            // Якщо ширина екрану більша за 1000px, не даємо розгорнути більше, ніж потрібно
            toggleServicesBlock(false); // Розгортаємо на іншу висоту або залишаємо стандартну
        }
    });
}
