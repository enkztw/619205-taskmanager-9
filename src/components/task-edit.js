import TaskBaseComponent from './task-base-component';
import {colorNames} from '../data';
import {months} from '../data';

const generateColorTemplate = (color, currentColor, id) => {
  const colorTemplate =
    `<input type="radio" id="color-${color}-${id}" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${color === currentColor ? `checked` : ``}/>
    <label for="color-${color}-${id}" class="card__color card__color--${color}">${color}</label>`;

  return colorTemplate;
};

const generateColorsTemplate = (colors, currentColor, id) => colors.map((color) => generateColorTemplate(color, currentColor, id)).join(``);

const generateHashtagTemplate = (tag) =>
  `<span class="card__hashtag-inner">
  <input
    type="hidden"
    name="hashtag"
    value="${tag}"
    class="card__hashtag-hidden-input"
  />
  <p class="card__hashtag-name">
    #${tag}
  </p>
  <button type="button" class="card__hashtag-delete">
    delete
  </button>
</span>`.trim();

const generateHashtagsTemplate = (tags) => Array.from(tags)
  .map(generateHashtagTemplate).join(``);

const generateRepeatingDayTemplate = (day, isRepeated, id) =>
  `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-${id}" name="repeat" value="${day}" ${isRepeated ? `checked` : ``}/>
  <label class="card__repeat-day" for="repeat-${day}-${id}">${day}</label>`;

const generateRepeatingDaysTemplate = (repeatingDays, id) => Array.from(repeatingDays.entries())
  .map(([day, isRepeated]) => generateRepeatingDayTemplate(day, isRepeated, id)).join(``);

export default class TaskEdit extends TaskBaseComponent {
  constructor({description,
    dueDate,
    repeatingDays,
    tags,
    color,
    isFavorite,
    isArchive,
    id}) {
    super();
    this._checkIsRepeated = super.checkIsRepeated;
    this._checkIsOutdated = super.checkIsOutdated;
    this._description = description;
    this._dueDate = dueDate;
    this._repeatingDays = repeatingDays;
    this._tags = tags;
    this._color = color;
    this._isFavorite = isFavorite;
    this._isArchive = isArchive;
    this._id = id;
    this._element = null;

    this._subscribeOnEvents();
  }

  get template() {
    return `<article class="card card--edit card--${this._color} ${this._checkIsRepeated(this._repeatingDays) ? `card--repeat` : ``}${this._checkIsOutdated(this._dueDate) && this._dueDate ? ` card--deadline` : ``}" data-index="${this._id}">
    <form class="card__form" method="get">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}">
            archive
          </button>
          <button
            type="button"
            class="card__btn card__btn--favorites ${this._isFavorite ? `card__btn--disabled` : ``}"
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
          <label>
            <textarea
              class="card__text"
              placeholder="Start typing your text here..."
              name="text"
            >${this._description}</textarea>
          </label>
        </div>
  
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <button class="card__date-deadline-toggle" type="button">
                date: <span class="card__date-status">${this._dueDate ? `yes` : `no`}</span>
              </button>
  
              <fieldset class="card__date-deadline${!this._dueDate ? ` visually-hidden` : ``}">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${this._dueDate ? `${this._dueDate.getDate()} ${months[this._dueDate.getMonth()]} ${`${this._dueDate.getHours()}`.padStart(2, `0`)}:${`${this._dueDate.getMinutes()}`.padStart(2, `0`)}` : ``}"
                  />
                </label>
              </fieldset>
  
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">${this._checkIsRepeated(this._repeatingDays) ? `yes` : `no`}</span>
              </button>
  
              <fieldset class="card__repeat-days${!this._checkIsRepeated(this._repeatingDays) ? ` visually-hidden` : ``}">
                <div class="card__repeat-days-inner">
                  ${generateRepeatingDaysTemplate(this._repeatingDays, this._id)}
                </div>
              </fieldset>
            </div>
  
            <div class="card__hashtag">
              <div class="card__hashtag-list">
              ${generateHashtagsTemplate(this._tags)}
              </div>
  
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
              ${generateColorsTemplate(colorNames, this._color, this._id)}
            </div>
          </div>
        </div>
  
        <div class="card__status-btns">
          <button class="card__save" type="submit">save</button>
          <button class="card__delete" type="button">delete</button>
        </div>
      </div>
    </form>`.trim();
  }

  _subscribeOnEvents() {
    const onHashtagDeleteButton = (evt) => {
      evt.preventDefault();

      const hashtag = evt.target.closest(`.card__hashtag-inner`);
      hashtag.remove();
    };

    this.element.querySelector(`.card__hashtag-input`).addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        evt.preventDefault();

        const hashtag = document.createElement(`span`);
        hashtag.classList.add(`card__hashtag-inner`);

        hashtag.innerHTML = `
        <input 
        type="hidden" 
        name="hashtag" 
        value="${evt.target.value}" 
        class="card__hashtag-hidden-input" 
        />
        <p class="card__hashtag-name">
        #${evt.target.value}
        </p>
        <button type="button" class="card__hashtag-delete">
        delete
        </button>`.trim();

        hashtag.querySelector(`.card__hashtag-delete`).addEventListener(`click`, onHashtagDeleteButton);
        this.element.querySelector(`.card__hashtag-list`).insertAdjacentElement(`beforeend`, hashtag);
        evt.target.value = ``;
      }
    });

    for (const color of this.element.querySelectorAll(`.card__color-input`)) {
      color.addEventListener(`click`, (evt) => {
        this.element.className = this.element.classList.value.replace(`${this.element.classList[2]}`, `card--${evt.target.value}`);
      });
    }

    this.element.querySelector(`.card__repeat-toggle`).addEventListener(`click`, () => {
      if (this.element.querySelector(`.card__repeat-status`).textContent === `yes`) {
        this.element.classList.remove(`card--repeat`);
        this.element.querySelector(`.card__repeat-status`).textContent = `no`;

        for (const repeatingDay of this.element.querySelectorAll(`.card__repeat-day-input`)) {
          repeatingDay.checked = false;
        }

      } else {
        this.element.classList.add(`card--repeat`);
        this.element.querySelector(`.card__repeat-status`).textContent = `yes`;

        for (const repeatingDay of this.element.querySelectorAll(`.card__repeat-day-input`)) {
          repeatingDay.checked = this._repeatingDays.get(repeatingDay.value);
        }
      }

      this.element.querySelector(`.card__repeat-days`).classList.toggle(`visually-hidden`);
    });

    this.element.querySelector(`.card__date-deadline-toggle`).addEventListener(`click`, () => {
      const date = this.element.querySelector(`.card__date`).value;
      if (this.element.querySelector(`.card__date-status`).textContent === `yes`) {
        this.element.querySelector(`.card__date-status`).textContent = `no`;
        this.element.querySelector(`.card__date`).value = ``;

      } else {
        this.element.querySelector(`.card__date-status`).textContent = `yes`;
        this.element.querySelector(`.card__date`).value = date;
      }

      this.element.querySelector(`.card__date-deadline`).classList.toggle(`visually-hidden`);
    });

    for (const hashtag of this.element.querySelectorAll(`.card__hashtag-inner`)) {
      hashtag.querySelector(`.card__hashtag-delete`).addEventListener(`click`, onHashtagDeleteButton);
    }
  }
}
