jQuery(document).ready(function() {
  const navbar = document.querySelector('.navbar');
  if (Boolean(window.location.hash)) {
    if (navbar.className.search('is-pinned') > -1) {
      navbar.className = navbar.className.replace('is-pinned', 'not-pinned');
    } else {
      navbar.className += ' not-pinned';
    }
  }
  require('./modules/navbar');
  require('./modules/romance-captions');
  require('./modules/unit-table');
  require('./modules/ft-carousel');
  require('./modules/downtown-map');
  require('./modules/contact-form');
});
