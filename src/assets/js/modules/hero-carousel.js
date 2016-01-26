import '../vendors/glide.js';

const heroCarousel = document.querySelector('.heroCarousel');

jQuery(heroCarousel).glide({
  type: 'carousel',
  autoplay: false,
  classes: {
    base: 'heroCarousel',
    wrapper: 'heroCarousel__frame',
    track: 'heroCarousel__track',
    slide: 'heroCarousel__item'
  }
});
