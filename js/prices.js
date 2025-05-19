import { services } from '../prices/ціни.js';


const container = document.querySelector(".services__container");

services.forEach((service) => {
  const card = document.createElement("div");
  card.className = "services__card";

  const cardInfo = document.createElement("div");
  cardInfo.className = "services__card-info";

  const img = document.createElement("img");
  img.src = service.img;
  const fileName = service.img.split('/').pop().split('.')[0];
  img.alt = `${fileName}`;  // Ось тут правильне присвоєння alt
  

  const cardText = document.createElement("div");
  cardText.className = "services__card__text";

  const h3 = document.createElement("h3");
  h3.textContent = service.title;

  const decor = document.createElement("span");
  decor.className = "decor";

  const pDescription = document.createElement("p");
  pDescription.className = "main-text";
  pDescription.textContent = service.description;

  const aBtn = document.createElement("a");
  aBtn.className = "red-btn show-price";
  aBtn.href = "javascript:void(0)";

  const pSeePrices = document.createElement("p");
  pSeePrices.className = "see-prices";
  pSeePrices.textContent = "Дізнатись ціни";

  const pCollapse = document.createElement("p");
  pCollapse.className = "collapse";
  pCollapse.textContent = "Згорнути";

  aBtn.appendChild(pSeePrices);
  aBtn.appendChild(pCollapse);

  cardText.appendChild(h3);
  cardText.appendChild(decor);
  cardText.appendChild(pDescription);
  cardText.appendChild(aBtn);

  cardInfo.appendChild(img);
  cardInfo.appendChild(cardText);

  const cardPrice = document.createElement("div");
  cardPrice.className = "services__card-price";

  const ul = document.createElement("ul");

  service.prices.forEach((priceText) => {
    const li = document.createElement("li");
    li.textContent = priceText;
    ul.appendChild(li);
  });

  cardPrice.appendChild(ul);

  card.appendChild(cardInfo);
  card.appendChild(cardPrice);

  container.appendChild(card);
});
