import Headroom from 'headroom.js';
import state from './library/state.js';
import velocity from './library/velocity.js';
import './library/glide.js';

const page = document.querySelector('.page');
const navigation = document.querySelector('.navbar');
const overlay = document.querySelector('.page__overlay');
const toggle = document.querySelector('.navbar__toggle');
const lines = document.querySelectorAll('.navbar__toggleLine');
const menu = document.querySelector('.navMenu');
const heroCarousel = document.querySelector('.heroCarousel');

const pageState = state(page);
const overlayState = state(overlay);
const toggleState = state(toggle);
const linesState = state(lines);
const menuState = state(menu);

const navHeadroom = new Headroom(navigation, {
  offset: ((2 * window.innerWidth)/16.5) * 2
});
navHeadroom.init();

toggle.addEventListener('click', function(e) {
  overlayState.toggle('active');
  toggleState.toggle('active');
  linesState.toggle('active');
  menuState.toggle('active');
  pageState.toggle('locked');
});
overlay.addEventListener('click', function(e) {
  overlayState.set('active', false);
  toggleState.set('active', false);
  linesState.set('active', false);
  menuState.set('active', false);
  pageState.set('locked', false);
});
window.addEventListener('resize', function(e) {
  if (window.innerWidth >= 700 && menuState.get('active')) {
    overlayState.set('active', false);
    toggleState.set('active', false);
    linesState.set('active', false);
    menuState.set('active', false);
    pageState.set('locked', false);
  }
});


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
