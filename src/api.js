import MoviesModel from './model/moviesModel';

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getFilms() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((films) => films.map(MoviesModel.adaptToClient));
  }

  getFilmsWithComments() {
    return this.getFilms()
      .then((films) => Promise.all(films.map((film) => {
        return this.getComments(film)
          .then((commentsData) => {
            return Object.assign(
                film,
                {},
                {
                  commentsData,
                }
            );
          });
      })));
  }

  updateFilm(film) {
    return this._load({
      url: `movies/${film.id}`,
      method: Method.PUT,
      body: JSON.stringify(MoviesModel.adaptToServer(film)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(MoviesModel.adaptToClient)
      .then((adaptedFilm) => this.getFilmComments(adaptedFilm));
  }

  getComments(film) {
    return this._load({url: `comments/${film.id}`})
      .then(Api.toJSON)
      .then((comments) => comments.map(MoviesModel.adaptCommentToClient));
  }

  getFilmComments(film) {
    return this.getComments(film)
      .then((commentsData) => {
        return Object.assign(
            film,
            {},
            {
              commentsData,
            }
        );
      });
  }

  addComment(comment) {
    return this._load({
      url: `comments`,
      method: Method.POST,
      body: JSON.stringify(MoviesModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(MoviesModel.adaptToClient);
  }

  deleteComment(comment) {
    return this._load({
      url: `comments/${comment.id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN &&
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
