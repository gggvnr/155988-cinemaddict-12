import Abstract from './abstract';
import {SortType} from "../const.js";

export const createSortingTemplate = (sorting) => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button ${getActiveSortingClassname(sorting, SortType.DEFAULT)}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
      <li><a href="#" class="sort__button ${getActiveSortingClassname(sorting, SortType.DATE)}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
      <li><a href="#" class="sort__button ${getActiveSortingClassname(sorting, SortType.RATING)}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
    </ul>`
  );
};

function getActiveSortingClassname(sorting, sortType) {
  return sorting === sortType ? `sort__button--active` : ``;
}

export default class Sorting extends Abstract {
  constructor(sorting) {
    super();

    this._sorting = sorting;

    this._sortingChangeHandler = this._sortingChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortingTemplate(this._sorting);
  }

  _sortingChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callbacks.sortingChange(evt.target.dataset.sortType);
  }

  setSortingChangeHandler(callback) {
    this._callbacks.sortingChange = callback;
    this.getElement().addEventListener(`click`, this._sortingChangeHandler);
  }
}
