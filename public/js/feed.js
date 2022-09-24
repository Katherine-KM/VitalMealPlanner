// const searchForm = document.querySelector('#recipe-search-form');
// const searchResultDiv = document.querySelector('.search-result'); 
// const container = document.querySelector('container');
// let searchQuery = '';
// // add api key and api id to make it work 
// const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`; 

// searchForm.addEventListener('submit',(e)=>{
//     e.preventDefault();
//     searchQuery = e.target.querySelector('input').value;
//     console.log(searchQuery);
//     fetchAPI();
// })

// async function fetchAPI() {
//     const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}`;
//     const response = await fetch(baseURL)
//     const data = await response.json();
//     generateHTML(data.hits); 
//     console.log(data);
//     return data.hits
// }

// function generateHTML(results){
//     let generatedHTML = '';
//     results.map(result => {
//         generatedHTML += 
//         `
//         <div class="item">
//             <img src=${result.recipe.image} alt="">
//             <div class="flex-container">
//                 <h1 class="title">This is a recipe</h1>
//                 <button><a href="#">View Recipe</a></button>
//                 <p class="item-data">Calories: 120</p>
//             </div>
//         </div>
//         `
//     })
//     document.querySelector('#edamam').innerHTML = generatedHTML
// }

// console.log('hey buddy')