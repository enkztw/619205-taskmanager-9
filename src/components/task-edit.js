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
    value="repeat"
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
  }

  get template() {
    return `<article class="card card--edit card--${this._color} ${this._checkIsRepeated(this._repeatingDays) ? `card--repeat` : ``} ${this._checkIsOutdated(this._dueDate) ? `card--deadline` : ``}" data-index="${this._id}">
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
                date: <span class="card__date-status">yes</span>
              </button>
  
              <fieldset class="card__date-deadline">
                <label class="card__input-deadline-wrap">
                  <input
                    class="card__date"
                    type="text"
                    placeholder=""
                    name="date"
                    value="${this._dueDate.getDate()} ${months[this._dueDate.getMonth()]} ${`${this._dueDate.getHours()}`.padStart(2, `0`)}:${`${this._dueDate.getMinutes()}`.padStart(2, `0`)}"
                  />
                </label>
              </fieldset>
  
              <button class="card__repeat-toggle" type="button">
                repeat:<span class="card__repeat-status">yes</span>
              </button>
  
              <fieldset class="card__repeat-days">
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
}
