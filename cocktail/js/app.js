// INSTANCIATE THE CLASSES
const ui = new UI();




//CREATE THE EVENT LISTENERS
function eventListener(){
    const searchForm = document.querySelector('#search-form');
    if(searchForm){
        searchForm.addEventListener('submit', getCocktails);
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
        console.log('Query the rest api');
    }
}