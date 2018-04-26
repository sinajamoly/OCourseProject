class EventBrite{
    constructor(){
        this.token_auth = 'GSFXXNP32TTLRKXEFYCE';
        this.orderby = 'date';
    }

    //get the event from API
    async queryAPI(eventName, category){
        const eventResponse = await fetch
        (`https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=${this.orderby}&categories=${category}&token=${this.token_auth}`);
        const events = await eventResponse.json();
        console.log(`https://www.eventbriteapi.com/v3/events/search/?q=${eventName}&sort_by=${this.orderby}&categories=${category}&token=${this.token_auth}`);
        return{
            events
        }
    }




    async getCategoriesAPI(){
        const categoriesResponse = await fetch
        (`https://www.eventbriteapi.com/v3/categories/?token=${this.token_auth}`);
        const categories = await categoriesResponse.json();

        return{
            categories
        }
    }
}