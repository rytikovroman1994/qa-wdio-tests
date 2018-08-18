/**
 * @description Проверяем работоспособность страницы профиля.
 * @type {Testcase}
 * @member profile
 * @memberof Spec
*/
describe('Profile', () => {
  let singUpData;
  // получаем логин пользователя
  let login;
  // получаем id сайта
  let siteUrl;
  before(() => {
    singUpData = browser.helpers.signUp();
    siteUrl = browser.helpers.createNewSite();
    // переходим на страницу профиля
    browser.url(`/sites/url/${siteUrl}/dashBoard/profile`);
    // получаем строку логина пользователя
    login = browser.getText('.d-user__name');
  });

  // проверяем что совпадает логин
  it('check login', () => {
    expect(browser.getValue('input[name="username"]')).to.equal(login);
  });

  // проверяем что совпадает мыло
  it('check email', () => {
    // пришлось привести к одному реестру
    expect(browser.getValue('input[name="email"]')).to.equal(singUpData.email.toLowerCase());
  });
});
