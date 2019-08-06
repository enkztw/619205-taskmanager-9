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

// Controls
const generateControlTemplate = ({name, description, isChecked}) => {
    return `
    <input type="radio" name="control" id="control__${name}" class="control__input visually-hidden" ${isChecked ? `checked`: ``}/>
    <label for="control__${name}" class="control__label control__label--${name}">${description}</label>`.trim();
}

const generateConrolsTemplate = (controls) => {
  const controlsTemplate = [];
  for (const control of controls) {
    const controlTemplate = generateControlTemplate(control);
    controlsTemplate.push(controlTemplate)
  }

  return controlsTemplate.join();
};

const renderControls = (controls, container) => {
    const controlsWrap = document.createElement(`section`);
    controlsWrap.classList.add(`control__btn-wrap`);

    const controlsTemplate = generateConrolsTemplate(controls);
    controlsWrap.innerHTML = controlsTemplate;

    container.appendChild(controlsWrap);
}

// Search
const generateSearchTemplate = ({name, description}) => {
    return `<input type="text" id="${name.toLowerCase()}__input" class="${name.toLowerCase()}__input" placeholder="${description}" />
  <label class="visually-hidden" for="${name.toLowerCase()}__input">${name}</label>`.trim();
}

const renderSearch = (search, container) => {
    const searchWrap = document.createElement(`section`);
    searchWrap.classList.add(`main__search`, `search`, `container`);

    const searchTemplate = generateSearchTemplate(search);
    searchWrap.innerHTML = searchTemplate;

    container.appendChild(searchWrap);
}



renderControls(controls, conrolsContainer);
renderSearch(search, mainContainer);

