import BaseComponent from './base-component';

export default class Sort extends BaseComponent {
  constructor({name, title}) {
    super();
    this._name = name;
    this._title = title;
  }

  get template() {
    return `<a href="#" class="board__filter" data-name=${this._name}>SORT BY ${this._title}</a>`;
  }
}
