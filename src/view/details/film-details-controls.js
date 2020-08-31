import Smart from '../smart';

export const createFilmDetailsControlsTemplate = ({
  isInWatchlist,
  isWatched,
  isFavorite,
}) => {
  return (
    `<section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isInWatchlist ? `checked` : ``}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? `checked` : ``}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorite ? `checked` : ``}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`
  );
};

export default class FilmDetailsControls extends Smart {
  constructor() {
    super();

    this._data = {
      filmDetails: {},
    };

    this._element = this.getElement();

    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsControlsTemplate(this._data);
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.favoritesClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.watchedClick();
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.watchlistClick();
  }

  restoreHandlers() {
    this.setFavoritesClickHandler(this._callbacks.favoritesClick);
    this.setWatchedClickHandler(this._callbacks.watchedClick);
    this.setWatchlistClickHandler(this._callbacks.watchlistClick);
  }

  setFavoritesClickHandler(callback) {
    this._callbacks.favoritesClick = callback;
    this._favoritesButton = this._element.querySelector(`.film-details__control-label--favorite`);
    this._favoritesButton.addEventListener(`click`, this._favoritesClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callbacks.watchedClick = callback;
    this._watchedButton = this._element.querySelector(`.film-details__control-label--watched`);
    this._watchedButton.addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callbacks.watchlistClick = callback;
    this._watchlistButton = this._element.querySelector(`.film-details__control-label--watchlist`);
    this._watchlistButton.addEventListener(`click`, this._watchlistClickHandler);
  }
}
