import tillstand from '../library/tillstand';

const toggle = document.querySelector('.navbar__toggle');
const toggles = tillstand('.navbar__toggleLine');
const overlay = tillstand('.page__overlay');
const navMenu = tillstand('.navMenu');
const page = tillstand('.page');

page.tillstand.instate('locked');
overlay.tillstand.instate('active');
navMenu.tillstand.instate('active');
toggles.tillstand.instate('active');

toggle.addEventListener('click', function(e) {
  toggles.tillstand.toggle('active');
  overlay.tillstand.active.toggle();
  navMenu.tillstand.active.toggle();
  page.tillstand.locked.toggle();
});

overlay.addEventListener('click', function(e) {
  toggles.tillstand.set('active', false);
  overlay.tillstand.active.set(false);
  navMenu.tillstand.active.set(false);
  page.tillstand.locked.set(false);
});

window.addEventListener('resize', function(e) {
  if (window.innerWidth >= 700 && navMenu.tillstand.active.get()) {
    toggles.tillstand.set('active', false);
    overlay.tillstand.active.set(false);
    navMenu.tillstand.active.set(false);
    page.tillstand.locked.set(false);
  }
});
