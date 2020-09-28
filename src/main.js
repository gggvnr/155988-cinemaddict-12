import {render, RenderPosition, remove} from './utils/render';

import Api from './api/index';
import Store from './api/store';
import Provider from './api/provider';

import MoviesModel from './model/moviesModel';
import FilterModel from './model/filterModel';
import SortingModel from './model/sortingModel';

import BoardPresenter from './presenter/board';
import FilterPresenter from './presenter/filter';
import SortingPresenter from './presenter/sorting';
import UserRankPresenter from './presenter/user-rank';

import NavView from './view/nav';
import FooterStatisticsView from './view/footer-statistics';
import StatisticsView from './view/statistics';

import {UpdateType} from './const';
import {MenuItem} from './const';

const AUTHORIZATION = `Basic gN2ss3ddSwcl2sa1j`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict`;
const STORE_PREFIX = `cinemaddict-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const sortingModel = new SortingModel();

const navComponent = new NavView();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const statisticsContainer = document.querySelector(`.footer__statistics`);

render(siteMainElement, navComponent, RenderPosition.BEFOREEND);

const userRankPresenter = new UserRankPresenter(siteHeaderElement, moviesModel);
const filterPresenter = new FilterPresenter(navComponent, filterModel, moviesModel);
const sortingPresenter = new SortingPresenter(siteMainElement, sortingModel);
const boardPresenter = new BoardPresenter(
    siteMainElement,
    moviesModel,
    filterModel,
    sortingModel,
    apiWithProvider
);

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  if (menuItem === MenuItem.STATISTICS) {
    const watchedFilms = moviesModel.getMovies().filter((film) => film.isWatched);

    sortingPresenter.destroy();
    boardPresenter.destroy();

    statisticsComponent = new StatisticsView(watchedFilms);
    render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
  } else {
    sortingPresenter.init();
    boardPresenter.init();

    if (statisticsComponent) {
      remove(statisticsComponent);
    }
  }
};

navComponent.setMenuClickHandler(handleSiteMenuClick);

userRankPresenter.init();
filterPresenter.init();
sortingPresenter.init();
boardPresenter.init();

apiWithProvider.getFilms()
  .then((films) => {
    const footerStatisticsComponent = new FooterStatisticsView(films.length);

    render(statisticsContainer, footerStatisticsComponent, RenderPosition.BEFOREEND);
    moviesModel.setMovies(UpdateType.INIT, films);
  })
  .catch(() => {
    const footerStatisticsComponent = new FooterStatisticsView(0);

    render(statisticsContainer, footerStatisticsComponent, RenderPosition.BEFOREEND);
    moviesModel.setMovies(UpdateType.INIT, []);
  });

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); // eslint-disable-line
    }).catch(() => {
      console.error(`ServiceWorker isn't available`); // eslint-disable-line
    });
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
