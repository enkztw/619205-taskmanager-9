// Utils
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

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
    count: getRandomNumber(0, 69),
    isChecked: true,
    isDisabled: false
  },
  {
    name: `Overdue`,
    count: getRandomNumber(0, 69),
    isChecked: false,
    isDisabled: true
  },
  {
    name: `Today`,
    count: getRandomNumber(0, 69),
    isChecked: false,
    isDisabled: true,
  },
  {
    name: `Favorites`,
    count: getRandomNumber(0, 69),
    isChecked: false,
    isDisabled: false
  },
  {
    name: `Repeating`,
    count: getRandomNumber(0, 69),
    isChecked: false,
    isDisabled: false
  },
  {
    name: `Tags`,
    count: getRandomNumber(0, 69),
    isChecked: false,
    isDisabled: false
  },
  {
    name: `Achive`,
    count: getRandomNumber(0, 69),
    isChecked: false,
    isDisabled: false
  }
];


const colors = [`black`, `blue`, `yellow`, `green`];
const hashtags = [`code`, `gym`, `work`];
const descriptions = [`It Looks Red, Tastes Blue`, `Mozart Season`, `Let There Be Love`, `Время лечит, слова калечат`, `Грокаем Алгоритмы`]

// Controls
const generateControlTemplate = ({
  name,
  description,
  isChecked
}) => {
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
const generateSearchTemplate = ({
  name,
  description
}) => {
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
const generateFilterTemplate = ({
  name,
  count,
  isChecked = false,
  isDisabled = false
}) => {
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


// Cards
const generateCardsData = (number) => {
  const cardsData = [];

  for (let i = 0; i <= number; i++) {
    const cardData = {
      color: getRandomElement(colors),
      hashtags: hashtags,
      description: getRandomElement(descriptions),
      date: `${getRandomNumber(1, 31)} August`,
      time: `${getRandomNumber(0, 12)}:${getRandomNumber(0, 60)}`
    };

    cardsData.push(cardData);
  }

  return cardsData;
};

const generateCardTemplate = ({
  color,
  hashtags,
  description,
  date,
  time
}) => {
  const generateHashtagsTemplate = (hashtags) => {
    const hashtagsTemplate = [];
    for (const hashtag of hashtags) {
      const hashtagTemplate = `
      <span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${hashtag}
        </span>
      </span>`;

      hashtagsTemplate.push(hashtagTemplate);
    }
    return hashtagsTemplate.join(``);
  }

  return `<article class="card card--${color}">
  <div class="card__form">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--edit">
          edit
        </button>
        <button type="button" class="card__btn card__btn--archive">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites card__btn--disabled"
        >
          favorites
        </button>
      </div>

      <div class="card__color-bar">
        <svg class="card__color-bar-wave" width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <p class="card__text">${description}</p>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <div class="card__date-deadline">
              <p class="card__input-deadline-wrap">
                <span class="card__date">${date}</span>
                <span class="card__time">${time} PM</span>
              </p>
            </div>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
              ${generateHashtagsTemplate(hashtags)}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</article>`.trim();
};

const generateCardsTemplate = (cards) => {
  const cardsTemplate = [];
  for (const card of cards) {
    const cardTemplate = generateCardTemplate(card);
    cardsTemplate.push(cardTemplate);
  }
  
  return cardsTemplate.join(``);
}

const renderCards = (cardsNumber, container) => {
  const boardWrap = document.createElement(`section`);
  boardWrap.classList.add(`board`, `container`);
  const tasksBoard = document.createElement(`div`);
  tasksBoard.classList.add(`board__tasks`);

  
  const cardsData = generateCardsData(cardsNumber);
  const cardsTemplate = generateCardsTemplate(cardsData);


  tasksBoard.innerHTML = cardsTemplate;

  boardWrap.appendChild(tasksBoard);
  container.appendChild(boardWrap);
};



renderControls(controls, conrolsContainer);
renderSearch(search, mainContainer);
renderFilters(filters, mainContainer);
renderCards(getRandomNumber(1,6), mainContainer);
