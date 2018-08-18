/**
 * @memberof Helpers
 * @function signOut - Выход из аккаунта.
 * @example
 *  helpers.signOut();
 */
export default function signOut() {
  browser.logger.command('helper::signOut', 'выполнение хэлпера signOut');
  browser.url('/sign_out');

  browser.waitUntil(() => !browser.getUrl().includes('sign_out'));
  browser.logger.command('helper::signOut', 'успешно вышли из аккаунта');
}
