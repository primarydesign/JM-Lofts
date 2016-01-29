import Velocity from '../vendors/velocity';
export { activate, deactivate };

function activate(element) {
  let parent = element.parentNode;
  let index = Array.prototype.slice.call(parent.children).indexOf(element);
  console.log(index);
  Velocity(parent, {
    trans
  }, {});
}

function deactivate(element) {}
