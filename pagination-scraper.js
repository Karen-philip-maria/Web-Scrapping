const axios = require('axios');
const cheerio = require('cheerio');

const MAX_RETRIES = 3; 
const TIMEOUT = 10000; 


const axiosInstance = axios.create({
    timeout: TIMEOUT,

});


async function fetchData(url, retries = MAX_RETRIES) {
    try {
        const response = await axiosInstance.get(url);
        if (response.status !== 200) {
            throw new Error(`HTTP status code: ${response.status}`);
        }
        return response.data;
    } catch (error) {
        console.error(`Error fetching data from ${url}:`, {
            message: error.message,
            code: error.code,
            response: error.response ? {
                status: error.response.status,
                data: error.response.data
            } : null,
            config: error.config
        });

        if (retries > 0) {
            console.error(`Retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
            return fetchData(url, retries - 1);
        } else {
            throw new Error(`Failed to fetch data from ${url}: ${error.message}`);
        }
    }
}


(async () => {
    try {
        let pageNumber = 1;
        while (true) {
            const url = `https://ura.go.ug/en/category/imports-exports/customs-enforcements/`; 
            console.log(`Fetching data from: ${url}`);
            const data = await fetchData(url);
            const $ = cheerio.load(data);

           
            const paragraphs = $('p').map((index, element) => $(element).text()).get();
            if (paragraphs.length === 0) break; 
            
            paragraphs.forEach(text => console.log(text));
            pageNumber++;
        }
    } catch (error) {
        console.error('Error in pagination scraping:', error.message);
    }
})();



