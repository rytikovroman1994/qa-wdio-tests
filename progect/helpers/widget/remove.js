/**
 * @memberof Helpers
 * @function removeWidget - Удаляет виджет с холста
 * @param {string} [widgetId] - id виджета
 * @example
 *  removeWidget('ul-id-1376-3');
 */
export default function removeWidget(widgetId) {
  browser.logger.command('removeWidget', `удаляем виджет ${widgetId}`);

  // ищем виджет на холсте и наводим на него курсор
  const widgetSelector = `#${widgetId}.ul-widget`;
  browser.waitForVisible(widgetSelector);
  browser.moveToObject(widgetSelector);

  // ждем пока не появится кнопка удаления виджета и жмем её
  const removeWgtSelector = `${widgetSelector} .js-widget-handler-btns [type=remove], ${widgetSelector} .js-remove-el`;
  browser.waitForVisible(removeWgtSelector);
  browser.click(removeWgtSelector);

  // ждем когда виджет исчезнет с холста
  browser.waitUntil(() => browser.isExisting(widgetSelector) === false);
}
