/**
 * @todo Заменить на интервенцию стилей
 */
function closePublishTooltip() {
  const tooltipSelector = '#ul-publish-tooltip';
  if (browser.isVisible(tooltipSelector)) {
    // Кликаем на кнопку виджета на случай, если какой-нибудь overlay перекрыл нам к ней доступ
    // Такой вызов через buttonPress не выбросит исключения, в отличие от click, если цель перекрыта
    // Так как это чисто нажатие кнопки мыши
    browser
      .moveToObject(tooltipSelector)
      .buttonPress();
  }
}

/**
 * @todo [Gleb Azarov]: беру на себя техдолг перенести это в command
 */
function getAttribute(selector, attribute) {
  try {
    return $$(selector).map(e => e.getAttribute(attribute));
  } catch (err) {
    return getAttribute(selector, attribute);
  }
}

/**
 * @memberof Helpers
 * @function dropNewWidget - Создает новый виджет в указанном месте на холсте.
 * @param {string} [widgetType='header'] - Тип виджета.
 * @param {string} [destination='header'] - Селектор блока, куда будет брошен виджет (по умолчанию в первый сверху блок).
 * @returns {string} - Id созданного виджета.
 * @example
 *  const widgetId = browser.helpers.dropWidget('imagezoom', '');
 * @todo Выбросить человекочитаемую ошибку, если такого виджета нет в левой панели.
 */
export default function dropWidget(widgetType, destination) {
  if (widgetType === undefined) {
    throw new Error('widgetType must be defined');
  }

  // Если destination не указан, то бросаем виджет в шапку и он по умолчанию проваливается вниз, в первый блок
  const widgetSelectorDest = destination || '.ul-container';
  const widgetDropDest = destination || 'header';

  browser.logger.command('dropNewWidget', `бросаем на холст виджет ${widgetType}`);

  // Открываем панель конструктора и на ней вкладку с виджетам
  browser.helpers.openPanel({ name: 'panelConstructor' });
  browser.helpers.openTab({ name: 'widgets' });

  // Ищем отображаемое имя виджета для использования его в поиске
  const widgetNameSelector = `.js-widgets-groups [data-widget="${widgetType}"] .ul-draggable-widget__title`;
  browser.waitForExist(widgetNameSelector, 5 * 1000);
  const widgetName = browser.getHTML(widgetNameSelector, false);

  // Ищем форму поиска виджетов дабы не раскрывать вкладки
  // и ищем с ее помощью виджет указанного типа
  const searchFormSelector = '.js-widgets-search-form__input';
  browser.waitForVisible(searchFormSelector);
  browser.setValue(searchFormSelector, widgetName);

  // Ждем результатов поиска, а после перетаскиваем виджет в указаный destination
  const widgetBtnSelector = `.ul-menu-desc .js-widgets-search-results .js-draggable-widget[data-widget="${widgetType}"]`;
  browser.waitForVisible(widgetBtnSelector);

  // список виджетов данного типа в селекторе назначения до броска виджета
  const oldDestIds = getAttribute(`${widgetSelectorDest} .ul-widget`, 'id');

  closePublishTooltip();

  browser.dragAndDrop(widgetBtnSelector, widgetDropDest);

  closePublishTooltip();

  // закрываем результаты поиска
  browser
    .moveToObject('#ul-panelConstructor .js-widgets-search-results .js-widgets-search-results__clear')
    .buttonPress();

  let newWidgetId = null;
  browser.waitUntil(() => {
    // список виджетов данного типа в селекторе назначения
    // после броска виджета
    const newDestIds = getAttribute(`${widgetSelectorDest} .ul-widget`, 'id');
    // Находим Id брошеного виджета, вычислив разницу между массивами
    newWidgetId = newDestIds.filter(i => !oldDestIds.includes(i)).pop();
    return Boolean(newWidgetId);
  }, 6 * 1000, 'Виджет не появился на холсте после дропа', 500);

  // Возвращаем id брошенного виджета
  return newWidgetId;
}
