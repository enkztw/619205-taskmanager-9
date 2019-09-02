import {Task} from './components/task';
import TaskEdit from './components/task-edit';

export default class TaskController {
  constructor(container, data, onDataChange, onChangeView) {
    this._container = container;
    this._data = data;
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
    this._task = new Task(data);
    this._taskEdit = new TaskEdit(data);

    this.init();
  }

  init() {
    const taskElement = this._task.element;
    const taskEditElement = this._taskEdit.element;

    const onTaskElementEdit = () => this._container.element.replaceChild(taskEditElement, taskElement);
    const onTaskElementSubmit = (evt) => {
      evt.preventDefault();

      const formData = new FormData(taskEditElement.querySelector(`.card__form`));
      const newData = {
        description: formData.get(`text`),
        dueDate: formData.get(`date`) ? new Date(`${formData.get(`date`)} 2019`) : ``,
        repeatingDays: formData.getAll(`repeat`).reduce((acc, curr) => {
          return acc.set(curr, true);
        }, new Map([
          [`Mo`, false],
          [`Tu`, false],
          [`We`, false],
          [`Th`, false],
          [`Fr`, false],
          [`Sa`, false],
          [`Su`, false]
        ])),
        tags: new Set([...formData.getAll(`hashtag`)]),
        color: formData.get(`color`),
        isFavorite: this._data.isFavorite,
        isArchive: this._data.isArchive,
        id: this._data.id
      };

      document.removeEventListener(`keydown`, onEscClick);
      this._onDataChange(newData, this._data);
    };

    const onTaskElementRemove = () => {
      this._onDataChange(``, this._data);
      this._taskEdit.removeElement();
      document.removeEventListener(`keydown`, onEscClick);
    };

    const onEscClick = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        taskEditElement.className = taskEditElement.classList.value.replace(`${taskEditElement.classList[2]}`, `card--${this._data.color}`);
        taskEditElement.querySelector(`.card__color-input--${this._data.color}`).checked = true;
        taskEditElement.querySelector(`.card__text`).value = this._data.description;

        this.setDefaultView();
      }

      document.removeEventListener(`keydown`, onEscClick);
    };

    // Task events
    taskElement.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      this._onChangeView();
      onTaskElementEdit();
      document.addEventListener(`keydown`, onEscClick);
    });

    // Task-edit events
    taskEditElement.querySelector(`.card__form`).addEventListener(`submit`, onTaskElementSubmit);
    taskEditElement.querySelector(`.card__delete`).addEventListener(`click`, onTaskElementRemove);

    taskEditElement.querySelector(`.card__text`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscClick);
    });

    taskEditElement.querySelector(`.card__text`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscClick);
    });

    this._task.renderElement(this._container.element);
  }

  setDefaultView() {
    if (this._container.element.contains(this._taskEdit.element)) {
      this._container.element.replaceChild(this._task.element, this._taskEdit.element);
    }
  }
}
