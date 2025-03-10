function init() {
    import("./menu.js");    
    import("./outer-slider .js");  
    import("./slick.min.js");
    import("./photo-carousel.js")
  }

  
  const totalPartials = document.querySelectorAll('[hx-trigger="load"], [data-hx-trigger="load"]').length;
let loadedPartialsCount = 0;

document.body.addEventListener('htmx:afterOnLoad', () => {
    loadedPartialsCount++;
    if (loadedPartialsCount === totalPartials) init();
});


