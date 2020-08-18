import Abstract from './abstract';

import {truncateString} from '../utils/common';

const MAX_DESCRIPTION_LENGTH = 140;

export const createFilmTemplate = ({
  title = ``,
  poster = ``,
  description = ``,
  rating = 0,
  date = new Date(),
  duration = ``,
  genre = ``,
  comments = [],
  isInWatchlist,
  isWatched,
  isFavorite,
}) => {
  const year = date.getFullYear();
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
        <span class="film-card__duration">${duration}</span>
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

    this._cardClickHandler = this._cardClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmTemplate(this._film);
  }

  _cardClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.cardClick(this._film);
  }

  setCardClickHandler(callback) {
    this._callbacks.cardClick = callback;

    const filmElement = this.getElement();
    const filmPosterElement = filmElement.querySelector(`.film-card__poster`);
    const filmTitleElement = filmElement.querySelector(`.film-card__title`);
    const filmCommentsElement = filmElement.querySelector(`.film-card__comments`);
    const modalTriggers = [filmPosterElement, filmTitleElement, filmCommentsElement];

    modalTriggers.forEach((modalTrigger) => {
      modalTrigger.addEventListener(`click`, this._cardClickHandler);
    });
  }
}
