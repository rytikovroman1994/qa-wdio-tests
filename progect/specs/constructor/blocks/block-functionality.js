/**
 * @description Тест работы функционала блоков.
 * @type {Testcase}
 * @member blocks
 * @memberof Spec
 * @todo Когда починим хелпер на уопирование блока, дописать тест.
*/
const widgetsList = [
  'header',
  'wysiwyg',
  'imagezoom',
  'gallery',
  'sliderWysiwyg',
  'button',
  'icon',
];

describe('Constructor - blocks', () => {
  const getWidgetsId = () => $$('.ul-container .ul-widget').map(i => i.getAttribute('id'));
  const getBlocksId = () => $$('.ul-container').map(i => i.getAttribute('id'));
  // начальное число блоков
  let initialBlocks;
  // начальное число виджетов
  let initialWidgetsIds;
  // ид блока, который мы добавили и дублировали
  let blockId;
  // текущие число виджетов
  let currentWidgetsIds;
  // текущие число блоков
  let currentBlockIds;
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite();

    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
    browser.waitUntil(() => $$('.ul-left-menu.ul-loader').length === 0);
  });

  // считаем число блоков и виджетов на странице
  it('check initial page status', () => {
    initialWidgetsIds = getWidgetsId();
    initialBlocks = getBlocksId();

    expect(initialBlocks.length).to.equal(0);
    expect(initialWidgetsIds.length).to.equal(0);
  });

  it('drop new block', () => {
    // добавляем новый пустой блок
    blockId = browser.helpers.dropBlankBlock();
    browser.waitForExist('.ul-container');
    currentBlockIds = getBlocksId();
    expect(currentBlockIds.length).to.equal(initialBlocks.length + 1);
  });

  // дропаем семь новых виджетов
  widgetsList.forEach((widget) => {
    it(`drag and drop widget ${widget}`, () => {
      browser.helpers.dropWidget(`${widget}`);
    });
  });

  // проверяем что кол-во виджетов изменилось
  it('check the number of widgets', () => {
    currentWidgetsIds = getWidgetsId();
    expect(currentWidgetsIds.length).to.equal(initialWidgetsIds.length + widgetsList.length);
  });

  // дублируем блок и проверяем кол-во блоков и виджетов
  it('block duplication', () => {
    // дублируем блок с виджетами
    browser.helpers.duplicateBlock(blockId);
    // проверяем что кол-во блоков и виджетов изменилось
    currentBlockIds = getBlocksId();
    currentWidgetsIds = getWidgetsId();
    expect(currentBlockIds.length).to.equal(initialBlocks.length + 2);
    expect(currentWidgetsIds.length).to.equal(initialWidgetsIds.length + widgetsList.length * 2);
  });

  // удаляем блок и проверяем кол-во блоков и виджетов
  it('block removal', () => {
    // удаляем блок
    browser.helpers.removeBlock();
    // необходима пауза, так как после удаления блока долго удаляются данные
    // TODO: подумать, как от этого избавиться
    browser.pause(2000);
    // проверяем кол-во блоков и виджетов
    currentBlockIds = getBlocksId();
    currentWidgetsIds = getWidgetsId();
    expect(currentBlockIds.length).to.equal(initialBlocks.length + 1);
    expect(currentWidgetsIds.length).to.equal(initialWidgetsIds.length + widgetsList.length);
  });
});
