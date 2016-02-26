import moptions from '../library/moptions';
import Mapster from '../library/mapster';
import Controls from './categories';
import velocity from '../vendors/velocity';

const track = document.querySelector('.downtownMap__track');
const canvas = document.querySelector('.mapCanvas__frame');
const filter = document.querySelector('.mapCanvas__filter');
const JMLofts = { lat: 42.773403, lng: -71.083941 };
let menuIsOpen = false;

/* INITIALIZE MAP */

moptions.center = JMLofts;
const Downtown = new Mapster(canvas, moptions, JMLocations);

Downtown._setEvents(Downtown.map, [{
  event: 'click',
  action: function() {
    Downtown.closeIW();
    if (menuIsOpen) closeMenu();
  }
}]);

Downtown.markers.list.map(function(marker) {
  Downtown._setEvents(marker, [
    {
      event: 'click',
      action: function() {
        if (Downtown.activeIW === this.infoWindow) {
          Downtown.closeIW();
        } else Downtown.openIW(this);
      }
    }
  ]);
});

/* INITIALIZE MENU */

const Menu = new Controls();

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
