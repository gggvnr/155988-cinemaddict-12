import Abstract from './abstract';

export const createNavTemplate = () => {
  return (
    `<nav class="main-navigation">

      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class Nav extends Abstract {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.menuClick(evt.target.hash);
  }

  setMenuClickHandler(callback) {
    this._callbacks.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  getTemplate() {
    return createNavTemplate(this._filters);
  }

  setMenuItem(menuItem) {
    const item = this.getElement().querySelector(`[value=${menuItem}]`);

    if (item !== null) {
      item.checked = true;
    }
  }
}
