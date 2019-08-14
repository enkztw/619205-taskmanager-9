import {colorNames} from './cards';
import {months} from './cards';
import {checkIsRepeated} from './cards';
import {checkIsOutdated} from './cards';

const generateColorTemplate = (color, currentColor) => {
  const colorTemplate =
    `<input type="radio" id="color-${color}-1" class="card__color-input card__color-input--${color} visually-hidden" name="color" value="${color}" ${color === currentColor ? `checked` : ``}/>
    <label for="color-${color}-1" class="card__color card__color--${color}">${color}</label>`;

  return colorTemplate;
};

const generateColorsTemplate = (colors, currentColor) => colors.map((color) => generateColorTemplate(color, currentColor)).join(``);

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

const generateRepeatingDayTemplate = (day, isRepeated) =>
  `<input class="visually-hidden card__repeat-day-input" type="checkbox" id="repeat-${day}-4" name="repeat" value="${day}" ${isRepeated ? `checked` : ``}/>
  <label class="card__repeat-day" for="repeat-${day}-4">${day}</label>`;

const generateRepeatingDaysTemplate = (repeatingDays) => Array.from(repeatingDays.entries())
  .map(([day, isRepeated]) => generateRepeatingDayTemplate(day, isRepeated)).join(``);

const generateNewCardTemplate = ({
  description,
  dueDate,
  repeatingDays,
  tags,
  color,
  isFavorite,
  isArchive
}) => {
  return `<article class="card card--edit card--${color} ${checkIsRepeated(repeatingDays) ? `card--repeat` : ``} ${checkIsOutdated(dueDate) ? `card--deadline` : ``}">
  <form class="card__form" method="get">
    <div class="card__inner">
      <div class="card__control">
        <button type="button" class="card__btn card__btn--archive ${isArchive ? `card__btn--disabled` : ``}">
          archive
        </button>
        <button
          type="button"
          class="card__btn card__btn--favorites ${isFavorite ? `card__btn--disabled` : ``}"
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
          >${description}</textarea>
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
                  value="${dueDate.getDate()} ${months[dueDate.getMonth()]} ${dueDate.getHours() < 10 ? `0${dueDate.getHours()}` : `${dueDate.getHours()}`}:${dueDate.getMinutes() < 10 ? `0${dueDate.getMinutes()}` : `${dueDate.getMinutes()}`}"
                />
              </label>
            </fieldset>

            <button class="card__repeat-toggle" type="button">
              repeat:<span class="card__repeat-status">yes</span>
            </button>

            <fieldset class="card__repeat-days">
              <div class="card__repeat-days-inner">
                ${generateRepeatingDaysTemplate(repeatingDays)}
              </div>
            </fieldset>
          </div>

          <div class="card__hashtag">
            <div class="card__hashtag-list">
            ${generateHashtagsTemplate(tags)}
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
            ${generateColorsTemplate(colorNames, color)}
          </div>
        </div>
      </div>

      <div class="card__status-btns">
        <button class="card__save" type="submit">save</button>
        <button class="card__delete" type="button">delete</button>
      </div>
    </div>
  </form>`.trim();
};

export {
  generateNewCardTemplate
};
