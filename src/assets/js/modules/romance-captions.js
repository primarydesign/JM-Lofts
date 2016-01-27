import '../vendors/glide.js';

const carousel = document.querySelector('.romanceCaptions');

jQuery(carousel).glide({
  type: 'carousel',
  mode: 'vertical',
  autoplay: false,
  animationDuration: 400,
  classes: {
    base: 'romanceCaptions',
    wrapper: 'romanceCaptions__frame',
    track: 'romanceCaptions__track',
    slide: 'romanceCaptions__caption'
  }
});
