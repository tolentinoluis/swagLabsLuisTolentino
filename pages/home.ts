import { Base } from '@pages/base';
import { HomeElements } from './home-elements';
import { roles } from '@config/roles';

export class Home extends Base {

  home = new HomeElements();

  async openPage(loginRole: any = roles.USER.STANDARD): Promise<void> {
    await this.login(loginRole);
  }
  /**
   * This method will add either the first product or all of the products in the cart.
   * @param addAllProducts this value represent if you want to add all products in the cart or just the first item. True = all products, False = first product.
   */
  public async addProductsToCart(addAllProducts: boolean): Promise<void> {
    if (addAllProducts) {
      console.log('-------------Add all products to cart----------------');
      await this.addAllProductsToCart();
    } else {
      console.log('-------------Add first product to cart----------------');
      await this.addFirstProductsToCart();
    }
  }

  private async addAllProductsToCart(): Promise<void> {
    for (const el of await this.home.addAllProductsList) {
      await el.waitForClickable();
      await el.click();
    }
  }

  private async addFirstProductsToCart(): Promise<void> {
    await (await this.home.firstProductAddBtn).click();
  }
}
