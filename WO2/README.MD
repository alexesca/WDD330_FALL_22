// This is a comment

/**
 * This is a long comment
 */


const message = 'This is a message dialog!';
alert(message);


// Reserved words
// abstract, await, boolean, break, byte, case, catch, char, class, const, continue, debugger, 
// default, delete, do, double, else, enum, export, extends, false, final, finally, float, for, 
// function, goto, if, implements, import, in instanceof, int, interface, let, long, native, new, 
// null, package, private, protected, public, return, short, static, super, switch, synchronized, this, throw, throws, transient, true, try, typeof, var, volatile, void, while, with, yield


/**
 * Variables
 */

const name = 'Alexander'; // Inmmutable
let counter = 0; // Mutable


/**
 * Naming conventions
 */

firstNameAndLastName
first_name_and_last_name


/**
 * Dealing with strings
 */

const firstName = 'Alexander';
name.length; // Count chars
name.toUpperCase()
name.toLowerCase()
name.chartAt(1)
name.indexOf('A')
name.includes('Ale')
name.startsWith('A') // true
name.endsWith('Z') // false
'Hello'.concat(' World!!!');



/**
 * Arithmetic operations
 */

2*3
2/3
2+3
2-3


/**
 * Parsing numbers
 */

+'10'
parseInt("1010",2)
'5' * 1
Number("10")


/**
 * Booleans
 */

// In order to find the boolean value of a value

Boolean('hello'); // true
Boolean(42); // true
Boolean(0); // false


/**
 * Logical operators
 */

!true // false
!0 // true

!!true // true
!!0 // false




/**
 * Chapter 3: Arrays, logic and loops
 */

const list = []
const list = new Array()
list[0] = "My value"
alert(list[0])
const eterList = [ null, 1, [], 'two', true ];
const [x,y] = [1,2]; // Destructuring

// Methods

list.length
list.pop()
list.shift()
list.push("Milk");
avengers.unshift('Bread');
[...list1, ...list2]
list.join()
list.slice(2,5)
list.splice(2,1, "eggs")


/**
 * Sets
 */


const list = new Set();
list.add(1);
list.delete("Eggs")
const myList = [...mySet]


/**
 * Maps
 */

const atlas = new Map();
atlas.set(1, 'I')
atlas.delete('I')
[...atlas]




/**
 * Logic
 */


if (condition) {
// code to run if condition is true
} else {
// code to run if condition is false
}

switch (number) {
    case 4:
    console.log('Case 1');
    break;
    case 5:
    console.log('Case 2');
    break;
    case 6:
    console.log('Case 3');
    break;
    default:
    console.log('Default case');
    break;
}



/**
 * Loops
 */


let counter = 5;
while (counter > 0){
    console.log(counter);
    counter--;
}


let counter = 5;
for ( ; counter > 0 ; ) { // empty initialization and increment
    console.log(counter);
    counter--; // increment moved into code block
}




/**
 * Chapter 4: Functions
 */


// Multiple ways to declare functions

// Function Declarations
function doSomething() {
    // ... does something cool
}

// Function Expressions
const doSomething = function() {
    // ... does something cool
}

// Arrow functions
const doSomething = () => true