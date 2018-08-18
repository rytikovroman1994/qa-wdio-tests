import random from 'lodash.random';

/**
 * @function wizardSelectRandomCategory - Выбор случайной категории шаблонов в визарде.
 * @example
 *  browser.helpers.wizardSelectRandomCategory();
 */
export default function wizardSelectRandomCategory() {
  const { length } = $$('ul.w-tmpls-subs.js-tmpls-subs li');
  const elementId = random(1, length, false);
  const categorySelector = `ul.w-tmpls-subs.js-tmpls-subs > li:nth-child(${elementId})`;

  browser.waitForExist(categorySelector);
  browser.moveToObject(categorySelector);
  browser.click(`${categorySelector} button.w-tmpls-sub-title`);

  // Gleb Azarov: на всякий случай (тех. долг)
  browser.pause(200);
}
