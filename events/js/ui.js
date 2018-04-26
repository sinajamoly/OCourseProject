class UI{
    constructor(){
        this.init();
    }

    init(){
        //display categories in <select>
        this.printCategories();
        this.result = document.getElementById('result');
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

    displayEvents(events){
        //build Template
        let HTMLTemplate = '';
        events.forEach(eventInfo=>{
            HTMLTemplate += `
                 <div class="col-md-4 mt-4">
                    <div class="card">
                        <div class="card-body">
                            <img class="img-fluid mb-2" src="${eventInfo.logo !== null ? eventInfo.logo.url : ''}">
                        </div>
                        <div class="card-body">
                            <div class="card-text">
                                <h2 class="text-center card-title">${eventInfo.name.text}</h2>
                                <p class="lead text-info">Event Information:</p>
                                <p class="lead text-info">${eventInfo.description.text.substring(0,200)}. . .</p>
                                <span class="badge badge-primary">Capacity: ${eventInfo.capacity} </span>
                                <span class="badge badge-secondary">Date & Time ${eventInfo.start.local}</span>
                                <a href="${eventInfo.url}" target="_blank" class="btn btn-primary btn-block mt-4">Get The Ticket</a>
                            </div>
                        </div>
                    </div>
                </div>  
            `;
        });
        this.result.innerHTML = HTMLTemplate;
    }
}