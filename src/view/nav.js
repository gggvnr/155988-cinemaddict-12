import Abstract from './abstract';

export const createNavTemplate = () => {
  return (
    `<nav class="main-navigation">

      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Nav extends Abstract {
  getTemplate() {
    return createNavTemplate(this._filters);
  }
}
