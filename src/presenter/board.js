import MovieList from './movieList';
import MovieDetails from './movieDetails';

import BoardView from '../view/board';

import {UserAction, ExtraListTypes, UpdateType} from '../const';
import {render, RenderPosition, remove} from '../utils/render';
import {filterMap} from '../utils/filter';

const filmListsOptions = [
  {
    type: `main`,
    title: `All movies. Upcoming`,
    isTitleHidden: true,
    renderLoadMore: true,
    filmsToRender: 5,
  },
  {
    type: ExtraListTypes.TOP_RATED,
    title: `Top rated`,
    className: `films-list--extra`,
    isExtraList: true,
    filmsToRender: 2,
  },
  {
    type: ExtraListTypes.MOST_COMMENTED,
    title: `Most commented`,
    className: `films-list--extra`,
    isExtraList: true,
    filmsToRender: 2,
  },
];

export default class Board {
  constructor(container, moviesModel, filterModel, api) {
    this._state = {
      isDetailsOpened: false,
      openedDetailsId: null,
      isLoading: true,
    };

    this._api = api;

    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._container = container;
    this._boardComponent = new BoardView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._detailsPresenter = new MovieDetails(this._handleViewAction);
    this._listPresenters = {};
  }

  init() {
    render(this._container, this._boardComponent, RenderPosition.BEFOREEND);

    this._moviesModel.addObserver(this._handleModelEvent);

    this._renderBoard();
  }

  destroy() {
    this._clearBoard({resetRenderedTaskCount: true});

    this._moviesModel.removeObserver(this._handleModelEvent);

    remove(this._boardComponent);
  }

  _setState(newState) {
    this._state = newState;
  }

  _getFilms() {
    return this._moviesModel.getMovies();
  }

  _getFilteredAndSortedFilms() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredMovies = filterMap[filterType](movies);

    return filteredMovies;
  }

  _getFilmById(id) {
    return this._moviesModel.getMovies().find((movie) => movie.id === id);
  }

  _renderList(listOptions) {
    const listPresenter = new MovieList(
        this._boardComponent,
        listOptions,
        this._handleViewAction,
        this._moviesModel,
        this._filterModel
    );

    this._listPresenters[listOptions.type] = listPresenter;
    listPresenter.init();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._api.updateFilm(update)
        .then((response) => {
          this._moviesModel.updateMovie(updateType, response);
        })
        .catch(() => {

        });
        break;

      case UserAction.OPEN_DETAILS:
        this._setState({
          isDetailsOpened: true,
          openedDetailsId: update.filmId
        });

        this._detailsPresenter.show(this._getFilmById(this._state.openedDetailsId));
        break;

      case UserAction.HIDE_DETAILS:
        this._setState({
          isDetailsOpened: false,
        });

        this._detailsPresenter.hide();
        break;
    }
  }

  _handleModelEvent(updateType) {
    const {
      isDetailsOpened,
      openedDetailsId,
    } = this._state;

    if (isDetailsOpened) {
      this._detailsPresenter.updateData(this._getFilmById(openedDetailsId));
    }

    switch (updateType) {
      case UpdateType.INIT:
        this._state.isLoading = false;
        // remove(this._loadingComponent);
        this._renderBoard();
        break;

      case UpdateType.COMMENTS_LOADED:
        this._detailsPresenter.updateData(this._getFilmById(openedDetailsId));
        break;
    }
  }

  _clearBoard() {
    Object
      .values(this._listPresenters)
      .forEach((presenter) => presenter.destroy());
    this._listPresenters = {};

    remove(this._noFilmsComponent);
  }

  _renderNoFilms() {

  }

  _renderLoading() {

  }

  _renderBoard() {
    if (this._state.isLoading) {
      this._renderLoading();
      return;
    }

    const films = this._getFilms();
    const filmsCount = films.length;

    if (filmsCount === 0) {
      this._renderNoFilms();
      return;
    }

    filmListsOptions.forEach((listOptions) => {
      this._renderList(listOptions);
    });
  }
}
