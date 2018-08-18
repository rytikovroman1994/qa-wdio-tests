import faker from 'faker';

/**
 * @description Тест функционала виджета wysiwyg
 * @todo Починить тест - сейчас не работает overlay (см. it.skip ниже).
 * @todo Исправить селекторы (Арестович - редиска)
 * @todo Исправить описания it'ов
 * @todo Исправить expect'ы
 * @todo BFR 🤦‍
 * @type {Testcase}
 * @member widget-wysiwyg
 * @memberof Spec
*/
describe.skip('Constructor - widgets - wysiwyg', () => {
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite({ templateName: 'empty-cruise' });
    // ждём исчезновения лоадера
    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
  });

  it('drag&drop wysiwyg', () => {
    browser.moveToObject('.ul-elements-group__list.clearfix.js-foldable__sliding > li[data-widget="wysiwyg"]', 10, 10);
    browser.buttonDown(0);
    browser.moveToObject('#ul-content', 200, 10);
    browser.buttonUp(0);
    browser.pause(4000);
    browser.waitForVisible('#ul-content .L1xiUGo___widget-handler-wrapper');
  });

  it('bold', () => {
    browser.leftClick('#ul-content .L1xiUGo___widget-handler-wrapper', 30, 10);
    browser.waitForVisible('._1qnw7wj___controls');

    browser.buttonDown(0);
    browser.moveToObject('#ul-content .L1xiUGo___widget-handler-wrapper', 150, 10);
    browser.buttonUp(0);
    browser.pause(2000);

    browser.click('._1qnw7wj___controls span[data-for="controls__button-BOLD"]');
    browser.waitForVisible('#ul-content h2 span[style="font-weight: bold;"]');
    expect(browser.isVisible('.icon-content-large-wysiwyg-bold.ul-icon.new-icon.active.J8iIz9U___icon.HEac6ef___active'), 'не ок').to.equal(true);
  });

  it('italic', () => {
    browser.click('._1qnw7wj___controls span[data-for="controls__button-ITALIC"]');
    browser.waitForVisible('#ul-content h2 span[style="font-weight: bold; font-style: italic;"]');
    expect(browser.isVisible('.icon-content-large-wysiwyg-italic.ul-icon.new-icon.active.J8iIz9U___icon.HEac6ef___active'), 'не ок').to.equal(true);
  });

  it('link', () => {
    browser.click('._1qnw7wj___controls span[data-for="controls__button-LINK"]');
    browser.waitForVisible('.ul-linkPopover-linkEdit');
    browser.click('.ul-linkPopover-edit-item-wrapper.mode-fluid');

    browser.moveToObject('.ul-button.js-linkPopover-save', 2, 2); // (у меня попап на экран не влазит...)

    browser.click('.ul-button.js-linkPopover-save');
    browser.leftClick('#ul-content .L1xiUGo___widget-handler-wrapper', 50, 10);
    browser.waitForVisible('.ul-linkPopover-link a');
    browser.click('.ul-icon.icon-content-special-remove.ul-icon-padding.js-linkPopover-remove');
  });

  it('colors', () => {
    browser.click('._1qnw7wj___controls span[data-for="controls__button-COLOR"]');
    browser.waitForVisible('._2CjhzmT___colors');
    browser.click('._2CjhzmT___colors>span:nth-child(2)');
    browser.waitForVisible('#ul-content h2 span[style*="color: rgb(11, 161, 56); text-decoration-color: rgb(11, 161, 56);"]');
    browser.click('._2CjhzmT___colors>span:nth-child(3)');
    browser.waitForVisible('#ul-content h2 span[style*="color: rgb(150, 158, 152); text-decoration-color: rgb(150, 158, 152);"]');
    browser.click('._2CjhzmT___colors>span:nth-child(1)');
    browser.waitForVisible('#ul-content h2 span[style*="color: rgb(27, 33, 29); text-decoration-color: rgb(27, 33, 29);"]');
  });

  it('align', () => {
    browser.click('._1qnw7wj___controls span[data-for="controls__button-ALIGN"]');
    browser.waitForVisible('.__react_component_tooltip.show.place-top.type-dark.zztqmjr___tooltip>div');

    browser.click('.icon-content-large-wysiwyg-alignment-center.ul-icon.new-icon.J8iIz9U___icon');
    browser.waitForVisible('._17fgIIn___block._3u7JUHo___center.h2');

    browser.click('.icon-content-large-wysiwyg-alignment-right.ul-icon.new-icon.J8iIz9U___icon');
    browser.waitForVisible('._17fgIIn___block._2BYb3pb___right.h2');

    browser.click('.icon-content-large-wysiwyg-alignment-justify.ul-icon.new-icon.J8iIz9U___icon');
    browser.waitForVisible('._17fgIIn___block.jtPKDtd___justify.h2');

    browser.click('.icon-content-large-wysiwyg-alignment-left.ul-icon.new-icon.J8iIz9U___icon');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.h2');
  });

  it('type', () => {
    browser.click('._1qnw7wj___controls span[data-for="controls__button-TYPO"]');
    browser.waitForVisible('._16j27yr___popup__body select>option');
    browser.click('._2-SS0H-___select>select');

    browser.click('._2-SS0H-___select>select>option[value="header-three"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.h3');

    browser.click('._2-SS0H-___select>select>option[value="header-four"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.h4');

    browser.click('._2-SS0H-___select>select>option[value="header-five"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.h5');

    browser.click('._2-SS0H-___select>select>option[value="header-six"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.h6');

    browser.click('._2-SS0H-___select>select>option[value="unstyled"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.normal');
  });

  it('extra', () => {
    browser.click('._1qnw7wj___controls span[data-for="controls__button-EXTRA"]');
    // browser.waitForVisible ('._17fgIIn___block._3vLEwWB___left.y3TCBo3___unordered.public-DraftStyleDefault-unorderedListItem');
    browser.click('._16j27yr___popup__body span[data-for="controls__button-unordered"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.y3TCBo3___unordered.public-DraftStyleDefault-unorderedListItem');

    browser.click('._16j27yr___popup__body span[data-for="controls__button-ordered"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left._2tBcXUO___ordered.public-DraftStyleDefault-orderedListItem');
    browser.click('._16j27yr___popup__body span[data-for="controls__button-ordered"]');
    // возвращаем в h2
    browser.click('._1qnw7wj___controls span[data-for="controls__button-TYPO"]');
    browser.waitForVisible('._16j27yr___popup__body select');
    browser.click('._2-SS0H-___select>select');
    browser.click('._2-SS0H-___select>select>option[value="header-two"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.h2');
    browser.leftClick('#ul-content .L1xiUGo___widget-handler-wrapper', 30, 10);
    browser.waitForVisible('._1qnw7wj___controls');
    browser.buttonDown(0);
    browser.moveToObject('#ul-content .L1xiUGo___widget-handler-wrapper', 150, 10);
    browser.buttonUp(0);
    // проверяем underline, line-through, remove
    browser.click('._1qnw7wj___controls span[data-for="controls__button-EXTRA"]');

    browser.click('._16j27yr___popup__body span[data-for="controls__button-UNDERLINE"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.h2 span[style*="text-decoration: underline;"]');

    browser.click('._16j27yr___popup__body span[data-for="controls__button-STRIKETHROUGH"]');
    browser.waitForVisible('._17fgIIn___block._3vLEwWB___left.h2 span[style*="text-decoration: underline line-through;"]');

    browser.click('._16j27yr___popup__body span[data-for="controls__button-REMOVE"]');
    browser.waitForVisible('.h2 .public-DraftStyleDefault-block.public-DraftStyleDefault-ltr');
  });

  it('text addition', () => {
    browser.leftClick('#ul-content h1', 30, 30);

    const res = faker.lorem.words(5);
    browser.keys(res);

    const getText = browser.getText('.ul-wysivig-editor.clearfix.ul-editableWithEditor>p');

    expect(getText).to.equal(`Вы ${res}можете выбрать стиль текста, его начертание и цвет…`);
  });
});

