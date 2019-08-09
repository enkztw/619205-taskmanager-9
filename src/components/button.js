const button = {
  name: `load-more`,
  description: `load more`
};

// Button
const generateButtonTemplate = ({
  name,
  description
}) => {
  const buttonTemplate = `<button class="${name}" type="button">${description}</button>`;

  return buttonTemplate;
};

export {button};
export {generateButtonTemplate};
