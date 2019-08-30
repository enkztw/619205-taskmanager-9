import Board from './components/board';
import TasksList from './components/tasks-list';
import {Task} from './components/task';
import TaskEdit from './components/task-edit';
import LoadMoreButton from './components/load-more-button';
import NoTasks from './components/no-tasks';
import SortList from './components/sort-list';
import Sort from './components/sort';


const MAX_CARDS_ON_BOARD = 8;

export default class BoardController {
  constructor(container, tasks) {
    this._container = container;
    this._tasks = tasks;
    this._board = new Board();
    this._tasksList = new TasksList();
    this._button = new LoadMoreButton();
    this._noTasks = new NoTasks();
    this._sortList = new SortList();
    this._currentTasks = this._tasks;

    this._sorts = [
      {name: `default`, title: `DEFAULT`},
      {name: `dateup`, title: `DATE up`},
      {name: `datedown`, title: `DATE down`}
    ];

    this._taskComparatorMap = {
      default(a, b) {
        return a.id - b.id;
      },
      dateup(a, b) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      },
      datedown(a, b) {
        return b.dueDate.getTime() - a.dueDate.getTime();
      }
    };
  }

  renderElement(container, element) {
    container.append(element);
  }

  boardInit() {
    const onLoadMoreButtonClick = () => {
      for (const task of this._currentTasks.slice(MAX_CARDS_ON_BOARD)) {
        this._renderTask(task);
      }

      this._button.element.classList.add(`visually-hidden`);
    };

    this.renderElement(this._container, this._board.element);
    this.renderElement(this._board.element, this._sortList.element);
    this.renderElement(this._board.element, this._tasksList.element);
    this.renderElement(this._board.element, this._button.element);

    this._renderNoTasksMessage();

    for (const sort of this._sorts) {
      this._renderSort(sort);
    }

    for (const task of this._tasks.slice(0, MAX_CARDS_ON_BOARD)) {
      this._renderTask(task);
    }

    this._button.element.addEventListener(`click`, onLoadMoreButtonClick);
  }

  _renderNoTasksMessage() {
    if (!this._tasks.some((item) => item.isArchive)) {
      this._board.element.innerHTML = ``;
      this.renderElement(this._board.element, this._noTasks.element);
    }
  }

  _renderSort(sortData) {
    const sort = new Sort(sortData);
    const onSortClick = () => {
      const name = sort.element.getAttribute(`data-name`);
      const tasksCopy = [...this._currentTasks];
      this._currentTasks = tasksCopy.sort(this._taskComparatorMap[name]);
      this._tasksList.element.innerHTML = ``;

      for (const task of this._currentTasks.slice(0, MAX_CARDS_ON_BOARD)) {
        this._renderTask(task);
      }

      if (this._currentTasks.length > MAX_CARDS_ON_BOARD) {
        this._button.element.classList.remove(`visually-hidden`);
      } else {
        this._button.element.classList.add(`visually-hidden`);
      }

      console.log(this._currentTasks.length);
    };

    sort.element.addEventListener(`click`, onSortClick);

    sort.renderElement(this._sortList.element);
  }

  _renderTask(taskMock) {
    const task = new Task(taskMock);
    const taskEdit = new TaskEdit(taskMock);

    const taskElement = task.element;
    const taskEditElement = taskEdit.element;

    const onTaskElementEdit = () => this._tasksList.element.replaceChild(taskEditElement, taskElement);
    const onTaskElementSubmit = () => this._tasksList.element.replaceChild(taskElement, taskEditElement);
    const onTaskElementRemove = () => {
      const removedTaskIndex = this._currentTasks.findIndex((item) => item.id === task._id);
      const nextTaskIndex = this._currentTasks.findIndex((item) => item.id === parseInt(document.querySelector(`.board__tasks`).lastChild.getAttribute(`data-index`), 10));
      this._currentTasks.splice(removedTaskIndex, 1);

      if (this._currentTasks.length === MAX_CARDS_ON_BOARD) {
        this._button.element.classList.add(`visually-hidden`);
      }

      if (this._tasksList.element.childNodes.length <= this._currentTasks.length) {
        this._renderTask(this._currentTasks[nextTaskIndex], this._tasksList.element);
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
