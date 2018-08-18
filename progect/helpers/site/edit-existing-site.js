export default function editExistingSite() {
  browser.logger.command('editExistingSite', 'переходим в редактирование существующего сайта');

  browser.waitForVisible('.js-edit');

  browser.click('.js-edit');

  browser.waitForVisible('#body');
}
