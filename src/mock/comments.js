import {getRandomArrayItem, getRandomDate} from '../utils';

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
    reaction: getRandomArrayItem(reactions),
    author: getRandomArrayItem(authors),
    text: getRandomArrayItem(comments),
    postTime: getRandomDate(new Date(`2000-12-12`), new Date()),
  };
};

export const generateComments = (length) => {
  return new Array(length).fill().map(() => generateComment());
};
