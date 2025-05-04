const puppeteer = require('puppeteer');

module.exports = {
  launchBrowser: async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 1 });
    const page = await browser.newPage();
    return { browser, page };
  }
};