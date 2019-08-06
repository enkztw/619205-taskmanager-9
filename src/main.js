'use strict';

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

const filters = [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Tags`, `Archive`];


const colors = [`black`, `blue`, `yellow`, `green`];
const hashtagsNames = [`code`, `gym`, `work`];
const descriptions = [`It Looks Red, Tastes Blue`, `Mozart Season`, `Let There Be Love`, `Время лечит, слова калечат`, `Грокаем Алгоритмы`];

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

const generateConrolsTemplate = (controlsData) => {
  const controlsTemplate = [];
  for (const control of controlsData) {
    const controlTemplate = generateControlTemplate(control);
    controlsTemplate.push(controlTemplate);
  }

  return controlsTemplate.join(``);
};

const renderControls = (controlsData, container) => {
  const controlsWrap = document.createElement(`section`);
  controlsWrap.classList.add(`control__btn-wrap`);

  const controlsTemplate = generateConrolsTemplate(controlsData);
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

const renderSearch = (searchData, container) => {
  const searchWrap = document.createElement(`section`);
  searchWrap.classList.add(`main__search`, `search`, `container`);

  const searchTemplate = generateSearchTemplate(searchData);
  searchWrap.innerHTML = searchTemplate;

  container.appendChild(searchWrap);
};


// Filters
const generateFiltersData = (filtersNames) => {
  const filtersData = [];
  for (const name of filtersNames) {
    const filterData = {
      name,
      count: getRandomNumber(0, 69),
      isChecked: false,
      isDisabled: false
    };

    filtersData.push(filterData);
  }

  // Checking & disabling random filters
  filtersData[getRandomNumber(0, filtersData.length - 1)].isChecked = true;
  const nonCheckedFilters = filtersData.filter((filterData) => !filterData.isChecked);
  nonCheckedFilters[getRandomNumber(0, nonCheckedFilters.length - 1)].isDisabled = true;

  return filtersData;
};

const generateFilterTemplate = ({
  name,
  count,
  isChecked = false,
  isDisabled = false
}) => {
  return `<input type="radio" id="filter__${name.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${isChecked ? `checked` : ``} ${isDisabled ? `disabled` : ``}/>
  <label for="filter__${name.toLowerCase()}" class="filter__label">${name} <span class="filter__all-count">${count}</span></label>`.trim();
};

const generateFiltersTemplate = (filtersNames) => {
  const filtersTemplate = [];
  const filtersData = generateFiltersData(filtersNames);

  for (const filter of filtersData) {
    const filterTemplate = generateFilterTemplate(filter);
    filtersTemplate.push(filterTemplate);
  }

  return filtersTemplate.join(``);
};

const renderFilters = (filtersNames, container) => {
  const filtersWrap = document.createElement(`section`);
  filtersWrap.classList.add(`main__filter`, `filter`, `container`);

  const filtersTemplate = generateFiltersTemplate(filtersNames);
  filtersWrap.innerHTML = filtersTemplate;

  container.appendChild(filtersWrap);
};


// Cards
const generateCardsData = (number) => {
  const cardsData = [];

  for (let i = 0; i < number; i++) {
    const cardData = {
      color: getRandomElement(colors),
      hashtags: hashtagsNames,
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
  const generateHashtagsTemplate = (hashtagData) => {
    const hashtagsTemplate = [];
    for (const hashtag of hashtagData) {
      const hashtagTemplate = `
      <span class="card__hashtag-inner">
        <span class="card__hashtag-name">
          #${hashtag}
        </span>
      </span>`;

      hashtagsTemplate.push(hashtagTemplate);
    }
    return hashtagsTemplate.join(``);
  };

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
};

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

// New card
const generateNewCardTemplate = () => {
  return `<article class="card card--edit card--black">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
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
        <svg width="100%" height="10">
          <use xlink:href="#wave"></use>
        </svg>
      </div>

      <div class="card__textarea-wrap">
        <label>
          <textarea
            class="card__text"
            placeholder="Start typing your text here..."
            name="text"
          >This is example of new task, you can add picture, set date and time, add tags.</textarea>
        </label>
      </div>

      <div class="card__settings">
        <div class="card__details">
          <div class="card__dates">
            <button class="card__date-deadline-toggle" type="button">
              date: <span class="card__date-status">no</span>
            </button>

            <fieldset class="card__date-deadline" disabled>
              <label class="card__input-deadline-wrap">
                <input
                  class="card__date"
                  type="text"
                  placeholder="23 September"
                  name="date"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">no</span>
            </button>

            <fieldset class="card__repeat-days" disabled>
              <div class="card__repeat-days-inner">
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-mo-1"
                  name="repeat"
                  value="mo"
                />
                <label class="card__repeat-day" for="repeat-mo-1"
                  >mo</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-tu-1"
                  name="repeat"
                  value="tu"
                  checked
                />
                <label class="card__repeat-day" for="repeat-tu-1"
                  >tu</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-we-1"
                  name="repeat"
                  value="we"
                />
                <label class="card__repeat-day" for="repeat-we-1"
                  >we</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-th-1"
                  name="repeat"
                  value="th"
                />
                <label class="card__repeat-day" for="repeat-th-1"
                  >th</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-fr-1"
                  name="repeat"
                  value="fr"
                  checked
                />
                <label class="card__repeat-day" for="repeat-fr-1"
                  >fr</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  name="repeat"
                  value="sa"
                  id="repeat-sa-1"
                />
                <label class="card__repeat-day" for="repeat-sa-1"
                  >sa</label
                >
                <input
                  class="visually-hidden card__repeat-day-input"
                  type="checkbox"
                  id="repeat-su-1"
                  name="repeat"
                  value="su"
                  checked
                />
                <label class="card__repeat-day" for="repeat-su-1"
                  >su</label
                >
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list"></div>

            <label>
              <input
                type="text"
                class="card__hashtag-input"
                name="hashtag-input"
                placeholder="Type new hashtag here"
              />
            </label>
          </div>
        </div>

        <div class="card__colors-inner">
          <h3 class="card__colors-title">Color</h3>
          <div class="card__colors-wrap">
            <input
              type="radio"
              id="color-black-1"
              class="card__color-input card__color-input--black visually-hidden"
              name="color"
              value="black"
              checked
            />
            <label
              for="color-black-1"
              class="card__color card__color--black"
              >black</label
            >
            <input
              type="radio"
              id="color-yellow-1"
              class="card__color-input card__color-input--yellow visually-hidden"
              name="color"
              value="yellow"
            />
            <label
              for="color-yellow-1"
              class="card__color card__color--yellow"
              >yellow</label
            >
            <input
              type="radio"
              id="color-blue-1"
              class="card__color-input card__color-input--blue visually-hidden"
              name="color"
              value="blue"
            />
            <label
              for="color-blue-1"
              class="card__color card__color--blue"
              >blue</label
            >
            <input
              type="radio"
              id="color-green-1"
              class="card__color-input card__color-input--green visually-hidden"
              name="color"
              value="green"
            />
            <label
              for="color-green-1"
              class="card__color card__color--green"
              >green</label
            >
            <input
              type="radio"
              id="color-pink-1"
              class="card__color-input card__color-input--pink visually-hidden"
              name="color"
              value="pink"
            />
            <label
              for="color-pink-1"
              class="card__color card__color--pink"
              >pink</label
            >
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>
</article>`.trim();
};

const generateNewCardsTemplates = (number) => {
  const newCardsTemplates = [];
  for (let i = 0; i < number; i++) {
    const newCardTemplate = generateNewCardTemplate();
    newCardsTemplates.push(newCardTemplate);
  }

  return newCardsTemplates;
};

const renderNewCards = (number, container) => {
  const newCardsTemplates = generateNewCardsTemplates(number);
  const fragment = document.createDocumentFragment();
  for (const newCardTemplate of newCardsTemplates) {
    const newCardWrap = document.createElement(`div`);
    newCardWrap.innerHTML = newCardTemplate;

    fragment.appendChild(newCardWrap);
  }

  container.appendChild(fragment);
};

renderControls(controls, conrolsContainer);
renderSearch(search, mainContainer);
renderFilters(filters, mainContainer);
renderCards(getRandomNumber(1, 3), mainContainer);
renderNewCards(1, document.querySelector(`.board__tasks`));
