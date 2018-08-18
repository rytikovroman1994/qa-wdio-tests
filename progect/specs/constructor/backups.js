/**
 * @description Тест создания, востановления и удаления бэкапа.
 * @todo Сделать нормальную проверку содержимого сайта после восстанавления из бэкапа и в preview.
 * @todo Техдолг UKIT-7973
 * @type {Testcase}
 * @member backups
 * @memberof Spec
*/
describe('Constructor - backups - create', () => {
  before(() => {
    browser.helpers.signUp();
    browser.helpers.createNewSite({ templateName: 'cruise' });

    // TODO: не забыть снести после добавления этого ожидания в createNewSite
    browser.waitUntil(() => !browser.isVisible('.ul-loader-wrap'), 30 * 1000);
    // охуеваем от клиентского кода (ждём скрытия лоадера)
    browser.waitUntil(() => $$('.ul-left-menu.ul-loader').length === 0);
  });

  it('open backup panel', () => {
    browser.debug();
    browser.waitForVisible('.ul-main-menu .js-panel-action[data-panel="panelBackups"]');

    browser.click('.ul-main-menu .js-panel-action[data-panel="panelBackups"]');
    browser.waitForVisible('.js-historyPanel-backups-add');
  });

  it('check backup added to list', () => {
    // запоминаем текущее кол-во бэкапов
    const { length: backupCount } = $$('.ul-backup-items > div');

    // нажимаем кнопку создать бэкап и ждём 2 минуты
    browser.click('.js-historyPanel-backups-add');
    browser.waitForExist('.ul-notify__msg', 2 * 60 * 1000);

    // кол-во бэкапов должно увеличиться на один
    expect($$('.ul-backup-items > div').length).to.be.equal(backupCount + 1);
  });

  it('watch preview', () => {
    // восстанавливаем последний бэкап, так как в before мы только что создали сайт и бэкапов тут нет
    browser.click('.ul-backup-item[data-type="user"]');
    browser.waitForVisible('#ul-history-backup');
  });

  it('restore backup', () => {
    browser.click('#js-history-backup-restore-btn');
    browser.waitForVisible('#body-fict', 60000);
    browser.waitUntil(() => browser.isVisible('js-history-backup-controls') === false, 10000, 'Панель востановления не пропала');
  });

  it('backup removal', () => {
    // открываем список бэкапов
    browser.click('.ul-main-menu .js-panel-action[data-panel="panelBackups"]');
    browser.waitForVisible('.js-historyPanel-backups-add');

    // запоминаем текущее кол-во бэкапов
    const { length: backupCount } = $$('.ul-backup-items > div');

    // наводим курсор на бэкап
    browser.moveToObject('.ul-backup-item[data-type="user"]');
    // нажимаем на шестерёнку
    browser.click('.ul-backup-items .ul-backup-item .js-backup-icon-settings');
    // нажимаем кнопку "удалить"
    browser.click('.js-remove-backup');
    // ожидаем появления всплывающего уведомления
    browser.waitForVisible('.ul-confirm-dialog');
    // подтверждаем удаление
    browser.click('.js-confirm[role="ok"]');
    // ждём обновления списка бэкапов
    // кол-во бэкапов должно уменьшиться на один
    browser.waitUntil(() => expect($$('.ul-backup-items > div').length).to.be.equal(backupCount - 1) === true, 3000, 'Количество блоков не уменьшилось');
  });
});
