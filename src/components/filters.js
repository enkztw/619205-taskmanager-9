import {getRandomNumber} from '../utils';
import {getRandomElement} from '../utils';

const filterNames = [
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`
];

// Filters
const generateFilterData = (name) => {
  const filter = {
    name,
    count: getRandomNumber(0, 69),
    isChecked: false,
    isDisabled: false
  };

  filter.isDisabled = filter.count === 0;

  return filter;
};

const generateFiltersData = (names) => {
  const filters = names.map(generateFilterData);

  const enabledFilters = filters.filter((filter) => !filter.isDisabled);
  getRandomElement(enabledFilters).isChecked = true;

  return filters;
};

const generateFilterTemplate = ({name, count, isChecked, isDisabled}) => {
  const filterTemplate =
      `<input type="radio" id="filter__${name.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${isChecked ? `checked` : ``} ${isDisabled ? `disabled` : ``}/>
      <label for="filter__${name.toLowerCase()}" class="filter__label">${name} <span class="filter__all-count">${count}</span></label>`.trim();
  return filterTemplate;
};

const generateFiltersTemplate = (names) => {
  const filters = generateFiltersData(names);
  const filtersTemplate = filters.map((filter) => generateFilterTemplate(filter));

  return filtersTemplate.join(``);
};

export {filterNames};
export {generateFiltersTemplate};
