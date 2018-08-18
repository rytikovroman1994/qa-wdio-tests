/**
 * @memberof Helpers
 * @function duplicateWidget - Дублирует виджет
 * @param {string} [widgetId] - id виджета
 * @example
 *  const newWidgetId = duplicateWidget('ul-id-1376-3');
 */
export default function duplicateWidget(widgetId) {
  browser.logger.command('duplicateWidget', `дублируем виджет ${widgetId}`);

  // Ищем id блока родителя дублируемого виджета
  const blockId = browser.helpers.getWidgetBlock(widgetId);
  const getWidgetIds = () => {
    const ids = browser.getAttribute(`#${blockId} .ul-widget`, 'id');
    return Array.isArray(ids) ? ids : [ids];
  };
  // Находим id виджетов уже присутствующих в блоке
  const oldIds = getWidgetIds();

  // ищем виджет на холсте и наводим на него курсор
  const widgetSelector = `#${widgetId}.ul-widget`;
  browser.waitForVisible(widgetSelector);
  browser.moveToObject(widgetSelector);

  // ждем пока не появится кнопка дублирования виджета и жмем её
  const duplicateWgtSelector = `${widgetSelector} .js-copy-el`;
  browser.waitForVisible(duplicateWgtSelector);
  browser.click(duplicateWgtSelector);

  // проверяем, что виджет продублировался
  let result = false;
  let newIds = [];
  browser.waitUntil(() => {
    newIds = getWidgetIds();
    result = newIds.length > oldIds.length;
    return result;
  }, 10 * 1000, 500);

  if (result === false) {
    throw new Error('Виджет не продублирован');
  }

  browser.logger.command('helper::duplicateWidget', 'Виджет продублирован');
  return newIds.find(id => oldIds.includes(id) === false);
}
