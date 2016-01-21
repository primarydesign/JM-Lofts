const state = require('./library/state.js');
const velocity = require('./library/velocity.js');
const toggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navMenu');
const toggleState = state('.navbar__toggle');
const menuState = state('.navMenu');

toggle.addEventListener('click', function(e) {
  toggleState.toggle('active');
  menuState.toggle('active');
});
window.addEventListener('resize', function(e) {
  if (window.innerWidth >= 700 && menuState.get('active')) {
    toggleState.set('active', false);
    menuState.set('active', false);
  }
});
