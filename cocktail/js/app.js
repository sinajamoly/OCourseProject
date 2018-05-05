// INSTANCIATE THE CLASSES
const ui = new UI();
const cockTail =new CockTailAPI();
const cockTailDB = new CockTailDB();





//CREATE THE EVENT LISTENERS
function eventListener(){

    document.addEventListener('DOMContentLoaded',documentReady)

    const searchForm = document.querySelector('#search-form');
    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);
    }
    const resultDiv = document.querySelector('#results');
    if(resultDiv){
        resultDiv.addEventListener('click', resultsDelegation);
    }
}
eventListener();

//GET COCKTAILS FUNCTION
function getCocktails(e){
    e.preventDefault();
    const searchTerm = document.querySelector('#search').value;
    //Check something on search input
    if(searchTerm === ''){
        //user interface error message
        ui.printMessage('please add something to the form', 'danger');
    }else{

        //server response from promise
        let serverResponse;


        //type of search
        const type = document.querySelector('#type').value;

        //evaluate the type of method
        switch(type){
            case 'name':
                serverResponse = cockTail.getDrinksByName(searchTerm);
                break;
            case 'ingredient':
                serverResponse = cockTail.getDrinksByIngredient(searchTerm);
                break;
            case 'category':
                serverResponse = cockTail.getDrinksByCategory(searchTerm);
                break;
            case 'alcohol':
                serverResponse = cockTail.getDrinksByAlcohol(searchTerm);
                break;
        }
        ui.clearResults();

        serverResponse.then(cockTails=>{
            if(cockTails.cockTails.drinks ===null){
                ui.printMessage('There are no result, try different term','danger')
            }else{
                if(type === 'name'){
                    ui.displayDrinksWithIngredients(cockTails.cockTails.drinks);
                }else{
                    ui.displayDrink(cockTails.cockTails.drinks);
                }

            }
        });
    }
}

function resultsDelegation(e) {
    e.preventDefault();
    if(e.target.classList.contains('get-recipe')){
        cockTail.getSingleRecipe(e.target.dataset.id).then(recipe => {
            ui.displaySingleRecipe(recipe.cockTails.drinks[0]);
        });
    }
    if(e.target.classList.contains('favorite-btn')){
        if(e.target.classList.contains('is-favorite')){
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';
            cockTailDB.removeFromDB(e.target.dataset.id);
        }else{
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';
            const cardBody = e.target.parentElement;
            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src,
            }
            cockTailDB.saveIntoDB(drinkInfo);
        }

    }
}

function documentReady() {
    //display on load when cocktail is favorite


    //select the search category
    const searchCategory = document.querySelector('.search-category');
    if(searchCategory){
        ui.displayCategories();
    }
    const favoritesTable = document.querySelector('#favorites');
    if(favoritesTable){
        const drinks = cockTailDB.getFromDB();
        ui.displayFavorites(drinks);
        favoritesTable.addEventListener('click',e =>{
            e.preventDefault();
            if(e.target.classList.contains('get-recipe')){
                cockTail.getSingleRecipe(e.target.dataset.id).then(recipe => {
                    ui.displaySingleRecipe(recipe.cockTails.drinks[0]);
                })
            }
            if(e.target.classList.contains('remove-recipe')){
                ui.removeFavorite(e.target.parentElement.parentElement);
                cockTailDB.removeFromDB(e.target.dataset.id);
            }
        })
    }
}