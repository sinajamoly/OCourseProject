class EventBrite{
    constructor(){
        this.token_auth = 'GSFXXNP32TTLRKXEFYCE';
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