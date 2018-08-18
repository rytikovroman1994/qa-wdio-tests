/**
 * @description Тест функционала виджета gallery
 * @todo Исправить селекторы
 * @todo Исправить описания it'ов
 * @todo Исправить expect'ы
 * @todo BFR
 * @type {Testcase}
 * @member widget-gallery
 * @memberof Spec
*/
describe('Constructor - widget - gallery', () => {
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite({ templateName: 'empty-cruise' });
    // ждём исчезновения лоадера
    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
  });

  it('drag&drop widget gallery ', () => {
    browser.moveToObject('.ul-elements-group__list.clearfix.js-foldable__sliding > li[data-widget="gallery"]', 10, 10);
    browser.buttonDown(0);
    browser.moveToObject('#ul-content', 200, 200);
    browser.buttonUp(0);
    browser.pause(3000);
    // browser.dragAndDrop(); //хреново работает, оставил так...эта команда не принимает offset x,y...
    browser.waitForVisible('.container.js-block-container div[data-widget="gallery"]');
    expect(browser.isVisible('.container.js-block-container div[data-widget="gallery"]'), 'не ок').to.equal(true);
  });

  it('slide addition', () => {
    browser.waitForVisible('#ul-content .ul-widget-gallery');
    browser.leftClick('#ul-content .ul-widget-gallery', 200, 200);
    browser.waitForVisible('.UL.ul-sp.ul-w-gallery-form');
    browser.click('.ul-uploader-lib.js-uploader-lib');

    browser.waitForVisible('.ul-imagelib-content.UL');
    browser.waitForVisible('.ul-tabs.js-imagelib-nav>li:nth-child(2)'); // можно (3), но на 19 нет картинок
    browser.click('.ul-tabs.js-imagelib-nav>li:nth-child(2)'); // можно (3), но на 19 нет картинок
    browser.waitForVisible('ul.clearfix li:nth-child(10) .ul-imagelib-img:nth-child(1)');
    browser.click('ul.clearfix li:nth-child(10) .ul-imagelib-img:nth-child(1)');
    browser.waitForVisible('.ul-imagelib-done.ul-button');
    browser.click('.ul-imagelib-done.ul-button');
    browser.pause(2000);
    expect(browser.isVisible('.ul-w-gallery-grid-wrap .row:nth-child(1) .col-md-4:nth-child(1)[data-src*="default"]'), 'не ок').to.equal(false);
    expect(browser.isVisible('.ul-w-gallery-grid-wrap > .row:nth-child(3)'), 'не ок').to.equal(true);
  });

  it('slide edition', () => {
    browser.moveToObject('.ul-w-gallery-grid-wrap .row:nth-child(1) .col-md-4:nth-child(1)');
    browser.click('.ul-widget-gallery-slider-img-edit');
    browser.waitForVisible('.ul-popup-container');
    browser.click('.ul-popup-container .ul-button-link');
    browser.waitForVisible('.ul-imagelib-content.UL');
    browser.waitForVisible('.ul-tabs.js-imagelib-nav>li:nth-child(2)'); // можно (3), но на 19 нет картинок
    browser.click('.ul-tabs.js-imagelib-nav>li:nth-child(2)'); // можно (3), но на 19 нет картинок
    browser.click('ul.clearfix li:nth-child(7) .ul-imagelib-img:nth-child(1)');
    browser.click('.ul-imagelib-done.ul-button');
    browser.pause(2000);
    browser.moveToObject('.js-button-save');
    browser.click('.js-button-save');
    expect(browser.isVisible('.ul-popup-container'), 'не ок').to.equal(false);
  });

  it('slide removing', () => {
    browser.moveToObject('.ul-w-gallery-grid-wrap .row:nth-child(1) .col-md-4:nth-child(1)');
    browser.click('.ul-widget-gallery-slider-img-remove');
    expect(browser.isVisible('.ul-w-gallery-grid-wrap > .row:nth-child(3)'), 'не ок').to.equal(false);
  });

  it('design', () => {
    browser.waitForVisible('.UL.ul-sp.ul-w-gallery-form .ul-sp-switcher.ul-w-currentView:nth-of-type(3) .ul-radio');
    browser.click('.UL.ul-sp.ul-w-gallery-form .ul-sp-switcher.ul-w-currentView:nth-of-type(3) .ul-radio');
    expect(browser.isVisible('div [data-view="collage"]'), 'не ок').to.equal(true);
    // expect(browser.isVisible('div [data-view="grid"]'), "не ок").to.equal(false);
    browser.click('.UL.ul-sp.ul-w-gallery-form .ul-sp-switcher.ul-w-currentView:nth-of-type(4) .ul-radio');// nth-child фик работает
    expect(browser.isVisible('div [data-view="slideshow"]'), 'не ок').to.equal(true);
    // expect(browser.isVisible('div [data-view="collage"]'), "не ок").to.equal(false);
    browser.click('.UL.ul-sp.ul-w-gallery-form .ul-sp-switcher.ul-w-currentView:nth-of-type(2) .ul-radio');
    expect(browser.isVisible('div [data-view="grid"]'), 'не ок').to.equal(true);
    // expect(browser.isVisible('div [data-view="slideshow"]'), "не ок").to.equal(false);
  });

  it('columns number', () => {
    browser.moveToObject('div[data-ul-remote-fold="gallery_view_grid"] .ul-range__element__line__clickable', 40, 12);
    browser.waitForVisible('.ul-w-gallery-grid-wrap .row:first-child .col-md-4:nth-child(1)');

    browser.leftClick('div[data-ul-remote-fold="gallery_view_grid"] .ul-range__element__line__clickable.js-input-range__clickable', 10, 2);
    expect(browser.isVisible('.ul-w-gallery-grid-wrap .row:first-child .col-md-12.col-sm-12'), 'не ок').to.equal(true);

    browser.leftClick('div[data-ul-remote-fold="gallery_view_grid"] .ul-range__element__line__clickable.js-input-range__clickable', 50, 2);
    expect(browser.isVisible('.ul-w-gallery-grid-wrap .row:first-child .col-md-6:nth-child(1)'), 'не ок').to.equal(true);

    browser.leftClick('div[data-ul-remote-fold="gallery_view_grid"] .ul-range__element__line__clickable.js-input-range__clickable', 130, 2);
    expect(browser.isVisible('.ul-w-gallery-grid-wrap .row:first-child .col-md-3:nth-child(1)'), 'не ок').to.equal(true);

    browser.leftClick('div[data-ul-remote-fold="gallery_view_grid"] .ul-range__element__line__clickable.js-input-range__clickable', 180, 2);
    expect(browser.isVisible('.ul-w-gallery-grid-wrap .row:first-child .col-md-2:nth-child(1)'), 'не ок').to.equal(true);

    browser.leftClick('div[data-ul-remote-fold="gallery_view_grid"] .ul-range__element__line__clickable.js-input-range__clickable', 220, 2);
    expect(browser.isVisible('.ul-w-gallery-grid-wrap .row:first-child .col-md-1:nth-child(1)'), 'не ок').to.equal(true);

    browser.leftClick('div[data-ul-remote-fold="gallery_view_grid"] .ul-range__element__line__clickable.js-input-range__clickable', 90, 2);
    expect(browser.isVisible('.ul-w-gallery-grid-wrap .row:first-child .col-md-4:nth-child(1)'), 'не ок').to.equal(true);
  });

  it('to enlarge clicking', () => {
    // Увеличение фото по клику
    browser.moveToObject('.ul-remote-fold[data-ul-remote-fold="gallery_view_grid"] .ul-sp-switcher:nth-of-type(3) .ul-checkbox-switch');
    browser.click('.ul-remote-fold[data-ul-remote-fold="gallery_view_grid"] .ul-sp-switcher:nth-of-type(2) .ul-checkbox-switch');
    // expect(browser.isVisible(`#ul-id-1402-3-options[data-options*="grid"][data-options*='"imgClick":false']`), "не ок").to.equal(true);//*

    browser.click('.ul-remote-fold[data-ul-remote-fold="gallery_view_grid"] .ul-sp-switcher:nth-of-type(2) .ul-checkbox-switch');
    // expect(browser.isVisible(`#ul-id-1402-3-options[data-options*="grid"][data-options*='"imgClick":true']`), "не ок").to.equal(true);
  });

  it('caption show', () => {
    // Показывать подпись
    // browser.moveToObject('');
    browser.click('.ul-remote-fold[data-ul-remote-fold="gallery_view_grid"] .ul-sp-switcher:nth-of-type(3) .ul-checkbox-switch');

    browser.click('.ul-remote-fold[data-ul-remote-fold="gallery_view_grid"] .ul-sp-switcher:nth-of-type(3) .ul-checkbox-switch');
  });
});
// #todo 2 послед. теста проверки...
//* распарсить можно жсон - JSON.parse(document.getElementById('ul-id-1402-3-options').getAttribute('data-options'));
// и потом работать как с массивом
