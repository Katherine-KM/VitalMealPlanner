let darkmode = localStorage.getItem('darkMode'); 

// Add/Remove Directions

let addDirectionBtn = document.getElementById('add-direction-btn');
let directionList = document.querySelector('.direction-list');
let directionDiv = document.querySelectorAll('.direction-div')[0];

addDirectionBtn.addEventListener('click', createNewDirection); 

function createNewDirection() {
    let directionDiv = document.createElement('div');
    directionDiv.setAttribute('class', 'direction-div mb-1');
    let newDirection = document.createElement('textarea');
    newDirection.setAttribute('oninput', 'auto_grow(this)');
    newDirection.setAttribute('name', 'directions');
    newDirection.setAttribute('class', 'add-direction-input dm-container');
    if(darkmode === 'enabled'){
        newDirection.classList.add('darkmode');
        newDirection.classList.add('dm-dark-border');
    };
    directionDiv.appendChild(newDirection);
    directionList.appendChild(directionDiv); 
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn btn-outline-primary mx-2 fa fa-trash d-trash")
    directionDiv.appendChild(deleteButton).addEventListener("click", removeItem);
}
function removeDirection(el) {
    el.parentElement.remove();
}

function removeItem() {
    this.parentNode.remove();
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

// Add/Remove Ingredients 

let addIngredientBtn = document.getElementById('add-ingredient-btn');
let ingredientList = document.querySelector('.ingredient-list');
let ingredientDiv = document.querySelectorAll('.ingredient-div')[0];

addIngredientBtn.addEventListener('click', createNewIngredient); 

function createNewIngredient() {
    let ingredientDiv = document.createElement('div');
    ingredientDiv.setAttribute('class', 'ingredient-div mb-1');
    let newIngredient = document.createElement('textarea');
    newIngredient.setAttribute('oninput', 'auto_grow(this)');
    newIngredient.setAttribute('name', 'ingredient');
    newIngredient.setAttribute('class', 'add-ingredient-input dm-container');
    if(darkmode === 'enabled'){
        newIngredient.classList.add('darkmode');
        newIngredient.classList.add('dm-dark-border');
    };
    ingredientDiv.appendChild(newIngredient);
    ingredientList.appendChild(ingredientDiv); 
    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "btn btn-outline-primary mx-2 fa fa-trash d-trash")
    ingredientDiv.appendChild(deleteButton).addEventListener("click", removeItem);
}
function removeIngredient(el) {
    el.parentElement.remove();
}

// Category Tags
const tagTyper = document.querySelector('.tags input'); 
const removeAllTags = document.querySelector('.remove-all-tags');
const copy = document.querySelector('.copy');
let tags = [];

copy.onclick = () => {
    if(tags.length > 0) {
        navigator.clipboard.writeText(tags.join(','));
    }
}
removeAllTags.onclick = () => {
    document.querySelectorAll('.tag').forEach(tag => tag.remove());
}

function removeTag(el, targetTag) {
    el.parentElement.remove();
    tags = tags.filter(tag => tag != targetTag);
}

tagTyper.addEventListener('keyup', (e) => {
    if(e.key == 'Enter' || e.key == ','){
        let tagValue = tagTyper.value.replace(/\s+/g, '');
        if(!tags.includes(tagValue)){
            tags.push(...tagValue.split(',').filter(newTag => newTag != ''));
            tags = [...new Set(tags)];
            console.log(tags);
            createTag();
        }
        tagTyper.value = '';
    }
})

function createTag(){
    document.querySelectorAll('.tag').forEach(tag => tag.remove());
    for(tag of tags){
        let spanTag = `<span class="tag">${tag}<span class="remove-tag" onclick="removeTag(this, '${tag}')", >&times;</span></span>`;
        tagTyper.insertAdjacentHTML('beforebegin', spanTag);

    }
}



// const tagPossibilities = ['breakfast', 'lunch', 'dinner', 'appetizer', 'side-dish', 'salad', 'soup', 'dessert', 'alcohol', 'drinks', 'holiday', 'snacks', 'keto/ketogenic', 'low-carb', 'low-calorie(500cals or Less)', 'vegetarian', 'vegan', 'pescatarian', 'FODMAP', 'low-sugar']