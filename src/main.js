import {render} from './utils';

import {createProfilePreviewTemplate} from './view/profile-preview';
import {createNavTemplate} from './view/nav';
import {createSortingTemplate} from './view/sorting';
import {createBoardTemplate} from './view/board';
import {createListTemplate} from './view/films-list';
import {createFilmTemplate} from './view/film';
import {createShowMoreTemplate} from './view/show-more-button';
import {createFooterStatisticsTemplate} from './view/footer-statistics';

const MAIN_FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const EXTRA_FILMS_LISTS = [
  {
    title: `Top rated`,
  },
  {
    title: `Most commented`,
  }
];

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createProfilePreviewTemplate(), `beforeend`);
render(siteMainElement, createNavTemplate(), `beforeend`);
render(siteMainElement, createSortingTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.films`);

render(boardElement, createListTemplate({
  title: `All movies. Upcoming`,
  isTitleHidden: true,
}), `beforeend`);

const mainList = boardElement.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);

for (let i = 0; i < MAIN_FILMS_COUNT; i++) {
  render(mainListContainer, createFilmTemplate(), `beforeend`);
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

  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(listContainer, createFilmTemplate(), `beforeend`);
  }
});

const statisticsContainer = document.querySelector(`.footer__statistics`);

render(statisticsContainer, createFooterStatisticsTemplate(), `beforeend`);
