const filmToFilterMap = {
  'All Movies': {
    link: `#all`,
    getCount: (films) => films.length,
  },
  'Watchlist': {
    link: `#watchlist`,
    getCount: (films) => films.filter((film) => film.isInWatchlist).length,
  },
  'History': {
    link: `#history`,
    getCount: (films) => films.filter((film) => film.isWatched).length,
  },
  'Favorites': {
    link: `#favorites`,
    getCount: (films) => films.filter((film) => film.isFavorite).length,
  },
};

export const generateFilters = (films) => {
  return Object.entries(filmToFilterMap).map(([filterName, filterData]) => {
    return {
      name: filterName,
      link: filterData.link,
      count: filterData.getCount(films),
    };
  });
};
