import { Page, Locator, expect } from '@playwright/test'

export default class Login {
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator

  constructor(readonly page: Page) {
    this.usernameInput = this.page.locator('#user_login')
    this.passwordInput = this.page.locator('#user_pass')
    this.loginButton = this.page.locator('#wp-submit')
  }

  async adminLogin(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
    await this.page.waitForResponse((r) => r.url().endsWith('admin-ajax.php') && r.status() === 200)
  }
}
