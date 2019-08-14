import {getRandomNumber} from '../utils';
import {getRandomElement} from '../utils';
import {getRandomBoolean} from '../utils';

const colorNames = [
  `black`,
  `blue`,
  `yellow`,
  `green`,
  `pink`
];

const hashtagNames = [`code`, `gym`, `work`];
const descriptions = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const months = [
  `Januray`,
  `February`,
  `March`,
  `April`,
  `May`,
  `July`,
  `June`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`
];

const generateCardData = () => {
  const card = {
    description: getRandomElement(descriptions),
    dueDate: new Date(new Date().getTime() + getRandomNumber(-604800000, 604800000)),
    repeatingDays: new Map([
      [`Mo`, getRandomBoolean()],
      [`Tu`, getRandomBoolean()],
      [`We`, getRandomBoolean()],
      [`Th`, getRandomBoolean()],
      [`Fr`, getRandomBoolean()],
      [`Sa`, getRandomBoolean()],
      [`Su`, getRandomBoolean()]
    ]),
    tags: new Set(hashtagNames),
    color: getRandomElement(colorNames),
    isFavorite: getRandomBoolean(),
    isArchive: getRandomBoolean()
  };

  return card;
};

const generateCardsData = (amount) => [...Array(amount)].map(generateCardData);

const generateHashtagTemplate = (tag) =>
  `<span class="card__hashtag-inner">
    <span class="card__hashtag-name">
      #${tag}
    </span>
  </span>`.trim();

const generateHashtagsTemplate = (tags) => Array.from(tags)
  .map(generateHashtagTemplate).join(``);


const checkIsRepeated = (repeatingDays) => Array.from(repeatingDays.values())
  .some((isRepeatedDay) => isRepeatedDay);

const checkIsOutdated = (dueDate) => dueDate < new Date();

const generateCardTemplate = ({
  description,
  dueDate,
  repeatingDays,
  tags,
  color,
  isFavorite,
  isArchive
}) => {
  const cardTemplate = `<article class="card card--${color} ${checkIsRepeated(repeatingDays) ? `card--repeat` : ``} ${checkIsOutdated(dueDate) ? `card--deadline` : ``}">
    <div class="card__form">
      <div class="card__inner">
        <div class="card__control">
          <button type="button" class="card__btn card__btn--edit">
            edit
          </button>
          <button type="button" class="card__btn card__btn--archive ${isArchive ? `card__btn--disabled` : ``}" >
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
          <p class="card__text">${description}</p>
        </div>
  
        <div class="card__settings">
          <div class="card__details">
            <div class="card__dates">
              <div class="card__date-deadline">
                <p class="card__input-deadline-wrap">
                  <span class="card__date">${dueDate.getDate()} ${months[dueDate.getMonth()]}</span>
                  <span class="card__time">${dueDate.getHours() < 10 ? `0${dueDate.getHours()}` : `${dueDate.getHours()}`}:${dueDate.getMinutes() < 10 ? `0${dueDate.getMinutes()}` : `${dueDate.getMinutes()}`}</span>
                </p>
              </div>
            </div>
  
            <div class="card__hashtag">
              <div class="card__hashtag-list">
                ${generateHashtagsTemplate(tags)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>`.trim();

  return cardTemplate;
};

const generateCardsTemplate = (cards) => cards.map(generateCardTemplate).join(``);

export {colorNames};
export {months};
export {generateCardsData};
export {generateCardsTemplate};
export {checkIsRepeated};
export {checkIsOutdated};

