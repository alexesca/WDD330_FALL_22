function square(x) {
    return x*x;
}

const clark = { name: 'Clark' };
const bruce = { name: 'Bruce' };

function sayHello(greeting='Hello'){
    return `${ greeting }, my name is ${ this.name }`;
}

sayHello.call(clark, 'How do you do');
sayHello.call(bruce);

square.apply(null, [4])



// Memoization

function square(x){
    square.cache = square.cache || {};
    if (!square.cache[x]) {
        square.cache[x] = x*x;
    }
    return square.cache[x]
}

square(3);
square(-11);



// Immediately invoked function expressions
// Useful to perform a task while keeping any variables wrapped up within the scope of the function.

(function(){
    const temp = 'World';
    console.log(`Hello ${temp}`);
})();



// Safe  use of strict mode

(function() {
    'use strict';

// All your code would go inside this function

})();


// Init-time branching

function ride(){
    if (window.unicorn) {
        ride = function(){
            // some code that uses the brand new and sparkly unicorn methods
            return 'Riding on a unicorn is the best!';
        }
    } else {
        ride = function(){
            // some code that uses the older pony methods
            return 'Riding on a pony is still pretty good';
        }
    }
    return ride();
}


// Recursion

function factorial(n) {
    if (n === 0) {
        return 1;
    } else {
        return n * factorial(n - 1);
    }
}


// Async functions

function wait(message, callback, seconds){
    setTimeout(callback,seconds * 1000);
    console.log(message);
}


// Avoid callback h.e.l.l

function login(userName, function(error,user) {
    if(error){
        throw error;
    } else {
        getPlayerInfo(user.id, function(error,info){
            if(error){
                throw error;
            } else {
                loadGame(info, function(error,game) {
                    if(error){
                        throw error;
                    } else {
                        // code to run game
                    }
                });
            }
        });
    }
});


// Avoid callback disaster with promises

const promise = new Promise( (resolve, reject) => {
    // initialization code goes here
    if (success) {
        resolve(value);
    } else {
        reject(error);
    }
});


// Async functions

async function loadGame(userName) {

    try {
        const user = await login(userName);
        const info = await getPlayerInfo (user.id);
        // load the game using the returned info
    }

    catch (error){
        throw error;
    }
}


// Closure

function outer() {
    const outside = 'Outside!';
    function inner() {
        const inside = 'Inside!';
        console.log(outside);
        console.log(inside);
    }
    console.log(outside);
    inner();
}


/**
 * Ajax
 */

fetch('https://example.com/data')
    .then( () => "OK" )
    .catch( (e) => e)

const url = 'https:example.com/data';

fetch(url)
    .then((response) => {
        if(response.ok) {
            return response;
        }
        throw Error(response.statusText);
    })
    .then( response => // do something with response )
    .catch( error => console.log('There was an error!') )



// Full scale example

const url = 'https:example.com/data';
const headers = new Headers({ 'Content-Type': 'text/plain', 'Accept-Charset' : 'utf-8', 'Accept-Encoding':'gzip,deflate' })

const request = (url,{
    headers: headers
})

fetch(request)
    .then( function(response) {
        if(response.ok) {
            return response;
        }
        throw Error(response.statusText);
    })
    .then( response => "oK")
    .catch( error => console.log('There was an error!') )

// Sending form information

const form = document.forms['todo'];

form.addEventListener('submit', addTask, false);

function addTask(event) {
    event.preventDefault();
    const task = new FormData(form);
    const url = `http://echo.jsontest.com/id/1/title/${form.task.value}`;
    const headers = new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    });
    const request = new Request(url,
        {
            method: 'POST',
            mode: 'cors',
            header: headers,
            body: JSON.stringify(task)
        }
    )

    fetch(request)
        .then( response => response.json() )
        .then( data => console.log(`${data.title} saved with an id of ${data.id}`) )
        .catch( error => console.log('There was an error:', error))

}
