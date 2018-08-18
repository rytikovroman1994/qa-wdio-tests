import faker from 'faker';

/**
 * @description Тест основного функционала виджета Header
 * @todo Исправить селекторы
 * @type {Testcase}
 * @member widget-header
 * @memberof Spec
*/
describe('Constructor - widget - header', () => {
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite();
    // ждём исчезновения лоадера
    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
  });

  it('drop to site', () => {
    browser.moveToObject('.ul-elements-group__list.clearfix.js-foldable__sliding > li[data-widget="header"]', 10, 10);
    browser.buttonDown(0);
    browser.moveToObject('#ul-content', 200, 10);
    browser.buttonUp(0);
    expect('.js-block-container *[data-widget="header"]').to.be.visible();
  });

  it('change text align', () => {
    browser.waitForVisible('#ul-content .ul-header-wrap h1');
    browser.pause(2000);
    // добавил второй клик, ибо по другому не хочет работать
    browser.click('#ul-content .ul-widget-wysivig-header');
    browser.click('#ul-content .ul-widget-wysivig-header');
    browser.waitForExist('#ul-editor-additionalControls');
    browser.waitForVisible('.ul-header-editor.clearfix.ul-header-wrap.ul-editableWithEditor h1');
    browser.click('.ul-buttons-group label:nth-child(2)');
    browser.waitForVisible('.ul-header-editor.clearfix.ul-header-wrap.ul-editableWithEditor h1[style="text-align: center;"]');
    browser.click('.ul-buttons-group label:nth-child(3)');
    browser.waitForVisible('.ul-header-editor.clearfix.ul-header-wrap.ul-editableWithEditor h1[style="text-align: right;"]');
    browser.click('.ul-buttons-group label:nth-child(1)');
    browser.pause(200);
  });

  it('switch text color', () => {
    browser.leftClick('#ul-content h1', 30, 30);
    browser.waitForVisible('#ul-editor-additionalControls');

    browser.buttonDown(0);
    browser.moveToObject('#ul-content h1', 200, 30);
    browser.buttonUp(0);
    browser.pause(100);

    browser.click('.ul-colors li:nth-child(2)');
    expect('h1 .g-color-text-2').to.be.visible();
    browser.click('.ul-colors li:nth-child(3)');
    expect('h1 .g-color-text-3').to.be.visible();

    // убираем фокус с header'а и выключаем режим редактирования
    browser.click('#body');
  });

  it('add text to input field', () => {
    browser.leftClick('#ul-content h1', 30, 30);

    const res = faker.lorem.word();
    browser.keys(res);

    expect('.ul-header-editor.clearfix.ul-header-wrap.ul-editableWithEditor > h1').to.have.text(new RegExp(res));
  });
});

/**
 * @description Тест редактирования виджета Header через всплывающее окно
 * @todo Починить тест - сейчас не работает выделение текста, и '.ul-popover-content' не всплывает.
 * @todo Исправить селекторы
 * @type {Testcase}
 * @member widget-header
 * @memberof Spec
*/
describe.skip('Widget - header popover', () => {
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite();
    // ждём исчезновения лоадера
    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
  });

  it('drop to site', () => {
    browser.moveToObject('.ul-elements-group__list.clearfix.js-foldable__sliding > li[data-widget="header"]', 10, 10);
    browser.buttonDown(0);
    browser.moveToObject('#ul-content', 200, 10);
    browser.buttonUp(0);
    expect('.js-block-container *[data-widget="header"]').to.be.visible();
  });

  it('select text and wait for popover', () => {
    browser.leftClick('#ul-content h1', 30, 30);
    browser.waitForVisible('#ul-editor-additionalControls');
    browser.buttonDown(0);
    browser.moveToObject('#ul-content h1', 200, 30);
    browser.buttonUp(0);

    browser.waitForExist('.ul-popover-content');
    browser.waitForVisible('.ul-icon.ul-icon-padding.icon-content-special-bold');
    browser.waitForVisible('.ul-icon.ul-icon-padding.icon-content-special-italic');
    browser.waitForVisible('.ul-icon.ul-icon-padding.icon-content-special-underline');
    browser.waitForVisible('.ul-icon.ul-icon-padding.icon-content-special-strikethrough');
    browser.waitForVisible('.ul-icon.ul-icon-padding.icon-content-special-link');
  });

  it('check bold style', () => {
    browser.click('.ul-icon.ul-icon-padding.icon-content-special-bold');
    browser.waitForExist('.ul-header-editor.clearfix.ul-header-wrap.ul-editableWithEditor>h1 span[style="font-weight: bold;"]');
    expect('.ul-icon.ul-icon-padding.icon-content-special-bold.active').to.be.visible();
  });

  it('check italic style', () => {
    browser.click('.ul-icon.ul-icon-padding.icon-content-special-italic');
    browser.waitForExist('.ul-header-editor.clearfix.ul-header-wrap.ul-editableWithEditor>h1 span[style="font-weight: bold; font-style: italic;"]'); // в Хроме (в ФФ спаны генерятся иначе - каждый спан отдельно)
    expect('.ul-icon.ul-icon-padding.icon-content-special-italic.active').to.be.visible();
  });

  it('check underline style', () => {
    browser.click('.ul-icon.ul-icon-padding.icon-content-special-underline');
    browser.waitForExist('.ul-header-editor.clearfix.ul-header-wrap.ul-editableWithEditor > h1 span[style="font-weight: bold; font-style: italic; text-decoration: underline;"]'); // в Хроме (в ФФ спаны генерятся иначе - каждый спан отдельно)
    expect('.ul-icon.ul-icon-padding.icon-content-special-underline.active').to.be.visible();
  });

  it('check underline style', () => {
    // Убираем все предыдующие стили, так зачёркнутый с ними конфликтует
    browser.click('.ul-icon.ul-icon-padding.icon-content-special-bold');
    browser.click('.ul-icon.ul-icon-padding.icon-content-special-italic');
    browser.click('.ul-icon.ul-icon-padding.icon-content-special-underline');
    expect('.ul-icon.ul-icon-padding.icon-content-special-bold.active').to.be.not.visible();
    expect('.ul-icon.ul-icon-padding.icon-content-special-italic.active').to.be.not.visible();
    expect('.ul-icon.ul-icon-padding.icon-content-special-underline.active').to.be.not.visible();

    browser.click('.ul-icon.ul-icon-padding.icon-content-special-strikethrough');
    browser.waitForExist('.ul-header-editor.clearfix.ul-header-wrap.ul-editableWithEditor>h1 span[style="text-decoration: line-through;"]');
    expect('.ul-icon.ul-icon-padding.icon-content-special-≈.active').to.be.visible();
  });

  it('check link addition', () => {
    browser.click('.ul-icon.ul-icon-padding.icon-content-special-link');
    browser.click('.ul-linkPopover-edit-item-wrapper ');

    browser.moveToObject('.ul-button.js-linkPopover-save', 2, 2);
    browser.click('.ul-button.js-linkPopover-save');

    browser.leftClick('#ul-content h1', 50, 30);
    browser.waitForVisible('.ul-linkPopover-link');
  });
});

