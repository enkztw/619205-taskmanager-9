import BaseComponent from './base-component';

export default class LoadMoreButton extends BaseComponent {
  get template() {
    return `<button class="load-more" type="button">load more</button>`;
  }
}

