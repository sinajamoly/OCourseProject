// variable
const sendBtn = document.getElementById('sendBtn');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const message = document.getElementById('message');
const resetBtn = document.getElementById('resetBtn');
const sendEmailForm = document.getElementById('email-form');

// Event listener

eventListener();

function eventListener(){
    //App init
    document.addEventListener('DOMContentLoaded', appInit);

    //validate the form
    email.addEventListener('blur', validateField);
    subject.addEventListener('blur', validateField);
    message.addEventListener('blur', validateField);

    //add reset btn
    sendEmailForm.addEventListener('submit',sendEmail);
    resetBtn.addEventListener('click',resetForm);
}

// function
function appInit(e) {
    sendBtn.disabled = true;
}

//send email
function sendEmail(e) {
    e.preventDefault();
    //show the spinner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'block';

    //
    const sendEmailImg = document.createElement('img');
    sendEmailImg.src = 'img/mail.gif';
    sendEmailImg.style.display = 'block';
    // hide spinner then show email image
    setTimeout(function(){
        spinner.style.display = 'none';
        document.querySelector('#loaders').appendChild(sendEmailImg);
        setTimeout(function () {
            sendEmailForm.reset();
            sendEmailImg.remove();
        },2000)
    },3000)

}

//validate field
function validateField() {
    let errors;

    //validate the lenght feild
    validateLenght(this);
    if(this.type ==='email'){
        validateEmail(this);
    }
    //Both will return errors then check if there are any error
    errors = document.querySelectorAll('.error');

    //check input are not empty
    if(email.value !== '' && subject.value !== '' && message.value !== ''){
        if(errors.length === 0){
            // btn must get enable
            sendBtn.disabled = false;
        }
    }

}
//validate lenght of the feild
function validateLenght(feild) {
    if(feild.value.length > 6){
        feild.style.borderBottomColor = 'green';
        feild.classList.remove('error');
    }else{
        feild.style.borderBottomColor = 'red';
        feild.classList.add('error');
    }
}

//validate Email
function validateEmail(feild){
    let emailText = feild.value;
    if(emailText.indexOf('@') !== -1){
        feild.style.borderBottomColor = 'green';
        feild.classList.remove('error')
    }else{
        feild.style.borderBottomColor = 'red';
        feild.classList.add('error');
    }
}

//reset Form
function resetForm(e) {
    e.preventDefault();
    sendEmailForm.reset();
}