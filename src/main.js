import {render} from './utils/render';

import {extraListsTitles} from './const';

import UserRankView from './view/user-rank';
import NavView from './view/nav';
import SortingView from './view/sorting';
import BoardView from "./view/board";
import ListView from './view/films-list';
import FilmView from './view/film';
import ShowMoreView from './view/show-more-button';
import FooterStatisticsView from './view/footer-statistics';
import FilmDetailsView from './view/film-details';

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

const userRankComponent = new UserRankView(userRankLabel);
const navComponent = new NavView(filters);
const sortingComponent = new SortingView();
const boardComponent = new BoardView();
const showMoreComponent = new ShowMoreView();

const mainListComponent = new ListView({
  title: `All movies. Upcoming`,
  isTitleHidden: true,
});

const footerStatisticsComponent = new FooterStatisticsView(films.length);

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

function renderFilmDetails(filmData) {
  const filmDetailsComponent = new FilmDetailsView(filmData);
  const filmDetailsElement = filmDetailsComponent.getElement();

  const closeButton = filmDetailsElement.querySelector(`.film-details__close-btn`);

  function closeModal() {
    filmDetailsElement.remove();
    filmDetailsComponent.removeElement();

    closeButton.removeEventListener(`click`, closeModal);
  }

  closeButton.addEventListener(`click`, closeModal);

  render(document.body, filmDetailsComponent.getElement(), `beforeend`);
}

function renderFilm(container, filmData) {
  const filmComponent = new FilmView(filmData);

  render(container, filmComponent.getElement(), `beforeend`);

  const filmElement = filmComponent.getElement();
  const filmPosterElement = filmElement.querySelector(`.film-card__poster`);
  const filmTitleElement = filmElement.querySelector(`.film-card__title`);
  const filmCommentsElement = filmElement.querySelector(`.film-card__comments`);
  const modalTriggers = [filmPosterElement, filmTitleElement, filmCommentsElement];

  modalTriggers.forEach((modalTrigger) => {
    modalTrigger.addEventListener(`click`, () => renderFilmDetails(filmData));
  });
}

render(siteHeaderElement, userRankComponent.getElement(), `beforeend`);
render(siteMainElement, navComponent.getElement(), `beforeend`);
render(siteMainElement, sortingComponent.getElement(), `beforeend`);
render(siteMainElement, boardComponent.getElement(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.films`);

render(boardElement, mainListComponent.getElement(), `beforeend`);

const mainList = boardElement.querySelector(`.films-list`);
const mainListContainer = mainList.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderFilm(mainListContainer, films[i]);
}

if (films.length > FILMS_COUNT_PER_STEP) {
  let renderedFilmsCount = FILMS_COUNT_PER_STEP;

  render(mainList, showMoreComponent.getElement(), `beforeend`);

  const showMoreButton = boardElement.querySelector(`.films-list__show-more`);

  showMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmsCount, renderedFilmsCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilm(mainListContainer, film));

    renderedFilmsCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmsCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

extraListsData.forEach(({key}) => {
  const extraListComponent = new ListView({
    className: `films-list--extra`,
    title: extraListsTitles[key]
  });

  render(boardElement, extraListComponent.getElement(), `beforeend`);
});

const extraLists = boardElement.querySelectorAll(`.films-list--extra`);

extraLists.forEach((list, i) => {
  const listContainer = list.querySelector(`.films-list__container`);
  const extraFilms = extraListsData[i].films;

  extraFilms.forEach((extraFilm) => renderFilm(listContainer, extraFilm));
});

const statisticsContainer = document.querySelector(`.footer__statistics`);

render(statisticsContainer, footerStatisticsComponent.getElement(), `beforeend`);
