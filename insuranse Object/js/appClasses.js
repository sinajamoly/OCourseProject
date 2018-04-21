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

//function

