import ListView from '../view/films-list';
import FilmView from '../view/film';
import ShowMoreView from '../view/show-more-button';
import FilmDetailsView from '../view/film-details';

import {render, RenderPosition, remove} from '../utils/render';

const FILMS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(container, listOptions) {
    this._container = container;
    this._options = listOptions;

    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;

    this._listComponent = new ListView(listOptions);
    this._listContainer = this._listComponent.getListContainer();
    this._showMoreButtonComponent = new ShowMoreView();

    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  init(films) {
    this._films = [...films];

    render(this._container, this._listComponent, RenderPosition.BEFOREEND);

    this._renderList();
  }

  _renderFilmDetails(filmData) {
    const filmDetailsComponent = new FilmDetailsView(filmData);

    filmDetailsComponent.setCloseClickHandler();

    render(document.body, filmDetailsComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(filmData) {
    const filmComponent = new FilmView(filmData);

    filmComponent.setCardClickHandler(this._renderFilmDetails);

    render(this._listContainer, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(count) {
    const {
      renderLoadMore
    } = this._options;

    const resultCount = renderLoadMore ? count : this._films.length;

    for (let i = 0; i < resultCount; i++) {
      this._renderFilm(this._films[i]);
    }
  }

  _handleShowMoreButtonClick() {
    this._renderFilms(Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    render(this._listComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderList() {
    const {
      renderLoadMore,
    } = this._options;

    this._renderFilms(this._renderedFilmsCount);

    if (renderLoadMore) {
      this._renderShowMoreButton();
    }
  }
}
