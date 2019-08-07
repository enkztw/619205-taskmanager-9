'use strict';

// Utils
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomElement = (array) => array[Math.floor(Math.random() * array.length)];

// Consts
const CARDS = 3;
const mainContainer = document.querySelector(`.main`);

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

const filtersNames = [
  `All`,
  `Overdue`,
  `Today`,
  `Favorites`,
  `Repeating`,
  `Tags`,
  `Archive`
];


const colorsNames = [
  `black`,
  `blue`,
  `yellow`,
  `green`,
  `pink`
];

const hashtagsNames = [`code`, `gym`, `work`];
const descriptions = [
  `It Looks Red, Tastes Blue`,
  `Mozart Season`,
  `Let There Be Love`,
  `Время лечит, слова калечат`,
  `Грокаем Алгоритмы`
];

const button = {
  name: `load-more`,
  description: `load more`
};

// Controls
const generateControlTemplate = ({
  name,
  description,
  isChecked
}) => {
  return `
    <input type="radio" name="control" id="control__${name}" class="control__input visually-hidden" ${isChecked ? `checked` : ``}/>
    <label for="control__${name}" class="control__label control__label--${name}">${description}</label>`.trim();
};

const generateConrolsTemplate = (items) => {
  const controlsTemplate = items.map((item) => generateControlTemplate(item));

  return controlsTemplate.join(``);
};


// Search
const generateSearchTemplate = ({
  name,
  description
}) => {
  const searchTemplate =
    `<input type="text" id="${name.toLowerCase()}__input" class="${name.toLowerCase()}__input" placeholder="${description}" />
  <label class="visually-hidden" for="${name.toLowerCase()}__input">${name}</label>`.trim();

  return searchTemplate;
};


// Filters
const generateFiltersData = (filters) => {
  const filtersData = filters.map((filterName) => {
    const filterData = {
      name: filterName,
      count: getRandomNumber(0, 69),
      isChecked: false,
      isDisabled: false
    };

    return filterData;
  });

  // Checking & disabling random filters
  getRandomElement(filtersData).isChecked = true;
  const nonCheckedFilters = filtersData.filter((filterData) => !filterData.isChecked);
  nonCheckedFilters[getRandomNumber(0, nonCheckedFilters.length - 1)].isDisabled = true;

  return filtersData;
};

const generateFilterTemplate = ({
  name,
  count,
  isChecked,
  isDisabled
}) => {
  const filterTemplate =
    `<input type="radio" id="filter__${name.toLowerCase()}" class="filter__input visually-hidden" name="filter" ${isChecked ? `checked` : ``} ${isDisabled ? `disabled` : ``}/>
    <label for="filter__${name.toLowerCase()}" class="filter__label">${name} <span class="filter__all-count">${count}</span></label>`.trim();
  return filterTemplate;
};

const generateFiltersTemplate = (filters) => {
  const filtersData = generateFiltersData(filters);
  const filtersTemplate = filtersData.map((filterData) => generateFilterTemplate(filterData));

  return filtersTemplate.join(``);
};


// Cards
const generateCardsData = (number) => {
  const cardsData = new Array(number).fill(null).map(() => {
    const cardData = {
      color: getRandomElement(colorsNames),
      hashtags: hashtagsNames,
      description: getRandomElement(descriptions),
      date: `${getRandomNumber(1, 31)} August`,
      time: `${getRandomNumber(0, 12)}:${getRandomNumber(0, 60)}`
    };

    return cardData;
  });

  return cardsData;
};

const generateHashtagTemplate = (hashtag) => {
  const hashtagTemplate =
  `<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${hashtag}
    </span>
  </span>`.trim();

  return hashtagTemplate;
};

const generateHashtagsTemplate = (hashtags) => {
  const hashtagsTemplate = hashtags.map((hashtag) => generateHashtagTemplate(hashtag));

  return hashtagsTemplate.join(``);
};

const generateCardTemplate = ({
  color,
  hashtags,
  description,
  date,
  time
}) => {
  const cardTemplate = `<article class="card card--${color}">
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

  return cardTemplate;
};

const generateCardsTemplate = (cardsNumber) => {
  const cards = generateCardsData(cardsNumber);
  const cardsTemplate = cards.map((card) => generateCardTemplate(card));

  return cardsTemplate.join(``);
};


// New card
const generateColorTemplate = (color) => {
  const colorTemplate =
  `<input type="radio" id="color-${color}-1" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${color === `black` ? `checked` : ``}/>
  <label for="color-${color}-1" class="card__color card__color--${color}">${color}</label>`;

  return colorTemplate;
};

const generateColorsTemplate = (colors) => {
  const colorsTemplate = colors.map((color) => generateColorTemplate(color));

  return colorsTemplate.join(``);
};

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
            ${generateColorsTemplate(colorsNames)}
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


// Button
const generateButtonTemplate = ({
  name,
  description
}) => {
  const buttonTemplate = `<button class="${name}" type="button">${description}</button>`;

  return buttonTemplate;
};


// Containers & components
const renderContainer = (type, classes, parentContainer) => {
  const container = document.createElement(type);

  for (const className of classes) {
    container.classList.add(className);
  }

  parentContainer.append(container);
};

const renderComponent = (template, container) => {
  container.insertAdjacentHTML(`beforeend`, template);
};


// Controls container
const controlsContainer = document.querySelector(`.main__control`);

// Search container
renderContainer(`section`, [`main__search`, `search`, `container`], mainContainer);
const searchContainer = document.querySelector(`.main__search`);

// Filters container
renderContainer(`section`, [`main__filter`, `filter`, `container`], mainContainer);
const filtersContainer = document.querySelector(`.main__filter`);

// Board container
renderContainer(`section`, [`board`, `container`], mainContainer);
const boardContainer = document.querySelector(`.board`);

// Tasks container
renderContainer(`div`, [`board__tasks`], boardContainer);
const tasksContainer = document.querySelector(`.board__tasks`);

renderComponent(generateConrolsTemplate(controls), controlsContainer);
renderComponent(generateSearchTemplate(search), searchContainer);
renderComponent(generateFiltersTemplate(filtersNames), filtersContainer);
renderComponent(generateNewCardTemplate(), tasksContainer);
renderComponent(generateCardsTemplate(CARDS), tasksContainer);
renderComponent(generateButtonTemplate(button), boardContainer);
