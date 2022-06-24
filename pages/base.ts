import { BaseElements } from '@pages/base-elements';
import { Credentials } from '@type/credentials';
import { HomeElements } from '@pages/home-elements';

export class Base {
  base = new BaseElements();
  home = new HomeElements();

  async login(credentials: Credentials): Promise<void> {
    console.log('============== Login: Start Login =================');
    await this.openUrl('/');
    await (await this.base.username).setValue(credentials.username);
    await (await this.base.password).setValue(credentials.password);

    await (await this.base.loginBtn).click();
    await this.waitForLoginDefaultPage();
    console.log('============== Login: Login successful =================');
  }

  async openUrl(url: string): Promise<void> {
    await browser.url(url);
  }

  // random value generators
  randomLetterString(length: number) {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let value = '';
    while (value.length < length) {
      value += chars[Math.floor(Math.random() * chars.length)];
    }
    return value;
  }

  async waitForLoginDefaultPage(): Promise<void> {
    await (await this.home.appLogo).waitForDisplayed({ timeoutMsg: 'Login not successful' });
  }
}
