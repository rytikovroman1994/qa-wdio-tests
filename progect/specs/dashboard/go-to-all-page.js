/**
 * @description Смок тест всех страниц в дажборде.
 * @type {Testcase}
 * @member dashboard-go-to-all-page.js
 * @memberof Spec
*/

describe('dashboard - go-to-all-page', () => {
  let siteUrl;
  let urlDashBoard;
  const panel = '.d-all';
  before(() => {
    browser.helpers.signUp();
    siteUrl = browser.helpers.createNewSite();
    urlDashBoard = `/sites/url/${siteUrl}/dashBoard`;
    browser.url(urlDashBoard);
  });

  // Проверяем переход на все старницы в левой панели.
  it('left panel pages', () => {
    for (let list = 1; list <= $('.d-leftmenu__list').$$('li').length; list += 1) {
      browser.click(`.d-leftmenu__list > li:nth-child(${list})`);
      browser.waitForExist(panel);
      browser.url(urlDashBoard);
      // Будет падать пока не уберут лишний а.
    }
  });

  // Проверка перехода на все страницы в инструментах.
  it('instruments pages', () => {
    for (let instruments = 1; instruments < 4; instruments += 1) {
      browser.click(`.d-page-tools li:nth-child(${instruments})`);
      browser.waitForExist(panel);
      browser.url(urlDashBoard);
    }
  });

  // Проверка перехода на все страницы в виджетах сайта.
  it('site widgets pages', () => {
    for (let widgets = 1; widgets < 5; widgets += 1) {
      browser.click(`.d-page-tools2 li:nth-child(${widgets})`);
      browser.waitForExist(panel);
      browser.url(urlDashBoard);
    }
  });

  // Проверка перехода в профиль пользователя.
  it('profile', () => {
    browser.click('.d-user .d-user__name');
    browser.waitForExist(panel);
  });
});
