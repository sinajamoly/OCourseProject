//variable
const form = document.getElementById('request-quote');
const html = new HTMLUI();

//event listener
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded', function () {
        html.displayYears();
    });

//when the form is submitted
    form.addEventListener('submit',function(e){
        e.preventDefault();
        //read values from the form
        const make = document.getElementById('make').value;
        const year = document.getElementById('year').value;
        const level = document.querySelector('input[name="level"]:checked').value;

        //check all the feild have something
        if(make === '' || year === '' || level === ''){
            html.displayError('All the field are mandatory');
        }else{
            // make the quotation
            const insurance = new Insurance(make,year,level);
            const price =insurance.calculateQuotation(insurance);

            const prevResult = document.querySelector('#result div');
            if(prevResult != null){
                prevResult.remove();
            }


            // Print the result
            html.showResults(price ,insurance);
        }

    })
}






//object
function HTMLUI(){}


function Insurance(make,year,level) {
    this.make =make;
    this.year =year;
    this.level =level;
}
//calculate the price for current quotation
Insurance.prototype.calculateQuotation = function(insurance){
    let price;
    const base = 2000;

    //get the make
    const make = insurance.make;
    /*
        1 = american 1.15
        2 = american 1.05
        3 = american 1.35
     */
    switch(make){
        case '1':
            price = base * 1.15;
            break;
        case '2':
            price = base * 1.05;
            break;
        case '3':
            price = base * 1.35;
            break;
    }
    //get the year
    const year = insurance.year;
    const difference = this.getYearDifference(year);
    //each year the cost of the insurance 3% cheaper
    price = price * (1 - (0.03 * difference));

    //check the level of protection
    const level = insurance.level;
    price = this.calculateLevel(price , level);

    return price;
}

Insurance.prototype.getYearDifference = function (year) {
    return new Date().getFullYear() - year
}

Insurance.prototype.calculateLevel = function (price, level) {
    /*
        Basic insurance is going to increase the value by 30%
        Complete insurance is going to increase the value by 50%
     */

    if(level === 'basic'){
        price =price * 1.30;
    }else{
        price = price * 1.50
    }

    return price;
}

//function
HTMLUI.prototype.displayYears = function () {
    const max = new Date().getFullYear();
    const min = max - 20;

    //generate the list with the latest 20 years
    const selectYears = document.getElementById('year');

    //print the value
    for(let i = max; i >= min; i--){
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        selectYears.appendChild(option);
    }
}

HTMLUI.prototype.displayError = function (message) {
    const div = document.createElement('div');
    div.classList = 'error';
    div.innerHTML =`<p>${message}</p>`;
    form.insertBefore(div, document.querySelector('.form-group'));
    //remove
    setTimeout(function () {
        document.querySelector('.error').remove();
    },3000)
}

HTMLUI.prototype.showResults = function (price,insurance) {
    //print results
    const result =document.getElementById('result');
    let make = insurance.make;
    switch (make){
        case '1':
            make = 'American';
            break;
        case '2':
            make = 'Asian';
            break;
        case '3':
            make = 'European';
            break;
    }

    console.log(make);
    //create a div with the result
    const div = document.createElement('div');

    //insert result
    div.innerHTML = `
        <p class="header">Summary</p>
        <p class="">Make: ${make}</p>
        <p class="">Year: ${insurance.year}</p>
        <p class="">level: ${insurance.level}</p>
        <p class="total">Total: ${price}</p>`;
    const spinner = document.querySelector('#loading img');
    spinner.style.display = 'block';
    setTimeout(function () {
        spinner.style.display = 'none';
        result.appendChild(div);
    },3000)


}

