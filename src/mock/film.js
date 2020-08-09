import {
  getRandomArrayItem,
  getRandomInteger,
  getRandomDate,
  getSeveralRandomArrayItems
} from '../utils';

import {LOREM_TEXT_PLACEHOLDER, DESCRIPTION_MAX_LENGTH, MAX_RATING_IN_PERCENTS} from '../const';

import {generateComments} from './comments';

const titles = [
  `Made for each other`,
  `Popeye meets sinbad`,
  `Sagebrush trail`,
  `Santa claus conquers the martians`,
  `The dance of life`,
  `The great flamarion`,
  `The man with the golden arm`,
];

const posters = [
  `./images/posters/made-for-each-other.png`,
  `./images/posters/popeye-meets-sinbad.png`,
  `./images/posters/sagebrush-trail.jpg`,
  `./images/posters/santa-claus-conquers-the-martians.jpg`,
  `./images/posters/the-dance-of-life.jpg`,
  `./images/posters/the-great-flamarion.jpg`,
  `./images/posters/the-man-with-the-golden-arm.jpg`,
];

const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
];

const names = [
  `Anthony Mann`,
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
];

const countries = [
  `USA`,
  `Russia`,
  `Iraq`,
  `Moldova`,
];

const generateDescription = () => {
  const loremSentences = LOREM_TEXT_PLACEHOLDER.split(`. `);

  return getSeveralRandomArrayItems(loremSentences, DESCRIPTION_MAX_LENGTH).join(`. `);
};

const generateRating = () => {
  return getRandomInteger(0, MAX_RATING_IN_PERCENTS) / 10;
};

const generateDuration = () => {
  const duration = {
    h: getRandomInteger(0, 30),
    m: getRandomInteger(0, 60),
  };

  return Object.entries(duration)
    .map(([key, value]) => value ? `${value}${key}` : ``)
    .filter(Boolean)
    .join(` `);
};

export const generateFilm = () => {
  return {
    title: getRandomArrayItem(titles),
    originalTitle: getRandomArrayItem(titles),
    director: getRandomArrayItem(names),
    writers: getSeveralRandomArrayItems(names, 3),
    actors: getSeveralRandomArrayItems(names, 3),
    country: getRandomArrayItem(countries),
    contentRating: getRandomInteger(0, 21),
    poster: getRandomArrayItem(posters),
    description: generateDescription(),
    rating: generateRating(),
    date: getRandomDate(new Date(`1950-02-12`), new Date()),
    duration: generateDuration(),
    genres: getSeveralRandomArrayItems(genres, 3),
    comments: generateComments(getRandomInteger(0, 5)),
    isInWatchlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
