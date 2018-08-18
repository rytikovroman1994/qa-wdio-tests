
import faker from 'faker';

/**
 * @description Тест шагов визарда
 * @todo Избавится от долбанных пауз на 10 секунд!!! 10, Карл! 😱
 * @todo Исправить селекторы
 * @todo Исправить описания it'ов
 * @todo Исправить expect'ы
 * @todo Исправить поиск шаблона нужной категории
 * @todo BFR
 * @type {Testcase}
 * @member wizard-steps
 * @memberof Spec
*/
describe('Wizard - steps', () => {
  before(() => {
    browser.helpers.signUp();

    const categoriesList = [
      'Авто',
      'Ведущий',
      'Бытовая техника',
      'Архитектура и дизайн',
      'Выставочная площадка',
      'Грузоперевозки',
      'Дизайн',
      'Животные',
      'ИТ-услуги',
      'Кафе и рестораны',
    ];

    const searchText = faker.random.arrayElement(categoriesList);
    browser.helpers.wizardTemplateSearch(searchText);

    browser
      .moveToObject('.w-tmpls-wrap.js-tmpls-wrap > div')
      .click('.w-tmpls-wrap.js-tmpls-wrap > div .js-tmpl-select');

    // Пропускаем шаг домена
    browser.click('.ul-button.js-next-btn');
  });

  // Первый шаг визарда
  it('entering company name', () => {
    const clickSelector = 'input.ul-tf-input';
    browser.waitForVisible(clickSelector);
    browser.pause(10000);
    // Очищаем поле от дефолтного поля.
    browser.clearElement(clickSelector);
    browser.setValue(clickSelector, faker.random.alphaNumeric(12));
  });

  // Кликает на кнопку далее.
  it('ckick button further', () => {
    browser.click('button.ul-button.js-next-step-btn');
    browser.pause(3000);
  });

  // Следующая страница визарда - Контакты
  // переделать таймауты
  it('Contacts Page', () => {
    browser.waitForExist('.w-form__fields.wizard-steps-flow__content');
    browser.waitForVisible('span.ul-tf-input-wrap > .ul-tf-input');

    // Это кнопка "Добавить ещё контакт"?
    browser.waitForVisible('.ul-select-button > select > option:nth-child(1)');
    browser.waitForExist('.ul-button.js-next-step-btn');

    // Зачем на неё кликать и ничего не проверять?
    browser.click('.ul-select-button > select > option:nth-child(1)');
    browser.pause(3000);

    browser.pause(3000);
    browser.clearElement('.ul-tf-fields-group-wrap:nth-child(1) input.ul-tf-input');
    browser.pause(3000);

    browser.clearElement('.ul-tf-fields-group-wrap:nth-child(2) .ul-tf-field--with-icon:nth-child(1) input.ul-tf-input');
    browser.pause(3000);

    browser.clearElement('.ul-tf-fields-group-wrap:nth-child(2) .ul-tf-field--with-icon:nth-child(2) input.ul-tf-input');
    browser.pause(3000);

    browser.clearElement('.ul-tf-fields-group-wrap:nth-child(2) .ul-tf-field--with-icon:nth-child(3) input.ul-tf-input');
    browser.pause(3000);

    browser.click('.ul-button.js-next-step-btn');
    browser.pause(3000);

    browser.waitForExist('body');
    browser.pause(3000);
  });

  // Следующая страница визарда - Социалки
  // переделать таймауты
  it('Social Page', () => {
    browser.waitForExist('.w-form__fields.wizard-steps-flow__content');

    browser.clearElement('.ul-tf-fields-group-wrap:nth-child(2) .ul-tf-field--with-icon:nth-child(1) input.ul-tf-input');
    browser.pause(3000);

    browser.clearElement('.ul-tf-fields-group-wrap:nth-child(2) .ul-tf-field--with-icon:nth-child(2) input.ul-tf-input');
    browser.pause(3000);

    browser.clearElement('.ul-tf-fields-group-wrap:nth-child(2) .ul-tf-field--with-icon:nth-child(3) input.ul-tf-input');
    browser.pause(3000);

    browser.click('.ul-button.js-next-step-btn');
    browser.pause(5000);

    browser.waitForExist('body');
    // Следует сделать проверку по урл страницы browser.assert.urlContains('/pages/id/index/constructor');
    browser.waitForVisible('#ul-left-menu');
    browser.waitForVisible('#ul-main');
    browser.pause(5000);
  });
});

