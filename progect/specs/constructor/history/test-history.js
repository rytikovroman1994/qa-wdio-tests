/**
 * @description Тест удвления и востановления по хистори.
 * @type {Testcase}
 * @member testHistory
 * @memberof Spec
*/
describe('Constructor - History', () => {
  // запоминаем количество виджетов на страинце
  const getWidgetsId = () => $$('.ul-widget').map(i => i.getAttribute('id'));
  let initialWidgetsIds;

  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite();
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
    browser.waitUntil(() => $$('.ul-left-menu.ul-loader').length === 0);
    initialWidgetsIds = getWidgetsId();
  });

  it('widgets on the page', () => {
    // добавляем два новых виджета
    browser.helpers.dropWidget('imagezoom');
    browser.helpers.dropWidget('imagezoom');

    // снова считаем количество виджетов
    const currentWidgetsIds = getWidgetsId();
    // проверяем, что виджетов стало на 2 больше
    expect(currentWidgetsIds.length).to.equal(initialWidgetsIds.length + 2);
  });
  // откатываем по хистори
  it('roll back the history and check the number of widgets', () => {
    browser.helpers.historyUndo();
    // проверяем что виджетов стало на один меньше
    const currentWidgetsIds = getWidgetsId();
    expect(currentWidgetsIds.length).to.equal(initialWidgetsIds.length + 1);
  });

  // возвращаем виджеты по хистори
  it('Return the history and check the number of widgets', () => {
    browser.helpers.historyRedo();
    // проверяем что виджетов стало на два больше
    const currentWidgetsIds = getWidgetsId();
    expect(currentWidgetsIds.length).to.equal(initialWidgetsIds.length + 2);
  });
});

