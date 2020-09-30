import MoviesModel from '../model/movies-model';

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (Provider.isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films);
          this._store.setItems(items);
          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms);
  }

  updateFilm(film) {
    if (Provider.isOnline()) {
      return this._api.updateFilm(film)
        .then((updatedFilm) => {
          this._store.setItem(updatedFilm.id, updatedFilm);
          return updatedFilm;
        });
    }

    this._store.setItem(film.id, Object.assign({}, film));

    return Promise.resolve(film);
  }

  getFilmComments(film) {
    if (Provider.isOnline()) {
      return this._api.getFilmComments(film)
        .then((filmWithComments) => {
          this._store.setItem(filmWithComments.id, Object.assign({}, filmWithComments));

          return filmWithComments;
        });
    }

    const storeFilm = this._store.getItems()[film.id];

    return Promise.resolve(storeFilm);
  }

  addComment(comment, filmId) {
    return this._api.addComment(comment, filmId);
  }

  deleteComment(commentId) {
    return this._api.deleteComment(commentId);
  }

  sync() {
    if (Provider.isOnline()) {
      const storeFilms = Object.values(this._store.getItems()).map(MoviesModel.adaptToServer);

      return this._api.sync(storeFilms)
        .then((response) => {
          const updatedFilms = response.updated.map(MoviesModel.adaptToClient);
          const items = createStoreStructure(updatedFilms);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
