import isMatch from 'lodash.ismatch';
import randomElement from 'lodash.sample';

/**
 * @function getRandomTemplate - Выбор случайного шаблона.
 * @param {Object?} matchData - Данные, по которым будет выбираться шаблон. Если данных нет - просто берём случайный.
 * @param {string[]?} matchData.subjectIds - Категории шаблона (зачастую одна).
 * @param {string?} matchData.id - Точный ID шаблона. Не совсем понятно, зачем это использовать, ну да пофиг.
 * @param {string?} matchData.title - Заголовок шаблона.
 * @param {string[]?} matchData.tags - Тэги шаблона. ОСТОРОЖНО! Они языкозависимые!
 * @param {boolean?} matchData.isAvailableForFreePremium - IsAvailableForFreePremium.
 * @param {boolean?} matchData.isPremium - Является ли шаблон премиумным.
 * @returns {string} - Возвращает template id.
 * @example
 *  const templateId = browser.helpers.wizardGetRandomTemplate({ subjectIds: [ "music" ], isPremium: true });
 */
export default function wizardGetRandomTemplate(matchData = {}) {
  if (!browser.getUrl().includes('neowizard')) {
    throw new Error('Этот хелпер можно запускать только в neowizard\'е');
  }

  let templates = browser.helpers.wizardGetTemplatesList();

  // если надо фильтровать, а не просто брать рандомный
  if (matchData && Object.keys(matchData).length > 0) {
    templates = templates.filter(template => isMatch(template, matchData));
  }

  if (!templates) {
    throw new Error('No matching templates');
  }

  const template = randomElement(templates);

  return template.id;
}
