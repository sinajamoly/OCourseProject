//variable
const tweetList = document.getElementById('tweet-list');

//event listener
eventListener();
function eventListener() {
    document.querySelector('#form').addEventListener('submit', newTweet);
    //remove tweet from the list
    tweetList.addEventListener('click',removeTweet);
    //document
    document.addEventListener('DOMContentLoaded', localStorageOnLoad);
}

//function
function newTweet(e){
    e.preventDefault();
    //read the textarea value
    const tweet = document.getElementById('tweet').value;
    //create the remove button
    const removeBtn = document.createElement('a');
    removeBtn.classList = 'remove-tweet';
    removeBtn.textContent = 'X';
    //create an <li> element
    const li = document.createElement('li');
    li.textContent = tweet;
    li.appendChild(removeBtn);
    // add remote btn to li
    tweetList.appendChild(li);
    addTweetLocalStorage(tweet);
    //tweet added
    alert('tweet added');
}

//remove tweet from the dom
function removeTweet(e) {
    if(e.target.classList.contains('remove-tweet')){
        //e.target.parentNode.parentNode.removeChild(e.target.parentNode);
        //OR
        let tweet = e.target.parentElement.textContent;
        e.target.parentElement.remove();
        removeTweetLocalStorage(tweet);
    }
}

// adds the tweet to the local storage
function addTweetLocalStorage(tweet){
    let tweets =getTweetFromStorage();
    // add tweet to the array
    tweets.push(tweet);
    // Convert tweet array into string
    localStorage.setItem('tweets',JSON.stringify(tweets));
}

function getTweetFromStorage(){
    let tweets;
    const tweetLS = localStorage.getItem('tweets');
    if(tweetLS === null){
        tweets = [];
    }else{
        tweets = JSON.parse(tweetLS);
    }
    return tweets;
}

//localStorage on load
function localStorageOnLoad() {
    let tweets = getTweetFromStorage();
    tweets.forEach((tweet) => {
        const removeBtn = document.createElement('a');
        removeBtn.classList = 'remove-tweet';
        removeBtn.textContent = 'X';
        //create an <li> element
        const li = document.createElement('li');
        li.textContent = tweet;
        li.appendChild(removeBtn);
        // add remote btn to li
        tweetList.appendChild(li);
    });
}

function removeTweetLocalStorage(tweet){
    let tweets = getTweetFromStorage();

    const tweetDelete = tweet.substring(0, tweet.length -1);

    tweets.forEach((tweet,index)=>{
        if(tweetDelete == tweet){
            tweets.splice(index,1);
        }
    })
    //save the data
    localStorage.setItem('tweets' ,JSON.stringify(tweets));
}
