export const LOREM_TEXT_PLACEHOLDER = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

export const DESCRIPTION_MAX_LENGTH = 5;
export const MAX_RATING_IN_PERCENTS = 100;

export const userRanksMap = {
  '': (count) => count <= 0,
  'Novice': (count) => count > 0 && count <= 10,
  'Fan': (count) => count > 10 && count <= 20,
  'Movie Buff': (count) => count > 20,
};
