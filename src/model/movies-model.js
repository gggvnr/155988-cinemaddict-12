import Observer from "../utils/observer.js";

export default class MoviesModel extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();

    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting movie`);
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    return {
      id: movie.id,
      title: movie.film_info.title,
      poster: movie.film_info.poster,
      description: movie.film_info.description,
      rating: movie.film_info.total_rating,
      date: new Date(movie.film_info.release.date),
      duration: movie.film_info.runtime,
      genre: movie.film_info.genre[0],
      filmDetails: {
        originalTitle: movie.film_info.alternative_title,
        director: movie.film_info.director,
        writers: movie.film_info.writers,
        actors: movie.film_info.actors,
        country: movie.film_info.release.release_country,
        contentRating: movie.film_info.age_rating,
        genres: movie.film_info.genre,
      },
      comments: movie.comments,
      commentsData: [],
      watchingDate: movie.user_details.watching_date,
      isInWatchlist: movie.user_details.watchlist,
      isWatched: movie.user_details.already_watched,
      isFavorite: movie.user_details.favorite,
    };
  }

  static adaptToServer(movie) {
    return {
      'id': movie.id,
      'comments': movie.comments,
      'film_info': {
        'title': movie.title,
        'alternative_title': movie.filmDetails.originalTitle,
        'total_rating': movie.rating,
        'poster': movie.poster,
        'age_rating': movie.filmDetails.contentRating,
        'director': movie.filmDetails.director,
        'writers': movie.filmDetails.writers,
        'actors': movie.filmDetails.actors,
        'release': {
          'date': movie.date instanceof Date ? movie.date.toISOString() : null,
          'release_country': movie.filmDetails.country,
        },
        'runtime': movie.duration,
        'genre': movie.filmDetails.genres,
        'description': movie.description,
      },
      'user_details': {
        'already_watched': movie.isWatched,
        'favorite': movie.isFavorite,
        'watching_date': movie.watchingDate,
        'watchlist': movie.isInWatchlist,
      }
    };
  }

  static adaptCommentToClient(comment) {
    return {
      id: comment.id,
      reaction: comment.emotion,
      author: comment.author,
      text: comment.comment,
      postedAt: new Date(comment.date),
    };
  }

  static adaptCommentToServer(comment) {
    return {
      "comment": comment.text,
      "date": comment.postedAt,
      "emotion": comment.reaction,
    };
  }
}
