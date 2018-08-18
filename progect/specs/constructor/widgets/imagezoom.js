/**
 * @description Тест функционала виджета imagezoom
 * @todo Починить тест - сейчас не работает image changing, crop, seo и action (см. it.skip ниже).
 * @todo Исправить селекторы
 * @todo Исправить описания it'ов
 * @todo Исправить expect'ы
 * @todo BFR
 * @type {Testcase}
 * @member widget-imagezoom
 * @memberof Spec
*/
describe.skip('Constructor - widget - imagezoom', () => {
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite({ templateName: 'empty-cruise' });
    // ждём исчезновения лоадера
    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
  });

  it('drag&drop imagezoom', () => {
    browser.moveToObject('.ul-elements-group__list.clearfix.js-foldable__sliding > li[data-widget="imagezoom"]', 10, 10);
    browser.buttonDown(0);
    browser.moveToObject('#ul-content', 200, 200);
    browser.buttonUp(0);
    browser.pause(3000);
    // browser.dragAndDrop(); //хреново работает, оставил так...эта команда не принимает offset x,y...
    browser.waitForVisible('.container.js-block-container div[data-widget="imagezoom"]');
    expect(browser.isVisible('.container.js-block-container div[data-widget="imagezoom"]'), 'не ок').to.equal(true);
    expect(browser.isVisible('#ul-content img[data-lightbox*="widgetDefaults"]'), 'не ок').to.equal(true);
  });

  // иногда проходит, иногда фэйлится из-за того, что кнопка загрузки не кликабельная
  // skip'нул до лучших времён
  it.skip('image changing', () => {
    // кликаем на image, проверяем настройки, заменяем изображение из фотобанка,
    // проверяем, что дефолтное изображение сменилось на аплоудное
    browser.waitForVisible('#ul-content img');
    browser.leftClick('#ul-content img', 200, 200);
    browser.waitForVisible('.UL.ul-sp.ul-w-imagezoom-form');
    browser.waitForVisible('.ul-button-link.w-100p.ul-uploader-lib.js-uploader-lib');
    browser.click('.ul-button-link.w-100p.ul-uploader-lib.js-uploader-lib');
    browser.waitForVisible('.ul-imagelib-content.UL');
    browser.waitForVisible('.ul-tabs.js-imagelib-nav>li:nth-child(2)'); // можно (3), но на 19 нет картинок
    browser.click('.ul-tabs.js-imagelib-nav>li:nth-child(2)'); // можно (3), но на 19 нет картинок
    browser.click('ul.clearfix li:nth-child(10) .ul-imagelib-img:nth-child(1)');
    browser.click('.ul-imagelib-done.ul-button');
    browser.pause(2000);
    browser.click('#ul-panelDialog .ul-back-btn.js-back-click');
    browser.pause(5000);// от пауз не везде получается отойти, т.к. неравномерно отрабатывают скрипты и т.д.
    browser.waitForVisible('.container.js-block-container div[data-widget="imagezoom"]');
    expect(browser.isVisible('#ul-content img[data-lightbox*="widgetDefaults"]'), 'не ок').to.equal(false);
    expect(browser.isVisible('#ul-content img[data-lightbox*="uploads"]'), 'не ок').to.equal(true);
  });

  it.skip('crop', () => {
    browser.leftClick('#ul-content img', 200, 200);
    browser.waitForVisible('.ul-crop-buttons');
    browser.waitForVisible('.ul-crop-zoom.UL');
    // тут всё ломается, так как кнопку перекрывает ul-widget-edit-tt__overlay
    browser.click('.button.cut.icon-content-large-crop.js-action.js-cut');
    browser.waitForVisible('.ul-imagecrop-content');
    browser.moveToObject('.cropper-point.point-nw');
    browser.buttonDown(0);
    browser.moveToObject('.cropper-face', 150, 150);
    browser.buttonUp(0);
    browser.pause(2000);
    browser.click('.js-imagecrop-done');
    browser.waitForVisible('.ul-usercrop.cropping>img');
    browser.pause(1000);
  });

  it.skip('@todo text addition');

  it.skip('SEO settings', () => {
    browser.click('.button.caption.icon-content-large-text.js-action.js-title');
    expect(browser.isVisible('.ul-popup-container.ui-draggable.ui-draggable-handle.ul-popup-small.ul-popup-no-save'), 'не ок').to.equal(true);
    browser.click('.button.seo.icon-content-large-cog-small.js-action.js-seo');
    expect(browser.isVisible('.ul-popup-container.ui-draggable.ui-draggable-handle.ul-popup-small.ul-popup-no-save'), 'не ок').to.equal(true);
    browser.click('.button.seo.icon-content-large-cog-small.js-action.js-seo');
  });

  it.skip('on-click action', () => {
    // "Действие по клику" в левом меню (сделано для Chrome, в FF разбежности в html)
    browser.waitForVisible('#ul-panelDialog .ul-radio');
    browser.waitForVisible('.ul-w-wrap.ul-w-imagezoom-type-none');
    browser.click('#ul-panelDialog .ul-radio input[value="lightbox"]');
    browser.waitForVisible('.ul-w-wrap.ul-w-imagezoom-type-lightbox');
    browser.click('#ul-panelDialog .ul-radio input[value="link"]');
    browser.waitForVisible('.ul-w-wrap.ul-w-imagezoom-type-link');
    browser.click('#ul-panelDialog .ul-radio input[value=""]');
    browser.waitForVisible('.ul-w-wrap.ul-w-imagezoom-type-none');
  });
});

