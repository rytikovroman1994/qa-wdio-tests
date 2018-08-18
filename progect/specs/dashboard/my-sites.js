/**
 * @description Тест работы раздела мои сайты.
 * @type {Testcase}
 * @member mySites
 * @memberof Spec
 * @todo Подувать как изавиться от пауз.
*/
describe('mySites', () => {
  const countSites = () => $$('.ms-site-board.js-publish-overlay').length;
  // id сайта созданного при регестрации
  let siteId;
  // id сайта созданного при тесте
  let siteIdTwo;
  // начальное число сайтов
  let initialSites;
  // текущее число сайтов
  let currentSites;
  before(() => {
    browser.helpers.signUp();
    siteId = browser.helpers.createNewSite();
  });

  // проверяем что перешли на нужную страницу
  it('go to my sites', () => {
    // переходим на мои сайты
    browser.url(`/sites/url/${siteId}/dashBoard/mysites`);
    // проверяем что перешли на нужную страницу
    browser.waitForVisible('.js-site-view-container');
  });

  // создать новый сайт
  it('create new site', () => {
    // считаем колво сайтов
    initialSites = countSites();
    // создаём новый сайт
    siteIdTwo = browser.helpers.createNewSite();
    browser.url(`/sites/url/${siteIdTwo}/dashBoard/mysites`);
  });

  // проверяем что кол-во сайтов изменилось
  it('number of sites after creations', () => {
    // считаем сколько стало сайтов
    currentSites = countSites();
    expect(currentSites).to.equal(initialSites + 1);
  });
  it('delete site', () => {
    // удаляем сайт
    browser.click(`.ms-sites-board-button-delete[data-url="${siteIdTwo}"]`);
    // ждём появления всплывающего окна
    browser.waitForExist('.ul-confirm-dialog');
    // ждём появления кнопки
    browser.waitForVisible('.js-confirm[role="ok"]');
    // нажимает кнопку "Удалить"
    browser.click('.js-confirm[role="ok"]');
    // ждём пока пропадёт удалённый сайт
    browser.pause(2000);
  });

  // проверяем, что кол-во сайтов изменилось
  it('number of sites after removal', () => {
    currentSites = countSites();
    expect(currentSites).to.equal(initialSites);
  });

  // переходим в редактор сайта
  it('edit site', () => {
    // кликаем по кнопке "Редактировать"
    browser.click(`a[href="/sites/url/${siteId}/pages/id/index/constructor"]`);
    // проверяем что перешли именно туда
    browser.waitUntil(
      () => browser.getUrl() === `https://ulight19.uid.me/sites/url/${siteId}/pages/id/index/constructor`,
      500, 'Не перешёл на ожидаемую страницу',
    );
  });
});
