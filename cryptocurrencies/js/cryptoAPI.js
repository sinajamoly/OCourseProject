class CryptoApi{

    async getCryptoCurrenciesList(){
        const url = await fetch('https://api.coinmarketcap.com/v1/ticker/');
        // return this as json
        const cryptoCurrencies = await url.json();
        return {
            cryptoCurrencies
        };
    }
}