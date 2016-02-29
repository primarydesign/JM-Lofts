import moptions from '../library/moptions';
import Mapster from '../library/mapster';
import Controls from './categories';
import velocity from '../vendors/velocity';
import instate from '../library/instate.js';

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

Menu.categoryButtons.map(function(button) {
  button.addEventListener('click', function() {
    let category = this.getAttribute('data-category');
    Downtown.closeIW();
    if (instate.get(this, 'active')) {
      Menu.close(category);
      restoreAllMarkers();
    } else {
      Menu.open(category);
      toggleMarkersByCategory(category);
    }
  });
});

Menu.locationItems.map(function(location) {
  location.addEventListener('click', function() {
    if (instate.get(location, 'active')) {
      toggleLocations(Menu);
      toggleMarkersByCategory(this.getAttribute('data-category'));

    } else {
      toggleLocations(Menu, this);
      toggleMarkersByName(this.getAttribute('data-name'));
    }
  });
});

/* MAP MENU APPEARANCE */

filter.addEventListener('click', function(event) {
  event.preventDefault();
  if (menuIsOpen) closeMenu();
  else openMenu();
});

window.addEventListener('resize', function() {
  if (menuIsOpen && window.innerWidth >= 900) closeMenu(0);
});

/* FUNCTIONS INVENTORY */

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

function toggleLocations(Menu, location) {
  if (Menu.activeLocation) {
    instate.set(Menu.activeLocation, 'active', false);
  }
  if (location) {
    instate.set(location, 'active', true);
    Menu.activeLocation = location;
  }
}

function toggleMarkersByCategory(category) {
  Downtown.markers.list.map(function(marker) {
    if (marker.category === category) {
      marker.setVisible(true);
    } else if (!marker.alwaysVisible) {
      marker.setVisible(false);
    }
  });
}

function toggleMarkersByName(name) {
  Downtown.markers.list.map(function(marker) {
    if (marker.name === name) {
      if (marker.multiple) {
        Downtown.zoom(13);
        Downtown.center(JMLofts);
      } else {
        Downtown.zoom(16);
        Downtown.center(marker.position);
      }
      marker.setVisible(true);
    } else if (!marker.alwaysVisible) {
      marker.setVisible(false);
    }
  });
}

function restoreAllMarkers() {
  Downtown.markers.list.map(function(marker) {
    marker.setVisible(true);
  });
}
