"use strict";

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

const createProfilePreviewTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">Movie Buff</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

const createNavTemplate = () => {
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
        <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
        <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
        <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

const createSortingTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

const createBoardTemplate = () => {
  return (
    `<section class="films"></section>`
  );
};

const createListTemplate = ({
  className = `films-list`,
  title = ``,
  isTitleHidden,
}) => {
  const titleHiddenClassName = isTitleHidden ? `visually-hidden` : ``;

  return (
    `<section class="${className}">
      <h2 class="films-list__title ${titleHiddenClassName}">${title}</h2>
      <div class="films-list__container"></div>
    </section>`
  );
};

const createFilmTemplate = () => {
  return (
    `<article class="film-card">
      <h3 class="film-card__title">The Man with the Golden Arm</h3>
      <p class="film-card__rating">9.0</p>
      <p class="film-card__info">
        <span class="film-card__year">1955</span>
        <span class="film-card__duration">1h 59m</span>
        <span class="film-card__genre">Drama</span>
      </p>
      <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…</p>
      <a class="film-card__comments">18 comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched  film-card__controls-item--active">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

const createShowMoreTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

const createStaticticsTemplate = () => {
  return (
    `<p>130 291 movies inside</p>`
  );
};

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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

render(statisticsContainer, createStaticticsTemplate(), `beforeend`);
