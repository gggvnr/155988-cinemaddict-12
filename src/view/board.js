import Abstract from './abstract';

const createBoardTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

export default class Board extends Abstract {
  getTemplate() {
    return createBoardTemplate();
  }
}
