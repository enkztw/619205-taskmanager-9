import {getRandomNumber} from '../utils';
import {getRandomElement} from '../utils';

const colorNames = [
  `black`,
  `blue`,
  `yellow`,
  `green`,
  `pink`
];

const hashtagNames = [`code`, `gym`, `work`];
const descriptions = [
  `It Looks Red, Tastes Blue`,
  `Mozart Season`,
  `Let There Be Love`,
  `Время лечит, слова калечат`,
  `Грокаем Алгоритмы`
];

const generateCardData = () => {
  const card = {
    color: getRandomElement(colorNames),
    hashtags: hashtagNames,
    description: getRandomElement(descriptions),
    date: `${getRandomNumber(1, 31)} August`,
    time: `${getRandomNumber(0, 12)}:${getRandomNumber(0, 60)}`
  };

  return card;
};

const generateCardsData = (amount) => {
  const cards = [...Array(amount)].map(generateCardData);

  return cards;
};

const generateHashtagTemplate = (hashtag) =>
  `<span class="card__hashtag-inner">
      <span class="card__hashtag-name">
        #${hashtag}
      </span>
    </span>`.trim();

const generateHashtagsTemplate = (hashtags) => hashtags
    .map(generateHashtagTemplate).join(``);

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

const generateCardsTemplate = (amount) => {
  const cards = generateCardsData(amount);
  const cardsTemplate = cards.map((card) => generateCardTemplate(card));

  return cardsTemplate.join(``);
};

export {colorNames};
export {generateCardsTemplate};

