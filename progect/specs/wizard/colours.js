
/**
 * @description Тест функционала поиска шаблонов по цветам
 * @todo Исправить селекторы
 * @todo Исправить описания it'ов и разбиение на них
 * @todo Исправить expect'ы
 * @todo BFR
 * @type {Testcase}
 * @member wizard-сolors
 * @memberof Spec
*/
describe('Wizard - select by сolors', () => {
  before(() => {
    browser.helpers.signUp();
  });

  it('colors', () => {
    browser.waitForExist('.w-subjects-list-main');
    browser.waitForExist('.w-tmpls-wrap.js-tmpls-wrap');

    browser.waitForExist('div.ul-colors-choose.js-color-filter-items');

    const div = 'div.ul-colors-choose.js-color-filter-items';
    const label = 'label.w-tmpl-color:nth-child';

    let lab;
    for (lab = 2; lab < 9; lab += 1) {
      browser.click(`${div} > ${label}(${lab})`);
      browser.waitForExist('div.w-tmpls-wrap.js-tmpls-wrap');
    }

    browser.waitForExist('.w-tmpls-filters');

    browser.click('div.ul-buttons-group.w-tmpls-color-switcher > label:nth-child(3)');

    browser.waitForExist('div.w-tmpls-wrap.js-tmpls-wrap');

    browser.click('div.ul-buttons-group.w-tmpls-color-switcher > label:nth-child(4)');

    browser.waitForExist('div.w-tmpls-wrap.js-tmpls-wrap');

    browser.click('div.ul-buttons-group.w-tmpls-color-switcher > label:nth-child(1)');

    browser.waitForExist('div.w-tmpls-wrap.js-tmpls-wrap');
  });
});
