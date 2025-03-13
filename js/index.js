async function init() {
  await import("./menu.js");    
  await import("./outer-slider.js");  
  await import("./slick.min.js");
  await import("./photo-carousel.js");
}
document.addEventListener("DOMContentLoaded", function () {
  const scrollToTopButton = document.getElementById("scrollToTop");

  // Відображаємо кнопку при прокрутці вниз
  window.addEventListener("scroll", function () {
      if (window.scrollY > 300) {
          scrollToTopButton.style.display = "flex";
      } else {
          scrollToTopButton.style.display = "none";
      }
  });

  // Додаємо обробник кліку для плавного підняття
  scrollToTopButton.addEventListener("click", function () {
      window.scrollTo({
          top: 0,
          behavior: "smooth"
      });
  });
});

  
document.addEventListener("DOMContentLoaded", () => {
  const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
  let loadedPartialsCount = 0;

  if (totalPartials === 0) {
      init(); // Якщо немає `partials`, одразу запускаємо `init()`
  } else {
      document.body.addEventListener('htmx:afterOnLoad', () => {
          loadedPartialsCount++;
          if (loadedPartialsCount >= totalPartials) init();
      });
  }
});


