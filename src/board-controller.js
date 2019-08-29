import Board from './components/board';
import TasksList from './components/tasks-list';
import {Task} from './components/task';
import TaskEdit from './components/task-edit';
import LoadMoreButton from './components/load-more-button';
import NoTasks from './components/no-tasks';


const MAX_CARDS_ON_BOARD = 8;

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._tasksList = new TasksList();
    this._button = new LoadMoreButton();
    this._noTasks = new NoTasks();
  }

  renderElement(container, element) {
    container.append(element);
  }

  boardInit() {
    const onLoadMoreButtonClick = () => {
      for (const task of this._tasks.slice(MAX_CARDS_ON_BOARD)) {
        this._renderTask(task);
      }

      this._button.element.classList.add(`visually-hidden`);
    };

    this.renderElement(this._container, this._board.element);
    this.renderElement(this._board.element, this._tasksList.element);
    this.renderElement(this._board.element, this._button.element);

    this._renderNoTasksMessage();

    for (const task of this._tasks.slice(0, MAX_CARDS_ON_BOARD)) {
      this._renderTask(task);
    }

    this._button.element.addEventListener(`click`, onLoadMoreButtonClick);
  }

  _renderNoTasksMessage() {
    if (!this._tasks.length || !this._tasks.some((item) => item.isArchive)) {
      this._board.element.innerHTML = ``;
      this.renderElement(this._board.element, this._noTasks.element);
    }
  }

  _renderTask(taskMock) {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);

    const taskElement = task.element;
    const taskEditElement = taskEdit.element;

    const onTaskElementEdit = () => this._tasksList.element.replaceChild(taskEditElement, taskElement);
    const onTaskElementSubmit = () => this._tasksList.element.replaceChild(taskElement, taskEditElement);
    const onTaskElementRemove = () => {
      const removedTaskIndex = this._tasks.findIndex((item) => item.id === task._id);
      this._tasks.splice(removedTaskIndex, 1);

      if (this._tasks.length === MAX_CARDS_ON_BOARD) {
        this._button.element.classList.add(`visually-hidden`);
      }

      if (this._tasks.length >= document.querySelector(`.board__tasks`).childNodes.length) {
        const nextTaskIndex = parseInt(document.querySelector(`.board__tasks`).lastChild.getAttribute(`data-index`), 10) + 1;
        this._renderTask(this._tasks.find((item) => item.id === nextTaskIndex), this._tasksList.element);
      }

      this._renderNoTasksMessage();

      taskEdit.removeElement();
      document.removeEventListener(`keydown`, onEscClick);
    };

    const onEscClick = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        onTaskElementSubmit();
      }

      document.removeEventListener(`keydown`, onEscClick);
    };

    // Task events
    taskElement.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
      onTaskElementEdit();
      document.addEventListener(`keydown`, onEscClick);
    });

    // Task-edit events
    taskEditElement.addEventListener(`submit`, onTaskElementSubmit);
    taskEditElement.querySelector(`.card__delete`).addEventListener(`click`, onTaskElementRemove);

    taskEditElement.querySelector(`.card__text`).addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, onEscClick);
    });

    taskEditElement.querySelector(`.card__text`).addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, onEscClick);
    });


    task.renderElement(this._tasksList.element);
  }
}
