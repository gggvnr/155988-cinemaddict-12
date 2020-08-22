import FilmDetailsView from '../view/film-details';

import {render, RenderPosition, remove} from '../utils/render';

export default class MovieDetails {
  constructor() {
    this._detailsComponent = null;
  }

  show(filmData) {
    this._detailsComponent = new FilmDetailsView(filmData);
    this._detailsComponent.setCloseClickHandler();

    render(document.body, this._detailsComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    if (this._detailsComponent) {
      remove(this._detailsComponent);
    }
  }
}
