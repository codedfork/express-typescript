const puppeteer = require('puppeteer');

async function scrapeData() {
  const url = 'https://www.flipkart.com/search?q=electronics';  // Replace with the target URL
  
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  // Set headers to mimic a real browser
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3');
  
  // Intercept requests and log redirects (optional for debugging)
  page.on('response', async (response) => {
    const status = response.status();
    if (status >= 300 && status < 400) {
      console.log(`Redirecting to: ${response.url()} with status code: ${status}`);
    }
  });

  // Monitor the request lifecycle and allow or block certain requests (optional)
  await page.setRequestInterception(true);
  page.on('request', (request) => {
    // You can block or modify certain requests like images, ads, etc., here if needed
    if (request.resourceType() === 'image') {
      request.abort();  // Block image requests to speed up scraping
    } else {
      request.continue();  // Continue with other requests
    }
  });

  try {
    // Go to the URL, with a longer timeout and wait for the network to be idle
    await page.goto(url, {
      waitUntil: 'networkidle2',  // Ensures the page is fully loaded (no ongoing network activity)
      timeout: 60000,  // Increase timeout to 60 seconds if the page takes too long to load
    });

    // Extract data (adjust this selector based on Flipkart's HTML structure)
    const productNames = await page.evaluate(() => {
      const productElements = Array.from(document.querySelectorAll('a .wjcEIp'));  // Example selector for product names
      console.log(productElements.length)
      return productElements.length  // Return an array of product names
    });

    console.log('Product Names:', productNames);  // Log the extracted product names

  } catch (error) {
    console.error('Error during scraping:', error);
  }

  await browser.close();
}

scrapeData();
