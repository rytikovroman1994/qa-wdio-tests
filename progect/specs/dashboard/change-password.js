import faker from 'faker';
/**
 * @description Проверяем смену пароля.
 * @type {Testcase}
 * @member changePassword
 * @memberof Spec
*/
describe('check password change', () => {
  // получаем id сайта
  let siteUrl;
  // получаем мыло и пароль
  let singUpData;
  // новый пароль
  let newPassword;
  before(() => {
    singUpData = browser.helpers.signUp();
    siteUrl = browser.helpers.createNewSite();
    // переходим на страницу профиля
    browser.url(`/sites/url/${siteUrl}/dashBoard/profile`);
  });

  // изменяем пароль
  it('change password', () => {
    // кликаем на карандаш
    browser.click('.js-user-has-password .d-settings-field-edit');
    // ждём пока появится поле ввода
    browser.waitForVisible('.js-settings-field-wrap input[type="password"]');
    // вводим пароль, который использовали при регестрации сайта
    browser.setValue('.js-settings-field-wrap input[name="oldPassword"]', singUpData.password);
    // вводим новый пароль
    newPassword = faker.internet.password();
    browser.setValue('.js-user-has-password input[type="password"]', newPassword);
    // кликаем куда нибудь, чтобы новый пароль сохранился
    browser.click('.js-settings-field[name="username"]');
  });

  // выходим из акаунта
  it('sign out', () => {
    browser.helpers.signOut();
    browser.waitForExist('#main-screen');
  });

  // логинемся под новым паролем и проверяем что перешли в дашборд
  it('logIn', () => {
    browser.click('.login');
    // вводим логин и пароль в хелпер
    browser.helpers.signIn(singUpData.email, newPassword);
    // проверяем что перешли в дашборд
    expect(browser.getUrl()).to.equal(`https://ulight19.uid.me/sites/url/${siteUrl}/dashBoard`);
  });
});
