import moment from 'moment';

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

export const deleteFilmComment = (film, commentId) => {
  return Object.assign(
      film,
      {},
      {
        comments: film.comments.filter((comment) => comment !== commentId),
        commentsData: film.commentsData.filter((comment) => comment.id !== commentId),
      }
  );
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getRandomDate = (start, end) => {
  const from = start.getTime();
  const to = end.getTime();

  return new Date(from + Math.random() * (to - from));
};

export const getRandomArrayItem = (dataArray) => {
  const randomIndex = getRandomInteger(0, dataArray.length - 1);

  return dataArray[randomIndex];
};

export const getSeveralRandomArrayItems = (dataArray, maxItemsCount) => {
  const itemsCount = getRandomInteger(1, maxItemsCount);

  return [...dataArray].sort(() => 0.5 - Math.random()).slice(0, itemsCount);
};

export const truncateString = (value, length) => {
  return value.length > length ? `${value.slice(0, length)}...` : value;
};

export const humanizeDate = (date) => {
  return date.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`});
};

export const humanizeCommentDate = (date) => {
  const duration = moment.duration(date.getTime() - Date.now(), `milliseconds`);

  return duration.asWeeks() >= -1
    ? duration.humanize(true)
    : moment(date).format(`YYYY/MM/DD HH:MM`);
};
