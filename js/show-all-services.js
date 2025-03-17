const showAllServices = document.querySelector(".show-all-services");
const servicesBlock = document.querySelector(".services");

if (showAllServices && servicesBlock) {
    showAllServices.addEventListener("click", () => {
        if (servicesBlock.classList.contains("full-height")) {
            servicesBlock.style.height = servicesBlock.scrollHeight + "px"; 
            setTimeout(() => {
                servicesBlock.style.height = "0"; 
            }, 20); 

            servicesBlock.scrollIntoView({ behavior: "smooth" });

            servicesBlock.addEventListener("transitionend", () => {
                servicesBlock.classList.remove("full-height");
                servicesBlock.style.height = ''; 
            });
        } else {
            const contentHeight = servicesBlock.scrollHeight;

            servicesBlock.style.height = contentHeight + "px";

            servicesBlock.addEventListener("transitionend", function () {
                servicesBlock.classList.add("full-height");
                servicesBlock.style.height = '';
            });
        }
    });
}
