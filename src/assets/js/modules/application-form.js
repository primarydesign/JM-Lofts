const contactForm = document.querySelector('.form');
const fields = document.querySelectorAll('.form__input');
const submit = document.querySelector('.form__submit');
const note = document.querySelector('.form__note');
const Patterns = {}, Errors = {};

Errors['EMPTY_REQUISITE'] = 'This field is required';
Errors['INVALID_EMAIL'] = 'Please enter a valid email address';
Errors['INVALID_TEL'] = 'Please enter a valid phone number';
Patterns['EMAIL'] = "[a-zA-Z0-9_.+\-]+@[a-zA-Z0-9-.]+$";
Patterns['TEL'] = "^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$";

for(let i = 0; i < fields.length; i++) {
  fields[i].addEventListener('blur', function(event) {
    validateField(this);
  });
  if (fields[i].getAttribute('type') === 'checkbox') {
    let hidden = document.querySelector(`input[type="hidden"][name="${fields[i].getAttribute('name')}"]`);
    fields[i].addEventListener('change', function(event) {
      if (this.checked) hidden.disabled = true;
      else hidden.disabled = false;
    });
  }
}

submit.addEventListener('click', function(event) {
  event.preventDefault();
  let count = 0;
  for(let i = 0; i < fields.length; i++) {
    count += validateField(fields[i]);
  }
  if (count === 0) submission(contactForm);
});

function submission(form) {
  jQuery.ajax({
    type: 'POST',
    url: '/jm-lofts/assets/application.php',
    data: jQuery(form).serialize(),
    beforeSend: function() {
      submit.disabled = true;
    },
    success: function() {
      note.className += ' is-active';
      contactForm.className += ' is-invisible';
    },
    error: function(response, status, error) {
      submit.disabled = false;
    }
  });
}

function validateField(input) {
  let count = 0;
  if (!requireField(input)) {
    assignError(input, 'EMPTY_REQUISITE');
    ++count;
  } else if (!matchPattern(input)) {
    let code = `INVALID_${input.getAttribute('type')}`
    assignError(input, code.toUpperCase());
    ++count;
  } else {
    removeError(input);
  }
  return count;
}
function requireField(input) {
  if (input.getAttribute('required') !== null) {
    return input.value !== "";
  } else return true;
}
function matchPattern(input) {
  if (input.getAttribute('data-pattern') && input.value !== "") {
    let attribute = input.getAttribute('data-pattern');
    let pattern = Patterns[attribute.toUpperCase()] || attribute;
    let matcher = new RegExp(pattern);
    return matcher.test(input.value);
  } else return true;
}
function assignError(input, status) {
  let parent = input.parentNode;
  parent.setAttribute('data-error', `*${Errors[status] || ''}`);
}
function removeError(input) {
  let parent = input.parentNode;
  parent.removeAttribute('data-error');
}
