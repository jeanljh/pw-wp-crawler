import { Page, Locator, FrameLocator } from '@playwright/test';

export default class Posts {
    readonly iframe: FrameLocator;
    readonly titleInput: Locator;
    // readonly postStatus: Locator;
    // readonly bulkActionsList: Locator;
    // readonly applyButton: Locator;
    readonly selectAllCheckbox: Locator;
    readonly publishButton: Locator;
    readonly postColumn: Locator;
    readonly quickEditLink: Locator;
    readonly slugInput: Locator;
    readonly updatePostButton: Locator;
    readonly trashPostLink: Locator;
    
    constructor(readonly page: Page) {
        this.iframe = this.page.frameLocator('iframe[name="editor-canvas"]');
        this.titleInput = this.iframe.locator('h1[aria-label="Add title"]');
        // this.bulkActionsList = this.page.locator('#bulk-action-selector-top');
        // this.applyButton = this.page.locator('#doaction');
        // this.selectAllCheckbox = this.page.locator('#cb-select-all-1');
        this.publishButton = this.page.locator('button.editor-post-publish-button__button')
        this.postColumn = page.locator('td[data-colname="Title"]');
        this.quickEditLink = page.locator('button.button-link.editinline')
        this.slugInput = page.locator('tr:not([id="inline-edit"]) input[name="post_name"]');
        this.updatePostButton = page.locator('tr:not([id="inline-edit"]) button.save');
        this.trashPostLink = page.locator('a.submitdelete');
    }
}