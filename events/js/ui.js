class UI{
    constructor(){
        this.init();
    }

    init(){
        //display categories in <select>
        this.printCategories();
    }
    printCategories(){
        const categoriesList = eventBrite.getCategoriesAPI()
            .then(categories =>{
                const categoriesList = categories.categories.categories;
                const categoriesSelect = document.querySelector('#category');
                categoriesList.forEach(category =>{
                    const option = document.createElement('option');
                    option.value = category.id;
                    option.appendChild(document.createTextNode(category.name));
                    categoriesSelect.appendChild(option);
                })
            });
    }

    printMessage(message, classname){
        const div = document.createElement('div');
        div.className = classname;
        div.appendChild(document.createTextNode(message));
        const searchDiv = document.querySelector('#search-events');
        searchDiv.appendChild(div);
        setTimeout(()=>{
            document.querySelector('#search-events .alert').remove();
        },3000)
    }
}