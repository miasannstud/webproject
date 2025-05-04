const puppeteer = require('puppeteer');

module.exports = {
  launchBrowser: async () => {
    const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();
    return { browser, page };
  }
};