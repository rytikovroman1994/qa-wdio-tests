import { randomEmail, randomString } from '../../get-random';

/**
 * @memberof Helpers
 * @function signUp - Регистрирует нового пользователя с рандомным логином и паролем и переходит в визард.
 * @returns {{email: string, password: string}} - Возвращает данные созданного пользователя.
 * @example
 *   const { email, password } = browser.helpers.signUp();
 */
export default function signUp() {
  browser
    .url('/#signUp')
    .waitForVisible('#sign_up_email');

  const email = randomEmail();
  const password = randomString(16);

  browser
    .setValue('#sign_up_email', email)
    .setValue('#sign_up_password', password);

  browser.click('#sign_up_btn');

  // ждём попадания в визард, а так как это наш визард, то ждём долго
  browser.waitForVisible('.w-tmpls .w-tmpl', 30 * 1000);

  return { email, password };
}
