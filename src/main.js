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
import {generateExtraLists} from './mock/extra';

const FILMS_COUNT = 20;
const FILMS_COUNT_PER_STEP = 5;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilters(films);
const extraListsData = generateExtraLists(films);
const userRankLabel = generateUserRank(films);

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

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(mainListContainer, createFilmTemplate(films[i]), `beforeend`);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(mainList, createShowMoreTemplate(), `beforeend`);

  const showMoreButton = boardElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(mainListContainer, createFilmTemplate(film), `beforeend`));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

extraListsData.forEach(({title, className}) => {
  render(boardElement, createListTemplate({
    className,
    title
  }), `beforeend`);
});

const extraLists = boardElement.querySelectorAll(`.films-list--extra`);

extraLists.forEach((list, i) => {
  const listContainer = list.querySelector(`.films-list__container`);
  const extraFilms = extraListsData[i].films;

  extraFilms.forEach((extraFilm) => render(listContainer, createFilmTemplate(extraFilm), `beforeend`));
});

const statisticsContainer = document.querySelector(`.footer__statistics`);

render(statisticsContainer, createFooterStatisticsTemplate(films.length), `beforeend`);

render(siteFooterElement, createFilmDetailsTemplate(films[0]), `afterend`);
