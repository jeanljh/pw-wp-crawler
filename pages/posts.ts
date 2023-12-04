import { Page, Locator, FrameLocator } from '@playwright/test'

export default class Posts {
  readonly iframe: FrameLocator
  readonly titleInput: Locator
  readonly publishButton: Locator
  readonly postColumn: Locator
  readonly quickEditLink: Locator
  readonly trashLink: Locator
  readonly slugInput: Locator
  readonly updateButton: Locator

  constructor(readonly page: Page) {
    this.iframe = this.page.frameLocator('iframe[name="editor-canvas"]')
    this.titleInput = this.iframe.locator('h1[aria-label="Add title"]')
    this.publishButton = this.page.locator('button.editor-post-publish-button__button')
    this.postColumn = page.locator('td[data-colname="Title"]')
    this.quickEditLink = page.locator('button.button-link.editinline')
    this.trashLink = page.locator('a.submitdelete')
    this.slugInput = page.locator('tr:not([id="inline-edit"]) input[name="post_name"]')
    this.updateButton = page.locator('tr:not([id="inline-edit"]) button.save')
  }
}
