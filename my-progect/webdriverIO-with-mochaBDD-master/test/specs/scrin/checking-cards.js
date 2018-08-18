describe('checking-cards', () => {
    before(() => {
        // делаем размер окна браузера максимальным
        browser.windowHandleMaximize ();
        // переходим на страницу
        browser.url('https://cars.volkswagen.ru');
        // скрываем раздел Фильтр
        const firstFilter = browser.waitForVisible('.avn008_overlay');
        if(firstFilter === true) {
            browser.click('.avn003_column-left');
        }
    });

    // стандартный режим
    it('consider the number of cards', () => {
        // считае кол-во карточек на странице
        const { length: numberOfCards } = $$('.gridcontainer .grid_l_3');
        let i;
        for(i = 1; 1 <= numberOfCards; i++) {
            console.log(i);
            const card = `.gridcontainer .grid_l_3:nth-child(${i})`;
            browser.moveToObject(`${card}`, 0, 200);
            browser.waitForExist(card, 10000);
            browser.waitForVisible(`${card} > div > div > div > div:nth-child(1) > a > div > div > div > img`, 5000);
        }
    });

    // списком
    it('consider the number of cards list', () => {

        browser.click('.toggle_switch__state');
        const { length: listOfCards } = $$('.grid_12');
        for(let i = 1; 1 < listOfCards; i++) {
            console.log(i);
            const card = `.grid_12:nth-child(${i})`;
            browser.moveToObject(`${card}`, 0, 200);
            browser.waitForExist(card, 10000);
            browser.waitForVisible(`${card} > div > div > div > div:nth-child(1) > a > div > div > div > img`, 5000);
        }
    })
});