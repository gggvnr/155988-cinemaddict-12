import Abstract from './abstract';

export const createFilterTemplate = (filters, currentFilterType) => {
  return (
    `<div class="main-navigation__items">
      ${filters.map((filterData) => renderFilterItem(filterData, currentFilterType)).join(``)}
    </div>`
  );
};

const renderFilterItem = (filterData, currentFilterType) => {
  const {
    type,
    name,
    count,
  } = filterData;

  const activeClassname = currentFilterType === type ? `main-navigation__item--active` : ``;

  return `<a href="#${type}" class="main-navigation__item ${activeClassname}">${name} ${renderNavCount(count)}</a>`;
};

const renderNavCount = (value) => {
  return value ? `<span class="main-navigation__item-count">${value}</span>` : ``;
};

export default class Filter extends Abstract {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();

    if (evt.target.classList.contains(`main-navigation__item`)) {
      this._callbacks.filterTypeChange(evt.target.hash.substr(1));
    }
  }

  setFilterTypeChangeHandler(callback) {
    this._callbacks.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }
}
