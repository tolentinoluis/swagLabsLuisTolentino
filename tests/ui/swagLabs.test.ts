import { Checkout } from '@pages/checkout';
import { Home } from '@pages/home';
import { UserDetails } from '@type/checkout';

describe('Xero Technical QE Test', function () {
  const home = new Home();
  const checkout = new Checkout();

  const testData: UserDetails =
  {
    firstName: `${checkout.randomLetterString(8)}`,
    lastName: `${checkout.randomLetterString(10)}`,
    postcode: '6011'
  };

  before(async function () {
    await home.openPage();
  });

  // Add a product to your cart
  it('Select product and add product to cart', async function () {
    await home.addProductsToCart(false);
  });

  // Process purchasing the product and verify order is confirmed
  it('Checkout process and confirm order', async function () {
    await checkout.completeCheckout(testData);
  });
});
