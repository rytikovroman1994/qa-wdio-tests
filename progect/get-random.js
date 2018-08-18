/* eslint-disable no-plusplus */
/* eslint-disable no-bitwise */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-multi-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-mixed-operators */
/* eslint-disable consistent-return */

/**
 * @author Gleb Azarov <cheerlesscloud at ucoz-team.net>
 * @description Модуль для генерации разнообраных рандомных штуковин.
 * Теоритически можно заменить на faker, но мне faker не нравится.
 * После моей смерти можете поменять это на faker, а пока будет так.
 * Как минимум это более удобная обёртка на faker'ом, так как faker - это грёбанный
 * огромный комбайн, функционал которого нам не нужен в ближайшем будущем.
 */

/**
 * @function float - Генерирует рандомное число с плавающей запятой в заданном диапазоне.
 * Первое число может быть как минимумом, так и максимумом.
 * @param {number} [max=1] - Первая граница числового отрезка.
 * @param {number} [min=0] - Вторая граница числового отрезка.
 * @returns {number} - Сгенерированное число.
 * @example randomFloat(0, 10) // => 0..10
 * @example randomFloat(10) // => 0..10
 * @example randomFloat(10, 0) // => 0..10
 */
function getRandomFloat(max = 1, min = 0) {
  return Math.random() * (max - min) + min;
}

/**
 * @function int - Генерирует рандомное целое число в заданном диапазоне.
 * Первое число может быть как минимумом, так и максимумом.
 * @param {number} [max=1] - Первая граница числового отрезка.
 * @param {number} [min=0] - Вторая граница числового отрезка.
 * @returns {number} - Сгенерированное число.
 * @example randomInt(0, 10) // => 0..10
 * @example randomInt(10) // => 0..10
 * @example randomInt(10, 0) // => 0..10
 */
function getRandomInt(max = 1, min = 0) {
  return getRandomFloat(max, min) << 0;
}

/**
 * @function string - Генерирует рандомную строку.
 * @param {number} [length=10] - Длина генерируемой строки.
 * @returns {string} - Сгенерированная строка (по дефолту в качестве алфавита A-Za-z0-9).
 * @example const id = randomString(16);
 * @todo Внедрить алфавиты в генерацию строки
 */
function getRandomString(length = 10) {
  // Глеб вспоминал светлое прошлое, не трогать
  // И нет, crypto для слабаков
  let str = '';
  while (length--) {
    let r = Math.random() * 62 | 0;
    str += String.fromCharCode(r += (r > 9 ? (r < 36 ? 55 : 61) : 48));
  }
  return str;
}

/**
 * @function item - Достать рандомный элемента коллекции (может быть массив, объект и ES6 *Map/*Set)
 * @param {Array|Object|Map|WeakMap|Set|WeakSet} collection - Коллекция, из которой надо взять рандомный элемент.
 * @returns {any|undefined} - Рандомный элемент коллекции или undefined, если не смогли достать.
 * @example randomItem([1, 2, 3]); // => 1 || 2 || 3
 * @example randomItem({ a: 1, b: 2, c: 3 }); // => 1 || 2 || 3
 * @example randomItem(new Map([['a', 1], ['b', 2], ['c', 3]]); // => 1 || 2 || 3
 */
function getRandomItem(collection) {
  if (Array.isArray(collection)) {
    return collection[getRandomInt(collection.length)];
  }

  if (collection instanceof Map || collection instanceof WeakMap) {
    const keys = [...collection.keys()];
    return collection.get(keys[getRandomInt(keys.length)]);
  }

  if (collection instanceof Set || collection instanceof WeakSet) {
    const setAsArray = [...collection];
    return setAsArray[getRandomInt(setAsArray.length)];
  }

  if (collection) {
    const keys = Object.keys(collection);
    return collection[keys[getRandomInt(keys.length)]];
  }
}

/**
 * @function - Сгенерировать рандомный email с префиксом "utest-" на домене autotests.ukit.space.
 * @returns {string} - Сгенерированный email.
 * @example const email = getRandom.email();
 */
function getRandomEmail() {
  return `utest-${getRandomString(8)}@autotests.ukit.space`;
}

module.exports = {
  float: getRandomFloat,
  randomFloat: getRandomFloat,
  int: getRandomInt,
  randomInt: getRandomInt,
  item: getRandomItem,
  randomItem: getRandomItem,
  string: getRandomString,
  randomString: getRandomString,
  email: getRandomEmail,
  randomEmail: getRandomEmail,
};
