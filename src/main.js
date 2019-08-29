import {renderContainer} from './dom-utils';
import {renderComponent} from './dom-utils';

import {tasks} from './data';

import {controls} from './components/controls';
import {generateConrolsTemplate} from './components/controls';

import {search} from './components/search';
import {generateSearchTemplate} from './components/search';

import {filterNames} from './components/filters';
import {generateFiltersTemplate} from './components/filters';

import BoardController from './board-controller';


// Main container
const mainContainer = document.querySelector(`.main`);

// Controls container
const controlsContainer = document.querySelector(`.main__control`);

// Search container
const searchContainer = renderContainer(`section`, [`main__search`, `search`, `container`], mainContainer);

// Filters container
const filtersContainer = renderContainer(`section`, [`main__filter`, `filter`, `container`], mainContainer);

// Controls, search, filters
renderComponent(generateConrolsTemplate(controls), controlsContainer);
renderComponent(generateSearchTemplate(search), searchContainer);
renderComponent(generateFiltersTemplate(filterNames), filtersContainer);

// Board init
const boardController = new BoardController(mainContainer, tasks);
boardController.boardInit();
