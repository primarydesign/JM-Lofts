const state = require('./library/state.js');
const velocity = require('./library/velocity.js');
window.state = state;
const toggle = document.querySelector('.navbar__toggle');
const menu = document.querySelector('.navMenu');
const toggleState = state('.navbar__toggle');
const menuState = state('.navMenu');

toggle.addEventListener('click', function(e) {
  toggleState.toggle('active');
  menuState.toggle('active');
});

