import Observer from "../utils/observer.js";
import {SortType} from "../const.js";

export default class FilterModel extends Observer {
  constructor() {
    super();
    this._activeSorting = SortType.DEFAULT;
  }

  setSorting(updateType, sorting) {
    this._activeSorting = sorting;
    this._notify(updateType, sorting);
  }

  getSorting() {
    return this._activeSorting;
  }

  resetSorting() {
    this._activeSorting = SortType.DEFAULT;
    this._notify();
  }
}
