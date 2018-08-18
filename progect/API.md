## Tests

### Spec~Authorization: my-awesome-test

Summary: *Надо подумать, нужно ли нам это*

ToDo:
- [ ] Можно писать TODO, они потом в доке появляются

Особо классный рефенесный тест-кейс, написанный для тестов новой конфигурации раннера
<br>
Надо больше описания!!!!
<br>
- И ещё чуть-чтуь
**И ещё**

Location: [specs/test.js:9](specs/test.js:9)

## Helpers

### favouriteBlock - Добавляет указанный в параметрах блок в избранное.







Examples:

- const favouritedId = browser.helpers.favouriteBlock();

Location: [helpers/block/block-to-favourites.js:1](helpers/block/block-to-favourites.js:1)

### createBlankBlock - Создает новый пустой блок на холсте







Examples:

- const createdId = createBlankBlock();

Location: [helpers/block/create-blank-block.js:1](helpers/block/create-blank-block.js:1)

### removeBlock - Удаляет указанный в параметрах блок на холсте конструктора.







Examples:

- const removedId = browser.helpers.removeBlock();

Location: [helpers/block/remove-block.js:1](helpers/block/remove-block.js:1)

### getChromeMemory - извлекаем объем захваченной памяти в chrome







Examples:

- const memoryUsage = getChromeMemory();

Location: [helpers/core/get-chrome-memory.js:1](helpers/core/get-chrome-memory.js:1)

### domain



ToDo:
- [ ] Добавить адекватное описание.



Examples:

- Добавить пример использования.

Location: [helpers/domain-page.js:1](helpers/domain-page.js:1)

### createNewPage - Создаёт новую страницу сайта







Examples:

- const pageId = createNewSite();

Location: [helpers/page/create-new-page.js:3](helpers/page/create-new-page.js:3)

### removePage - Удаляет страницу сайта







Examples:

- removePage('test');

Location: [helpers/page/remove-page.js:1](helpers/page/remove-page.js:1)

### openPanel - Открывает указанную панель конструктора







Examples:

- openPanel();

Location: [helpers/panel/open-panel.js:1](helpers/panel/open-panel.js:1)

### openTab - Открывает указанную вкладку панели "Конструктор"







Examples:

- openTab();

Location: [helpers/panel/open-tab.js:1](helpers/panel/open-tab.js:1)

### createNewSite - Создаёт новый сайт на указанном шаблоне (по умолчанию - empty-cruise).







Examples:

- const siteUrl = createNewSite();

Location: [helpers/site/create-new-site.js:1](helpers/site/create-new-site.js:1)

### sitePublish - Публикация сайта из dashboard.



ToDo:
- [ ] Добавить адекватное описание.



Examples:

- Добавить пример использования.

Location: [helpers/site/publish.js:1](helpers/site/publish.js:1)

### signOut - Выход из аккаунта.







Examples:

- helpers.signOut();

Location: [helpers/user/sign-out.js:1](helpers/user/sign-out.js:1)

### signUp - Регистрирует нового пользователя с рандомным логином и паролем и переходит в визард.







Examples:

- signUp('test@test.com', 'test');

Location: [helpers/user/sign-up.js:3](helpers/user/sign-up.js:3)

### duplicateWidget - Дублирует виджет







Examples:

- duplicateWidget('ul-id-1376-3');

Location: [helpers/widget/duplicate.js:1](helpers/widget/duplicate.js:1)

### removeWidget - Удаляет виджет с холста







Examples:

- removeWidget('ul-id-1376-3');

Location: [helpers/widget/remove.js:1](helpers/widget/remove.js:1)