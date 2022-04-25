export class HomeElements {
  get appLogo() {
    return $('div[class="app_logo"]');
  }

  get addAllProductsList() {
    return $$('button[class*="btn_inventory"]');
  }

  get firstProductAddBtn() {
    return $('button[class*="btn_inventory"]');
  }
}
