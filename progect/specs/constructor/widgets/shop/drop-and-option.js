/**
 * @description Тест дропа и левой панели виджета магазин.
 * @type {Testcase}
 * @member dropAndLeftPanel
 * @memberof Spec
 * @todo Сделать тестовый акаунт у которого будут тарифы и админ права
 * @todo Глючит хелпер дропа виджета, иногда из-за этого падает тест
*/

import faker from 'faker';

describe('domain attachment', () => {
  before(() => {
    browser.helpers.signIn();
    browser.helpers.createNewSite();

    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
    browser.waitUntil(() => $$('.ul-left-menu.ul-loader').length === 0);
  });

  // Дроп виджета магазин на холст
  it('drop widget shop', () => {
    // дропаем виджет
    browser.helpers.dropWidget('productCard');
    // проверяем что появилась иконка корзины в левой панели
    browser.waitForVisible('.js-panel-action[data-action="shopSettings"]');
  });

  // Добавление опции виджета магазин
  it('adding a new option', () => {
    // переходим в настройки виджета магазин
    browser.moveToObject('.ul-w-productCard__title__content');
    browser.pause(1000);
    browser.click('.ul-w-productCard__title__content');
    // проверяем что открывась левая панель
    browser.waitForVisible('.js-productCard-form');
  });

  // Добавляем опцию
  it('add options', () => {
    const countOptions = () => $$('.ul-sp-sortItem-caption').length;
    // считаем сколько изначально опций
    const initionOption = countOptions();
    // нажимаем на кнопку "Добавить опцию"
    browser.click('.ul-sp-button-link .js-attribute-action');
    // ждём пока появится меню редактирования
    browser.waitForVisible('.ul-sp.ul-productCard-attribute');
    // оптимизируем немного код
    const random = faker.commerce.product();
    // вводим данные
    browser.setValue('.ul-tf[ul-model="title"]', random);
    browser.setValue('.ul-sp-sortItem-text', random);
    // закрываем окно редактирования
    browser.click('.ul-popup-close');
    // проверяем что опция стало на 1 больше
    const currentOption = countOptions();
    expect(currentOption).to.equal(initionOption + 1);
  });

  // проверка работы скрытия Описания
  it('hide description', () => {
    // Проверяем что переключатель включён
    browser.isVisible('.ul-w-productCard__description');
    // выключаем переключатель
    browser.click('.js-productCard-form .ul-fake-input');
    // проверяем что текст пропал
    browser.waitForExist('.ul-w-productCard__description', 2000, true);
  });
});
