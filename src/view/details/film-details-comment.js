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
        <img src="${reaction}" width="55" height="55" alt="emoji-smile">
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
  }

  getTemplate() {
    return createCommentTemplate(this._comment);
  }
}
