class CryptoApi{

    async queryAPI(currency, cryptocurrency){
        const url =await fetch
        (`https://api.coinmarketcap.com/v1/ticker/${cryptocurrency}/?convert=${currency}`);
        const result = await url.json();
        return{
            result
        }
    }


    async getCryptoCurrenciesList(){
        const url = await fetch('https://api.coinmarketcap.com/v1/ticker/');
        // return this as json
        const cryptoCurrencies = await url.json();
        return {
            cryptoCurrencies
        };
    }
}