/* eslint-disable consistent-return */

const widgetsList = [
  'header',
  'wysiwyg',
  'imagezoom',
  'gallery',
  'sliderWysiwyg',
  'button',
  'icon',
  'border',
  'spacer',
  'goods',
  'price',
  'table',
  'review',
  'stages',
  'timeline',
  'bloquote',
  'timer',
  'yandexSearch',
  'googlesearch',
  'newsInformer',
  'ecwid',
  'weather',
  'downloadFile',
  'video',
  'contacts',
  'feedBack',
  'maps',
  'mailchimp',
  'social',
  'facebookLikeBox',
  'twitterLikeBox',
  'instagram',
  'pinterest',
  'socialGroups',
  'odnoklassnikiLikeBox',
];

// Специальный список виджетов, которые не дропаются и не тестируются, по указанной причине
const skipWidgetsList = [
  'customHtml', // решили не тестировать
  'productCard', // магазин добавим позже
  'addThisShareBar', // ошибка на дропе, хотя на холсте появляется
  'ucalc', // нужно подключать для проверки
  'audio', // надо подключать
  'backCall', // нужно подключать
  'liveChat', // нужно подключать
  'jivosite', // нужно подключать
  'uSocial', // не находит в поиске
];

/**
 * @description Тест на дроп всех виджетов на холст
 * @todo Придумать нормальные проверки виджета на опубликованном сайте
 * @type {Testcase}
 * @member drop-all-widgets
 * @memberof Spec
*/
describe('Constructor - widgets - drop-all', () => {
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite({ templateName: 'empty-cruise' });
    // ждём исчезновения лоадера
    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
  });

  skipWidgetsList.forEach((widget) => {
    it.skip(`skip widget ${widget}`, () => { });
  });

  widgetsList.forEach((widget) => {
    it(`drag and drop widget ${widget}`, () => {
      browser.helpers.dropWidget(`${widget}`);
    });
  });

  it('publish site', () => {
    // подождём на всякий случай пока данные по history просасываются
    browser.pause(2000);
    browser.helpers.sitePublish();
    browser.switchTab(browser.windowHandles().value.pop());
  });

  widgetsList.forEach((widget) => {
    it(`check the widget ${widget} presence on published site`, () => {
      // Арестович - редиска 👺
      // Такой селектор нужен что бы выбрать все виджета, старые, реакта и нового реакта
      const selector = [
        `.container.js-block-container [data-widget="${widget}"]`,
        `.container.js-block-container [widget-type="${widget}"]`,
        `.container.js-block-container [type="${widget}"]`,
      ].join(',');

      expect(selector).to.be.there();
    });
  });
});
