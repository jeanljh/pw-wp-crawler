import { test as baseTest, Page } from '@playwright/test'
import Login from '../pages/login'
import Posts from '../pages/posts'
import Plugins from '../pages/plugins'
import AdminPanel from '../pages/adminPanel'

type Modules = {
  page: Page
  login: Login
  posts: Posts
  plugins: Plugins
  adminPanel: AdminPanel
}

export const test = baseTest.extend<Modules>({
  page: async ({ page }, use) => {
    await use(page)
  },
  login: async ({ page }, use) => {
    await use(new Login(page))
  },
  posts: async ({ page }, use) => {
    await use(new Posts(page))
  },
  plugins: async ({ page }, use) => {
    await use(new Plugins(page))
  },
  adminPanel: async ({ page }, use) => {
    await use(new AdminPanel(page))
  },
})

export default test
export const expect = test.expect
