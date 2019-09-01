import TaskBaseComponent from './task-base-component';
import {months} from '../data';

const generateHashtagTemplate = (tag) =>
  `<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${tag}
    </span>
  </span>`.trim();

const generateHashtagsTemplate = (tags) => Array.from(tags)
  .map(generateHashtagTemplate).join(``);

export class Task extends TaskBaseComponent {
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
  }

  get template() {
    return `<article class="card card--${this._color} ${this._checkIsRepeated(this._repeatingDays) ? `card--repeat` : ``}${this._checkIsOutdated(this._dueDate) && this._dueDate ? ` card--deadline` : ``}" data-index="${this._id}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive ${this._isArchive ? `card__btn--disabled` : ``}" >
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
          <p class="card__text">${this._description} - ${this._id}</p>
        </div>
  
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline${!this._dueDate ? ` visually-hidden` : ``}">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${this._dueDate ? `${this._dueDate.getDate()} ${months[this._dueDate.getMonth()]}` : ``}</span>
                  <span class="card__time">${this._dueDate ? `${`${this._dueDate.getHours()}`.padStart(2, `0`)}:${`${this._dueDate.getMinutes()}`.padStart(2, `0`)}` : ``}</span>
                </p>
              </div>
            </div>
  
            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${generateHashtagsTemplate(this._tags)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`.trim();
  }
}

