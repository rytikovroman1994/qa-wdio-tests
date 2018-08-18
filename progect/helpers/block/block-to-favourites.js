/**
 * @memberof Helpers
 * @todo UKIT-7995 Дождаться добавления блока в избранное в хэлпере
 * @function favouriteBlock - Добавляет указанный блок в избранное.
 * @param {number|string} [blockIdx=1] - порядковый номер блока на странице или его id
 * @returns {string} - id блока, добавленного в избранное.
 * @example
 *  browser.helpers.favouriteBlock('ul-id-48-15');
 */
export default function favouriteBlock(blockIdx = 1) {
  browser.logger.command('favouriteBlock', `добавляем блок "${blockIdx}" в избранное`);

  const blockSelector = `#${blockIdx}`;

  // Если указанный блок не найден. завершаем работу
  if (!browser.isExisting(blockSelector)) {
    throw new Error(`Блока по селектору "${blockSelector}" не существует`);
  }

  browser.moveToObject(blockSelector);

  // Разрешаем клики сквозь меню, на случай если оно фиксировано
  browser.execute(() => {
    document.querySelector('.menu-head').style.pointerEvents = 'none';
  });

  // Ждем пока появится кнопка добавления в избранное и жмем ее
  const toFavouriteBtn = `${blockSelector} .js-block-btn[data-event="favorite"]`;
  browser.waitForVisible(toFavouriteBtn);
  browser.click(toFavouriteBtn);

  // Возвращаем кликабельность меню
  browser.execute(() => {
    document.querySelector('.menu-head').style.pointerEvents = 'auto';
  });
}
