import ascript from 'scriptjs';
import locations from '../../_data/locations';
import tillstand from '../library/tillstand';
import Mapster from '../library/mapster';
import './categories';

ascript("https://maps.googleapis.com/maps/api/js?v=3", function() {
  const mapster = Mapster(google);
  const Downtown = new mapster('.locationsMap__map', {
    center: { lat: 39.833333, lng: -98.583333 },
    mapTypeControl: false,
    maxZoom: 15,
    minZoom: 3,
    scrollwheel: false,
    streetViewControl: false,
    zoom: 5,
    zoomControlOptions: { position: google.maps.ControlPosition.TOP_LEFT },
  });

});
