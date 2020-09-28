export const sortByDate = (filmA, filmB) => {
  const dateA = new Date(filmA.date);
  const dateB = new Date(filmB.date);

  return dateB - dateA;
};

export const sortByRating = (filmA, filmB) => {
  return filmB.rating - filmA.rating;
};
