import he from "he";

import Provider from '../../api/provider';
import Abstract from '../abstract';

import {humanizeCommentDate} from '../../utils/common';

const createCommentTemplate = (
    {
      id,
      reaction,
      text,
      author,
      postedAt,
    },
    pendingCommentId,
    abortingCommentId
) => {
  const isPending = pendingCommentId === id;
  const isAborting = abortingCommentId === id;

  return (
    `<li class="film-details__comment ${getAbortingClassname(isAborting)}">
      <span class="film-details__comment-emoji">
        <img src="/images/emoji/${reaction}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(text)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${humanizeCommentDate(postedAt)}</span>
          <button
            class="film-details__comment-delete"
            data-id="${id}"
            ${getButtonDisabledAttr(isPending && !isAborting)}
          >
            ${isPending && !isAborting ? `Deleting…` : `Delete`}
          </button>
        </p>
      </div>
    </li>`
  );
};

function getButtonDisabledAttr(isDisabled) {
  return isDisabled || !Provider.isOnline() ? `disabled` : ``;
}

function getAbortingClassname(isAborting) {
  return isAborting ? `shake` : ``;
}

export default class Comment extends Abstract {
  constructor(commentData, pendingCommentId, abortingCommentId) {
    super();

    this._comment = commentData;
    this._pendingCommentId = pendingCommentId;
    this._abortingCommentId = abortingCommentId;
  }

  getTemplate() {
    return createCommentTemplate(this._comment, this._pendingCommentId, this._abortingCommentId);
  }
}
