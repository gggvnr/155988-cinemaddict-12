import MovieCard from './movieCard';

import ListView from '../view/films-list';
import ShowMoreView from '../view/show-more-button';

import {render, RenderPosition, remove} from '../utils/render';
import {filterMap} from '../utils/filter';
import {UpdateType} from '../const';

const FILMS_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(container, listOptions, _handleViewAction, moviesModel, filterModel) {
    this._container = container;
    this._options = listOptions;

    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;

    this._listComponent = new ListView(listOptions);
    this._listContainer = this._listComponent.getListContainer();
    this._showMoreButtonComponent = new ShowMoreView();

    this._handleViewAction = _handleViewAction;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._filmPresenters = {};
  }

  init() {
    render(this._container, this._listComponent, RenderPosition.BEFOREEND);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderList();
  }

  destroy() {
    this._clearList({resetRenderedTaskCount: true});

    remove(this._listComponent);

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  _setState(newState) {
    this._state = newState;
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredMovies = filterMap[filterType](movies);

    return filteredMovies;
  }

  _getFilmById(id) {
    return this._moviesModel.getMovies().find((movie) => movie.id === id);
  }

  _renderFilm(filmData) {
    const filmPresenter = new MovieCard(this._listContainer, this._handleViewAction);

    this._filmPresenters[filmData.id] = filmPresenter;
    filmPresenter.init(filmData);
  }

  _renderFilms(films) {
    films.forEach((film) => this._renderFilm(film));
  }

  _handleShowMoreButtonClick() {
    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;

    this._clearList();
    this._renderList();
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

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearList();
        this._renderList();
        break;
      case UpdateType.MAJOR:
        this._clearList();
        this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
        this._renderList();
        break;
    }
  }

  _clearList({resetRenderedFilmsCount = false} = {}) {
    const filmsCount = this._getFilms().length;

    Object
      .values(this._filmPresenters)
      .forEach((presenter) => presenter.destroy());
    this._filmPresenters = {};

    remove(this._showMoreButtonComponent);

    if (resetRenderedFilmsCount) {
      this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    } else {
      this._renderedTaskCount = Math.min(filmsCount, this._renderedTaskCount);
    }
  }

  _renderList() {
    const films = this._getFilms();
    const filmsCount = films.length;

    if (filmsCount === 0) {
      return;
    }

    this._renderFilms(films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)));

    if (this._options.renderLoadMore && filmsCount > this._renderedFilmsCount) {
      this._renderShowMoreButton();
    }
  }
}
