import {render, RenderPosition} from './utils/render';

import MoviesModel from './model/moviesModel';
import FilterModel from './model/filterModel';

import MovieList from './presenter/movieList';
import FilterPresenter from './presenter/filter';

import BoardView from './view/board';
import UserRankView from './view/user-rank';
import NavView from './view/nav';
import SortingView from './view/sorting';
import FooterStatisticsView from './view/footer-statistics';

import {generateFilm} from './mock/film';
import {generateUserRank} from './mock/user-rank';
import {generateExtraLists} from './mock/extra';

import {extraListsTitles} from './const';

const FILMS_COUNT = 20;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const userRankLabel = generateUserRank(films);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
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
const navComponent = new NavView();
const sortingComponent = new SortingView();
const boardComponent = new BoardView();

const footerStatisticsComponent = new FooterStatisticsView(films.length);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsContainer = document.querySelector(`.footer__statistics`);

function renderList(listData) {
  const listPresenter = new MovieList(boardComponent, listData, moviesModel, filterModel);

  listPresenter.init(listData.films);
}

render(siteHeaderElement, userRankComponent, RenderPosition.BEFOREEND);
render(siteMainElement, navComponent, RenderPosition.BEFOREEND);
render(siteMainElement, sortingComponent, RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(navComponent, filterModel, moviesModel);
filterPresenter.init();

render(siteMainElement, boardComponent, RenderPosition.BEFOREEND);
filmLists.forEach((listData) => renderList(listData));

render(statisticsContainer, footerStatisticsComponent, RenderPosition.BEFOREEND);
