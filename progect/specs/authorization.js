/**
 * @description Тест на регестрацию пользователя, выход из профиля и авторизация.
 * @type {Testcase}
 * @member authorization
 * @memberof Spec
*/
describe('Authorization', () => {
  const ctx = {};

  it('sign-up', () => {
    ctx.user = browser.helpers.signUp();
  });

  it('sign-out', () => {
    browser.helpers.signOut();
  });

  it('sign-in', () => {
    // так как после signOut мы попадаем на главную, а навигация сделанна плохо
    // руками переходим на пустую страницу, что бы потом сработало открытие signIn
    browser.url('about:blank');
    browser.helpers.signIn(ctx.user.email, ctx.user.password);
  });
});
