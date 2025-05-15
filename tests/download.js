import { test, describe, before, after } from 'node:test';
import puppeteer from 'puppeteer';

import dotenv from 'dotenv';
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;

describe('Download JSON from results', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  test('Logs in to retrieve a study link, and the results for the study', async (t) => {
    await page.goto(`${FRONTEND_URL}`, { waitUntil: 'domcontentloaded' });

    await page.type('input[name="username"]', 'admin');
    await page.type('input[name="password"]', 'admin');
    await Promise.all([
      page.click('button[type=submit]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    const results = await page.$$('[data-testid="dashcard-getlink"]');


    if (results.length > 4) {
      await results[4].click();
    } else {
      t.skip('Not enough result links to click the fifth one');
    }

    page.once('dialog', async dialog => {
      await dialog.accept();
    });


    await page.click('[data-testid="dashcard-results"]');
    await page.click('[data-testid="results-downloadjson"]');

    await page.click('[data-testid="header-logout"]');
  });
});