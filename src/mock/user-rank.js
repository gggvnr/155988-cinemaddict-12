import {userRanksMap} from '../const';

export const generateUserRank = (films) => {
  const watchedFilmsCount = films.filter((film) => film.isWatched).length;
  const [rankLabel] = Object.entries(userRanksMap).find(([, rankCondition]) => {
    return rankCondition(watchedFilmsCount);
  });

  return rankLabel;
};
