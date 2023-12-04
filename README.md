# pw-api

This repository demonstrates automation testing of wordpress plugin using Playwright, TypeScript, Fixtures & Playwright reporter.

## ⚙Setup
1. Clone this repository: `bash git clone git@github.com:jeanljh/pw-api.git`
2. Install dependencies: `npm i`
3. Install Playwright dependencies: `npx playwright install`
4. Setup `.env` file (see below):
> Add these environment variables to the `.env` file in the root of the repo.

- `USER`: admin username for wp-admin login.
- `PASSWORD`: admin password for wp-admin login.
- `BASE_URL`: URL of the website.

Example of an `.env` file (replace the passwords):

```
USER="admin"
PASSWORD="..."
BASE_URL="http://web.local"
```
5. Run tests: `npm test`
6. Open test report: `npm run report`

## 📖Documentation
<a href="https://playwright.dev/docs/intro">Playwright doc</a>
