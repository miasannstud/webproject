import puppeteer from 'puppeteer';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { test, before, after } from 'node:test';
import Researcher from '../backend/models/researcherSchema.js';
import assert from 'node:assert/strict';

dotenv.config();

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


test('sign-up-missingfields', async () => {
  await page.goto('http://localhost:8186/', { waitUntil: 'domcontentloaded' });
  await page.click('[data-testid="signup-link"]');

  // Intentionally bypassing the "required" attribute in the form field
  await page.$eval('form', form => {
    form.setAttribute('novalidate', '');
  });

  await page.click('[data-testid="signup-signupButton"]');

  const err = await page.waitForSelector('.error', { visible: true });
  const text = await err.evaluate(el => el.textContent);
  assert.ok(
    /Error registering user/i.test(text),
    `Expected a "Error registering user" error, got: "${text}"`
  );
})

test('signup rejects duplicate username', async () => {

  await page.goto('http://localhost:8186/signup', { waitUntil: 'domcontentloaded' });
  await page.type('input[name=firstName]', 'admin');
  await page.type('input[name=lastName]', 'admin');
  await page.type('input[name=username]', 'admin');
  await page.type('input[name=email]', 'admin@gmail.com');
  await page.type('input[name=password]', 'admin');
  await page.click('[data-testid="signup-signupButton"]');

  const err = await page.waitForSelector('.error', { visible: true });
  const text = await err.evaluate(el => el.textContent);
  assert.ok(
    /User already exists!/i.test(text),
    `Expected a "User already exists!" error, got: "${text}"`
  );
});
æ
// 
test('creating a user and logging in', async () => {
  await page.goto('http://localhost:8186/', { waitUntil: 'domcontentloaded' });
  await page.click('[data-testid="signup-link"]');

  await page.waitForSelector('input[name=firstName]');
  await page.type('input[name=firstName]', 'Aliaksei');
  await page.type('input[name=lastName]', 'Miniukovich');
  await page.type('input[name=username]', 'aliaksei');
  await page.type('input[name=email]', 'aliaksei.miniukovich@ntnu.no');
  await page.type('input[name=password]', 'iliketoplaychess');
  await page.click('[data-testid="signup-signupButton"]');

  await page.waitForSelector('[data-testid="signup-redirectlogin"]');
  await page.click('[data-testid="signup-redirectlogin"]');
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', 'aliaksei');
  await page.type('input[name="password"]', 'iliketoplaychess');
  await Promise.all([
    page.click('button[type=submit]'),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  await page.click('[data-testid="header-logout"]')
});