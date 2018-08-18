/**
 * @memberof Helpers
 * @function openTab - Открывает указанную вкладку панели "Конструктор"
 * @param {Object} param1 - параметры открытия вкладки
 * @param {string?} [param1.name='widgets'] - Тип вкладки
 * @example
 *  openTab();
 */
export default function openTab({ name = 'widgets' } = {}) {
  browser.logger.command('openTab', `открываем вкладку ${name}`);
  const tabSelector = `.ul-panel-constructor-elements-section--${name}`;

  // Проверяем не открыта ли уже указанная вкладка
  if (browser.isVisible(tabSelector)) {
    return;
  }

  // определяем видимость кнопки переключения на нужную вкладку
  // и жмем ее для перехода
  const tabBtnSelector = `.ul-tabs li[data-content="${name}"]`;
  browser.waitForVisible(tabBtnSelector);
  browser.click(tabBtnSelector);

  browser.waitForVisible(tabSelector);
}
