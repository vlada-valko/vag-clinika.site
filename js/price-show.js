const btn = document.getElementById("show-price");
const card = document.querySelector(".services__card");
const seePrices = document.querySelector(".see-prices");
const collapse = document.querySelector(".collapse");

btn.addEventListener("click", () =>{
    if (card.classList.contains("price-visible")) {
card.classList.remove("price-visible");
seePrices.style.display="block";
collapse.style.display="none";
    }
else{
    card.classList.add("price-visible");
    collapse.style.display="block";
    seePrices.style.display="none";

}
})