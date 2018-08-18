/**
 * @description Проверяем поведение визарда при выборе категории шаблона.
 * @type {Testcase}
 * @member wizard-template-category
 * @memberof Spec
*/
describe('Wizard - Template category', () => {
  before(() => {
    browser.helpers.signUp();
  });

  it('Select random template category', () => {
    browser.helpers.wizardSelectRandomCategory();
  });

  it('Is templates exist', () => {
    // проверяем, есть ли шаблоны в списке
    const selector = '#wizard-main-container .w-region-templates .w-tmpls-wrap .w-tmpl';
    browser.waitForExist(selector);
    browser.waitForVisible(selector);
  });
});
