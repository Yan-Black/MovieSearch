import Swiper from 'swiper';
import 'swiper/css/swiper.min.css';

const mySwiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  preloadImages: true,
  updateOnImagesReady: true,
  autoHeight: true,
  grabCursor: false,
  spaceBetween: 0,
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: 10,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  touchEventsTarget: 'wrapper',
  breakpoints: {
    300: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1300: {
      slidesPerView: 4,
    },
  },
});
export default mySwiper;
