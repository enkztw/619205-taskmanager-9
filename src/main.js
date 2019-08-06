// Utils
const getRandonNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Consts
const mainContainer = document.querySelector(`.main`);
const conrolsContainer = document.querySelector(`.main__control`);

const controls = [{
    name: `new-task`,
    description: `+ ADD NEW TASK`,
    isChecked: true,
  },
  {
    name: `tasks`,
    description: `TASKS`,
    isChecked: false
  },
  {
    name: `statistics`,
    description: `STATISTICS`,
    isChecked: false
  }
];

const search = {
  name: `Search`,
  description: `START TYPING — SEARCH BY WORD, #HASHTAG OR DATE`
};

const filters = [{
    name: `All`,
    count: getRandonNumber(0, 69),
    isChecked: true,
    isDisabled: false
  },
  {
    name: `Overdue`,
    count: getRandonNumber(0, 69),
    isChecked: false,
    isDisabled: true
  },
  {
    name: `Today`,
    count: getRandonNumber(0, 69),
    isChecked: false,
    isDisabled: true,
  },
  {
    name: `Favorites`,
    count: getRandonNumber(0, 69),
    isChecked: false,
    isDisabled: false
  },
  {
    name: `Repeating`,
    count: getRandonNumber(0, 69),
    isChecked: false,
    isDisabled: false
  },
  {
    name: `Tags`,
    count: getRandonNumber(0, 69),
    isChecked: false,
    isDisabled: false
  },
  {
    name: `Achive`,
    count: getRandonNumber(0, 69),
    isChecked: false,
    isDisabled: false
  }
];


// Controls
const generateControlTemplate = ({name, description, isChecked}) => {
  return `
    <input type="radio" name="control" id="control__${name}" class="control__input visually-hidden" ${isChecked ? `checked`: ``}/>
    <label for="control__${name}" class="control__label control__label--${name}">${description}</label>`.trim();
};

const generateConrolsTemplate = (controls) => {
  const controlsTemplate = [];
  for (const control of controls) {
    const controlTemplate = generateControlTemplate(control);
    controlsTemplate.push(controlTemplate)
  }

  return controlsTemplate.join(``);
};

const renderControls = (controls, container) => {
  const controlsWrap = document.createElement(`section`);
  controlsWrap.classList.add(`control__btn-wrap`);

  const controlsTemplate = generateConrolsTemplate(controls);
  controlsWrap.innerHTML = controlsTemplate;

  container.appendChild(controlsWrap);
};


// Search
const generateSearchTemplate = ({name, description}) => {
  return `<input type="text" id="${name.toLowerCase()}__input" class="${name.toLowerCase()}__input" placeholder="${description}" />
  <label class="visually-hidden" for="${name.toLowerCase()}__input">${name}</label>`.trim();
};

const renderSearch = (search, container) => {
  const searchWrap = document.createElement(`section`);
  searchWrap.classList.add(`main__search`, `search`, `container`);

  const searchTemplate = generateSearchTemplate(search);
  searchWrap.innerHTML = searchTemplate;

  container.appendChild(searchWrap);
};


// Filters 
const generateFilterTemplate = ({name, count, isChecked = false, isDisabled = false}) => {
  return `<input type="radio" id="filter__${name.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${isChecked ? `checked` : ``} ${isDisabled ? `disabled` : ``}/>
  <label for="filter__${name.toLowerCase()}" class="filter__label">${name} <span class="filter__all-count">${count}</span></label>`.trim();
}

const generateFiltersTemplate = (filters) => {
  const filtersTemplate = [];
  for (const filter of filters) {
    const filterTemplate = generateFilterTemplate(filter);
    filtersTemplate.push(filterTemplate);
  }

  return filtersTemplate.join(``);
}

const renderFilters = (filters, container) => {
  const filtersWrap = document.createElement(`section`);
  filtersWrap.classList.add(`main__filter`, `filter`, `container`);

  const filtersTemplate = generateFiltersTemplate(filters);
  filtersWrap.innerHTML = filtersTemplate;

  container.appendChild(filtersWrap);
};



renderControls(controls, conrolsContainer);
renderSearch(search, mainContainer);
renderFilters(filters, mainContainer);
