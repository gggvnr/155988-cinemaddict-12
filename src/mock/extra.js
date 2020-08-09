const getTopRatedFilms = (films) => {
  return [...films].sort((a, b) => b.rating - a.rating).slice(0, 2);
};

const getMostCommentedFilms = (films) => {
  return [...films].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
};

const extraFilmsLists = [
  {
    title: `Top rated`,
    getFilms: getTopRatedFilms,
  },
  {
    title: `Most commented`,
    getFilms: getMostCommentedFilms,
  }
];

const generateExtraList = (films, extraData) => {
  return {
    className: `films-list--extra`,
    title: extraData.title,
    films: extraData.getFilms(films),
  };
};

export const generateExtraLists = (films) => {
  return extraFilmsLists.map((extraData) => generateExtraList(films, extraData));
};
