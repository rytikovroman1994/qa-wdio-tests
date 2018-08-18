/**
 * @memberof Helpers
 * @function sitePublish - Публикация сайта из dashboard.
 * @todo Добавить адекватное описание.
 * @example
 *  Добавить пример использования.
 */
export default function sitePublish() {
  browser.click('span.ul-site-publish');
  browser.waitForExist('.ul-nice-modal__dialog__content');
  browser.waitForVisible('a.ul-button-link-blue');
  browser.pause(5000);
  browser.click('a.ul-button-link-blue');
  browser.pause(5000);

  // что это и зачем?
  /* browser.windowHandles(function(result) {
  var handle = result.value[1];
    browser.switchTab(handle);
  });
  browser.pause (5000); */
}
