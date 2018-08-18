/**
 * @description Тест функционала виджета slider
 * @todo Починить тест - сейчас не работает overlay (см. it.skip ниже).
 * @todo Исправить селекторы
 * @todo Исправить описания it'ов
 * @todo Исправить expect'ы
 * @todo BFR
 * @type {Testcase}
 * @member widget-slider
 * @memberof Spec
*/
describe.skip('Constructor - widgets - slider', () => {
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite({ templateName: 'empty-cruise' });
    // ждём исчезновения лоадера
    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
  });

  it('drop to site', () => {
    browser.moveToObject('.ul-elements-group__list.clearfix.js-foldable__sliding > li[data-widget="sliderWysiwyg"]', 10, 10);
    browser.buttonDown(0);
    browser.moveToObject('#ul-content', 200, 200);
    browser.buttonUp(0);
    browser.pause(3000);
    // browser.dragAndDrop(); //хреново работает, оставил так...эта команда не принимает offset x,y...
    browser.waitForVisible('.container.js-block-container div[data-widget="sliderWysiwyg"]');
    expect(browser.isVisible('.container.js-block-container div[data-widget="sliderWysiwyg"]'), 'не ок').to.equal(true);
  });

  it('slide changing', () => {
    // Изменяем первый дефолтный слайд на слайд из галереи
    browser.waitForVisible('#ul-content .ul-slider-wysy');
    expect(browser.isVisible('.owl-item.active .ul-image[style*="defaults"]'), 'не ок').to.equal(true);
    browser.leftClick('#ul-content .ul-slider-wysy', 200, 200);
    browser.waitForVisible('.UL.ul-sp.ul-w-sliderWysiwyg-form');
    browser.click('.ul-uploader-lib.js-uploader-lib');
    browser.waitForVisible('.ul-imagelib-content.UL');
    browser.waitForVisible('.ul-tabs.js-imagelib-nav>li:nth-child(2)'); // можно (3), но на 19 нет картинок
    browser.click('.ul-tabs.js-imagelib-nav>li:nth-child(2)'); // можно (3), но на 19 нет картинок
    browser.waitForVisible('ul.clearfix li:nth-child(10) .ul-imagelib-img:nth-child(1)');
    browser.click('ul.clearfix li:nth-child(10) .ul-imagelib-img:nth-child(1)');
    browser.waitForVisible('.ul-imagelib-done.ul-button');
    browser.click('.ul-imagelib-done.ul-button');
    browser.pause(2000);
    expect(browser.isVisible('.owl-item.active .ul-image[style*="defaults"]'), 'не ок').to.equal(false);
  });


  it('overlay', () => {
    // Вкл.-выкл. подложки
    browser.moveToObject('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(1) .ul-checkbox-switch');
    browser.click('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(1) .ul-checkbox-switch .ul-fake-input-text');

    browser.moveToObject('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(1) .ul-checkbox-switch');
    browser.click('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(1) .ul-checkbox-switch .ul-fake-input-text');
    expect(browser.isVisible('.owl-item.active .ul-slider-item-overlay'), 'не ок').to.equal(false);

    browser.click('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(1) .ul-checkbox-switch .ul-fake-input-text');
    expect(browser.isVisible('.owl-item.active .ul-slider-item-overlay'), 'не ок').to.equal(true);
    browser.pause(3000);

    browser.click('.ul-sp-switcher:nth-child(1) .icon-content-special-settings');
    browser.waitForVisible('.ul-popup-container');
  });

  it('overlay text settings', () => {
    // Изменение положения подложки (по-центру)
    browser.moveToObject('.ul-button-blueSecondary.ul-w-over-center');
    browser.click('.ul-button-blueSecondary.ul-w-over-center');
    // Изменение цвета подложки на 3й по порядку (зеленый на empty-cruise)
    browser.click('.ul-sp-colors .ul-colors li:nth-child(3)');
    // Opacity (4%)
    browser.leftClick('.ul-popup-body .ul-range__element__line__clickable.js-input-range__clickable', 10, 10);
    // Выравнивание элементов на подложке (по левому краю)
    browser.click('.ul-buttons-group.align-switcher label:nth-child(1)');
    // Закрываем pop-up
    browser.click('.UL.ul-popup-close');
    browser.pause(7000);
    // Проверки всего этого все сразу (после закрытия pop-up окна)
    expect(browser.isVisible('.ul-slider-item-overlay.ul-overlay-position-center'), 'не ок').to.equal(true);
    expect(browser.isVisible('.ul-slider-item-overlay-edit.g-theme-block-3'), 'не ок').to.equal(true);
    expect(browser.isVisible('.ul-slider-item-overlay-edit.g-theme-block-3[style*="opacity: 0.96;"]'), 'не ок').to.equal(true);
    expect(browser.isVisible('.ul-slider-item-btn[style*="text-align: left"]'), 'не ок').to.equal(true);
  });

  // #todo
  it('text on slider', () => {
    browser.moveToObject('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(2) .ul-checkbox-switch');
    browser.click('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(2) .ul-checkbox-switch .ul-fake-input-text');

    browser.moveToObject('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(2) .ul-checkbox-switch');
    browser.click('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(2) .ul-checkbox-switch .ul-fake-input-text');
    // expect(browser.isVisible('.owl-item.active .ul-slider-item-overlay'), "не ок").to.equal(false);

    // browser.click('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(2) .ul-checkbox-switch .ul-fake-input-text');
    // //expect(browser.isVisible('.owl-item.active .ul-slider-item-overlay'), "не ок").to.equal(true);
    // browser.pause(3000);
  });

  it('button, button settings', () => {
    browser.moveToObject('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(4) .ul-checkbox-switch');
    browser.click('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(4) .ul-checkbox-switch .ul-fake-input-text');

    browser.moveToObject('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(4) .ul-checkbox-switch');
    browser.click('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(4) .ul-checkbox-switch .ul-fake-input-text');
    // expect(browser.isVisible('.owl-item.active .ul-slider-item-overlay'), "не ок").to.equal(false);

    // browser.click('.ul-w-slyderWysy-slideOptions .ul-sp-switcher:nth-child(4) .ul-checkbox-switch .ul-fake-input-text');
    // //expect(browser.isVisible('.owl-item.active .ul-slider-item-overlay'), "не ок").to.equal(true);
    // browser.pause(3000);

    browser.click('.ul-sp-sub .icon-content-special-settings');
    browser.waitForVisible('.ul-popup-container');

    browser.click('.UL.ul-sp.ul-w-sliderWysiwyg-form-button .ul-sp-switcher:nth-child(3) .ul-radio');
    browser.waitForVisible('.ul-w-btn-el.ul-w-button2');

    browser.click('.UL.ul-sp.ul-w-sliderWysiwyg-form-button .ul-sp-switcher:nth-child(6) .ul-radio');
    browser.waitForVisible('.ul-w-btn-el.ul-w-button2.large');
  });

  it.skip('show arrows', () => {


  });

  it.skip('show dots', () => {


  });

  it.skip('autoscroll', () => {


  });

  it.skip('animation', () => {


  });
});

