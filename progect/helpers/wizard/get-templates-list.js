/**
 * @function wizardGetTemplatesList - Получение актуального списка шаблонов в визарде.
 * @returns {Object[]} - Возвращает массив шаблонов.
 * @example
 *  const templateIds = browser.helpers.wizardGetTemplatesList().map(t => t.id);
 */
export default function wizardGetTemplatesList() {
  if (!browser.getUrl().includes('neowizard')) {
    throw new Error('Этот хелпер можно запускать только в neowizard\'е');
  }

  const data = browser.helpers.getWindowData('neowizardData');

  if (!data || !data.templatesData || !data.templatesData.templates) {
    throw new Error('Нет neowizardData в window. Возможно, хелпер устарел или был запущен не в неовизарде');
  }

  const { templates } = data.templatesData;

  if (!Array.isArray(templates) || !templates) {
    throw new Error('По каким-то причинам шаблонов вообще нет (список пуст)');
  }

  return templates;
}
