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
}];

const generateControlTemplate = ({name, description, isChecked}) => {
  return `
    <input type="radio" name="control" id="control__${name}" class="control__input visually-hidden" ${isChecked ? `checked` : ``}/>
    <label for="control__${name}" class="control__label control__label--${name}">${description}</label>`.trim();
};

const generateConrolsTemplate = (items) => items
    .map(generateControlTemplate)
    .join(``);

export {controls};
export {generateConrolsTemplate};
