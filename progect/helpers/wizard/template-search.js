/**
 * @memberof Helpers
 * @function wizardTemplateSearch - Создаёт новый сайт на указанном шаблоне (по умолчанию - empty-cruise).
 * @param {string} searchText - Текст для ввода в поле поиска шаблона.
 * @example
 *  const siteUrl = createNewSite();
 */
export default function wizardTemplateSearch(searchText) {
  browser
    .setValue('.js-search-field', searchText)
    .click('.js-search-btn')
    .waitForExist('.w-tmpls .w-tmpl:first-child');

  // так тут не совсем понятно, как проверить то, что шаблон нашёлся по нормальному
  // пока что поставлю паузу, а потом впилим нормальные селекторы в neowizard
  browser.pause(1000);

  // тут смотрим, есть ли на странице сообщение о том, что шаблон не найден
  if (browser.isVisible('.w-search-answer-title') || browser.isVisible('.w-search-answer-text.js-search-answer-links')) {
    throw new Error('Template not found in wizard');
  }
}
