import tillstand from '../library/tillstand';
import Mapster from '../library/mapster';
import Controls from './categories';
import '../vendors/slim-scroll';

const Interface = new Controls('.mapUI');
const Downtown = new Mapster('.locationsMap__map', {
  center: { "lat": 42.773403, "lng": -71.083941 },
  mapTypeControl: false,
  maxZoom: 18,
  minZoom: 3,
  scrollwheel: false,
  streetViewControl: false,
  zoom: 16,
  zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
  styles: [{"featureType":"administrative.province","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#d78a3a"},{"gamma":"1.61"},{"lightness":"10"},{"weight":"1.20"}]},{"featureType":"administrative.province","elementType":"labels.text.fill","stylers":[{"color":"#b78653"}]},{"featureType":"landscape.natural","elementType":"all","stylers":[{"hue":"#ffbb00"},{"saturation":54}]},{"featureType":"poi","elementType":"labels","stylers":[{"saturation":-84},{"lightness":6},{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"saturation":-55}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-60},{"gamma":1.91}]},{"featureType":"poi.park","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-27},{"gamma":1.8}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"hue":"#ff8800"},{"saturation":-79},{"lightness":-16},{"visibility":"simplified"}]},{"featureType":"road.highway","elementType":"labels","stylers":[{"saturation":-67},{"hue":"#ff9900"},{"lightness":6},{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"hue":"#ff6600"},{"saturation":-75},{"lightness":-21}]},{"featureType":"road.arterial","elementType":"labels","stylers":[{"saturation":-79},{"visibility":"off"}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#ff5e00"},{"saturation":-24},{"visibility":"simplified"},{"lightness":28}]},{"featureType":"road.local","elementType":"labels","stylers":[{"visibility":"on"}]},{"featureType":"transit.line","elementType":"all","stylers":[{"visibility":"simplified"},{"saturation":-27}]},{"featureType":"transit.station","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"saturation":-85}]}]
}, JMLocations);
Downtown.markers.list.map(function(marker) {
  Downtown._setEvents(marker, [
    {
      event: 'mouseover',
      action: function() {
        if (this.infoWindow) {
          this.infoWindow.open(Downtown.map, this);
        }
      }
    },{
      event: 'mouseout',
      action: function() {
        if (this.infoWindow) {
          this.infoWindow.close();
        }
      }
    }
  ]);
});

Interface.buttons.map(function(button) {
  button.addEventListener('click', function() {
    let category = this.getAttribute('data-category');
    if (this.tillstand.active.get()) {
      Interface.close(category);
      toggleLocations(Interface);
      toggleAll(Downtown);
    } else {
      Interface.open(category);
      toggleByCategory(this, Downtown);
    }

  });
});
Interface.locationItems.map(function(location) {
  location.addEventListener('click', function() {
    if (this.tillstand.active.get()) {
      toggleLocations(Interface);
      toggleByCategory(this, Downtown);

    } else {
      toggleLocations(Interface, this);
      toggleByLocation(this, Downtown);
    }
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


function toggleByCategory(button, map) {
  let category = button.getAttribute('data-category');
  map.markers.list.map(function(marker) {
    if (marker.category === category) {
      marker.setVisible(true);
    } else if (!marker.alwaysVisible) {
      marker.setVisible(false);
    }
  });
}
function toggleByLocation(location, map) {
  let name = location.getAttribute('data-name');
  map.markers.list.map(function(marker) {
    if (marker.name === name) {
      map.zoom(16);
      map.center(marker.position);
      marker.setVisible(true);
    } else if (!marker.alwaysVisible) {
      marker.setVisible(false);
    }
  });
}
function toggleAll(map) {
  map.markers.list.map(function(marker) {
    marker.setVisible(true);
  });
}
