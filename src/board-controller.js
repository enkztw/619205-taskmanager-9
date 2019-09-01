import Board from './components/board';
import TasksList from './components/tasks-list';
import TaskController from './task-contoller';
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

    this._subscribers = [];
    this._onChangeView = this._onChangeView.bind(this);
    this._onDataChange = this._onDataChange.bind(this);
  }

  renderElement(container, element, position = `beforeend`) {
    container.insertAdjacentElement(position, element);
  }

  init() {
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

  _renderBoard(tasksMock) {
    this._tasksList.removeElement();

    this.renderElement(this._sortList.element, this._tasksList.element, `afterend`);

    for (const task of tasksMock) {
      this._renderTask(task);
    }
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

    };

    sort.element.addEventListener(`click`, onSortClick);

    sort.renderElement(this._sortList.element);
  }

  _renderTask(task) {
    const taskController = new TaskController(this._tasksList, task, this._onDataChange, this._onChangeView);

    this._subscribers.push(taskController.setDefaultView.bind(taskController));
  }

  _onDataChange(newData, oldData) {
    const currentCardsOnBoard = this._tasksList.element.childNodes.length;
    const oldDataIndex = this._currentTasks.findIndex((item) => item.id === oldData.id);
    if (!newData) {
      this._currentTasks.splice(oldDataIndex, 1);
    } else {
      this._currentTasks[oldDataIndex] = newData;
    }

    this._renderBoard(this._currentTasks.slice(0, currentCardsOnBoard));

    if (currentCardsOnBoard < this._currentTasks.length) {
      this._button.element.classList.remove(`visually-hidden`);
    } else {
      this._button.element.classList.add(`visually-hidden`);
    }
  }

  _onChangeView() {
    for (const subscriber of this._subscribers) {
      subscriber();
    }
  }
}
