/**
 * @memberof Helpers
 * @function removeBlock - Удаляет указанный в параметрах блок на холсте конструктора.
 * @param {Object} param1 - Параметры удаления блока.
 * @param {number?} [param1.blockIdx=1] - ID или порядковый номер блока на странице.
 * @returns {string} - id удаленного блока
 * @example
 *  const removedId = browser.helpers.removeBlock();
 */
export default function removeBlock({ blockIdx = 1 } = {}) {
  browser.logger.command('removeBlock', 'удаляем блок');
  const blockSelector = `.ul-container:nth-child(${blockIdx})`;

  // если указанный блок не найден. завершаем работу
  if (!browser.isExisting(blockSelector)) {
    browser.logger.command('removeBlock', `блока по селектору ${blockSelector} не существует`);
    /*
     * @todo Возможно, здесь стоит бросить ошибку, а не возвращать undefined. Надо решить, как это делать и задокументировать для других случаев.
     */
    return undefined;
  }

  const blockId = browser.getAttribute(blockSelector, 'id');
  // Двигаем курсор в тело блока
  browser.moveToObject(blockSelector, 10, 10);

  const removeBlockSelector = `${blockSelector} .ul-block-controls .js-block-btn[data-event="remove"]`;
  browser.waitForVisible(removeBlockSelector);
  browser.click(removeBlockSelector);

  return blockId;
}
