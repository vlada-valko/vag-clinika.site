document.querySelectorAll('.inner-slider').forEach(slider => {
    let sliderList = slider.querySelector('.slider-list'),
        sliderTrack = slider.querySelector('.slider-track'),
        slides = Array.from(slider.querySelectorAll('.slide')),
        arrows = slider.querySelector('.slider-arrows'),
        prev = arrows.children[0],
        next = arrows.children[1],
        slideIndex = 1,
        allowSwipe = true,
        transition = true;

    // 🔄 Клонування першого та останнього слайдів
    let firstClone = slides[0].cloneNode(true);
    let lastClone = slides[slides.length - 1].cloneNode(true);

    sliderTrack.appendChild(firstClone);
    sliderTrack.insertBefore(lastClone, slides[0]);

    // 🔄 Оновлення змінної slides після клонування
    slides = Array.from(slider.querySelectorAll('.slide'));
    let totalSlides = slides.length;

    // 📌 Встановлення однакової ширини для всіх слайдів
    slides.forEach(slide => {
        slide.style.width = '100%'; // Займає всю доступну ширину
    });

    // 📌 Функція для отримання поточної ширини контейнера
    let getSlideWidth = () => sliderList.clientWidth;

    // 📌 Встановлення початкової позиції
    sliderTrack.style.transition = 'none';
    sliderTrack.style.transform = `translateX(-${(slideIndex * 100)}%)`;

    // 📌 Функція для зміни слайдів
    let slide = function() {
        if (transition) {
            sliderTrack.style.transition = 'transform 0.5s ease-in-out';
        }
        sliderTrack.style.transform = `translateX(-${(slideIndex * 100)}%)`;
    };

    // 🎯 Подія завершення анімації (перемикає слайд без стрибка)
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

    // 🎯 Обробка натискання кнопок "вперед" і "назад"
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

    // 📌 Оновлення ширини при зміні розміру вікна
    window.addEventListener('resize', () => {
        sliderTrack.style.transition = 'none';
        sliderTrack.style.transform = `translateX(-${(slideIndex * 100)}%)`;
    });
});
