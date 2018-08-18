/**
 * @memberof Helpers
 * @function getChromeMemory - извлекаем объем захваченной памяти в chrome
 * @example
 *  const memoryUsage = getChromeMemory();
 */
export default function getChromeMemory() {
  return browser.execute(() => window.performance.memory);
}
