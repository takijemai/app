import { LoginPage } from './login.po';
import { browser } from 'protractor';

describe('Login tests', () => {
  let page: LoginPage;

  beforeEach(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('Login form should be valid', () => {
    page.getEmailTextbox().sendKeys('user1@firebase.com');
    page.getPasswordTextbox().sendKeys('123456');

    const form = page.getForm().getAttribute('class');

    expect(form).toContain('ng-valid');
  });
});
