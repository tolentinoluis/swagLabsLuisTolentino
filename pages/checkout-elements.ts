export class CheckoutElements {
  get checkoutBtn() {
    return $('button[id="checkout"]');
  }

  get continueBtn() {
    return $('input[id="continue"]');
  }

  get finishBtn() {
    return $('button[id="finish"]');
  }

  get firstName() {
    return $('input[id="first-name"]');
  }

  get lastName() {
    return $('input[id="last-name"]');
  }

  get postalCode() {
    return $('input[id="postal-code"]');
  }

  get orderCompleteHeader() {
    return $('div#checkout_complete_container h2.complete-header');
  }
}
