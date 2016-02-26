import moptions from '../library/moptions';
import Mapster from '../library/mapster';
import velocity from '../vendors/velocity';

const track = document.querySelector('.downtownMap__track');
const canvas = document.querySelector('.mapCanvas__frame');
const filter = document.querySelector('.mapCanvas__filter');
const JMLofts = { lat: 42.773403, lng: -71.083941 };
let menuIsOpen = false;

/* INITIALIZE MAP */

moptions.center = JMLofts;
const DowntownMap = new Mapster(canvas, moptions, JMLocations);

/* MAP MENU APPEARANCE */

filter.addEventListener('click', function(event) {
  event.preventDefault();
  if (menuIsOpen) closeMenu();
  else openMenu();
});

window.addEventListener('resize', function() {
  if (menuIsOpen && window.innerWidth >= 900) closeMenu(0);
});

function openMenu(duration = 400) {
  menuIsOpen = true;
  filter.textContent = "Close";
  velocity(track, {
    'translateX': 250
  },{ duration: duration });
}
function closeMenu(duration = 400) {
  menuIsOpen = false;
  filter.textContent = "Filter";
  velocity(track, {
    'translateX': 0
  },{ duration: duration });
}
