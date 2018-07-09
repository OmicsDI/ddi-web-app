import {browser} from 'protractor';


export class WebPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return browser.getTitle();
  }
}
