import { WebPage } from './app.po';

describe('web App', function() {
  let page: WebPage;

  beforeEach(() => {
    page = new WebPage();
  });

  it('should show OmicsDI: Home title', () => {
    page.navigateTo();
      setTimeout(() => {
          // Changes here will not propagate into your view.
          this.ngZone.run(() => {
              page.getTitle()
                  .then((title: string) => {
                      expect<any>(title).toEqual('OmicsDI: Home');
                  });
          });
      }, 30000);
  });
});
