import {getRandomNumber} from './utils';
import {getRandomElement} from './utils';
import {getRandomBoolean} from './utils';

const CARD_AMOUNT = 10;


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

const generateTaskData = (id) => {
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
    isArchive: getRandomBoolean(),
    id
  };

  return card;
};

const generateTasksData = (amount) => [...Array(amount)].map((task, index) => generateTaskData(index));

const tasks = generateTasksData(CARD_AMOUNT);

export {months};
export {colorNames};
export {tasks};
