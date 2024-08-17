const axios = require('axios');
const cheerio = require('cheerio');
(async () => {
    try {
    
        const url = 'https://ura.go.ug/en/category/imports-exports/customs-enforcements/path/';
    
        const { data } = await axios.get(url);
    
        const $ = cheerio.load(data);
      
        $('p').each((index, element) => {
            console.log($(element).text());
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

