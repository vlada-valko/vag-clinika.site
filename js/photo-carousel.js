document.querySelectorAll('.inner-slider').forEach(slider => {
    let sliderList = slider.querySelector('.slider-list'),
        sliderTrack = slider.querySelector('.slider-track'),
        slides = Array.from(slider.querySelectorAll('.slide ')),
        arrows = slider.querySelector('.slider-arrows'),
        prev = arrows.children[0],
        next = arrows.children[1],
        slideIndex = 1,
        allowSwipe = true,
        transition = true;

    let firstClone = slides[0].cloneNode(true);
    let lastClone = slides[slides.length - 1].cloneNode(true);

    sliderTrack.appendChild(firstClone);
    sliderTrack.insertBefore(lastClone, slides[0]);

    slides = Array.from(slider.querySelectorAll('.slide'));
    let totalSlides = slides.length;

    slides.forEach(slide => {
        slide.style.width = '100%'; 
    });

    let getSlideWidth = () => sliderList.clientWidth;

    sliderTrack.style.transition = 'none';
    sliderTrack.style.transform = `translateX(-${(slideIndex * 100)}%)`;

    let slide = function() {
        if (transition) {
            sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        }
        sliderTrack.style.transform = `translateX(-${(slideIndex * 100)}%)`;
    };

    sliderTrack.addEventListener('transitionend', () => {
        if (slideIndex === totalSlides - 1) {
            sliderTrack.style.transition = 'none';
            slideIndex = 1;
            sliderTrack.style.transform = `translateX(-${(slideIndex * 100)}%)`;
            setTimeout(() => (sliderTrack.style.transition = 'transform 0.5s ease-in-out'));
        } else if (slideIndex === 0) {
            sliderTrack.style.transition = 'none';
            slideIndex = totalSlides - 2;
            sliderTrack.style.transform = `translateX(-${(slideIndex * 100)}%)`;
            setTimeout(() => (sliderTrack.style.transition = 'transform 0.5s ease-in-out'));
        }
        allowSwipe = true;
    });

    arrows.addEventListener('click', function(event) {
        event.stopPropagation();
        if (!allowSwipe) return;
        allowSwipe = false;

        let target = event.target;
        if (target.classList.contains('next')) {
            slideIndex++;
        } else if (target.classList.contains('prev')) {
            slideIndex--;
        } else {
            allowSwipe = true;
            return;
        }

        slide();
    });

    window.addEventListener('resize', () => {
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = `translateX(-${(slideIndex * 100)}%)`;
    });
});



Fancybox.bind("[data-fancybox]", {});
