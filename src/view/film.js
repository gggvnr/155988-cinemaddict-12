import Abstract from './abstract';

import {truncateString, getFormattedDuration} from '../utils/common';

const MAX_DESCRIPTION_LENGTH = 140;

export const createFilmTemplate = ({
  title = ``,
  poster = ``,
  description = ``,
  rating = 0,
  date = new Date().toISOString(),
  duration = ``,
  genre = ``,
  comments = [],
  isInWatchlist,
  isWatched,
  isFavorite,
}) => {
  const year = new Date(date).getFullYear();
  const truncatedDescription = truncateString(description, MAX_DESCRIPTION_LENGTH);

  const controlActiveClassname = `film-card__controls-item--active`;

  const watchlistClassname = isInWatchlist ? controlActiveClassname : ``;
  const watchedClassname = isWatched ? controlActiveClassname : ``;
  const favoriteClassname = isFavorite ? controlActiveClassname : ``;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${getFormattedDuration(duration)}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${truncatedDescription}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${watchlistClassname}">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchedClassname}">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassname}">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class Film extends Abstract {
  constructor(filmData) {
    super();

    this._film = filmData;
    this._filmElement = this.getElement();

    this._cardClickHandler = this._cardClickHandler.bind(this);
    this._favoritesClickHandler = this._favoritesClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.cardClick(this._film);
  }

  _favoritesClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.favoritesClick(this._film);
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.watchedClick(this._film);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.watchlistClick(this._film);
  }

  setCardClickHandler(callback) {
    this._callbacks.cardClick = callback;

    const handlerElements = [`film-card__poster`, `film-card__title`, `film-card__comments`];

    this._filmElement.addEventListener(`click`, (evt) => {
      const element = evt.target;
      const isHandlerElement = handlerElements.some((className) => element.classList.contains(className));

      if (isHandlerElement) {
        this._cardClickHandler(evt);
      }
    });
  }

  setFavoritesClickHandler(callback) {
    this._callbacks.favoritesClick = callback;

    const button = this._filmElement.querySelector(`.film-card__controls-item--favorite`);

    button.addEventListener(`click`, this._favoritesClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callbacks.watchedClick = callback;

    const button = this._filmElement.querySelector(`.film-card__controls-item--mark-as-watched`);

    button.addEventListener(`click`, this._watchedClickHandler);
  }

  setWatchlistClickHandler(callback) {
    this._callbacks.watchlistClick = callback;

    const button = this._filmElement.querySelector(`.film-card__controls-item--add-to-watchlist`);

    button.addEventListener(`click`, this._watchlistClickHandler);
  }
}
