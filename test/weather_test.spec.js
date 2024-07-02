import { test, expect } from '@playwright/test';

test.describe('Weather Website Tests', () => {
  test('Search for weather in a specific city', async ({ page, browser }) => {
    await page.goto('https://www.google.com');

    const city = 'New York';
    await page.fill('#APjFqb.gLFyf', `weather in ${city}`);
    await page.press('#APjFqb.gLFyf', 'Enter');

    await page.waitForSelector('#wob_wc');

    await page.screenshot({ path: 'weather-results.png' });

    const temperature = await page.textContent('#wob_tm');
    const condition = await page.textContent('#wob_dc');
    const humidity = await page.textContent('#wob_hm');

    console.log(`Temperature: ${temperature}`);
    console.log(`Condition: ${condition}`);
    console.log(`Humidity: ${humidity}`);

    const pdfBuffer = await page.pdf({
      path: 'weather-report.pdf',
      format: 'A4'
    });

    expect(temperature).not.toBeNull();
    expect(condition).not.toBeNull();
    expect(humidity).not.toBeNull();

    const context = await browser.newContext();
    const newPage = await context.newPage();
    await newPage.goto('https://www.google.com');
    await newPage.fill('#APjFqb.gLFyf', `weather in ${city}`);
    await newPage.press('#APjFqb.gLFyf', 'Enter');
    await newPage.waitForSelector('#wob_wc');
    const newTemperature = await newPage.textContent('#wob_tm');
    expect(newTemperature).toBe(temperature);

    await context.close();
  });
});
