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

    displayResult(result,currency){
        let currencyName = '';
        currencyName = 'price_'+currency.toLowerCase();

       let HTMLTemplate = '';
       HTMLTemplate +=`
            <div class="card cyan darken-3">
                <div class="card-content white-text">
                    <span>Result</span>
                    <p>the price of ${result.name} is ${result[currencyName]} ${currency}</p>
                    <p>Last hour ${result.percent_change_1h}</p>
                    <p>Last Day ${result.percent_change_24h}</p>
                    <p>Last week ${result.percent_change_7d}</p>
                </div> 
            </div> 
       `;
       //spinner
        this.showSpinner();

        setTimeout(()=> {
            document.querySelector('.spinner img').remove();
            const divResult = document.querySelector('#result');
            divResult.innerHTML = HTMLTemplate;
        },3000);
    }

    showSpinner() {
        if(document.querySelector('#result .card')){
            const divResult = document.querySelector('#result .card').remove();
        }

        const spinnerGIF = document.createElement('img');
        spinnerGIF.src = 'img/spinner.gif';
        document.querySelector('.spinner').appendChild(spinnerGIF);
    }
}