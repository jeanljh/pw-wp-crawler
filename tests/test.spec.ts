import test, { expect } from '../fixtures/base';
import admin from '../fixtures/config';

test.describe('Test Suite', async () => {
  test.beforeEach(async ({ page, login }) => {
    await page.goto('wp-login.php');
    await login.adminLogin(admin.username, admin.password);
    await page.goto('wp-admin/edit.php');
  });
  test('Install and activate the crawler plugin', async ({ page, plugins }) => {
    await page.goto('wp-admin/plugin-install.php?tab=upload');
    await page.setInputFiles('#pluginzip', 'plugins/wp-crawler-wpplugin.zip');
    await plugins.installButton.click();
    await plugins.activateButton.click();
    await plugins.installMessage.waitFor();
  });
  test('Check UI of the crawler admin panel', async ({ page, adminPanel }) => {
    await page.goto('wp-admin/tools.php?page=wpcrawler_admin')
    await expect.soft(adminPanel.headers).toHaveText([
      'WP Crawler admin panel',
      'Website structure',
      'Crawl controls',
    ]);
    expect.soft((await adminPanel.pageslist.allTextContents()).every(t => t.startsWith('http://web.local'))).toBeTruthy();
    await expect.soft(adminPanel.crawlButton).toHaveText('Crawl Website');
    const regExp = /^Automatic crawls are scheduled\. Next one is (\b(?:Sun|Mon|Tue|Wed|Thu|Fri|Sat)\b \b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b \d{1,2} \d{4} \d{2}:\d{2}:\d{2} ([A-Z]{3})[+-]\d{4} \((.+?) Time\)).*$/;
    await expect(adminPanel.crawlStatus).toHaveText(regExp);
  });
  test('Manually crawl to update the website', async ({ page, posts, adminPanel }) => {
    await page.goto('wp-admin/post-new.php');
    await posts.titleInput.fill('new post');
    await posts.publishButton.first().click();
    await posts.publishButton.last().click();
    await page.waitForResponse(r => r.url().endsWith('/?_wp-find-template=true&_locale=user') && r.status() === 200);
    
    await page.goto('wp-admin/tools.php?page=wpcrawler_admin');
    await adminPanel.crawlButton.click();
    await page.route('**/admin-ajax.php', r => r.continue()); // intercept first "admin-ajax" request and continue to next one
    await page.route('**/admin-ajax.php', r => r.continue()); // intercept second "admin-ajax" request and continue to next one
    await page.waitForResponse(r => r.url().endsWith('admin-ajax.php') && r.status() === 200);
    await expect.soft(adminPanel.getPageUrl('http://web.local/new-post/')).toHaveCount(1, { timeout: 20000 });
    
    await page.goto('wp-admin/edit.php');
    await posts.postColumn.first().hover();
    await posts.quickEditLink.first().click();
    await posts.slugInput.clear();
    await posts.slugInput.fill('edit-post');
    await posts.updatePostButton.click();

    await page.goto('wp-admin/tools.php?page=wpcrawler_admin');
    await adminPanel.crawlButton.click();
    await page.route('**/admin-ajax.php', r => r.continue()); // intercept first "admin-ajax" request and continue to next one
    await page.route('**/admin-ajax.php', r => r.continue()); // intercept second "admin-ajax" request and continue to next one
    await page.waitForResponse(r => r.url().endsWith('admin-ajax.php') && r.status() === 200);
    await expect.soft(adminPanel.getPageUrl('http://web.local/edit-post/')).toHaveCount(1, { timeout: 20000 });

    await page.goto('wp-admin/edit.php');
    await posts.postColumn.first().hover();
    await posts.trashPostLink.first().click();

    await page.goto('wp-admin/tools.php?page=wpcrawler_admin');
    await adminPanel.crawlButton.click();
    await page.route('**/admin-ajax.php', r => r.continue()); // intercept first "admin-ajax" request and continue to next one
    await page.route('**/admin-ajax.php', r => r.continue()); // intercept second "admin-ajax" request and continue to next one
    await page.waitForResponse(r => r.url().endsWith('admin-ajax.php') && r.status() === 200);
    await expect(adminPanel.getPageUrl('http://web.local/edit-post/')).not.toBeVisible();
  });

  test('Deactivate and uninstall the crawler plugin', async ({ page, plugins }) => {
    await page.goto('wp-admin/plugins.php');
    await plugins.deactiveteLink.click();
    await expect.soft(plugins.pluginStatus).toHaveText('Plugin deactivated.');
    page.on('dialog', d => d.accept());
    await plugins.deleteLink.click();
    await expect(plugins.pluginMessage).toHaveText('wp-crawler-wpplugin was successfully deleted.');
  });
});
