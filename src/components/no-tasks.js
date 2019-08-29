import BaseComponent from './base-component';

export default class NoTasks extends BaseComponent {
  get template() {
    return `<p class="board__no-tasks">
    Congratulations, all tasks were completed! To create a new click on
    «add new task» button.
    </p>`;
  }
}

