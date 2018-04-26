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
}