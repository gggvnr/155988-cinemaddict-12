import he from "he";

import Abstract from '../abstract';

import {humanizeCommentDate} from '../../utils/common';

const createCommentTemplate = ({
  id,
  reaction,
  text,
  author,
  postedAt,
}) => {
  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="/images/emoji/${reaction}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeCommentDate(postedAt)}</span>
          <button class="film-details__comment-delete" data-id="${id}">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends Abstract {
  constructor(commentData) {
    super();

    this._comment = commentData;
    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();

    const id = evt.target.dataset.id;

    this._callbacks.deleteClick(id);
  }

  setDeleteClickHandler(callback) {
    this._callbacks.deleteClick = callback;
    this._deleteButton = this._element.querySelector(`.film-details__comment-delete`);
    this._deleteButton.addEventListener(`click`, this._deleteClickHandler);
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
