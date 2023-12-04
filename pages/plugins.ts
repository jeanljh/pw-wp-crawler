import { Page, Locator } from '@playwright/test'

export default class Plugins {
  readonly installButton: Locator
  readonly activateButton: Locator
  readonly installStatus: Locator
  readonly pluginStatus: Locator
  readonly deactiveteLink: Locator
  readonly deleteLink: Locator
  readonly pluginMessage: Locator

  constructor(readonly page: Page) {
    this.installButton = this.page.locator('#install-plugin-submit')
    this.activateButton = this.page
      .locator('a.button.button-primary')
      .or(this.page.locator('a.update-from-upload-overwrite'))
    this.installStatus = this.page
      .getByText('Plugin activated.')
      .or(this.page.getByText('Plugin updated successfully.'))
    this.pluginStatus = this.page.locator('#message > p')
    this.deactiveteLink = this.page.locator('#deactivate-wp-crawler-wpplugin')
    this.deleteLink = this.page.locator('#delete-wp-crawler-wpplugin')
    this.pluginMessage = this.page.locator('td.plugin-update.colspanchange')
  }
}
