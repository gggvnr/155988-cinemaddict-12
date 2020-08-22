import MovieCard from './movieCard';
import MovieDetails from './movieDetails';

import ListView from '../view/films-list';
import ShowMoreView from '../view/show-more-button';

import {updateItem} from '../utils/common';
import {render, RenderPosition, remove} from '../utils/render';

const FILMS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(container, listOptions, changeData) {
    this._container = container;
    this._options = listOptions;

    this._changeData = changeData;

    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;

    this._listComponent = new ListView(listOptions);
    this._listContainer = this._listComponent.getListContainer();
    this._showMoreButtonComponent = new ShowMoreView();

    this._filmPresenters = {};
    this._filmDetailsPresenter = new MovieDetails();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
    this._handleModalOpen = this._handleModalOpen.bind(this);
  }

  init(films) {
    this._films = [...films];

    render(this._container, this._listComponent, RenderPosition.BEFOREEND);

    this._renderList();
  }

  _renderFilm(filmData) {
    const filmPresenter = new MovieCard(this._listContainer, this._handleFilmChange, this._handleModalOpen);

    this._filmPresenters[filmData.id] = filmPresenter;
    filmPresenter.init(filmData);
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

  _handleFilmChange(newFilmData) {
    this._boardTasks = updateItem(this._films, newFilmData);
    this._filmPresenters[newFilmData.id].init(newFilmData);
  }

  _updateFilmsState(filmData) {
    this._films = updateItem(this._films, filmData);
  }

  _handleModalOpen() {
    Object.keys(this._filmPresenters).forEach((id) => this._filmPresenters[id].resetState());
  }
}
