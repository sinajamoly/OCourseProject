const eventBrite = new EventBrite();
const ui = new UI();

document.getElementById('submitBtn').addEventListener('click', e=>{
    e.preventDefault();

    const eventName =document.getElementById('event-name').value;
    const category =document.getElementById('category').value;

    if(eventName === '' || category === ''){
        ui.printMessage('Add an Event or City', 'alert alert-danger mt-4 text-center');
    }else{
        eventBrite.queryAPI(eventName,category).then(response => {
            const eventsList = response.events.events;
            if(eventsList.length > 0){
                ui.displayEvents(eventsList);
            }else{
                ui.printMessage('No result found', 'alert alert-danger mt-4 text-center')
            }
        });
    }
})