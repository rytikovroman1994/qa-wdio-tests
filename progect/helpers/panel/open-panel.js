/**
 * @memberof Helpers
 * @function openPanel - Открывает указанную панель конструктора
 * @param {Object} param1 - параметры открытия панели
 * @param {string?} [param1.name='panelConstructor'] - Тип панели
 * @example
 *  openPanel({ name: 'panelPages'});
 */
export default function openPanel({ name = 'panelConstructor' } = {}) {
  browser.logger.command('openPanel', `открываем панель ${name}`);

  const panelContentSelector = `.ul-menu-desc[data-target="${name}"]`;
  // Проверяем не открыта ли уже указанная панель
  if (browser.isVisible(panelContentSelector)) {
    return;
  }

  // определяем видимость кнопки переключения на нужную панель
  // и жмем ее для перехода
  const btnSelector = `.js-panel-action[data-panel="${name}"]`;
  browser.waitForVisible(btnSelector);
  browser.click(btnSelector);

  browser.waitForVisible(panelContentSelector);
}
