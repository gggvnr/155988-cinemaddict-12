import FilmDetailsContainer from '../view/details/film-details-container';
import FilmDetailsTopData from '../view/details/film-details-top-data';
import FilmDetailsControls from '../view/details/film-details-controls';
import FilmDetailsComments from '../view/details/film-details-comments';

import {render, RenderPosition, remove} from '../utils/render';

export default class MovieDetails {
  constructor(changeData) {
    this._changeData = changeData;

    this._detailsContainer = new FilmDetailsContainer();

    this._detailsTopData = new FilmDetailsTopData(this._filmData);
    this._detailsTopData.setCloseClickHandler(() => this.hide());

    this._detailsControls = new FilmDetailsControls(this._filmData);
    this._detailsControls.setFavoritesClickHandler(() => this._handleFavoritesChange());
    this._detailsControls.setWatchedClickHandler(() => this._handleWatchedChange());
    this._detailsControls.setWatchlistClickHandler(() => this._handleWatchlistChange());

    this._detailsComments = new FilmDetailsComments(this._filmData);

    this.updateData = this.updateData.bind(this);
  }

  _handleFavoritesChange() {
    this._changeData(
        Object.assign(
            {},
            this._filmData,
            {
              isFavorite: !this._filmData.isFavorite,
            }
        )
    );
  }

  _handleWatchedChange() {
    this._changeData(
        Object.assign(
            {},
            this._filmData,
            {
              isWatched: !this._filmData.isWatched,
            }
        )
    );
  }

  _handleWatchlistChange() {
    this._changeData(
        Object.assign(
            {},
            this._filmData,
            {
              isInWatchlist: !this._filmData.isInWatchlist,
            }
        )
    );
  }

  show(filmData) {
    this._filmData = filmData;

    this.updateData(filmData);

    render(document.body, this._detailsContainer, RenderPosition.BEFOREEND);
    render(this._detailsContainer, this._detailsTopData, RenderPosition.BEFOREEND);
    render(this._detailsContainer, this._detailsControls, RenderPosition.BEFOREEND);
    render(this._detailsContainer, this._detailsComments, RenderPosition.BEFOREEND);
  }

  updateData(data) {
    this._filmData = data;
    this._detailsTopData.updateData(data);
    this._detailsControls.updateData(data);
    this._detailsComments.updateData(data);
  }

  hide() {
    if (this._detailsContainer) {
      remove(this._detailsContainer);
    }
  }
}
