/**
 * @param {string} path - Имя поля объекта window.
 * @returns {any} - Содержимое, полученное из окна браузера.
 * @example
 *   browser.execute(() => window['myPath'] = { foo: 'bar' });
 *   browser.helpers.getWindowData('myPath') // { foo: 'bar' }
 */
export default function getWindowData(path) {
  return JSON.parse(browser.execute(path => JSON.stringify(window[path]), path).value); // eslint-disable-line no-shadow
}
