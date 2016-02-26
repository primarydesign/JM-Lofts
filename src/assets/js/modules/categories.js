import Velocity from '../vendors/velocity';
import tillstand from '../library/tillstand';

class Controls {
  constructor(selector) {
    this.mapUI = tillstand(document.querySelector('.mapMenu')).tillstand.instate('active');
    this.categoryList = tillstand(document.querySelector('.mapMenu__categories')).tillstand.instate('active');
    this.locationList = tillstand(document.querySelectorAll('.mapMenu__locations')).tillstand.instate('active');
    this.categoryItems = tillstand(document.querySelectorAll('.categoryItem')).tillstand.instate('active');
    this.locationItems = tillstand(document.querySelectorAll('.locationItem')).tillstand.instate('active');
    this.buttons = tillstand(document.querySelectorAll('.categoryItem__button')).tillstand.instate('active');
    this.categories = {};
    for(let i = 0; i < this.categoryItems.length; i++) {
      let category = this.categoryItems[i].getAttribute('data-category');
      this.categories[category] = {
        item: document.querySelector(`.categoryItem[data-category="${category}"]`),
        button: document.querySelector(`.categoryItem__button[data-category="${category}"]`),
        locationList: tillstand(document.querySelector(`.mapMenu__locations[data-category="${category}"]`)).tillstand.instate('active')
      };
    }
  }
  open(category) {
    if (this.categories[category]) {
      this.categories[category].item.tillstand.active.set(true);
      this.categories[category].button.tillstand.active.set(true);
      this.categories[category].locationList.tillstand.active.set(true);
      this.slide(this.categoryItems.indexOf(this.categories[category].item));
    }
  }
  close(category) {
    if (this.categories[category]) {
      this.categories[category].item.tillstand.active.set(false);
      this.categories[category].button.tillstand.active.set(false);
      this.categories[category].locationList.tillstand.active.set(false);
      this.slide();
    }
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
