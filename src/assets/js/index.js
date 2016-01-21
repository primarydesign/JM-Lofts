const Headroom = require('headroom.js');
const state = require('./library/state.js');
const velocity = require('./library/velocity.js');

const page = document.querySelector('.page');
const navigation = document.querySelector('.navbar');
const overlay = document.querySelector('.page__overlay');
const toggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navMenu');

const pageState = state(page);
const overlayState = state(overlay);
const toggleState = state(toggle);
const menuState = state(menu);

const navHeadroom = new Headroom(navigation);
navHeadroom.init();

toggle.addEventListener('click', function(e) {
  overlayState.toggle('active');
  toggleState.toggle('active');
  menuState.toggle('active');
  pageState.toggle('locked');
});
overlay.addEventListener('click', function(e) {
  overlayState.set('active', false);
  toggleState.set('active', false);
  menuState.set('active', false);
  pageState.set('locked', false);
});
window.addEventListener('resize', function(e) {
  if (window.innerWidth >= 700 && menuState.get('active')) {
    overlayState.set('active', false);
    toggleState.set('active', false);
    menuState.set('active', false);
    pageState.set('locked', false);
  }
});
