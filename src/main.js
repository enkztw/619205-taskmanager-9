import {renderContainer} from './dom-utils';
import {renderComponent} from './dom-utils';

import {tasks} from './data';

import {controls} from './components/controls';
import {generateConrolsTemplate} from './components/controls';

import {search} from './components/search';
import {generateSearchTemplate} from './components/search';

import {filterNames} from './components/filters';
import {generateFiltersTemplate} from './components/filters';

import {Task} from './components/task';
import {TaskEdit} from './components/task-edit';

import {button} from './components/button';
import {generateButtonTemplate} from './components/button';


const MAX_CARDS_ON_BOARD = 8;

const renderTask = (taskMock, container) => {
  const task = new Task(taskMock);
  const taskEdit = new TaskEdit(taskMock);

  const taskElement = task.getElement();
  const taskEditElement = taskEdit.getElement();

  const onTaskElementEdit = () => container.replaceChild(taskEdit.getElement(), task.getElement());
  const onTaskElementSubmit = () => container.replaceChild(task.getElement(), taskEdit.getElement());
  const onTaskElementRemove = () => {
    const removedTaskIndex = tasks.findIndex((item) => item.id === task._id);
    tasks.splice(removedTaskIndex, 1);
    taskEdit.removeElement();

    if (tasks.length === MAX_CARDS_ON_BOARD) {
      loadMoreButton.classList.add(`visually-hidden`);
    }

    if (tasks.length >= MAX_CARDS_ON_BOARD) {
      const addedTaskIndex = parseInt(document.querySelector(`.board__tasks`).lastChild.getAttribute(`data-index`), 10) + 1;
      const addedTask = new Task(tasks.find((item) => item.id === addedTaskIndex));
      addedTask.renderElement(container);
    }
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


  task.renderElement(container);
};

// Main container
const mainContainer = document.querySelector(`.main`);

// Controls container
const controlsContainer = document.querySelector(`.main__control`);

// Search container
const searchContainer = renderContainer(`section`, [`main__search`, `search`, `container`], mainContainer);

// Filters container
const filtersContainer = renderContainer(`section`, [`main__filter`, `filter`, `container`], mainContainer);

// Board container
const boardContainer = renderContainer(`section`, [`board`, `container`], mainContainer);

// Tasks container
const tasksContainer = renderContainer(`div`, [`board__tasks`], boardContainer);

renderComponent(generateConrolsTemplate(controls), controlsContainer);
renderComponent(generateSearchTemplate(search), searchContainer);
renderComponent(generateFiltersTemplate(filterNames), filtersContainer);

for (const task of tasks.slice(0, MAX_CARDS_ON_BOARD)) {
  renderTask(task, tasksContainer);
}

renderComponent(generateButtonTemplate(button), boardContainer);

const loadMoreButton = document.querySelector(`.load-more`);
const onLoadMoreButtonClick = () => {
  for (const task of tasks.slice(MAX_CARDS_ON_BOARD)) {
    renderTask(task, tasksContainer);
  }

  loadMoreButton.classList.add(`visually-hidden`);
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
