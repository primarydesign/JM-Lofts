import ascript from 'scriptjs';
import locations from '../../_data/locations';
import tillstand from '../library/tillstand';
import Mapster from '../library/mapster';
import Controls from './categories';

const Interface = new Controls('.mapUI');

ascript("https://maps.googleapis.com/maps/api/js?v=3", function() {
  const Downtown = new Mapster('.locationsMap__map', {
    center: { lat: 39.833333, lng: -98.583333 },
    mapTypeControl: false,
    maxZoom: 15,
    minZoom: 3,
    scrollwheel: false,
    streetViewControl: false,
    zoom: 5,
    zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
  }, google);


  Interface.buttons.map(function(button) {
    button.addEventListener('click', function() {
      if (this.tillstand.active.get()) {
        Interface.close(this.getAttribute('data-category'));
      } else {
        Interface.open(this.getAttribute('data-category'));
      }
      toggleLocations(Interface);
    });
  });
  Interface.locationItems.map(function(location) {
    location.addEventListener('click', function() {
      toggleLocations(Interface, location);
      assertLocation(location, Downtown);
    });
  });

});

function toggleLocations(Interface, location) {
  if (Interface.activeLocation) {
    Interface.activeLocation.tillstand.active.set(false);
  }
  if (location) {
    location.tillstand.active.set(true);
    Interface.activeLocation = location;
  }
}
function assertLocation(location, map) {
  let name = location.getAttribute('data-name');
  map.markers.list.map(function(marker) {
    if (marker.name === name) {
      map.center(marker.position);
      marker.setVisible(true);
    } else {
      marker.setVisible(false);
    }
  });
}
