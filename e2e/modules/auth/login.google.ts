import {browser, by, element, protractor} from 'protractor';

const BROWSER_WAIT = 5000;
const ec = protractor.ExpectedConditions;

export class Google {
    emailInput = element(by.id('identifierId'));
    passwordInput = element(by.css('#password input'));
    nextButton = element(by.id('identifierNext'));
    signInButton = element(by.id('passwordNext'));

    loginToGoogle(username, password) {
        const self = this;

        /* Entering non angular site, it instructs webdriver to switch
           to synchronous mode. At this point I assume we are on google
           login page */
        browser.driver.wait(ec.visibilityOf(self.emailInput), BROWSER_WAIT).then(function () {
            self.emailInput.sendKeys(username);
            self.nextButton.click();

            self.passwordInput.isPresent().then(function () {
                browser.driver.wait(ec.visibilityOf(self.passwordInput), BROWSER_WAIT).then(function () {
                    self.passwordInput.sendKeys(password);
                    self.signInButton.click();
                    browser.driver.wait(ec.urlContains('omicsdi'), BROWSER_WAIT).then(function () {
                        browser.driver.getCurrentUrl().then(function (url) {
                            console.log(url);
                        })
                    })
                });
            });
        });
    }
}
