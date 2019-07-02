"use strict";

var goTop = document.getElementsByClassName('btn-top')[0];
var scrolled;
var timer;
var mySwiper = new Swiper('.swiper-container', {
  speed: 400,
  direction: 'horizontal',
  spaceBetween: 100,
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    type: 'progressbar'
  },
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  // And if we need scrollbar
  scrollbar: {
    el: '.swiper-scrollbar',
    draggable: true
  },
  slideToClickedSlide: true
}); //плавная прокрутка к якорю
// собираем все якоря; устанавливаем время анимации и количество кадров

var anchors = [].slice.call(document.querySelectorAll('a[href*="#"]')),
    animationTime = 300,
    framesCount = 20;
anchors.forEach(function (item) {
  // каждому якорю присваиваем обработчик события
  item.addEventListener('click', function (e) {
    // убираем стандартное поведение
    e.preventDefault(); // для каждого якоря берем соответствующий ему элемент и определяем его координату Y

    var coordY = document.querySelector(item.getAttribute('href')).getBoundingClientRect().top; // запускаем интервал, в котором

    var scroller = setInterval(function () {
      // считаем на сколько скроллить за 1 такт
      var scrollBy = coordY / framesCount; // если к-во пикселей для скролла за 1 такт больше расстояния до элемента
      // и дно страницы не достигнуто

      if (scrollBy > window.pageYOffset - coordY && window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
        // то скроллим на к-во пикселей, которое соответствует одному такту
        window.scrollBy(0, scrollBy);
      } else {
        // иначе добираемся до элемента и выходим из интервала
        window.scrollTo(0, coordY);
        clearInterval(scroller);
      } // время интервала равняется частному от времени анимации и к-ва кадров

    }, animationTime / framesCount);
  });
}); // btn go to top from footer

goTop.onclick = function () {
  scrolled = window.pageYOffset;
  scrollToTop();
};

function scrollToTop() {
  if (scrolled > 0) {
    window.scrollTo(0, scrolled);
    scrolled = scrolled - 100;
    timer = setTimeout(scrollToTop, 30);
  } else {
    clearInterval(timer);
    window.scrollTo(0, 0);
  }
}

;