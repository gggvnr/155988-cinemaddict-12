import Abstract from './abstract';

const createIndexLoadingTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>`
  );
};

export default class IndexLoading extends Abstract {
  getTemplate() {
    return createIndexLoadingTemplate();
  }
}
