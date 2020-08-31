import FilmView from '../view/film';

import {UserAction, UpdateType} from '../const';
import {render, RenderPosition, replace, remove} from '../utils/render';

export default class MovieCard {
  constructor(container, handleViewAction = () => {}) {
    this._container = container;
    this._handleViewAction = handleViewAction;

    this._filmComponent = null;
  }

  init(filmData) {
    this._filmData = filmData;

    this._renderFilm(filmData);
  }

  destroy() {
    remove(this._filmComponent);
  }

  _renderFilm(filmData) {
    const prevFilmComponent = this._filmComponent;

    this._filmComponent = new FilmView(filmData);

    this._setHandlers();

    if (prevFilmComponent === null) {
      render(this._container, this._filmComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filmComponent, prevFilmComponent);
  }

  _handleFavoritesChange() {
    this._handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MAJOR,
        Object.assign(
            {},
            this._filmData,
            {
              isFavorite: !this._filmData.isFavorite,
            }
        )
    );
  }

  _handleWatchedChange() {
    this._handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MAJOR,
        Object.assign(
            {},
            this._filmData,
            {
              isWatched: !this._filmData.isWatched,
            }
        )
    );
  }

  _handleWatchlistChange() {
    this._handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MAJOR,
        Object.assign(
            {},
            this._filmData,
            {
              isInWatchlist: !this._filmData.isInWatchlist,
            }
        )
    );
  }

  _setHandlers() {
    this._filmComponent.setCardClickHandler(() => this.showDetails());
    this._filmComponent.setFavoritesClickHandler(() => this._handleFavoritesChange());
    this._filmComponent.setWatchedClickHandler(() => this._handleWatchedChange());
    this._filmComponent.setWatchlistClickHandler(() => this._handleWatchlistChange());
  }

  showDetails() {
    this._handleViewAction(UserAction.OPEN_DETAILS, null, {filmId: this._filmData.id});
  }

  hideDetails() {
    this._handleViewAction(UserAction.HIDE_DETAILS);
  }
}
