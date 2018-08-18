import faker from 'faker';

/**
 * @description Проверяем работоспособность страницы обратной связи.
 * @type {Testcase}
 * @member dashboard-feedback
 * @memberof Spec
*/
describe('Dashboard - feedback', () => {
  before(() => {
    browser.helpers.signUp();
    const siteUrl = browser.helpers.createNewSite();
    browser.url(`/sites/url/${siteUrl}/dashBoard/help#help`);
  });

  it('fill feedback form fields', () => {
    browser.waitForExist('#js-contactForm');
    // Не заполняем поля ввода "Имя" и Email, отправляем с дефолтными.
    // Заполняем поле радномными 5 словами.
    browser.setValue('#js-contactForm input[name="subject"]', faker.lorem.words(5));
    browser.setValue('textarea[name="message"]', faker.lorem.words(5));
  });

  // Загружаем картинку
  it('uploads a file', () => {
    const { value: tempFilePath } = browser.uploadFile('fixtures/dashboard/feedback/sova.jpg');
    browser.chooseFile('input#contactForm-attachments', tempFilePath);
    browser.waitForText('.js-file-input-label', 'sova.jpg');
  });

  // Кликаем на кнопку отправить и проверяем всплывающее окно.
  it('click button send', () => {
    browser.click('#js-contactForm input[type="submit"]');

    const messageSelector = '.ul-notify__msg';
    browser.waitForVisible(messageSelector);

    expect(messageSelector).to.have.text('Сообщение успешно отправлено');
  });
});
