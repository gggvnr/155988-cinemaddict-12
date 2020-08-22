import FilmDetailsView from '../view/film-details';

import {render, RenderPosition, remove} from '../utils/render';

export default class MovieDetails {
  constructor(changeData) {
    this._changeData = changeData;

    this._detailsComponent = new FilmDetailsView();

    this._detailsComponent.setCloseClickHandler(() => this.hide());
    this._detailsComponent.setFavoritesClickHandler(() => this._handleFavoritesChange());
    this._detailsComponent.setWatchedClickHandler(() => this._handleWatchedChange());
    this._detailsComponent.setWatchlistClickHandler(() => this._handleWatchlistChange());

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

    render(document.body, this._detailsComponent, RenderPosition.BEFOREEND);
  }

  updateData(data) {
    this._filmData = data;
    this._detailsComponent.updateData(data);
  }

  hide() {
    if (this._detailsComponent) {
      remove(this._detailsComponent);
    }
  }
}
