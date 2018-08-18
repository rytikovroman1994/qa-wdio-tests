# Troubleshooting
В этом файле вы найдёте решения проблем, которые встечались во время разработки и запуска функциональных тестов. Если вы наткнулись на какой-то баг/проблему, постарайтесь описать её в этом файле. И пожалуйста, соблюдайте формат описания.

**========================**

Автор: Глеб Азаров <cheerlesscloud@ucoz-team.net>

Дата: 15 марта 2018

Описание:

При выполнении ввода в input прилетала ошибка из selenium:
```
[18:09:18]  DATA		{}
[18:09:18]  RESULT		"iVBORw0KGgoAAAANSUhEUgAABLAAAALQCAIAAAAPZx74AAAgAElEQVR4nOzdeXxU1f3/8c+dfSaTbZKQlZAACfu+Cbgj4oJKq61rKbZardRWq/5q7d5vbau2aq1LtdqidnHfgYoLLoBE2UH2kJCE7Psymf3+/hgcQgiIMMlN5r6eD/+4c+69Zz53fEzCO+fcc5XqugY ... (35270 more bytes)
[18:09:18]  	Saved screenshot: ERROR_chrome_2018-03-15T15-09-18.337Z.png
/Users/cheerlesscloud/projects/ulight/autotest/node_modules/wdio-sync/build/index.js:357
            throw e;
            ^

Error: An unknown server-side error occurred while processing the command.
    at elementIdValue("0.23531363655292004-1", "test@test.com") - index.js:312:3
```

Решение: происходило из-за того, что Google Chrome по партизански обновился, а текущая версия webdriver'а естесна нет. Помогло обновление webdriver'а и установка драйверов через `npm run selenium:install`.


**========================**

Автор: Глеб Азаров <cheerlesscloud@ucoz-team.net>

Дата: 26 мая 2018

Описание:

При выполнении `browser.getAttribute('.ul-container', 'id')` (получение списка id):
```
[01:17:08]  COMMAND	POST 	 "/wd/hub/session/8a261626769a201bfba3cd499c13c02e/elements"
[01:17:08]  DATA		{"using":"css selector","value":".ul-container"}
[01:17:08]  RESULT		[{"ELEMENT":"0.6783881961348686-2"},{"ELEMENT":"0.6783881961348686-10"},{"ELEMENT":"0.6783881961348686-9"},{"ELEMENT":"0.6783881961348686-3"},{"ELEMENT":"0.6783881961348686-4"},{"ELEMENT":"0.6783881961348686-5"},{"ELEMENT":"0.6783881961348686-6"},{"ELEMENT":"0.6783881961348686-7"}]

...

[01:17:08]  DATA		{}
[01:17:08]  RESULT		"ul-id-0-56"
[01:17:08]  RESULT		"ul-id-0-60"
[01:17:08]  RESULT		"ul-id-0-36"
[01:17:08]  RESULT		"iVBORw0KGgoAAAANSUhEUgAABFoAAALWCAYAAAB2nPcKAAAgAElEQVR4nOy9fZxV1Xno/117nznzwgDDizCgTkDA0RF5kQIqRJJpDGi9EK2X5JLcoGmqDZePsbQl8GsSPtgkUNrLTfxR8ktqg6SWWGuTwjUGNBlDIjZgVSA4EXl1AjggDAPM65mz9/r9sfbaL2fO8KK ... (1154030 more bytes)
[01:17:08]  	Saved screenshot: ERROR_chrome_2018-05-25T22-17-08.096Z.png
~/projects/ulight/autotest/node_modules/wdio-sync/build/index.js:357
            throw e;
            ^

Error: An unknown server-side error occurred while processing the command.
    at elementIdAttribute("0.6783881961348686-7", "id") - getAttribute.js:43:55
```

Решил в лоб - заменил `getAttribute` на `$$('.ul-container').map(i => i.getAttribute('id'))`.
