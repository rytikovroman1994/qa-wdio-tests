import faker from 'faker';

/**
 * @description Проверяем поведение визарда в шаге ввода домена.
 * @type {Testcase}
 * @member wizard-domain-page
 * @todo Сделать корректную проверку результата теста (переход на другой шаг визарда или в конструктор)
 * @memberof Spec
*/
describe('Wizard page domain', () => {
  before(() => {
    browser.helpers.signUp();

    // выбираем первый попавшейся шаблон (по идее cruise)
    browser
      .moveToObject('.w-tmpls-wrap.js-tmpls-wrap > div')
      .click('.w-tmpls-wrap.js-tmpls-wrap > div .js-tmpl-select');
  });

  it('wait for domain wizard step', () => {
    browser.waitForExist('.w-next-step > .js-next-btn');
  });

  it('click on input', () => {
    const clickSelector = '.w-domain-editable.w-domain-name.text.js-w-domain-editable';
    browser.waitForVisible(clickSelector);
    browser.click(clickSelector);
  });

  it('write domain name in input', () => {
    const domainNameInputSelector = '.js-domain-name';
    browser.waitForExist(domainNameInputSelector);
    browser.setValue(domainNameInputSelector, faker.random.alphaNumeric(12));
    // ждём появления галочки в поле ввода (типа домен валиден)
    browser.waitForVisible('.ul-tf-message-wrap');
  });

  it('click button "continue"', () => {
    browser.click('.ul-button.js-next-btn');
  });

  it('expect test result', () => {
    // ждём перехода на следующий шаг визарда (типа они всегда есть, ага)
    browser.waitForVisible('.w-form__fields.wizard-steps-flow__content');
  });
});

