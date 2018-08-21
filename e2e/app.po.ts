import {browser} from 'protractor';


export class WebPage {
  navigateTo() {
    return browser.get('/');
  }

    // navigateToProfile() {
    //     return browser.get('/profile/bcdnTdFx');
    // }

  getTitle() {
    return browser.getTitle();
  }
}
