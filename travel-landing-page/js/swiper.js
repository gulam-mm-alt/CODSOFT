var swiper = new Swiper(".banner-swiper", {
  loop: true,
  speed: 1000,          // faster transition
  effect: "fade",     // smooth fade instead of cube
  grabCursor: true,

  autoplay: {           // auto‑play slides
    delay: 8000,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

});