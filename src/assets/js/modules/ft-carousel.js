import tillstand from '../library/tillstand';
import '../vendors/glide.js';

const bullets = tillstand(document.querySelectorAll('.featureList__item'));
bullets.tillstand.instate('active');

console.log(bullets[0].tillstand);

jQuery('.featuresCarousel').glide({
  type: 'carousel',
  autoplay: false,
  animationDuration: 400,
  afterInit: highlighBullets,
  afterTransition: highlighBullets,
  classes: {
    base: 'featuresCarousel',
    wrapper: 'featuresCarousel__frame',
    track: 'featuresCarousel__track',
    slide: 'featuresCarousel__item'
  }
});

function highlighBullets(event) {
  let feature = event.current.data('content');
  for(let i = 0; i < bullets.length; i++) {
    let token = bullets[i].getAttribute('data-feature');
    let match = Boolean(token === feature);
    bullets[i].tillstand.active.set(match);
  }
}
