import MovieDetails from './movieDetails';

import FilmView from '../view/film';

import {render, RenderPosition, replace} from '../utils/render';

export default class MovieCard {
  constructor(container, changeData, onModalOpen = () => {}) {
    this._container = container;
    this._changeData = changeData;
    this._onModalOpen = onModalOpen;

    this._filmComponent = null;

    this._filmDetailsPresenter = new MovieDetails();
  }

  init(filmData) {
    this._filmData = Object.assign({}, filmData);

    this._renderFilm(filmData);
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
    this._changeData(
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
    this._changeData(
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
    this._changeData(
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
    this._onModalOpen();
    this._filmDetailsPresenter.show(this._filmData);
  }

  hideDetails() {
    this._filmDetailsPresenter.destroy();
  }

  resetState() {
    this.hideDetails();
  }
}
