import {render, RenderPosition, remove} from './utils/render';

import MoviesModel from './model/moviesModel';
import FilterModel from './model/filterModel';

import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';

import UserRankView from './view/user-rank';
import NavView from './view/nav';
import SortingView from './view/sorting';
import FooterStatisticsView from './view/footer-statistics';
import StatisticsView from './view/statistics';

import {generateFilm} from './mock/film';

import {getUserRank} from './utils/common';
import {MenuItem} from './const';

const FILMS_COUNT = 20;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const userRankLabel = getUserRank(films);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
moviesModel.setMovies(films);

const userRankComponent = new UserRankView(userRankLabel);
const navComponent = new NavView();
const sortingComponent = new SortingView();

const footerStatisticsComponent = new FooterStatisticsView(films.length);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsContainer = document.querySelector(`.footer__statistics`);

render(siteHeaderElement, userRankComponent, RenderPosition.BEFOREEND);
render(siteMainElement, navComponent, RenderPosition.BEFOREEND);
render(siteMainElement, sortingComponent, RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(navComponent, filterModel, moviesModel);
const boardPresenter = new BoardPresenter(siteMainElement, moviesModel, filterModel);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  if (menuItem === MenuItem.STATISTICS) {
    boardPresenter.destroy();
    statisticsComponent = new StatisticsView(moviesModel.getMovies());
    render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
  } else {
    boardPresenter.init();
    if (statisticsComponent) {
      remove(statisticsComponent);
    }
  }
};

navComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
boardPresenter.init();

render(statisticsContainer, footerStatisticsComponent, RenderPosition.BEFOREEND);
