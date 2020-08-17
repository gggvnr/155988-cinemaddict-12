import Abstract from './abstract';

export const createShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMore extends Abstract {
  getTemplate() {
    return createShowMoreTemplate();
  }
}
