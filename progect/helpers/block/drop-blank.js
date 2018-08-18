/**
 * @memberof Helpers
 * @function dropBlankBlock - Дропает новый пустой блок на холст.
 * @param {Object} param1 - Параметры создания блока.
 * @param {string?} [param1.type='empty'] - Тип блока: empty | empty-fluid.
 * @returns {string} - Id созданного блока.
 * @example
 *  const createdId = browser.helpers.dropBlankBlock();
 */
export default function dropBlankBlock({ type = 'empty' } = {}) {
  browser.logger.command('createBlankBlock', `создаем новый блок типа ${type}`);
  browser.helpers.openPanel({ name: 'panelConstructor' });
  browser.helpers.openTab({ name: 'blocks' });

  // Вставляем сверху, после header'а (при дропе в header блок провалится вниз)
  const destinationSelector = '#body header';

  const blankBlockSelector = `#ul-panelConstructor .ul-panel-constructor-elements-section--blocks .js-draggable-block[data-id="block-${type}"]`;
  // Если секция с блоками закрыта - надо открыть
  if (!browser.isVisible(blankBlockSelector)) {
    browser.click('#ul-panelConstructor .ul-panel-constructor-elements-section--blocks [data-id="blank"]');
  }

  browser.dragAndDrop(blankBlockSelector, destinationSelector);

  // так как мы вставили его вверху, то он будет "первым" сверху в DOM'е
  // таким макаром мы его находим и достаём его id
  return $('.ul-container:nth-child(1)').getAttribute('id');
}
