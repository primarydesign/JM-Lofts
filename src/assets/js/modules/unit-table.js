import Vex from '../vendors/vex';
const numbers = ['zero', 'one', 'two'];
const tableRows = document.querySelectorAll('.unitTable__row');
const disclaimer = "These floor plans are intended for illustrative purposes only and are not to scale; square foot measurements are aproximate and configurations may vary from unit to unit.";

for(let i = 0; i < tableRows.length; i++) {
  let row = tableRows[i];
  let rowUN = row.getAttribute('data-unit-un');
  let rowBR = row.getAttribute('data-unit-br');
  let rowSF = row.getAttribute('data-unit-sf');
  let image = row.getAttribute('data-unit-image');
  row.addEventListener('click', function(event) {
    Vex.open({
      content: (
        `<section class="unitModal">` +
          `<ul class="unitModal__details">` +
            `<li class="unitModal__detail" id="unitModal--br">${ numbers[rowBR] }</li>` +
            `<li class="unitModal__detail" id="unitModal--ba">one</li>` +
            `<li class="unitModal__detail" id="unitModal--sf">${ rowSF }</li>` +
            `<li class="unitModal__detail unitModal__detail--unit" id="unitModal--un">${ rowUN }</li>` +
          `</ul>` +
          `<figure class="unitModal__figure">` +
            `<div class="unitModal__image"><img src="assets/img/plans/${ image }.svg"/></div>` +
            `<a href="assets/plans/${ rowUN }.pdf" target="_blank" class="unitModal__link">Download PDF</a>` +
            `<figcaption class="unitModal__disclaimer">${ disclaimer }</figcaption>` +
          `</figure>` +
        `</section>`
      ),
      className: 'vex-theme-plain'
    });
  });
}
