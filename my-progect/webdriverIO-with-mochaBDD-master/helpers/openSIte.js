export default function openSite() {
    // делаем размер окна браузера максимальным
    browser.windowHandleMaximize ();
    // переходим на страницу
    browser.url('https://vw.kodix.ru');
    // скрываем раздел Фильтр
    const firstFilter = browser.waitForVisible('.avn008_overlay');
    if(firstFilter === true) {
        browser.click('.avn003_column-left');
    }
}