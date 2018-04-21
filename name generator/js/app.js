document.querySelector('#generate-names').addEventListener('submit',loadNames);


//execute the funvtion to query the api
function loadNames(e){
    e.preventDefault();

    //read the value from the form and create variables
    const origin = document.getElementById('country').value;
    const genre = document.getElementById('genre').value;
    const amount = document.getElementById('quantity').value;

    //build the URL
    let url = 'https://uinames.com/api/?';
    //read the origin and append to the url
    if(origin !== ''){
        url += `region=${origin}&`
    }
    if(genre !== ''){
        url += `gender=${genre}&`
    }
    if(amount!== ''){
        url += `amount=${amount}`
    }
    //AJAX call
    const xhr =new XMLHttpRequest();
    //open the connection
    // xhr.open('GET',url , true);
    //
    // //execute the function
    // xhr.onload = function(){
    //     if(this.status === 200){
    //         const names = JSON.parse(this.responseText);
    //         //insert into the HTML
    //         let html = '<h2>Generated Names</h2>';
    //         html += '<ul class="list">';
    //         names.forEach(function (name) {
    //             html +=`
    //                 <li>${name.name}</li>
    //             `;
    //         });
    //         html += '</ul>';
    //         document.querySelector('#result').innerHTML= html;
    //     }
    // }
    // xhr.send();

    fetch(url).then(function(response){
        return response.json();
    }).then(function(names){
        let html = '<h2>Generated Names</h2>';
                html += '<ul class="list">';
                names.forEach(function (name) {
                    html +=`
                        <li>${name.name}</li>
                    `;
                });
                html += '</ul>';
                document.querySelector('#result').innerHTML= html;
    }).catch(function (error){
        console.log(error);
    });

}