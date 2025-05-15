import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { test, describe, before, after } from 'node:test';
import Researcher from '../backend/models/researcherSchema.js';
import assert from 'node:assert/strict';

import dotenv from 'dotenv';
dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL;

dotenv.config();

describe('User signup and login testing, removing required attribute', () => {
  let browser, page;
  const testUsername = 'aliaksei';

  before(async () => {
    browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    page = await browser.newPage();
  });

  after(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    await Researcher.deleteOne({ username: testUsername });
    console.log(`Deleted ${testUsername} from the DB`);
    await mongoose.disconnect();

    await browser.close();
  });

  test('sign-up with missing fields shows validation error', async () => {
    await page.goto(`${FRONTEND_URL}`, { waitUntil: 'domcontentloaded' });
    await page.click('[data-testid="signup-link"]');

    // Intentionally bypassing the "required" attribute in the form field
    await page.$eval('form', form => form.setAttribute('novalidate', ''));

    await page.click('[data-testid="signup-signupButton"]');

    const err = await page.waitForSelector('.error', { visible: true });
    const text = await err.evaluate(el => el.textContent);
    assert.match(
      text,
      /Password must be at least 5 characters long\./i,
      `Expected password-length error, got: "${text}"`
    );
  });

  test('signup rejects duplicate username', async () => {
    await page.goto(`${FRONTEND_URL}signup`, { waitUntil: 'domcontentloaded' });
    await page.type('input[name=firstName]', 'admin');
    await page.type('input[name=lastName]', 'admin');
    await page.type('input[name=username]', 'admin');
    await page.type('input[name=email]', 'admin@gmail.com');
    await page.type('input[name=password]', 'admin');
    await page.click('[data-testid="signup-signupButton"]');

    const err = await page.waitForSelector('.error', { visible: true });
    const text = await err.evaluate(el => el.textContent);
    assert.match(
      text,
      /username: Username already in use/i,
      `Expected duplicate-username error, got: "${text}"`
    );
  });

  test('creating a user and logging in works end-to-end', async () => {
    await page.goto(`${FRONTEND_URL}`, { waitUntil: 'domcontentloaded' });
    await page.click('[data-testid="signup-link"]');

    await page.waitForSelector('input[name=firstName]');
    await page.type('input[name=firstName]', 'Aliaksei');
    await page.type('input[name=lastName]', 'Miniukovich');
    await page.type('input[name=username]', testUsername);
    await page.type('input[name=email]', 'aliaksei.miniukovich@ntnu.no');
    await page.type('input[name=password]', 'iliketoplaychess');
    await page.click('[data-testid="signup-signupButton"]');

    await page.waitForSelector('[data-testid="signup-redirectlogin"]');
    await page.click('[data-testid="signup-redirectlogin"]');

    await page.waitForSelector('input[name="username"]');
    await page.type('input[name="username"]', testUsername);
    await page.type('input[name="password"]', 'iliketoplaychess');
    await Promise.all([
      page.click('button[type=submit]'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
    ]);

    await page.click('[data-testid="header-logout"]');
  });
});
