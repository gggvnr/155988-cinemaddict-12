import Abstract from './abstract';

const createIndexNoDataTemplate = () => {
  return (
    `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
    </section>`
  );
};

export default class IndexNoData extends Abstract {
  getTemplate() {
    return createIndexNoDataTemplate();
  }
}
