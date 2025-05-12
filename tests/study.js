import { test, describe, before, after } from 'node:test';
import puppeteer from 'puppeteer';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

describe('Login and create a study', () => {
  let browser;
  let page;

  before(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
  });

  after(async () => {
    await browser.close();
  });

  test('allows a user to log in with valid credentials and create a study', async (t) => {
    await page.goto('http://localhost:8186/', { waitUntil: 'domcontentloaded' });

    await page.type('input[name="username"]', 'admin');
    await page.type('input[name="password"]', 'admin');
    await Promise.all([
      page.click('button[type=submit]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);


    await page.waitForSelector('[data-testid="create-study-button"]', { visible: true, timeout: 5000 });
    await page.click('[data-testid="create-study-button"]');
    await page.type('[data-testid="create-study-title"]', 'E2E Test');
    await page.type('[data-testid="create-study-description"]', 'Testing the page with E2E');

    
    await page.waitForSelector('#fileInput');
    const fileInput1 = await page.$('#fileInput');
    const filePath1 = resolve(__dirname, 'assets', 'redpanda.png');
    await fileInput1.uploadFile(filePath1);
    await page.click('button[type="submit"]');
    
    // I'm aware adding "2" at the end is silly but I made a helper but it wasn't working properly so I just opted to do it like this
    // the point of this is just to test that the user can upload multiple file types
    await page.waitForSelector('#fileInput');
    const fileInput2 = await page.$('#fileInput');
    const filePath2 = resolve(__dirname, 'assets', 'veldiglangtekstfil.txt');
    await fileInput2.uploadFile(filePath2);
    await page.click('button[type="submit"]');

    await page.type('[data-testid="create-study-questionText"]', 'Which one of these images was AI generated?');

    let optionInputs = await page.$$('[data-testid="create-study-questionOption"]');
    await optionInputs[0].type('left');

    await page.click('[data-testid="create-study-addOptionButton"]');
    await page.waitForFunction(
      () => document.querySelectorAll('[data-testid="create-study-questionOption"]').length === 2
    );
    optionInputs = await page.$$('[data-testid="create-study-questionOption"]');
    await optionInputs[1].type('right');

    await page.waitForSelector('[data-testid="create-study-selectArtifactCheckbox"]');
    const checkboxes = await page.$$('[data-testid="create-study-selectArtifactCheckbox"]');
    if (checkboxes.length > 0) await checkboxes[0].click();
    if (checkboxes.length > 1) await checkboxes[1].click();

    await page.click('[data-testid="create-study-addQuestionButton"]');
  });
});