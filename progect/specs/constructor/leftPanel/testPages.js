/**
 * @description Тест создания, удаления, дублирования страниц сайта.
 * @todo Дописать тест, когда допишут хелперы.
 * @type {Testcase}
 * @member testPages
 * @memberof Spec
*/
describe('testPages', () => {
  const getPagesId = () => $$('.js-general .js-page ').map(i => i.getAttribute('id'));

  // начальное чисто страниц
  let initialPages;
  // текущие число страниц
  let currentPages;
  // ид созданной страницы
  let pageId;
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite();
    // ждём исчезновения лоадера
    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
  });

  it('open page pages', () => {
    // открываем панель со страницами
    browser.helpers.openPanel({ name: 'panelPages' });
    // считаем количество страниц
    initialPages = getPagesId();
  });

  it('create new page', () => {
    // создаём новую страницу
    pageId = browser.helpers.createNewPage();
    // проверяем что повилась новая страница
    currentPages = getPagesId();
    expect(currentPages.length).to.equal(initialPages.length + 1);
  });

  it('delete page', () => {
    // удаляем одну страницу
    browser.helpers.removePage(pageId);
    // проверяем что страница удалилась
    currentPages = getPagesId();
    expect(currentPages.length).to.equal(initialPages.length);
  });
});
