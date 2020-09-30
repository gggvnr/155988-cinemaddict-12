import MovieCard from './movie-card';

import ListView from '../view/films-list';
import ShowMoreView from '../view/show-more-button';

import {render, RenderPosition, remove} from '../utils/render';
import {filterMap} from '../utils/filter';
import {sortByDate, sortByRating} from '../utils/sort';
import {UpdateType, ExtraListTypes, SortType} from '../const';

export default class MovieList {
  constructor(container, listOptions, _handleViewAction, moviesModel, filterModel, sortingModel) {
    this._container = container;
    this._options = listOptions;

    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._sortingModel = sortingModel;

    this._originFilmsCount = listOptions.filmsToRender;
    this._renderedFilmsCount = this._originFilmsCount;

    this._listComponent = new ListView(listOptions);
    this._listContainer = this._listComponent.getListContainer();
    this._showMoreButtonComponent = new ShowMoreView();

    this._handleViewAction = _handleViewAction;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);

    this._filmPresenters = {};
  }

  init() {
    const filmsCount = this._getFilms().length;

    if (filmsCount === 0) {
      return;
    }

    render(this._container, this._listComponent, RenderPosition.BEFOREEND);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._sortingModel.addObserver(this._handleModelEvent);

    this._renderList();
  }

  destroy() {
    this._clearList({resetRenderedTaskCount: true});

    remove(this._listComponent);

    this._moviesModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._sortingModel.removeObserver(this._handleModelEvent);
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const sorting = this._sortingModel.getSorting();

    if (this._options.isExtraList) {
      return this._getExtraFilms(this._options.type, movies);
    }

    const filteredMovies = filterMap[filterType](movies);

    switch (sorting) {
      case SortType.DATE:
        filteredMovies.sort(sortByDate);
        break;
      case SortType.RATING:
        filteredMovies.sort(sortByRating);
        break;
      default:
        break;
    }

    return filteredMovies;
  }

  _getExtraFilms(type, films) {
    let resultFilms;

    switch (type) {
      case ExtraListTypes.TOP_RATED:
        resultFilms = [...films].sort((a, b) => b.rating - a.rating);
        break;

      case ExtraListTypes.MOST_COMMENTED:
        resultFilms = [...films].sort((a, b) => b.comments.length - a.comments.length);
        break;
    }

    return resultFilms;
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
    this._renderedFilmsCount += this._originFilmsCount;

    this._clearList();
    this._renderList();
  }

  _renderShowMoreButton() {
    render(this._listComponent, this._showMoreButtonComponent, RenderPosition.BEFOREEND);

    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.MINOR:
        this._clearList();
        this._renderList();
        break;
      case UpdateType.MAJOR:
        this._sortingModel.resetSorting();
        this._clearList({resetRenderedFilmsCount: true});
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
      this._renderedFilmsCount = this._originFilmsCount;
    } else {
      this._renderedFilmsCount = Math.min(filmsCount, this._renderedFilmsCount);
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
