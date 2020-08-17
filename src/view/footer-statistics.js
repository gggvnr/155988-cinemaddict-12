import Abstract from './abstract';

export const createFooterStatisticsTemplate = (count = ``) => {
  return (
    `<p>${count} movies inside</p>`
  );
};

export default class FooterStatistics extends Abstract {
  constructor(count) {
    super();

    this._count = count;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._count);
  }
}
