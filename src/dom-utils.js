const renderContainer = (type, classes, parentContainer) => {
  const container = document.createElement(type);

  container.classList.add(...classes);

  parentContainer.append(container);

  return container;
};

const renderComponent = (template, container) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export {renderContainer};
export {renderComponent};
export {createElement};
