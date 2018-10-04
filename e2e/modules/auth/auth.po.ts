import {browser, by} from 'protractor';
import {Google} from './login.google';

export class AuthPage {
    googlePage = new Google();

    loginByGoole(username, password) {
        browser.driver.getCurrentUrl().then(function (currentUrl) {
            console.log(currentUrl);
        });
        const page = browser.driver.get('http://wwwdev.ebi.ac.uk/Tools/omicsdi/profilews/auth/google?scope=https://www.googleapis.com/auth/userinfo.email&uahcc');
        const self = this;
        page.then(() => {
            browser.waitForAngularEnabled(false).then(function () {
                self.googlePage.loginToGoogle(username, password);
            });
        });
    }
}
