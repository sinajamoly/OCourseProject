const cryptoAPI =new CryptoApi();
const ui = new UI();

const form =document.getElementById('form');
form.addEventListener('submit', e =>{
    e.preventDefault();
    const currencySelect = document.getElementById('currency').value;
    const cryptoCurrencySelect = document.getElementById('cryptocurrency').value;

    //validate
    if(currencySelect === '' || cryptoCurrencySelect === ''){
        ui.printMessage('All the fields are mandatory', 'deep-orange darken-4 card-panel');
    }else{
        console.log('success')
    }
})