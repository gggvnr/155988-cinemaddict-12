import {render, RenderPosition} from './utils/render';

import MoviesModel from './model/moviesModel';

import MovieList from './presenter/movieList';

import BoardView from './view/board';
import UserRankView from './view/user-rank';
import NavView from './view/nav';
import SortingView from './view/sorting';
import FooterStatisticsView from './view/footer-statistics';

import {generateFilm} from './mock/film';
import {generateFilters} from './mock/filter';
import {generateUserRank} from './mock/user-rank';
import {generateExtraLists} from './mock/extra';

import {extraListsTitles} from './const';

const FILMS_COUNT = 20;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilters(films);
const userRankLabel = generateUserRank(films);

const moviesModel = new MoviesModel();
moviesModel.setMovies(films);

const filmLists = [
  {
    title: `All movies. Upcoming`,
    isTitleHidden: true,
    renderLoadMore: true,
    films,
  },
  ...generateExtraLists(films).map((list) => ({
    title: extraListsTitles[list.key],
    className: `films-list--extra`,
    films: list.films,
  })),
];

const userRankComponent = new UserRankView(userRankLabel);
const navComponent = new NavView(filters);
const sortingComponent = new SortingView();
const boardComponent = new BoardView();

const footerStatisticsComponent = new FooterStatisticsView(films.length);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsContainer = document.querySelector(`.footer__statistics`);

function renderList(listData) {
  const listPresenter = new MovieList(boardComponent, listData, moviesModel);

  listPresenter.init(listData.films);
}

render(siteHeaderElement, userRankComponent, RenderPosition.BEFOREEND);
render(siteMainElement, navComponent, RenderPosition.BEFOREEND);
render(siteMainElement, sortingComponent, RenderPosition.BEFOREEND);
render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);

filmLists.forEach((listData) => renderList(listData));

render(statisticsContainer, footerStatisticsComponent, RenderPosition.BEFOREEND);
