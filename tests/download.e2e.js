const puppeteer = require('puppeteer');

describe('Download JSON from results', () => {
    let browser, page;

    beforeAll(async () => {
        browser = await puppeteer.launch({ headless: false, slowMo: 50 });
        page = await browser.newPage();
      });

    afterAll(async () => browser.close());

    test('Logs the user in to retrieve a study link, and the results for the study', async () => {
        await page.goto('http://localhost:8186/', { waitUntil: 'domcontentloaded' })
        await page.type('input[name="username"]', 'admin')
        await page.type('input[name="password"]', 'admin')


        await Promise.all([
            page.click('button[type=submit]'),
            page.waitForNavigation({ waitUntil: 'networkidle0' }),
        ]);

        const results = await page.$$('[data-testid="dashcard-getlink"]');

        if (results.length > 1) {
            await results[4].click();
        }

        page.once('dialog', async dialog => {
            await dialog.accept();
        });

        await page.click('[data-testid="dashcard-results"]')

        await page.click('[data-testid="results-downloadjson"]')

        await page.click('[data-testid="header-logout"]')
    });
})
