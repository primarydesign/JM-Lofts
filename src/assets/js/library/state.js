module.exports = state;

function state(element) {
  if (typeof element === 'string') element = document.querySelector(element);
  return {
    get: function(state) { return getState.call(element, state); },
    set: function(state, value) { setState.call(element, state, value); },
    toggle: function(state) { return toggleState.call(element, state); }
  }
}

function getState(state) {
  return Boolean(this.className.search(`is-${state}`) > -1);
}
function toggleState(state) {
  if (getState.call(this, state)) negateState.call(this, state);
  else affirmState.call(this, state);
}
function setState(state, value) {
  if (value === true) {
    console.log('true')
    affirmState.call(this, state);
  } else if (value === false) {
    console.log('false')
    negateState.call(this, state);
  }
}

function affirmState(state) {
  let negate = `not-${state}`;
  let affirm = `is-${state}`;
  if (this.className.search(affirm) > -1) return;
  else if (this.className.search(negate) > -1) this.className = this.className.replace(negate, affirm);
  else this.className = this.className += ' ' + affirm;
}
function negateState(state) {
  let negate = `not-${state}`;
  let affirm = `is-${state}`;
  if (this.className.search(negate) > -1) return;
  else if (this.className.search(affirm) > -1) this.className = this.className.replace(affirm, negate);
  else this.className = this.className += ' ' + negate;
}
