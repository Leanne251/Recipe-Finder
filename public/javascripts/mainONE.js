

console.log("loading")

//  changing the title at the start 
const goButton = document.querySelector('.go-button');
const welcomeText = document.querySelector('.welcome-text');
const enteredName = document.querySelector('.entered-name');
const questionText = document.querySelector('.question-text');
const nameField = document.querySelector('.given-name');
const bakeACakeOption = document.querySelector('.bake-a-cake-options');

const newForm = document.createElement('form');
const br = document.createElement("br");
const brTwo = document.createElement("br");
const ingredientOne = document.createElement('input');
const button = document.createElement('button')
const searchBtn = document.getElementById('search-recipe');
const methodBtn = document.getElementById('search-recipe')



goButton.addEventListener("click", changeText);

function changeText (){

    const inputField = document.querySelector('input').value;
    
    nameField.style.display = "none";
    welcomeText.innerText = "Welcome"
    enteredName.innerText = inputField.toUpperCase();
    questionText.innerText = `What would you like to do today? `

}

// working on the button api's

// click the bake a cake button. 
// two input fields appear and attach to activity options box.
// click Search, and then search API with these new variables for a recipe. 
// two on click functions are needed


// function createBoxes(){


//         // if (bakeACakeOption.style.display === "none") {
//             ;
//         //   } else {
//         //     bakeACakeOption.style.display = "none";
//         // }

//         const item1 = document.getElementById('item1').value
//         const item2 = document.getElementById('item2').value

//         // searchBtn.addEventListener("click", getReceipesfromApi)
        
      
//    }

   async function getReceipesfromApi (){

    
   

    // console.log("items", item1, item2)
    const response = await fetch (`https://api.spoonacular.com/recipes/findByIngredients?ingredients=chocolate,+cherry,&number=2&apiKey=a555aea16fc3473197b4c2afa236c9f8`);
    console.log(response);
    const data = await response.json();
    console.log(data);

    const cakeButton1 = document.createElement('button')
    cakeButton1.innerText = data[0].title;
    const image = document.createElement('img');
    image.src = data[0].image
    bakeACakeOption.appendChild(image)
    bakeACakeOption.appendChild(cakeButton1)
    const cake1Id = data[0].id
    
    const cakeButton2 = document.createElement('button')
    cakeButton2.innerText = data[1].title;
    bakeACakeOption.appendChild(cakeButton2)
    
    
    cakeButton1.addEventListener("click", showDetails)

    

    async function showDetails (){
        const recipeInfo = await fetch (`https://api.spoonacular.com/recipes/637733/information?includeNutrition=false&apiKey=a555aea16fc3473197b4c2afa236c9f8`)
        const recipeData = await recipeInfo.json();
        console.log("recipeData", recipeData)

        const ingredients = [];

        (recipeData.extendedIngredients).forEach(element => {
            ingredients.push(element.name)
        }  
        )
        console.log(ingredients)

        const method = document.createElement('div')
        const myIngredients = document.createElement('div');

        method.innerHTML = recipeData.instructions
        myIngredients.innerHTML = ingredients;
        bakeACakeOption.appendChild(myIngredients);
        bakeACakeOption.appendChild(method);



    }


    const recipeId = data[0].id;
    
    

    
    // bakeACakeOption.style.display = "block"




    // bakeACakeOption.innerText = recipeData.title;

    // const image = document.createElement('img');
    // image.src = recipeData.image
    // bakeACakeOption.appendChild(image)
    // console.log("recipeid", recipeId)

    // const methodBtn = document.getElementById('search-recipe')
    // methodBtn.style.display = "block";

    // // const methodBtn = document.createElement('button')
    // // bakeACakeOption.appendChild(methodBtn)

    // // methodBtn.addEventListener("click", method)

    // //    function method (){

    // //    }
    
   

    


}

    // bakeACakeOption.style.display = block;
   
    // button.innerText = "Find Recipe";
    // ingredientOne.setAttribute("type", "text")
    // ingredientOne.setAttribute("placeholder", "Ingredient One")
    // const ingredientTwo = document.createElement('input');
    // ingredientTwo.setAttribute("type", "text")
    // ingredientTwo.setAttribute("placeholder", "Ingredient Two")
    // newForm.appendChild(ingredientOne)
    // newForm.appendChild(br)
    // newForm.appendChild(ingredientTwo) 
    // newForm.appendChild(brTwo)
    // newForm.appendChild(button)
    // bakeACakeOption.innerText = `What would you like in your cake?`
    // bakeACakeOption.appendChild(newForm);  

    
    

  



// function getReceipes () {
//     const createBoxes = createBoxes();
    
  
// }

const cakeButton = document.querySelector('.bake-a-cake');
cakeButton.addEventListener("click", getReceipesfromApi);