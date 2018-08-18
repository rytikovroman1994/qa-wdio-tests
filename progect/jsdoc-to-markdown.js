const path = require('path');
const fs = require('fs');
const JsdocToMarkown = require('jsdoc-api');

function getFilepath(meta) {
  const base = meta.path.replace(`${process.cwd()}/`, '');
  return `${path.join(base, meta.filename)}:${meta.lineno}`;
}

const globalJsDoc = `
  /**
   * JSDoc namespace, в котором лежат все хелперы
   * @namespace Helpers
   */

  /**
   * JSDoc namespace, в котором должны лежать все тесты
   * @namespace Spec
   */

  /**
   * @description Каждый тесткейс должен описываться с применением этого типа.
   * По факту это в чистом виде лэйбл, по которому можно эффективно найти все тесткейсы.
   *
   * @typedef {Function} Testcase
   * @memberof Spec
   */
`;

(async () => {
  const jsDocDefinitions = [
    ...await JsdocToMarkown.explain({
      files: './{specs,tests,helpers,utils}/**/*.{js,mjs}',
      // source: globalJsDoc,
      configure: path.join(__dirname, '.jsdoc.json'),
      recurse: true,
      // readme: path.resolve('./README.md'),
    }),
    ...await JsdocToMarkown.explain({
      source: globalJsDoc,
    }),
  ];

  const hash = {
    namespaces: [],
    testcases: [],
    helpers: [],
  };

  jsDocDefinitions.forEach((i) => {
    if (i.kind === 'namespace') {
      hash.namespaces.push({
        type: i.kind,
        name: i.longname,
        todo: i.todo,
        summary: i.summary,
        memberOf: i.memberof,
        description: i.description,
        location: getFilepath(i.meta),
      });
    }

    if (i.type && i.type.names instanceof Array && i.type.names.includes('Testcase')) {
      hash.testcases.push({
        name: i.name,
        todo: i.todo,
        summary: i.summary,
        memberof: i.memberof,
        description: i.description,
        location: getFilepath(i.meta),
      });
    }

    if (i.memberof === 'Helpers' && i.kind === 'function') {
      hash.helpers.push({
        name: i.name,
        summary: i.summary,
        todo: i.todo,
        description: i.description,
        params: i.params,
        returns: i.returns,
        examples: i.examples,
        location: getFilepath(i.meta),
      });
    }
  });

  const t = hash.testcases.sort((a, b) => a.memberof > b.memberof).map(testcase => [
    `### ${testcase.memberof}: ${testcase.name}`,
    `Summary: *${testcase.summary}*`,
    ['ToDo:', ...testcase.todo.map(todo => `- [ ] ${todo}`)].join('\n'),
    `${testcase.description}`,
    `Location: [${testcase.location}](${testcase.location})`,
  ].join('\n\n'));

  const h = hash.helpers
    .map(helper =>
      [
        `### ${helper.name}`,
        helper.summary ? `Summary: *${helper.summary}*` : '',
        helper.todo ? ['ToDo:', ...helper.todo.map(todo => `- [ ] ${todo}`)].join('\n') : '',
        helper.description || '',
        helper.examples ? `Examples:\n\n${helper.examples.map(ex => `- ${ex}`).join('\n')}` : '',
        `Location: [${helper.location}](${helper.location})`,
      ].join('\n\n'));

  const result = [
    '## Tests',
    ...t,
    '## Helpers',
    ...h,
  ].join('\n\n');

  fs.writeFileSync('API.md', result);
})()
  .catch(err => console.error(err) || process.exit(1));

