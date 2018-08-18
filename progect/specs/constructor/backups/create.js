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
    browser.waitForVisible('.ul-main-menu .js-panel-action[data-panel="panelBackups"]');

    browser
      .click('.ul-main-menu .js-panel-action[data-panel="panelBackups"]')
      .waitForVisible('.js-historyPanel-backups-add');
  });

  it('check backup added to list', () => {
    // запоминаем текущее кол-во бэкапов
    const { length: backupCount } = $$('.ul-backup-items > div');

    // нажимаем кнопку создать бэкап и ждём 2 минуты
    browser
      .click('.js-historyPanel-backups-add')
      .waitForExist('.ul-notify__msg', 2 * 60 * 1000);

    // кол-во бэкапов должно увеличиться на один
    expect($$('.ul-backup-items > div').length).to.be.equal(backupCount + 1);
  });
});
