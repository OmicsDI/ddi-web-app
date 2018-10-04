import { AuthPage } from './auth.po';

describe('Login', function() {
    let page: AuthPage;

    beforeEach(() => {
        page = new AuthPage();
    });

    it('Should logged', () => {
        page.loginByGoole('omicsdi.test@gmail.com', 'obGZB2tRbDNtjPakqzE');
    });
});
