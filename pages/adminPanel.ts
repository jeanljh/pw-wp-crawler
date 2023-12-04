import { Page, Locator, expect } from '@playwright/test'

export default class AdminPanel {
  readonly headers: Locator
  readonly pageslist: Locator
  readonly crawlButton: Locator
  readonly crawlStatus: Locator

  constructor(readonly page: Page) {
    this.headers = page.locator('#wpbody-content > div.wrap > :not(ul, button, p)')
    this.pageslist = page.locator('#pages-list > li')
    this.crawlButton = page.locator('#wpcrawler-crawl-button')
    this.crawlStatus = page.locator('#wpcrawler-cron-crawl-status')
  }

  getUrl = (url: string) => this.pageslist.getByText(url, { exact: true })
}
