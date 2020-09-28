import SortingView from '../view/sorting';

import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {UpdateType} from "../const.js";

export default class Filter {
  constructor(sortingContainer, sortingModel) {
    this._sortingContainer = sortingContainer;
    this._sortingModel = sortingModel;
    this._currentSorting = null;

    this._sortingComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortingChange = this._handleSortingChange.bind(this);

    this._sortingModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentSorting = this._sortingModel.getSorting();

    const prevSortingComponent = this._sortingComponent;

    this._sortingComponent = new SortingView(this._currentSorting);
    this._sortingComponent.setSortingChangeHandler(this._handleSortingChange);

    if (prevSortingComponent === null) {
      render(this._sortingContainer, this._sortingComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._sortingComponent, prevSortingComponent);
    remove(prevSortingComponent);
  }

  destroy() {
    this._sortingModel.resetSorting();

    remove(this._sortingComponent);
    this._sortingComponent = null;
  }

  _handleModelEvent() {
    this.init();
  }

  _handleSortingChange(sorting) {
    if (this._currentSorting === sorting) {
      return;
    }

    this._sortingModel.setSorting(UpdateType.MINOR, sorting);
  }
}
