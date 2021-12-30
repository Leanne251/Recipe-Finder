

const recipeForm = document.querySelector('#search-form');
const searchRecipe = document.querySelector('#search-recipe');
const recipeOptions = document.querySelector('.recipe-options');
const searchButton = document.querySelector('#search-recipe');

const findARecipe = document.querySelector('.find-a-recipe');
findARecipe.addEventListener("click", searchIngredients)

function searchIngredients () {

    recipeForm.style.display = "block";
    searchButton.style.display = "block";

}

searchRecipe.addEventListener("click", getRecipeOptions)

async function getRecipeOptions (){
   
    let item1 = document.querySelector('#item1').value  
    let item2 = document.querySelector('#item2').value
    let item3 = document.querySelector('#item3').value

        // const response = await fetch (`https://api.edamam.com/api/recipes/v2?type=public&q=${item1}&app_id=800e97dc&app_key=ee5cfbd4f93b8b69a5087c0f77ec80c7`);
    
        const response = await fetch (`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${item1},+${item2},+${item3}&number=3&apiKey=a555aea16fc3473197b4c2afa236c9f8`);
        console.log(response);
        const data = await response.json();
        console.log(data)

    // consider refactoring using a for loop? 
    const option1 = document.querySelector(".option1")
    const option2 = document.querySelector(".option2")
    const option3 = document.querySelector(".option3")
    
    option1.innerText = data[0].title;
    option2.innerText = data[1].title;
    option3.innerText = data[2].title;

    const option1Id = data[0].id
    console.log("option1", option1Id)
    
    const option2Id = data[1].id
    const option3Id = data[2].id

    recipeForm.style.display = "none";
    searchButton.style.display = "none";
    recipeOptions.style.display = "block";

    async function event_handler(event, option1Id, option1) {
   
        
   console.log("option1Id", option1Id)
    const recipeInfo = await fetch (`https://api.spoonacular.com/recipes/${option1Id}/information?includeNutrition=false&apiKey=a555aea16fc3473197b4c2afa236c9f8`)
    const recipeData = await recipeInfo.json();
    console.log("recipe data", recipeData)

    const ingredients = [];

    (recipeData.extendedIngredients).forEach(element => {
        ingredients.push(element.name)
    }  
    )
    
    const ingredientsDiv = document.createElement('div')
    ingredientsDiv.innerHTML = ingredients

    const method = document.createElement('div')
    method.innerHTML = recipeData.instructions

    const resultsContainer = document.querySelector('.results-flex-container')

    resultsContainer.appendChild(option1);
    const image = document.createElement('img');
    image.src = recipeData.image
    image.setAttribute("width", "300px")
    image.setAttribute("height", "300px")
    resultsContainer.appendChild(image)
    resultsContainer.appendChild(ingredientsDiv)
    resultsContainer.appendChild(method)

        
      }

   const showResults = (event) => event_handler(event, option1Id, option1 )

    option1.addEventListener("click", showResults);
    option2.addEventListener("click", showResults);
    option3.addEventListener("click", showResults);


    }




// }

    

