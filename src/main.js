import {renderContainer} from './components/dom-utils';
import {renderComponent} from './components/dom-utils';

import {cards} from './data';

import {controls} from './components/controls';
import {generateConrolsTemplate} from './components/controls';

import {search} from './components/search';
import {generateSearchTemplate} from './components/search';

import {filterNames} from './components/filters';
import {generateFiltersTemplate} from './components/filters';

import {generateCardsTemplate} from './components/cards';
import {generateNewCardTemplate} from './components/card-edit';

import {button} from './components/button';
import {generateButtonTemplate} from './components/button';

const MAX_CARDS_ON_BOARD = 7;
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
renderComponent(generateNewCardTemplate(cards[0]), tasksContainer);
renderComponent(generateCardsTemplate(cards.slice(1, MAX_CARDS_ON_BOARD)), tasksContainer);
renderComponent(generateButtonTemplate(button), boardContainer);

const loadMoreButton = document.querySelector(`.load-more`);
const onLoadMoreButtonClick = () => {
  renderComponent(generateCardsTemplate(cards.slice(MAX_CARDS_ON_BOARD)), tasksContainer);
  loadMoreButton.remove();
};

loadMoreButton.addEventListener(`click`, onLoadMoreButtonClick);
