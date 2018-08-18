import signIn from './user/sign-in';
// import signUp from './user/sign-up';
// import createSite from './site/create-new';
/**
 * @todo подумать надо ли нам переход в визард делать хелпером
 */

export default function init() {
  /**
   *  заменить на генераци куки
   */
  signIn(process.env.USER_EMAIL, process.env.USER_PASSWORD);

  // создание нового пользователя
  // const {email, password} = signInUp()
  // создание сайта
  // const site = createSite()

  /**
   * @todo принимать базовый url
   */
  browser
    .url(`${process.env.URL}neowizard#templates/all`)
    .waitForVisible('.w-subjects-list-main');
  browser
    .waitForExist('.w-tmpls-wrap.js-tmpls-wrap');
}
