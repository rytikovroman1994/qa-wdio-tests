const addContext = require('mochawesome/addContext');

/**
 * @description Тест на выбор нескольких шаблонов.
 * @type {Testcase}
 * @member selectTemplates
 * @memberof Spec
 * @todo Сделать тестовый акаунт у которого будут тарифы и админ права
*/

const templateList = [
  'prem-music',
  'music',
  'cruise',
  'cute-wedding',
];
const pubUrlSelector = '.js-nice-modal[data-is-visible="true"] .ul-pubwindow-url > a';

describe('selectTemplates', () => {
  before(() => {
    browser.helpers.signIn();
  });

  // выбираем 4 шаблона
  templateList.forEach((templateName) => {
    describe(`Create site on template ${templateName}`, () => {
      const ctx = {
        linkToConstructor: 'nope',
        linkToPublished: 'nope',
      };

      it('create site', () => {
        browser.helpers.createNewSite({ templateName });
      });

      it('wait for loading constructor', () => {
        // ждём исчезновения лоадера
        // TODO: не забыть снести после добавления этого ожидания в createNewSite
        browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
        // охуеваем от клиентского кода (ждём скрытия лоадера)
        browser.waitUntil(() => $$('.ul-left-menu.ul-loader').length === 0);
      });

      it('grub constructor url', () => {
        ctx.linkToConstructor = browser.getUrl();
      });

      it('publish site', () => {
        // TODO: выпилить после рефакторинга publish хэлпера
        browser.click('#ul-left-menu .ul-panel-bottom > .js-site-publish.js-panel-action');
        browser.waitForVisible(pubUrlSelector, 60 * 1000);
      });

      it('store link to published site', () => {
        ctx.linkToPublished = `http://${browser.getHTML(pubUrlSelector, false)}`;
      });

      it('Links to site', function () {
        addContext(this, ctx.linkToConstructor);
        addContext(this, ctx.linkToPublished);
      });
    });
  });
});
