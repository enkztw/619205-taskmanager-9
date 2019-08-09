const renderContainer = (type, classes, parentContainer) => {
  const container = document.createElement(type);

  container.classList.add(...classes);

  parentContainer.append(container);

  return container;
};

const renderComponent = (template, container) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

export {renderContainer};
export {renderComponent};
