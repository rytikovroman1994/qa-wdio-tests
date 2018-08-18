import faker from "faker"

describe('signUp', () => {
    before(() => {
        // делаем размер окна браузера максимальным
        browser.windowHandleMaximize ();
        // переходим на страницу
        browser.url('https://vw.kodix.ru');
        // скрываем раздел Фильтр
        const firstFilter = browser.waitForVisible('.avn008_overlay');
        if(firstFilter === true) {
            browser.click('.avn003_column-left');
        }
    })
    
    it('registration page', () => {
        // кликаем на иконку профиля
        browser.click('#prompt-toggler_selectLK');
        // выбираем "Зарегестрироваться"
        browser.click('.avn004_prompt__content  a:nth-child(2)');
        // ожидаем загрузки страницы ввода данных
        browser.waitForVisible('.logo__img_desktop');
    })
    it('filling in data', () => {
        // вводим телефонный номер
        browser.setValue('#username', faker.phone.phoneNumber(0));
        // вводидим эмеил
        browser.setValue('#email', faker.internet.email(1));
        // выбираем гендер
        browser.click('.form__radio span');
        // вводим фамилию
        browser.setValue('#lastName', faker.name.lastName(1));
        // вводим имя
        browser.setValue('#firstName', faker.name.firstName(1));
        // вводим отчество
        browser.setValue('#kc-register-form > div:nth-child(6) > input', faker.name.lastName(1));
        const password = faker.internet.password(10);
        // вводим пароль
        browser.setValue('#password', password);
        // подтверждаем пароль
        browser.setValue('#password-confirm', password);
        // кликаем по кнопке "Зарегестрироваться"
        browser.click('.btn_cta[type="submit"]');
        // ожидаем загрузку карточки, чтобы проверить url (вместо пауз)
        browser.waitForExist('.avn001_container');
        const url = browser.getUrl();
        expect(url).to.equal('https://vw.kodix.ru/');
    });
});