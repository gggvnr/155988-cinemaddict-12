import FilmDetailsContainer from '../view/details/film-details-container';
import FilmDetailsTopData from '../view/details/film-details-top-data';
import FilmDetailsControls from '../view/details/film-details-controls';
import FilmDetailsComments from '../view/details/film-details-comments';

import {UserAction, UpdateType, KeyCodes, DetailsViewState} from '../const';
import {render, RenderPosition, remove} from '../utils/render';

export default class MovieDetails {
  constructor(handleViewAction) {
    this._filmData = {};

    this._handleViewAction = handleViewAction;

    this._detailsContainer = new FilmDetailsContainer();

    this._detailsTopData = new FilmDetailsTopData();
    this._detailsTopData.setCloseClickHandler(() => this.hide());

    this._detailsControls = new FilmDetailsControls();
    this._detailsControls.setFavoritesClickHandler(() => this._handleFavoritesChange());
    this._detailsControls.setWatchedClickHandler(() => this._handleWatchedChange());
    this._detailsControls.setWatchlistClickHandler(() => this._handleWatchlistChange());

    this._detailsComments = new FilmDetailsComments();
    this._detailsComments.setCommentDeleteHandler((commentId) => this._handleCommentDelete(commentId));
    this._detailsComments.setCommentAddHandler((commentData) => this._handleCommentAdd(commentData));

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCodes.ESC) {
      evt.preventDefault();
      this.hide();
    }
  }

  _handleFavoritesChange() {
    this._handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
    this._handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._filmData,
            {
              watchingDate: new Date().toISOString(),
              isWatched: !this._filmData.isWatched,
            }
        )
    );
  }

  _handleWatchlistChange() {
    this._handleViewAction(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._filmData,
            {
              isInWatchlist: !this._filmData.isInWatchlist,
            }
        )
    );
  }

  _handleCommentDelete(commentId) {
    this._handleViewAction(
        UserAction.DELETE_COMMENT,
        UpdateType.MINOR,
        commentId
    );
  }

  _handleCommentAdd(commentData) {
    this._handleViewAction(
        UserAction.ADD_COMMENT,
        UpdateType.MINOR,
        {
          filmId: this._filmData.id,
          comment: commentData,
        }
    );
  }

  setViewState(viewState, data) {
    this._detailsComments.updateData({
      isFormPending: false,
      isFormAborting: false,
      pendingCommentId: null,
      abortingCommentId: null,
    });

    switch (viewState) {
      case DetailsViewState.FORM_PENDING:
        this._detailsComments.updateData({
          isFormPending: true,
        });
        break;
      case DetailsViewState.FORM_ABORTING:
        this._detailsComments.updateData({
          isFormAborting: true,
        });
        break;
      case DetailsViewState.COMMENT_DELETE_PENDING:
        this._detailsComments.updateData({
          pendingCommentId: data.commentId
        });
        break;
      case DetailsViewState.COMMENT_DELETE_ABORTING:
        this._detailsComments.updateData({
          abortingCommentId: data.commentId
        });
        break;
    }
  }

  show(filmData) {
    this._filmData = filmData;

    this._handleViewAction(UserAction.LOAD_COMMENTS, UpdateType.MINOR, filmData);

    this.updateData(filmData);

    render(document.body, this._detailsContainer, RenderPosition.BEFOREEND);
    render(this._detailsContainer, this._detailsTopData, RenderPosition.BEFOREEND);
    render(this._detailsContainer, this._detailsControls, RenderPosition.BEFOREEND);
    render(this._detailsContainer, this._detailsComments, RenderPosition.BEFOREEND);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  updateData(data) {
    this._filmData = data;

    this._detailsTopData.updateData(data);
    this._detailsControls.updateData(data);
    this._detailsComments.updateData({
      commentsData: data.commentsData,
    });
  }

  hide() {
    if (this._detailsContainer) {
      remove(this._detailsContainer);
      document.removeEventListener(`keydown`, this._escKeyDownHandler);
    }
  }
}
