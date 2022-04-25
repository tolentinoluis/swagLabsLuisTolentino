export class BaseElements {
  get username() {
    return $('input[id="user-name"]');
  }

  get password() {
    return $('input[id="password"]');
  }

  get loginBtn() {
    return $('input[id="login-button"]');
  }
}
