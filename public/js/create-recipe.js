let addIngredientBtn = document.getElementById('add-ingredient-btn');
let ingredientList = document.querySelector('.ingredient-list');
let ingredientDiv = document.querySelectorAll('.ingredient-div')[0];


addIngredientBtn.addEventListener('click', createNewIngredient); 

function createNewIngredient() {
    let newIngredient = ingredientDiv.cloneNode(true);
    let input = newIngredient.getElementsByTagName('input')[0];
    input.value = '';
    ingredientList.appendChild(newIngredient); 

// Delete Button
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn btn-outline-dark mx-2 fa fa-trash")
    newIngredient.appendChild(deleteButton).addEventListener("click", removeItem);
}

let addDirectionBtn = document.getElementById('add-direction-btn');
let directionList = document.querySelector('.direction-list');
let directionDiv = document.querySelectorAll('.direction-div')[0];

addDirectionBtn.addEventListener('click', createNewDirection); 

function createNewDirection() {
    let newDirection = directionDiv.cloneNode(true);
    let input = newDirection.getElementsByTagName('input')[0];
    input.value = '';
    directionList.appendChild(newDirection); 

// Delete Button
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn btn-outline-dark mx-2 fa fa-trash")
    newDirection.appendChild(deleteButton).addEventListener("click", removeItem);
}

function removeItem() {
    this.parentNode.remove();
}