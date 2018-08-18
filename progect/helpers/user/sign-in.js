/**
 * @memberof Helpers
 * @function signIn - Авторизуется по email'у и паролю. По дефолту email и пароль беруться из USER_EMAIL и USER_PASSWORD полей конфига.
 * @param {string?} [email=process.env.USER_EMAIL] - Email пользователя.
 * @param {string?} [password=process.env.USER_PASSWORD] - Пароль пользователя.
 * @example
 *  signIn('test@test.com', 'test'); // вход по переданным кредам
 *  signIn(); // вход по кредам из env'ов
 */
export default function signIn(email = process.env.USER_EMAIL, password = process.env.USER_PASSWORD) {
  browser.logger.command('helper::signIn', 'выполнение хэлпера signIn');
  browser.logger.command('helper::signIn', 'ожидаем загрузки страницы');
  browser.url('/#signIn');

  try {
    browser.alertAccept();
  } catch (err) {}

  browser.waitForVisible('#sign_in_email');
  browser.waitForVisible('#sign_in_password');

  browser.logger.command('helper::signIn', 'вводим email и пароль');
  browser.setValue('#sign_in_email', email);
  browser.setValue('#sign_in_password', password);
  browser.click('#sign_in_btn');

  browser.logger.command('helper::signIn', 'ожидаем ошибки или перехода на другую страницу');

  const errorMessageSelector = '#sign_in_form > div > div.ul-tf-field-wrap.field-element.error > div.node';
  // тут мы в цикле стоим и проверяем
  //   1). не появилось ли сообщение об ошибки под инпутами (типа email/пароль не верные)
  //   2). не ушли ли мы со страницы регистрации (дашборд, визард, не суть)
  browser.waitUntil(() => browser.isVisible(errorMessageSelector) || !browser.getUrl().includes('#signIn'));

  // так как возможно мы вышли из waitUntil потому что выскочила ошибка, то проверяем, нет ли её
  if (browser.isVisible(errorMessageSelector)) {
    // пичаль, прийдётся выбросить ошибку с текстом из поля (там скорей всего будет типа "Пользователь с таким email не существует")
    const text = browser.getText(errorMessageSelector);
    throw new Error(text);
  }
  browser.logger.command('helper::signIn', 'авторизация успешно выполнена');
}
