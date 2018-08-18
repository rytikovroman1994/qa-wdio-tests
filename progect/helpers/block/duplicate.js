/**
 * @memberof Helpers
 * @function duplicateBlock - Дублирует указанный блок
 * @param {string} blockId - Id дублируемого блока.
 * @returns {string} - Id созданного блока.
 * @example
 *  const newBlockId = browser.helpers.duplicateBlock('ul-id-0-56');
 * @todo Вынести повторяющуюся часть с остальными хэлперами блока в хелпер "invokeBlockActions"
 */
export default function duplicateBlock(blockId) {
  browser.logger.command('duplicateBlock', `дублируем блок #${blockId}`);

  const getBlocksId = () => $$('.ul-container').map(i => i.getAttribute('id'));
  // сохраняем в переменную список блоков, существующих на странице
  const oldBlocksId = getBlocksId();

  // наводимся на блок
  const blockSelector = `#${blockId}.ul-container`;
  browser.waitForVisible(blockSelector);

  /**
   * @todo <Gleb Azarov>: Беру на себя тех. долг зарефакторить это, ибо заебался скрол чинить
   */
  // Разрешаем клики сквозь меню, на случай если оно фиксировано
  browser.execute(() => {
    document.querySelector('.menu-head').style.pointerEvents = 'none';
  });

  browser.moveToObject(blockSelector);

  // ждём появления кнопки дублирования блока и жмём на неё
  const dupSelector = `${blockSelector} .js-block-btn[data-event="copy"]`;
  browser.waitForVisible(dupSelector);
  browser.click(dupSelector);

  // Возвращаем кликабельность меню
  browser.execute(() => {
    document.querySelector('.menu-head').style.pointerEvents = 'auto';
  });

  let id = null;
  // в течении 10 секунд каждые 0.5 секунды проверяем, не появился ли на странице новый блок
  browser.waitUntil(() => {
    // для этого получаем список всех блоков на странице и проверяем, существовали ли они до копирования
    id = getBlocksId()
      .filter(i => oldBlocksId.includes(i))
      .pop();
    return id;
  }, 10 * 1000, 'Блок не продублирован', 500);

  return id;
}
