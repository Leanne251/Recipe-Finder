const goButton = document.querySelector('.go-button');
const welcomeText = document.querySelector('.welcome-text');
const enteredName = document.querySelector('.entered-name');
const questionText = document.querySelector('.question-text');
const nameField = document.querySelector('.given-name');

const recipeForm = document.querySelector('#search-form');
const searchRecipe = document.querySelector('#search-recipe');
const recipeOptions = document.querySelector('.recipe-options');
const searchAgain = document.querySelector('.search-again');
const resultsContainer = document.querySelector('.results-flex-container');

goButton.addEventListener('click', changeWelcomeText);

function changeWelcomeText() {
	nameField.style.display = 'none';
	welcomeText.innerText = 'Welcome';
	const inputField = document.querySelector('input').value;
	enteredName.innerText = inputField.toUpperCase();
	questionText.innerText = `What would you like to do today? `;
}

const findARecipe = document.querySelector('.find-a-recipe');
findARecipe.addEventListener('click', searchIngredients);

function searchIngredients() {
	recipeForm.style.display = 'block';
	searchRecipe.style.display = 'block';
}

searchRecipe.addEventListener('click', getRecipeOptions);

// const ingredient3 = document.querySelector('#item3'); <<<< NOT REQUIRED?! ASYNC??

async function getRecipeOptions() {
	// must be three items as refers to three in put boxes

	//better the declare varibles outside so they can be resued to clear value later?

	let item1 = document.querySelector('#item1').value;
	let item2 = document.querySelector('#item2').value;
	let item3 = document.querySelector('#item3').value;
	// let item3 = ingredient3.value;
	// console.log('item 2&3', item1, item3);

	const response = await fetch(
		`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${item1},+${item2},+${item3}&number=3&apiKey=a555aea16fc3473197b4c2afa236c9f8`,
		{
			method: 'GET', // *GET, POST, PUT, DELETE, etc.
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache'
		}
	);
	console.log(response);
	const data = await response.json(); // array of data
	console.log(data);

	recipeForm.style.display = 'none';
	searchRecipe.style.display = 'none';

	const recipeId = {};
	const recipeArray = [];

	data.forEach((element) => {
		const recipeButton = document.createElement('button');
		recipeButton.setAttribute('class', 'button');
		recipeButton.innerText = element.title;
		recipeOptions.appendChild(recipeButton);
		recipeArray.push(element.id);
		recipeId[element.title] = element.id;

		// console.log("element.title", element.title )
		// console.log("element id", element.id )
		// console.log("recipe ID Object", recipeId)
		// console.log("recipeArray ID's", recipeArray)
	});

	searchRecipe.addEventListener('click', getRecipeOptions);

	const getRecipeInfo = (event) => accessApi(event, recipeId);

	recipeOptions.addEventListener('click', getRecipeInfo);

	async function accessApi(event, recipeId) {
		function findId() {
			for (const key in recipeId) {
				if (event.target.innerText === key) {
					return recipeId[key];
				}
			}
		}

		const foundId = findId();
		console.log(foundId);

		const recipeInfo = await fetch(
			`https://api.spoonacular.com/recipes/${foundId}/information?includeNutrition=false&apiKey=a555aea16fc3473197b4c2afa236c9f8`
		);
		const recipeData = await recipeInfo.json();
		console.log('recipe data', recipeData);

		const ingredients = [];
		recipeData.extendedIngredients.forEach((element) => {
			ingredients.push(element.name);
		});

		const ingredientsDiv = document.createElement('div');
		const newLine = document.createElement('br');
		ingredientsDiv.innerText = `What to Buy: \n ${ingredients}`;

		const method = document.createElement('div');
		method.innerHTML = `\n How To Cook: \n ${recipeData.instructions}`;

		const resultsContainer = document.querySelector('.results-flex-container');

		const title = document.createElement('h4');
		title.innerText = event.target.innerText;
		resultsContainer.appendChild(title);
		const image = document.createElement('img');
		image.src = recipeData.image;
		image.setAttribute('width', '300px');
		image.setAttribute('height', '300px');
		resultsContainer.appendChild(image);
		resultsContainer.appendChild(ingredientsDiv);
		resultsContainer.appendChild(newLine);

		resultsContainer.appendChild(method);

		recipeOptions.style.display = 'none';
		searchAgain.style.display = 'block';
	}
}

searchAgain.addEventListener('click', reStartSearch);

function reStartSearch() {
	resultsContainer.style.display = 'none';
	recipeForm.style.display = 'block';
	searchRecipe.style.display = 'block';
	item1.value = '';
	item2.value = '';
	item3.value = '';
}
