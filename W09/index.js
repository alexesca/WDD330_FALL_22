/**
 * Global Variable
 */

const global = this;

const x = 6;  // global variable created
window.x === x;


window.parseInt(4.2);
Number.parseInt(4.2);

window.alert('Hello');

window.confirm('Do you wish to continue?');

window.prompt('Please enter your name:');

// Navigation

window.location.href = 'https://www.sitepoint.com/javascript/'

window.location.origin
window.location.search
window.location.pathname

// Window history

window.history.go(1); // goes forward 1 page
window.history.go(0); // reloads the current page
window.history.go(-1); // goes back 1 page

const popup = window.open('https://sitepoint.com','SitePoint','width=400,height=400,resizable=yes');


/**
 * The Document Object
 */
const expiryDate = new Date();
const tomorrow = expiryDate.getTime() + 1000 * 60 * 60 * 24;
expiryDate.setTime(tomorrow);

document.cookie = `name=Batman; expires=${ expiryDate.toUTCString()}`;
document.cookie = 'name=Batman; max-age=86400' // 86400 secs = 1 day
document.cookie = 'name=Batman; domain=sitepoint.com';
document.cookie = 'name=Batman; expires=Thu, 01 Jan 1970 00:00:01 GMT';


// Timeouts

window.setTimeout( () => alert("Time's Up!"), 3000);

function chant(){ console.log('Beetlejuice'); }
const summon = window.setInterval(chant,1000);
window.clearInterval(summon); // Deleting one



// Local storage listener

addEventListener('storage', (event) => {
    console.log(`The ${event.key} was updated from ${event.oldValue} to ${event.newValue} and saved in 
${event.storageArea}`) }, false);



// Web  workers

const worker = new Worker('task.js');
worker.postMessage('Hello');
self.postMessage('Finished');
worker.addEventListener('message', (event) => {
    console.log(event.data);
}, false);
worker.terminate();
self.close();


