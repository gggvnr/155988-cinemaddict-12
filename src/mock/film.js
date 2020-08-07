import {getRandomArrayItem, getRandomInteger, getRandomDate} from '../utils';
import {LOREM_TEXT_PLACEHOLDER, DESCRIPTION_MAX_LENGTH, MAX_RATING_IN_PERCENTS} from '../const';

import {generateComments} from './comments';

const titles = [
  `Made for each other`,
  `popeye-meets-sinbad`,
  `sagebrush-trail`,
  `santa-claus-conquers-the-martians`,
  `the-dance-of-life`,
  `the-great-flamarion`,
  `the-man-with-the-golden-arm`,
];

const posters = [
  `./images/posters/made-for-each-other.jpg`,
  `./images/posters/popeye-meets-sinbad.jpg`,
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
  return `${getRandomInteger(0, 60)}h ${getRandomInteger(0, 60)}m`;
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
    comments: generateComments(),
  };
};
