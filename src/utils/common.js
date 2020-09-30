import moment from 'moment';
import {userRankStrings} from '../const';

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

export const truncateString = (value, length) => {
  return value.length > length ? `${value.slice(0, length)}...` : value;
};

export const humanizeDate = (date) => {
  return date.toLocaleString(`en-GB`, {day: `numeric`, month: `long`, year: `numeric`});
};

export const humanizeCommentDate = (date) => {
  const currentDate = date instanceof Date ? date : new Date(date);

  const duration = moment.duration(currentDate.getTime() - Date.now(), `milliseconds`);

  return duration.asWeeks() >= -1
    ? duration.humanize(true)
    : moment(date).format(`YYYY/MM/DD HH:MM`);
};

export const getFormattedDuration = (duration, format = `HH[h] MM[m]`) => moment.utc().startOf(`day`).add(duration, `minutes`).format(format);


export const getUserRank = (films) => {
  const count = films.filter((film) => film.isWatched).length;

  if (count > 0 && count <= 10) {
    return userRankStrings.NOVICE;
  }
  if (count > 10 && count <= 20) {
    return userRankStrings.FAN;
  }
  if (count > 20) {
    return userRankStrings.MOVIE_BUFF;
  }
  return ``;
};
