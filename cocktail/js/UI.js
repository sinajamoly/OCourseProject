

class UI{

    printMessage(message,className){
        const div = document.createElement('div');

        //add the HTML
        div.innerHTML = `<div class="alert alert-dismissible alert-${className}">
            <button type="button" class="close" data-dismiss="alert">x</button>
            ${message}
        </div>`;
        //insert before
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;
        parentNode.insertBefore(div, reference);
        setTimeout(()=>{
            document.querySelector('.alert').remove();
        },3000)
    }
}