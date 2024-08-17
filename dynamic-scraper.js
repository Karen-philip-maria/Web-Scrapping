const puppeteer = require('puppeteer');
(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        const url = 'https://ura.go.ug/en/category/imports-exports/customs-enforcements/path/';
        await page.goto(url, { waitUntil: 'networkidle2' });
     
        const paragraphs = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('p')).map(p => p.textContent);
        });
        paragraphs.forEach(text => console.log(text));
     
        await browser.close();
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();



