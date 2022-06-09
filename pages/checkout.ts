import { expect } from 'chai';
import { Base } from '@pages/base';
import { CheckoutElements } from '@pages/checkout-elements';
import { UserDetails } from '@type/checkout';

export class Checkout extends Base {

  cart = new CheckoutElements();

  /**
   * logic for this method is to go through the steps of completing the checkout process. All of these params are set in the setData array in the test file.
   * @param {UserDetails} UserDetails oebject contains firstName, lastName, and postcode variables.
   * @param firstName this param is used for completing the first name field on the user information page.
   * @param lastName this param is used for completing the last name field on the user information page.
   * @param postalcode this param is used for completing the postal code field on the user information page.
   */
  public async completeCheckout(userDetails: UserDetails): Promise<void> {
    await this.openUrl('cart.html');
    await this.proceedCheckout();
    await this.completeUserInformation(userDetails);
    await this.finishCheckout();
    await this.verifyOrderCompleted();
  }

  private async proceedCheckout(): Promise<void> {
    await (await this.cart.checkoutBtn).waitForClickable();
    await (await this.cart.checkoutBtn).click();
  }

  /**
   * logic for this method is to go through the steps of completing the checkout process. All of these params are set in the setData array in the test file.
   * @param {UserDetails} UserDetails oebject contains firstName, lastName, and postcode variables.
   * @param firstName this param is used for completing the first name field on the user information page.
   * @param lastName this param is used for completing the last name field on the user information page.
   * @param postalcode this param is used for completing the postal code field on the user information page.
   */
  private async completeUserInformation(userDetails: UserDetails): Promise<void> {
    await (await this.cart.firstName).setValue(userDetails.firstName);
    await (await this.cart.lastName).setValue(userDetails.lastName);
    await (await this.cart.postalCode).setValue(userDetails.postcode);
    await (await this.cart.continueBtn).click();
  }

  private async finishCheckout(): Promise<void> {
    await (await this.cart.finishBtn).waitForClickable();
    await (await this.cart.finishBtn).click();
  }

  private async verifyOrderCompleted(): Promise<void> {
    const getText = await (await this.cart.orderCompleteHeader).getText();
    console.log(getText);
    expect(getText).to.contain('THANK YOU FOR YOUR ORDER');
  }

}
