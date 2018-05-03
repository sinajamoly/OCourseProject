class CockTailAPI{

    async getDrinksByName(name){
        //Search by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${name}`);
        //return json response
        const cockTails = await apiResponse.json();

        return {
            cockTails
        }
    }

    async getDrinksByIngredient(ingredient){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
        const cockTails = await apiResponse.json();
        return {
            cockTails
        }
    }

    async getSingleRecipe(id){
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);
        const cockTails = await apiResponse.json();
        return {
            cockTails
        }
    }
}