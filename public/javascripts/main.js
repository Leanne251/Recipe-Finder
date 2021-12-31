const goButton = document.querySelector('.go-button');
const welcomeText = document.querySelector('.welcome-text');
const enteredName = document.querySelector('.entered-name');
const questionText = document.querySelector('.question-text');
const nameField = document.querySelector('.given-name');


goButton.addEventListener("click", changeText);

function changeText (){

    const inputField = document.querySelector('input').value;
    
    nameField.style.display = "none";
    welcomeText.innerText = "Welcome"
    enteredName.innerText = inputField.toUpperCase();
    questionText.innerText = `What would you like to do today? `
    

}


const recipeForm = document.querySelector('#search-form');
const searchRecipe = document.querySelector('#search-recipe');
const recipeOptions = document.querySelector('.recipe-options')
const searchAgain = document.querySelector('.search-again')
const resultsContainer = document.querySelector('.results-flex-container')


const findARecipe = document.querySelector('.find-a-recipe');
findARecipe.addEventListener("click", searchIngredients)

function searchIngredients () {

    recipeForm.style.display = "block";
    searchRecipe.style.display = "block";
    
}

searchRecipe.addEventListener("click", getRecipeOptions)    

async function getRecipeOptions (){
   
    // must be three items as refers to three in put boxes
    let item1 = document.querySelector('#item1').value  
    let item2 = document.querySelector('#item2').value
    let item3 = document.querySelector('#item3').value
    
        const response = await fetch (`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${item1},+${item2},+${item3}&number=3&apiKey=a555aea16fc3473197b4c2afa236c9f8`);
        console.log(response);
        const data = await response.json(); // array of data
        console.log(data)

        recipeForm.style.display = "none";
        searchRecipe.style.display = "none";

        const recipeId = {}
        const recipeArray = []

        data.forEach((element, index) => {

            const recipeButton = document.createElement('button') 
            recipeButton.setAttribute("class", "button")
           //  recipeButton.setAttribute("style", "background: blue; border: 1px solid black")
            recipeButton.innerText = element.title
            console.log("element.title", element.title )
            
            recipeOptions.appendChild(recipeButton)
            console.log("element id", element.id )
            recipeArray.push(element.id)
            recipeId[element.title] = element.id
            console.log("recipe ID Object", recipeId)
            console.log("recipeArray ID's", recipeArray)

})


searchRecipe.addEventListener("click", getRecipeOptions)  

const getRecipeInfo = (event) => accessApi(event, recipeId)

recipeOptions.addEventListener("click", getRecipeInfo)

 
async function accessApi(event, recipeId){


    function findId (){
        for (const key in recipeId) {
            if (event.target.innerText === key){
                return recipeId[key]
            }    
        }
    }
    
    const foundId = findId();
    console.log(foundId);

    const recipeInfo = await fetch (`https://api.spoonacular.com/recipes/${foundId}/information?includeNutrition=false&apiKey=a555aea16fc3473197b4c2afa236c9f8`)
    const recipeData = await recipeInfo.json();
    console.log("recipe data", recipeData)

    const ingredients = [];
    (recipeData.extendedIngredients).forEach(element => {
        ingredients.push(element.name)
    })
    
    const ingredientsDiv = document.createElement('div')
    ingredientsDiv.innerText = "What to Buy: \n" + ingredients;

    const method = document.createElement('div')
    method.innerHTML = `\n How To Cook: \n ${recipeData.instructions} \n`

    const resultsContainer = document.querySelector('.results-flex-container')

    const title = document.createElement('h4');
    title.innerText = event.target.innerText;
    resultsContainer.appendChild(title)
    const image = document.createElement('img');
    image.src = recipeData.image
    image.setAttribute("width", "300px")
    image.setAttribute("height", "300px")
    resultsContainer.appendChild(image)
    resultsContainer.appendChild(ingredientsDiv)
    resultsContainer.appendChild(method)
    
    recipeOptions.style.display = "none";
    searchAgain.style.display = "block";

}
    searchAgain.addEventListener("click", reStartSearch)
    
    function reStartSearch(){
        resultsContainer.style.display = "none";
        recipeForm.style.display = "block";
        searchRecipe.style.display = "block";



    }

}