import { Page, Locator } from '@playwright/test';

export default class Plugins {
    readonly installButton: Locator;
    readonly activateButton: Locator;
    readonly replaceButton: Locator;
    readonly installMessage: Locator;
    readonly pluginStatus: Locator;
    readonly statusmessage: Locator;
    readonly deactiveteLink: Locator;
    readonly deleteLink: Locator;
    readonly pluginMessage: Locator;
    
    constructor(readonly page: Page) {
        this.installButton = this.page.locator('#install-plugin-submit');
        this.activateButton = this.page.locator('a.button.button-primary').or(this.page.locator('a.update-from-upload-overwrite'));
        this.installMessage = this.page.getByText('Plugin activated.').or(this.page.getByText('Plugin updated successfully.'));
        this.pluginStatus = this.page.locator('#message > p');
        this.statusmessage = this.page.locator('#message > p').or(this.page.getByText('Plugin updated successfully.'));
        this.deactiveteLink = this.page.locator('#deactivate-wp-crawler-wpplugin');
        this.deleteLink = this.page.locator('#delete-wp-crawler-wpplugin');
        this.pluginMessage = this.page.locator('td.plugin-update.colspanchange');
    }
}