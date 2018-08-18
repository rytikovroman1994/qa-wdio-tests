/**
 * @memberof Helpers
 * @function duplicatePage - Дублирует страницу по указанному id
 * @param {string} pageId - идентификатор дублируемой страницы
 * @returns {string} - Id новой страницы
 *
 * @example
 *  const pageId = browser.helpers.duplicatePage('some_page_id');
 */
export default function duplicatePage(pageId = 'index') {
  browser.logger.command('duplicatePage', `дублируем существующую страницу ${pageId}`);

  // открываем панель страниц
  browser.helpers.openPanel({ name: 'panelPages' });

  // id'шники уже существующих страниц сайта
  const oldIds = browser.getAttribute('.ul-pageslist-item', 'data-pageid');
  // проверяем существует ли страница с указанным pageId
  // и извлекаем ее название
  const dupPageSelector = `.ul-pageslist-item[data-pageid="${pageId}"]`;
  const pageTitleSelector = `${dupPageSelector} .ul-pageslist-title`;
  browser.waitForExist(pageTitleSelector);
  let pageTitle = browser.getHTML(pageTitleSelector, false);

  // в некоторых случаях getHTML возвращает не строку,
  // а массив строк. Проверяем, если это так - выполняем
  // конкатенацию
  if (Array.isArray(pageTitle)) {
    pageTitle = pageTitle.join('');
  }

  pageTitle = pageTitle.trim();

  // Ищем форму поика страниц, чтоб не выполнять скролл
  // который сделан кастомно и не поддается управлению
  // через webdriver
  const searchPageInput = '.js-pages-search-form__input';
  browser.waitForExist(searchPageInput);
  browser.waitForVisible(searchPageInput);

  // ищем страницу
  browser.setValue(searchPageInput, pageTitle);

  // проверяем есть ли она в результатах поиска
  browser.waitForVisible(dupPageSelector);

  // наводим на нее курсор
  browser.moveToObject(dupPageSelector, 5, 10);

  // ждем появления кнопки дублирования страницы
  const dupBtnSelector = `${dupPageSelector} .js-btn-panel-page[data-btn="copy"]`;
  browser.waitForVisible(dupBtnSelector);
  // жмем дублирование
  browser.click(dupBtnSelector);

  let ready = false;
  let newIds = [];
  browser.waitUntil(() => {
    newIds = browser.getAttribute('.ul-pageslist-item', 'data-pageid');
    ready = newIds.length > oldIds.length;

    return ready;
  });

  if (ready === false) {
    throw new Error('Страницы не продублирована!');
  }

  return newIds.find(id => oldIds.includes(id) === false);
}
