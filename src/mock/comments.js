import {getRandomArrayItem, getRandomDate, generateId} from '../utils/common';

const authors = [
  `Tim Macoveev`,
  `John Doe`,
];

const comments = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

const reactions = [
  `./images/emoji/smile.png`,
  `./images/emoji/puke.png`,
  `./images/emoji/angry.png`,
  `./images/emoji/sleeping.png`,
];

const generateComment = () => {
  return {
    id: generateId(),
    reaction: getRandomArrayItem(reactions),
    author: getRandomArrayItem(authors),
    text: getRandomArrayItem(comments),
    postedAt: getRandomDate(new Date(`2020-07-02`), new Date()),
  };
};

export const generateComments = (length) => {
  return new Array(length).fill().map(generateComment);
};
