module.exports = state;

function state(element) {
  if (typeof element === 'string') element = document.querySelector(element);
  return {
    get: function(state) { return getState.call(element, state); },
    set: function(state, value) { setState.call(element, state, value); },
    toggle: function(state, activate, deactivate) {
      toggleState.call(element, state, activate, deactivate); }
  }
}

function getState(state) {
  return Boolean(this.className.search(`is-${state}`) > -1);
}
function toggleState(state, reactivate, deactivate) {
  if (getState.call(this, state)) {
    negateState.call(this, state, deactivate);
  } else {
    affirmState.call(this, state, reactivate);
  }
}
function setState(state, value, callback) {
  if (value === true) {
    affirmState.call(this, state, callback);
  } else if (value === false) {
    negateState.call(this, state, callback);
  }
}

function affirmState(state, callback) {
  let negate = `not-${state}`;
  let affirm = `is-${state}`;
  if (this.className.search(affirm) > -1) return;
  else if (this.className.search(negate) > -1) this.className = this.className.replace(negate, affirm);
  else this.className = this.className += ' ' + affirm;
  if (typeof callback === 'function') callback.call(this, this);
}
function negateState(state, callback) {
  let negate = `not-${state}`;
  let affirm = `is-${state}`;
  if (this.className.search(negate) > -1) return;
  else if (this.className.search(affirm) > -1) this.className = this.className.replace(affirm, negate);
  else this.className = this.className += ' ' + negate;
  if (typeof callback === 'function') callback.call(this, this);
}
