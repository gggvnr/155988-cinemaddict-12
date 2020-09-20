import Smart from '../smart';

import CommentView from './film-details-comment';

import {KeyCodes} from '../../const';

export const createFilmDetailsCommentsTemplate = ({
  commentsData = [],
  selectedEmoji = ``,
}) => {
  return (
    `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">
          Comments <span class="film-details__comments-count">${commentsData.length}</span>
        </h3>

        <ul class="film-details__comments-list">
    ${commentsData.map((comment) => {
      const commentComponent = new CommentView(comment);

      return commentComponent.getTemplate();
    }).join(``)}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label">
            ${renderEmojiImage(selectedEmoji)}
          </div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${getCheckedEmojiState(`smile`, selectedEmoji)}>
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${getCheckedEmojiState(`sleeping`, selectedEmoji)}>
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${getCheckedEmojiState(`puke`, selectedEmoji)}>
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${getCheckedEmojiState(`angry`, selectedEmoji)}>
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>`
  );
};

function getCheckedEmojiState(value, selectedEmoji) {
  return value === selectedEmoji ? `checked` : ``;
}

function renderEmojiImage(selectedEmoji) {
  return selectedEmoji
    ? `<img src="images/emoji/${selectedEmoji}.png" width="55" height="55" alt="emoji-${selectedEmoji}">`
    : ``;
}

export default class FilmDetailsComments extends Smart {
  constructor() {
    super();

    this._data = {
      comments: [],
      selectedEmoji: ``,
    };

    this._element = this.getElement();

    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);
  }

  getTemplate() {
    return createFilmDetailsCommentsTemplate(this._data);
  }

  _emojiChangeHandler(e) {
    e.preventDefault();

    if (this._callbacks.emojiChange) {
      this._callbacks.emojiChange();
    }

    this.updateData(
        Object.assign(
            {},
            this._data,
            {
              selectedEmoji: e.target.value,
            }
        )
    );
  }

  _commentDeleteHandler(e) {
    e.preventDefault();

    const id = e.target.dataset.id;

    this._callbacks.commentDelete(id);
  }

  _commentAddHandler(e) {
    if (e.keyCode === KeyCodes.ENTER && (e.metaKey || e.ctrlKey)) {
      const commentText = e.target.value;

      this._callbacks.commentAdd({
        text: commentText,
        reaction: this._data.selectedEmoji || `smile`,
        postedAt: new Date().toISOString(),
      });
    }
  }

  restoreHandlers() {
    this.setEmojiChangeHandler(this._callbacks.emojiChange);
    this.setCommentDeleteHandler(this._callbacks.commentDelete);
    this.setCommentAddHandler(this._callbacks.commentAdd);
  }

  setEmojiChangeHandler(callback) {
    this._callbacks.emojiChange = callback;

    this._emojiItems = this._element.querySelectorAll(`.film-details__emoji-item`);

    this._emojiItems.forEach((emojiItem) => {
      emojiItem.addEventListener(`change`, this._emojiChangeHandler);
    });
  }

  setCommentDeleteHandler(callback) {
    this._callbacks.commentDelete = callback;

    this._commentDeleteButtons = this._element.querySelectorAll(`.film-details__comment-delete`);

    this._commentDeleteButtons.forEach((button) => {
      button.addEventListener(`click`, this._commentDeleteHandler);
    });
  }

  setCommentAddHandler(callback) {
    this._callbacks.commentAdd = callback;

    this._commentAddInput = this._element.querySelector(`.film-details__comment-input`);

    this._commentAddInput.addEventListener(`keydown`, this._commentAddHandler);
  }
}
