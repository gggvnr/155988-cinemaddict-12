import Smart from '../smart';

import {humanizeDate, getFormattedDuration} from '../../utils/common';

export const createFilmDetailsTopDataTemplate = ({
  title = ``,
  poster = ``,
  description = ``,
  rating = 0,
  date = new Date(),
  duration = ``,
  filmDetails: {
    originalTitle = ``,
    director = ``,
    writers = [],
    actors = [],
    country = ``,
    contentRating = 0,
    genres = [],
  },
}) => {
  const genresLabel = genres.length > 1 ? `Genres` : `Genre`;

  return (
    `<div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="${poster}" alt="">

          <p class="film-details__age">${contentRating}+</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors.join(`, `)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeDate(date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${getFormattedDuration(duration)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genresLabel}</td>
              <td class="film-details__cell">
                ${genres.map((genre) => (`<span class="film-details__genre">${genre}</span>`)).join(``)}
              </td>
            </tr>
          </table>

          <p class="film-details__film-description">${description}</p>
        </div>
      </div>`
  );
};

export default class FilmDetailsTopData extends Smart {
  constructor() {
    super();

    this._data = {
      filmDetails: [],
    };

    this._element = this.getElement();

    this._closeClickHandler = this._closeClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsTopDataTemplate(this._data);
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callbacks.closeClick();
  }

  restoreHandlers() {
    this.setCloseClickHandler(this._callbacks.closeClick);
  }

  setCloseClickHandler(callback) {
    this._callbacks.closeClick = callback;
    this._closeButtonElement = this._element.querySelector(`.film-details__close-btn`);
    this._closeButtonElement.addEventListener(`click`, this._closeClickHandler);
  }
}
