class UI{
    constructor(){
        this.init();
    }
    init(){
        this.printCryptoCurrencies();
    }
    // print option for the form
    printCryptoCurrencies(){
        cryptoAPI.getCryptoCurrenciesList().then(data=>{
            const cryptoCurrencies =data.cryptoCurrencies;
            //build select from select api
            const select = document.getElementById('cryptocurrency');
            cryptoCurrencies.forEach(currency =>{
                // add the <option>
                const option = document.createElement('option');
                option.value = currency.id;
                option.appendChild(document.createTextNode(currency.name));
                select.appendChild(option);
            });
        })
    }

    printMessage(message, className){
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        const messageDiv = document.querySelector('.messages');
        messageDiv.appendChild(div);
        //remove message
        setTimeout(()=>{
            document.querySelector('.messages div').remove();
        },3000);
    }
}