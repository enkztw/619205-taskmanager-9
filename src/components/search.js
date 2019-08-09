const search = {
  name: `Search`,
  description: `START TYPING — SEARCH BY WORD, #HASHTAG OR DATE`
};

const generateSearchTemplate = ({name, description}) => {
  const searchTemplate =
    `<input type="text" id="${name.toLowerCase()}__input" class="${name.toLowerCase()}__input" placeholder="${description}" />
    <label class="visually-hidden" for="${name.toLowerCase()}__input">${name}</label>`.trim();

  return searchTemplate;
};

export {search};
export {generateSearchTemplate};
