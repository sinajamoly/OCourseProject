//UI ELEMENTS
const courses = document.querySelector('#courses-list');
const shoppingCartContent = document.querySelector('#cart-content tbody');
const clearCartBtn = document.querySelector('#clear-cart');

//Event Listener
loadEventListener();

function loadEventListener() {
    courses.addEventListener('click', buyCourses);
    shoppingCartContent.addEventListener('click', removeCourse);
    clearCartBtn.addEventListener('click', clearCart);
}




//function
function buyCourses(e) {
    e.preventDefault();
    //use delegation to find courses
    if(e.target.classList.contains('add-to-cart')){
        //read course values
        const course = e.target.parentElement.parentElement;

        //read course value
        getCourseInfo(course);
    }
}
//Reads the HTML information of the selected course
function getCourseInfo(course) {
    //create object with course data
    const courseInfo ={
        image: course.querySelector('img').src,
        title: course.querySelector('h4').textContent,
        price: course.querySelector('.price span').textContent,
        id:course.querySelector('a').getAttribute('data-id')
    }
    //insert into shopping card
    addIntoCart(courseInfo);
}

function addIntoCart(course) {
    //create a <tr>
    const row = document.createElement('tr');

    //Build the template
    row.innerHTML = `
        <tr>
            <td>
                <img src="${course.image}" width=100>
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="" class="remove" data-id=${course.id}>X</a>
            </td>
        </tr>
    `;
    //Add into shopping cart
    shoppingCartContent.appendChild(row);
}

// remove course from the dom
function removeCourse(e){
    if(e.target.classList.contains('remove')){
        e.preventDefault();
        e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
    }
}

function clearCart(){
    while(shoppingCartContent.firstChild){
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }
}