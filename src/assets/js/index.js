import scry from './library/scry';

import './modules/navbar';
import './modules/romance-captions';
import './modules/ft-carousel';
import './modules/downtown-map';
import './modules/contact-form';

const scryTriggers = document.querySelectorAll('[data-scry]');
for(let i = 0; i < scryTriggers.length; i++) {
  scryTriggers[i].addEventListener('click', function(event) {
    event.preventDefault();
    scry(this);
  });
}

import Vex from './vendors/vex';
Vex.open({
  content: 'Hello',
  className: 'vex-theme-plain'
});
