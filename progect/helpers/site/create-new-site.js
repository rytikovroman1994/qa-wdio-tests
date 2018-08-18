/**
 * @memberof Helpers
 * @function createNewSite - Создаёт новый сайт на указанном шаблоне (по умолчанию - empty-cruise).
 * @param {Object} param1 - Параметры создания сайта.
 * @param {string?} [param1.templateName='empty-cruise'] - Имя шаблона.
 * @returns {string} - URL сайта.
 * @example
 *  const siteUrl = createNewSite();
 *  const siteUrl = createNewSite({ templateName: 'music' });
 */
export default function createNewSite({ templateName = 'empty-cruise' } = {}) {
  // переходим в neowizard
  browser.logger.command('createNewSite', 'переходим в визард');
  browser.url('/neowizard#templates/all');

  // Если мы были в конструкторе, то всплывёт алерт, предлагающий не закрывать страницу
  try {
    browser.alertAccept();
  } catch (err) { }

  browser.waitForExist('.w-tmpls .w-tmpl:first-child');

  // выбираем шаблон
  browser.logger.command('createNewSite', 'ищем шаблон');
  browser
    .setValue('.js-search-field', templateName)
    .click('.js-search-btn')
    .waitForExist('.w-tmpls .w-tmpl:first-child');

  // так тут не совсем понятно, как проверить то, что шаблон нашёлся по нормальному
  // пока что поставлю паузу, а потом впилим нормальные селекторы в neowizard
  browser.pause(1000);
  // тут смотрим, есть ли на странице сообщение о том, что шаблон не найден
  if (browser.isVisible('.w-search-answer-title') || browser.isVisible('.w-search-answer-text.js-search-answer-links')) {
    throw new Error('Template not found in wizard');
  }

  browser
    .moveToObject('.w-tmpls-wrap.js-tmpls-wrap > div')
    .click('.w-tmpls-wrap.js-tmpls-wrap > div .js-tmpl-select');

  browser.logger.command('createNewSite', `создаём сайт на шаблоне ${templateName}`);

  // типа выбираем домен и жмём далее
  browser.click('.js-next-btn');

  browser.waitUntil(() => browser.isExisting('.js-steps-list li') || browser.getUrl().includes('constructor'));

  if (browser.isExisting('.js-steps-list li')) {
    browser.logger.command('createNewSite', 'проходим шаги конструктора');
    // переходим на последний шаг визарда
    browser.click('.js-steps-list li:last-child');
    // ждём появления надписи "Сайт готов"
    browser.waitForExist('.w-steps-site-ready');
    // нажимаем "далее"
    browser.click('.js-next-step-btn');
  }

  // ждём попадания в конструктор
  browser.waitForExist('.ul-main.js-main', 30 * 1000); // так как конструктор может грузиться адово долго, подождём побольше

  const siteUrl = browser.execute(() => window.cache.site).value;

  return siteUrl;
}
