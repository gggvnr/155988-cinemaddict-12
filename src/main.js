import {render, RenderPosition, remove} from './utils/render';

import Api from './api';

import MoviesModel from './model/moviesModel';
import FilterModel from './model/filterModel';

import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';

import UserRankView from './view/user-rank';
import NavView from './view/nav';
import SortingView from './view/sorting';
import FooterStatisticsView from './view/footer-statistics';
import StatisticsView from './view/statistics';

import {UpdateType} from './const';
import {MenuItem} from './const';
import {getUserRank} from './utils/common';

const AUTHORIZATION = `Basic gN2ss3ddSwcl2sa1j`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;


const api = new Api(END_POINT, AUTHORIZATION);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();

const navComponent = new NavView();
const sortingComponent = new SortingView();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsContainer = document.querySelector(`.footer__statistics`);

render(siteMainElement, navComponent, RenderPosition.BEFOREEND);
render(siteMainElement, sortingComponent, RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(navComponent, filterModel, moviesModel);
const boardPresenter = new BoardPresenter(siteMainElement, moviesModel, filterModel, api);

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

api.getFilmsWithComments()
  .then((films) => {
    const footerStatisticsComponent = new FooterStatisticsView(films.length);
    const userRankLabel = getUserRank(films);
    const userRankComponent = new UserRankView(userRankLabel);

    render(siteHeaderElement, userRankComponent, RenderPosition.BEFOREEND);
    render(statisticsContainer, footerStatisticsComponent, RenderPosition.BEFOREEND);
    moviesModel.setMovies(UpdateType.INIT, films);
  })
  .catch(() => {
    const footerStatisticsComponent = new FooterStatisticsView(0);

    render(statisticsContainer, footerStatisticsComponent, RenderPosition.BEFOREEND);
    moviesModel.setMovies(UpdateType.INIT, []);
  });
