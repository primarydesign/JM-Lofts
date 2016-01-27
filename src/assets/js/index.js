import Velocity from './vendors/velocity.js';
import tillstand from './library/tillstand';

const overlay = tillstand('.page__overlay');
overlay.tillstand.instate('active');

overlay.tillstand.active.negator = function(element) {
  Velocity(overlay, {
    opacity: 0,
  }, {
    display: 'none',
    duration: 300
  });
}
overlay.tillstand.active.activator = function(element) {
  Velocity(overlay, {
    opacity: 1,
  }, {
    display: 'block',
    duration: 300
  });
}

import './modules/navbar.js';
import './modules/romance-captions.js';
