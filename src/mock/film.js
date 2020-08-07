import {getRandomArrayItem, getRandomInteger, getRandomDate} from '../utils';
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

const generateDescription = () => {
  const descriptionLength = getRandomInteger(0, DESCRIPTION_MAX_LENGTH);
  const loremSentences = LOREM_TEXT_PLACEHOLDER.split(`. `);

  return new Array(descriptionLength).fill()
    .map(() => getRandomArrayItem(loremSentences))
    .join(`. `);
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
    poster: getRandomArrayItem(posters),
    description: generateDescription(),
    rating: generateRating(),
    date: getRandomDate(new Date(`1950-02-12`), new Date()),
    duration: generateDuration(),
    genre: getRandomArrayItem(genres),
    comments: generateComments(getRandomInteger(0, 5)),
  };
};
