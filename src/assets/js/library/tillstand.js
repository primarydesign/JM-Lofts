class Tillstand {
  constructor(context) {
    this.context = context;
  }
  instate(name, activator, negator) {
    this[name] = this[name] || new TillstandState(name, this.context, activator, negator);
  }
}

class TillstandGroup {
  constructor(elements) {
    this.elements = elements;
  }
  instate(state, activator, negator) {
    for(let i = 0; i < this.elements.length; i++) {
      this.elements[i].tillstand = this.elements[i].tillstand || this.elements[i].tillstand(this.elements[i]);
      if (!this.elements[i].tillstand[state]) { this.elements[i].tillstand.instate(state, activator, negator); }
    }
  }
  freeze(state) {
    for(let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].tillstand[state]) {
        this.elements[i].tillstand[state].freeze();
      }
    }
  }
  unfreeze(state) {
    for(let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].tillstand[state]) {
        this.elements[i].tillstand[state].unfreeze();
      }
    }
  }
  get(state) {
    var count = 0;
    for(let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].tillstand[state]) {
        if (this.elements[i].tillstand[state].get()) ++count;
      }
    }
    return count === 0
      ? 'none'
      : count === this.elements.length
        ? 'all'
        : 'some';
  }
  set(state, value, quiet) {
    for(let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].tillstand[state]) {
        this.elements[i].tillstand[state].set(value, quiet);
      }
    }
  }
  toggle(state, quiet) {
    for(let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].tillstand[state]) {
        this.elements[i].tillstand[state].toggle(quiet);
      }
    }
  }
}

class TillstandState {
  constructor(name, context, activator, negator) {
    this.element = context;
    this.frozen = false;
    this.affirmClass = `is-${name}`;
    this.negateClass = `not-${name}`;
    if (this.activator) {
      this.activator = activator;
      this.negator = negator || activator;
    }
  }
  freeze() {
    this.frozen = true;
  }
  unfreeze() {
    this.frozen = false;
  }
  get() {
    return Boolean(this.element.className.search(this.affirmClass) > -1);
  }
  set(value, quiet) {
    if (value) this.__affirm__(quiet);
    else this.__negate__(quiet);
  }
  toggle(quiet) {
    if (this.get()) this.__negate__(quiet);
    else this.__affirm__(quiet);
  }
  __affirm__(quiet) {
    if (this.frozen) return;
    if (this.get()) return;
    else if (this.element.className.search(this.negateClass) > -1) this.element.className = this.element.className.replace(this.negateClass, this.affirmClass);
    else this.element.className += ` ${this.affirmClass}`;
    if (!quiet && typeof this.activator === 'function') this.activator.call(this.element.tillstand, this.element);
  }
  __negate__(quiet) {
    if (this.frozen) return;
    if (!this.get()) return;
    else if (this.element.className.search(this.affirmClass) > -1) this.element.className = this.element.className.replace(this.affirmClass, this.negateClass);
    else this.element.className += ` ${this.negateClass}`;
    if (!quiet && typeof this.negator === 'function') this.negator.call(this.element.tillstand, this.element);
  }
}

export default function (element) {
  if (typeof element === 'string') element = document.querySelectorAll(element);
  else if (element instanceof HTMLElement) element = [element];
  if (element instanceof NodeList) element = Array.prototype.slice.call(element);
  for(let i = 0; i < element.length; i++) {
    element[i].tillstand = new Tillstand(element[i]);
  }
  element.tillstand = new TillstandGroup(element);
  return Boolean(element.length === 1) ? element[0] : element;
}
