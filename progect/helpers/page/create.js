import { randomString } from '../../get-random';

/**
 * @memberof Helpers
 * @function createNewPage - Создаёт новую страницу сайта.
 * @param {Object} param1 - Параметры создания страницы.
 * @param {string?} [param1.title='<случайное_имя_страницы>'] - Имя страницы.
 * @param {string?} [param1.type='common'] - Тип страницы.
 * @returns {string} - PageId страницы.
 * @example
 *  const pageId = browser.helpers.createNewPage();
 */
export default function createNewPage({ title = randomString(10), type = 'common' } = {}) {
  browser.logger.command('createNewPage', 'создаем новую страницу');

  browser.helpers.openPanel({ name: 'panelPages' });
  // ждем появления иконки добавления страницы и мжем ее
  browser.waitForVisible('.js-page-add');
  browser.click('.js-page-add');

  // ждем появления модального окна с выбором типа создаваемой страницы
  // и кликаем указанный тип страницы
  browser.waitForVisible('#ul-popup');
  browser.waitForVisible(`#ul-popup .js-pagetype[data-page-type="${type}"]`);
  browser.click(`#ul-popup .js-pagetype[data-page-type="${type}"]`);

  // ждем появления параметров создаваемой страницы
  // заполняем название страницы и жмем Enter
  browser.waitForVisible('#ul-popup input[ul-model="title"]');
  browser.setValue('#ul-popup input[ul-model="title"]', title);
  browser.keys('\uE007');

  let pageId = null;
  // Ждём, пока страница появится в списке и у неё появится pageId
  browser.waitUntil(() => {
    const pageItemSelector = 'li.ul-pageslist-item:last-of-type';
    const lastPageTitle = browser.getText(`${pageItemSelector} .ul-pageslist-title`);
    pageId = $(pageItemSelector).getAttribute('data-pageid');
    return lastPageTitle === title && Boolean(pageId);
  }, 5 * 1000, 'Страница не появилась в списке после создания', 500);

  return pageId;
}
