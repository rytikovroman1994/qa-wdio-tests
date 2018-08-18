/**
 * @memberof Helpers
 * @function removePage - Удаляет страницу сайта
 * @param {string} [pageId] - id удаляемой страницы
 * @example
 *  removePage('test');
 */
export default function removePage(pageId) {
  browser.logger.command('removePage', `удаляем страницу ${pageId}`);

  browser.helpers.openPanel({ name: 'panelPages' });

  // Наводим курсор на нужную страницу в списке
  const pageItemSelector = `.js-page[data-pageid="${pageId}"]`;
  browser.waitForVisible(pageItemSelector);
  browser.moveToObject(pageItemSelector, 10, 10);

  // ждем пока станет видима кнопка удаления страницы
  // и жмем ее
  const btnRemoveSelector = `${pageItemSelector} .js-btn-panel-page[data-btn="remove"]`;
  browser.waitForVisible(btnRemoveSelector);
  browser.click(btnRemoveSelector);

  // Ждем появления диалога подтверждения удаления страницы
  // и подтверждаем удаление
  const confirmBtnSelector = '.ul-confirm-dialog .js-confirm[role="ok"]';
  browser.waitForVisible(confirmBtnSelector);
  browser.click(confirmBtnSelector);

  // ждем пока исчезнет с экрана диалог
  browser.waitUntil(() => browser.isVisible(confirmBtnSelector) === false);
  // ждем пока исчезнет из списка страниц удаленная страница
  browser.waitUntil(() => browser.isVisible(pageItemSelector) === false);
}
