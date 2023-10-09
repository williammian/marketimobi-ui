import { MarketimobiUiPage } from './app.po';

describe('marketimobi-ui App', () => {
  let page: MarketimobiUiPage;

  beforeEach(() => {
    page = new MarketimobiUiPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
