require("dotenv").config({ path: "./config/.env" });

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`; 
    const response = await fetch(baseURL)
    const data = await response.json();
    generateHTML(data.hits); 
    console.log(data);
}

module.exports = edamam;