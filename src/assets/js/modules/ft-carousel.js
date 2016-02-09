import '../vendors/glide.js';

jQuery('.featuresCarousel').glide({
  type: 'carousel',
  autoplay: 3000,
  animationDuration: 400,
  classes: {
    base: 'featuresCarousel',
    wrapper: 'featuresCarousel__frame',
    track: 'featuresCarousel__track',
    slide: 'featuresCarousel__item',
    bullets: 'featuresCarousel__bullets',
    bullet: 'featuresCarousel__bullet'
  }
});
