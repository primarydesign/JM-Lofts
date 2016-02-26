import Velocity from '../vendors/velocity';
import tillstand from '../library/tillstand';
import instate from '../library/instate.js';
import '../vendors/slim-scroll';
window.Velocity = Velocity
class Controls {
  constructor() {
    this.anaphor = document.querySelector('.mapMenu');
    this.categoryList = document.querySelector('.mapMenu__categories');
    this.locationList = document.querySelector('.mapMenu__locations');
    this.categoryItems = Array.prototype.slice.call(document.querySelectorAll('.categoryItem'));
    this.locationItems = Array.prototype.slice.call(document.querySelectorAll('.locationItem'));
    this.categoryButtons = Array.prototype.slice.call(document.querySelectorAll('.categoryItem__button'));
    this.categories = {};
    for(let i = 0; i < this.categoryItems.length; i++) {
      let category = this.categoryItems[i].getAttribute('data-category');
      this.categories[category] = {
        item: document.querySelector(`.categoryItem[data-category="${category}"]`),
        list: document.querySelector(`.categoryItem__list[data-category="${category}"]`),
        button: document.querySelector(`.categoryItem__button[data-category="${category}"]`),
        locations: document.querySelector(`.mapMenu__locations[data-category="${category}"]`)
      }
    }
  }
  open(categoryName) {
    let category = this.categories[categoryName];
    let height = this.anaphor.offsetHeight;
    instate.set(category.button, 'active', true);
    this.slide(this.categoryItems.indexOf(category.item));
    Velocity(category.item, {
      height: height
    });
    Velocity(category.button, {
      height: height/7
    });
    Velocity(category.list, {
      height: height - (height/7)
    });
    jQuery(category.list).slimScroll({
      alwaysVisible: true,
      height: '100%',
      wheelStep: 10
    });
  }
  close(categoryName) {
    let category = this.categories[categoryName];
    let height = this.anaphor.offsetHeight;
    instate.set(category.button, 'active', false);
    jQuery(category.list).slimScroll({destroy: true});
    this.slide();
    Velocity(category.item, {
      height: height/7
    });
    Velocity(category.button, {
      height: height/7
    });
    Velocity(category.list, {
      height: 0
    });
  }
  slide(index = 0) {
    Velocity(this.categoryList, {
      translateY: `-${(100/7 * index)}%`
    }, {
      duration: 400
    });
  }
}
export default Controls;
