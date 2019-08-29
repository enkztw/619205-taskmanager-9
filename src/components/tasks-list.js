import BaseComponent from './base-component';

export default class TasksList extends BaseComponent {
  get template() {
    return `<div class="board__tasks"></div>`;
  }
}
