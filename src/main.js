import {render} from './utils';

import {createUserRankTemplate} from './view/user-rank';
import {createNavTemplate} from './view/nav';
import {createSortingTemplate} from './view/sorting';
import {createBoardTemplate} from './view/board';
import {createListTemplate} from './view/films-list';
import {createFilmTemplate} from './view/film';
import {createShowMoreTemplate} from './view/show-more-button';
import {createFooterStatisticsTemplate} from './view/footer-statistics';
import {createFilmDetailsTemplate} from './view/film-details';

import {generateFilm} from './mock/film';
import {generateFilters} from './mock/filter';
import {generateUserRank} from './mock/user-rank';
import {generateFooterStats} from './mock/footer-stats';

const MAIN_FILMS_COUNT = 20;
const MAIN_FILMS_COUNT_PER_STEP = 5;

const EXTRA_FILMS_COUNT = 2;

const EXTRA_FILMS_LISTS = [
  {
    title: `Top rated`,
  },
  {
    title: `Most commented`,
  }
];

const mainFilms = new Array(MAIN_FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilters(mainFilms);
const userRankLabel = generateUserRank(mainFilms);
const footerStats = generateFooterStats(mainFilms);

const siteHeaderElement = document.querySelector(`.header`);
const siteFooterElement = document.querySelector(`.footer`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserRankTemplate(userRankLabel), `beforeend`);
render(siteMainElement, createNavTemplate(filters), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.films`);

render(boardElement, createListTemplate({
  title: `All movies. Upcoming`,
  isTitleHidden: true,
}), `beforeend`);

const mainList = boardElement.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(mainFilms.length, MAIN_FILMS_COUNT_PER_STEP); i++) {
  render(mainListContainer, createFilmTemplate(mainFilms[i]), `beforeend`);
}

render(mainList, createShowMoreTemplate(), `beforeend`);

EXTRA_FILMS_LISTS.forEach(({title}) => {
  render(boardElement, createListTemplate({
    className: `films-list--extra`,
    title
  }), `beforeend`);
});

const extraLists = boardElement.querySelectorAll(`.films-list--extra`);

extraLists.forEach((list) => {
  const listContainer = list.querySelector(`.films-list__container`);
  const extraFilms = new Array(EXTRA_FILMS_COUNT).fill().map(generateFilm);

  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(listContainer, createFilmTemplate(extraFilms[i]), `beforeend`);
  }
});

const statisticsContainer = document.querySelector(`.footer__statistics`);

render(statisticsContainer, createFooterStatisticsTemplate(footerStats), `beforeend`);

render(siteFooterElement, createFilmDetailsTemplate(mainFilms[0]), `afterend`);
