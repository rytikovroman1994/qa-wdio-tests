/**
 * @memberof Helpers
 * @function historyUndo - Возвращает по хистори
 * @example
 *  browser.helpers.historyUndo();
 */
export default function historyUndo() {
  browser.logger.command('historyUndo', 'возвращаем по хистори undo');

  const publishAlert = '.ul-publish-tooltip-icon';

  // Наводим курсор на иконку отката по хистори
  const iconSelector = '.js-left-menu .js-panel-action[data-action=undo]';
  browser.moveToObject(iconSelector);

  // Если появилось окно "Опубликуйте сайт", то закрываем его кликом по нему
  if (browser.isVisible(publishAlert)) {
    browser.click(publishAlert);
  }
  // Ждем пока пропадет окно "Опубликуйте сайт"
  browser.waitUntil(() => browser.isVisible(publishAlert) === false);

  // Проверяем активна ли иконка отката по хистори
  if ($(iconSelector).getAttribute('disabled')) {
    throw new Error('Нет изменений');
  }
  // Жмем на откат по хистори и ждем пока все вернется
  browser.click(iconSelector);
  browser.pause(10000);
}
