import Velocity from '../vendors/velocity';

export default function(element, options = {}) {
  let target = document.querySelector(element.getAttribute('data-scry'));
  if (element instanceof HTMLElement) {
    Velocity(target, "scroll", options);
  }
}
