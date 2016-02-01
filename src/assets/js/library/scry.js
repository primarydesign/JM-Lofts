import Velocity from '../vendors/velocity';

export default function(element, options = {}) {
  if (element instanceof HTMLElement) {
    Velocity(element, "scroll", options);
  }
}
