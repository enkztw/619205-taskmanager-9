import BaseComponent from './base-component';

export default class TaskBaseComponent extends BaseComponent {
  constructor() {
    super();
  }

  checkIsRepeated(repeatingDays) {
    return Array.from(repeatingDays.values()).some((isRepeatedDay) => isRepeatedDay);
  }

  checkIsOutdated(dueDate) {
    return dueDate < new Date();
  }
}
