import Abstract from '../abstract';

export const createFilmDetailsContainerTemplate = () => {
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get"></form>
    </section>`
  );
};

export default class FilmDetailsContainer extends Abstract {
  getTemplate() {
    return createFilmDetailsContainerTemplate(this._data);
  }
}
