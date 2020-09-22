import UserRankView from "../view/user-rank.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {getUserRank} from '../utils/common';

export default class UserRank {
  constructor(container, moviesModel) {
    this._container = container;
    this._moviesModel = moviesModel;

    this._userRankComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    const films = this._moviesModel.getMovies();
    const userRankLabel = getUserRank(films);
    const prevUserRankComponent = this._userRankComponent;

    this._userRankComponent = new UserRankView(userRankLabel);

    if (prevUserRankComponent === null) {
      render(this._container, this._userRankComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._userRankComponent, prevUserRankComponent);
    remove(prevUserRankComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
