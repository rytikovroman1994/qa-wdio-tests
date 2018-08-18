/**
 * @memberof Helpers
 * @function historyRedo - Возвращает по хистори
 * @example
 *  browser.helpers.historyRedo();
 */
export default function historyRedo() {
  browser.logger.command('historyRedo', 'возвращаем по хистори redo');

  const publishAlert = '.ul-publish-tooltip-icon';

  // Наводим курсор на иконку возврата по хистори
  const iconSelector = '.js-left-menu .js-panel-action[data-action=redo]';
  browser.moveToObject(iconSelector);

  // Если появилось окно "Опубликуйте сайт", то закрываем его кликом по нему
  if (browser.isVisible(publishAlert)) {
    browser.click(publishAlert);
  }
  // Ждем пока пропадет окно "Опубликуйте сайт"
  browser.waitUntil(() => browser.isVisible(publishAlert) === false);

  // Проверяем активна ли иконка возврата по хистори
  if ($(iconSelector).getAttribute('disabled')) {
    throw new Error('Нет изменений');
  }
  // Жмем на возврат по хистори и ждем пока все вернется
  browser.click(iconSelector);
  browser.pause(10000);
}
