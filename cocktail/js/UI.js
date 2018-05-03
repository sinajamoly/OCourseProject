

class UI{

    displayCategories(){
        const categoryList = cockTail.getCategories()
            .then(categories =>{
                const catList = categories.categories.drinks;
                console.log(catList);
                //Appent first option without value
                const firstOption = document.createElement('option');
                firstOption.textContent = '-Select-';
                firstOption.value = '';
                document.querySelector('#search').appendChild(firstOption);
                //
                catList.forEach(category => {
                    const option = document.createElement('option');
                    option.textContent = category.strCategory;
                    option.value = category.strCategory.split(' ').join('_');
                    document.querySelector('#search').appendChild(option);
                })
            });
    }

    displaySingleRecipe(recipe){
        const modalTitle = document.querySelector('.modal-title'),
            modalDescription = document.querySelector('.modal-body .description-text'),
            modalIngredient = document.querySelector('.modal-body .ingredient-list .list-group');
        //set the value
        modalTitle.innerHTML = recipe.strDrink;
        modalDescription.innerHTML = recipe.strInstructions;
        modalIngredient.innerHTML =  this.displayIngredients(recipe);
    }

    displayDrink(drinks){
        //show the results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';

        //Insert the results
        const resultsDiv = document.querySelector('#results');

        drinks.forEach(drink=>{
            resultsDiv.innerHTML += `
                <div class="col-md-4">
                    <div class="card my-3">
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <a data-target="#recipe" class="btn btn-success get-recipe" href="#" data-toggle="modal" data-id="${drink.idDrink}">Get Recipe</a>
                        </div>
                    </div>
                </div>
            `;
        })

    }

    displayDrinksWithIngredients(drinks){
        //show the results
        const resultsWrapper = document.querySelector('.results-wrapper');
        resultsWrapper.style.display = 'block';
        //Insert the results
        const resultsDiv = document.querySelector('#results');
        drinks.forEach(drink =>{
            resultsDiv.innerHTML +=`
                <div class="col-md-6">
                    <div class="card my-3">
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instructions</p>
                            <p class="card-text">
                                ${drink.strInstructions}
                            </p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item alert alert-danger">Ingredients</li>
                                    ${this.displayIngredients(drink)}
                                </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Information:</p>
                            <p class="card-text">
                                <span class="badge badge-pill badge-success">
                                    ${drink.strAlchoholic}
                                </span>
                                <span class="badge badge-pill badge-warning">
                                    category: ${drink.strCategory}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        })
    }


    //Print the ingredients and measurements
    displayIngredients(drink){
        let ingredients = [];
        for(let i = 1; i<16 ; i++){
            const ingredientMeasure = {};
            if(drink[`strIngredient${i}`] !== ''){
                ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                ingredientMeasure.measure = drink[`strMeasure${i}`];
                ingredients.push(ingredientMeasure);
            }
        }
        //build the template
        let ingredientsTemplate = '';
        ingredients.forEach(ingredient=>{
            ingredientsTemplate += `
                 <li class="list-group-item">
                    ${ingredient.ingredient} - ${ingredient.measure}
                 </li>
            `;
        });
        return ingredientsTemplate;
    }

    printMessage(message,className){
        const div = document.createElement('div');

        //add the HTML
        div.innerHTML = `<div class="alert alert-dismissible alert-${className}">
            <button type="button" class="close" data-dismiss="alert">x</button>
            ${message}
        </div>`;
        //insert before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
    }

    clearResults(){
        const resultsDiv = document.querySelector('#results');
        resultsDiv.innerHTML = '';
    }
}