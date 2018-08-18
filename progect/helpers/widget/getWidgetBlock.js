/**
 * @memberof Helpers
 * @function getWidgetBlock - Возвращает id блока в котором расположен виджет
 * @param {string} [widgetId] - id виджета
 * @example
 * const blockId = getWidgetBlock('ul-id-1376-3');
 */
export default function getWidgetBlock(widgetId) {
  browser.logger.command('getWidgetBlock', `ищем id блока в котором лежит виджет ${widgetId}`);

  const widgetSelector = `#${widgetId}.ul-widget`;
  browser.waitForExist(widgetSelector);

  let className;
  let elem = $(widgetSelector);

  // ищем родительский блок для виджета
  do {
    // цикл прервется либо когда будет найден
    // родительский контейнер
    // либо когда мы достигнем корня дерева документа
    // и будет выброшена ошибка
    //
    // цикл в такой ситуации не бесконечный
    elem = elem.$('..');
    className = elem.getAttribute('class');
  } while (className.includes('ul-container') === false);

  return elem.getAttribute('id');
}
