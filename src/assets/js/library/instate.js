function classes(state) {
  return { affirm: `is-${state}`, negate: `not-${state}` };
}
function affirm(state) {
  switch (inspect.call(this, state)) {
    case (false):
      this.className = this.className.replace(state.negate, state.affirm);
      break;
    case (null):
      this.className += ` ${state.affirm}`;
      break;
  }
}
function negate(state) {
  switch (inspect.call(this, state)) {
    case (true):
      this.className = this.className.replace(state.affirm, state.negate);
      break;
    case (null):
      this.className += ` ${state.negate}`;
      break;
  }
}
function inspect(state) {
  if (this.className.search(state.affirm) > -1) return true;
  else if (this.className.search(state.negate) > -1) return false;
  else return null;
}

module.exports.toggle = function(target, stateName) {
  if (target instanceof NodeList || target instanceof Array) {
    for(let i = 0; i < target.length; i++) {
      toggle(target[i], stateName);
    }
  } else {
    let state = classes(stateName);
    if (inspect.call(target, state)) {
      negate.call(target, state);
    } else {
      affirm.call(target, state);
    }
  }
}
module.exports.set = function(target, stateName, value) {
  if (target instanceof NodeList || target instanceof Array) {
    for(let i = 0; i < target.length; i++) {
      set(target[i], stateName, value);
    }
  } else {
    let state = classes(stateName);
    if (value === true) affirm.call(target, state);
    else if (value === false) negate.call(target, state);
  }
}
module.exports.get = function(target, stateName) {
  let state = classes(stateName);
  if (target instanceof NodeList || target instanceof Array) {
    for(let i = 0; i < target.length; i++) {
      if (!Boolean(inspect.call(target[i], state))) return false;
    }
    return true;
  } else {
    return inspect.call(target, state);
  }
}
