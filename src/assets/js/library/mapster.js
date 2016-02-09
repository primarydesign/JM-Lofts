/**
 * MARKERS CLASS
 * *
 */
  function Markers() {
    this.list = [];
  }
  Markers.prototype._add = function add_marker(item) {
    this.list.push(item);
  };
  Markers.prototype._del = function remove_marker(item) {
    var index = this.list.indexOf(item);
    if (index > -1) this.list.splice(index, 1);
  };
  Markers.prototype.update = function update_markers(properties) {
    var i = 0, j = 0, keys = Object.keys(properties);
    for(i; i < this.list.length; i++) {
      for(j; j < keys.length; j++) {
        this.list[i][keys[j]] = properties[[keys[j]]];
      }
    }
  }

/**
 * MAPSTER CLASS
 * *
 */
function Mapster(element, options, markers) {
  var canvas = (element instanceof Element)
    ? element
    : (typeof element === 'string')
      ? jQuery(element)[0]
      : document.getElementById('map-canvas');
  var options = (element.constructor === Object)
    ? element
    : options;

  this.map = new google.maps.Map(canvas, options);
  this.markers = new Markers();
  if (options.mcOptions) this.clusters = new MarkerClusterer(this.map, [], options.mcOptions);
  if (markers) this.setMarker(markers);
}
/**
 * CENTER
 * * Pan to a given LatLng, or get the LatLng of the current center
 * @param {object} [position] - the LatLng instance of some position
 */
Mapster.prototype.center = function center(position) {
  if (position) {
    if (this.map.getCenter() !== position) this.map.panTo(position);
  } else return this.map.getCenter();
};


/**
 * ZOOM
 * * Zoom to a given level, or get the current zoom level
 * @param {number} [level] - the zoom level
 */
Mapster.prototype.zoom = function zoom(level) {
  if (level) {
    if (this.map.getZoom() !== level) this.map.setZoom(level);
  }
  else return this.map.getZoom();
};
/**
 * ADD_MARKERS
 * * Create markers and add markers to map.
 * * * register markers with Google Maps
 * * * register markers events with Google Maps
 * * *
 */
Mapster.prototype.setMarker = function add_markers(options) {
  if (options.constructor === Array) {
    for(var i = 0; i < options.length; i++) {
      add_markers.call(this, options[i]);
    }
  } else if (options.constructor === Object) {
    var marker = this._registerMarker(options);
    if (options.events) this._setEvents(marker, options.events);
    if (options.content) this._setInfoWindow(marker);
    this.markers._add(marker);
    if (this.clusters) this.clusters.addMarker(marker);
    return marker;
  }

};
/**
 * SET_EVENTS
 * * Set and register multiple events for an object instance
 * @param {object} marker - the marker to pass as the object instance
 * @param {array} events - the events to register
 */
Mapster.prototype._setEvents = function set_events(marker, events) {
  var mapster = this, i = 0;
  for(i; i < events.length; i++) {
    mapster._registerListener({
      object: marker,
      event: events[i].event,
      action: events[i].action
    });
  }
};
/**
 * REGISTER_LISTENER
 * * Register event handler with Google Maps API and add callback parameters
 * @param {(object|array)} options - event object, or array thereof
 * * @property {object} options.object - the object instance to listen against
 * * @property {object} options.event - the event name to listen for
 * * @property {object} options.action - the listener function to trigger
 * *
 */
Mapster.prototype._registerListener = function register_listener(options) {
  var self = this, i = 0;
  if (options.constructor === Array) {
    for(i; i < options.length; i++) {
      register_listener.call(this, options[i]);
    }
  } else if (options.constructor === Object) {
    google.maps.event.addListener(options.object, options.event, function(e) {
      options.action.call(options.object, self, e);
    });
  }
};
/**
 * REGISTER_MARKER
 * * Create a new Marker and ensures the right map is set
 * @param {object} options - marker configuration object
 * @return {object} new Marker instance
 */
Mapster.prototype._registerMarker = function register_marker(options) {
  if (options.map !== this.map) options.map = this.map;
  return new google.maps.Marker(options);
}
/**
 * SET_INFO_WINDOW
 * * instantiate an infoWindow for a marker and add a click listener
 * @param {object} marker - the marker to contain the infoWindow
 */
Mapster.prototype._setInfoWindow = function set_info_window(marker) {
  marker.infoWindow = new google.maps.InfoWindow({
    content: marker.content,
    pixelOffset: 0
  });
};
/**
 *
 */
Mapster.prototype.closeIW = function close_iw() {
  if (this.activeIW) this.activeIW.close();
  this.activeIW = false;
}
/**
 *
 */
Mapster.prototype.openIW = function open_iw(marker) {
  if (this.activeIW) this.activeIW.close();
  this.activeIW = marker.infoWindow;
  this.activeIW.open(this.map, marker);
}
Mapster.prototype.animateMarker = function animate_marker(marker, animation, duration) {
  if (animation === null) {
    marker.setAnimation(null);
  } else {
    this.markers.list.map(function(marker) {
      marker.setAnimation(null);
    });
    marker.setAnimation(google.maps.Animation[animation.toUpperCase()]);
    setTimeout(function() {
      animate_marker(marker, null);
    }, duration);
  }
}
Mapster.prototype.filter = function filter(query, isTrue, isFalse) {
  var i = 0;
  for(i; i < this.markers.list.length; i++) {
    if (query.call(this.markers.list[i])) {
      isTrue.call(this.markers.list[i]);
    } else {
      isFalse.call(this.markers.list[i]);
    }
  }
}
Mapster.prototype.offset = function offset(base, x, y) {
  var Super = this;
  var overlay = new google.maps.OverlayView();
  var latlng = new google.maps.LatLng(base.lat, base.lng);
  overlay.onAdd = function() {
    var view = this.getProjection();
    var width = jQuery(window).width();
    var point = view.fromLatLngToContainerPixel(latlng);
    point.x -= x;
    point.y += y;
    var center = view.fromContainerPixelToLatLng(point);
    Super.center(center);
  }
  overlay.draw = function() {};
  overlay.setMap(this.map);
}

export default Mapster;
