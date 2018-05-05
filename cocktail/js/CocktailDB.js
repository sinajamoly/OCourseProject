class CockTailDB{

    //save the recipes into local storage
    saveIntoDB(drink){
        const drinks = this.getFromDB();
        drinks.push(drink);
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    getFromDB (){
        let drinks;
        //check from local storage
        if(localStorage.getItem('drinks') === null){
            drinks = [];
        }else{
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks;
    }

    removeFromDB(id){
        const drinks = this.getFromDB();
        drinks.forEach((drink, index)=>{
            if(id === drink.id){
                drinks.splice(index,1);
            }
        });
        localStorage.setItem('drinks', JSON.stringify(drinks));
    }
}