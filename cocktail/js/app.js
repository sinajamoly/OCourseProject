// INSTANCIATE THE CLASSES
const ui = new UI();
const cockTail =new CockTailAPI();





//CREATE THE EVENT LISTENERS
function eventListener(){
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
                console.log(serverResponse);
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
            //display single recipe to the model
        });
    }
}