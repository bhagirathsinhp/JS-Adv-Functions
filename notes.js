// Advanced Function Concepts....


// 1. Pure Functions & Side-Effects...

// A pure function is a function which for some given input(arguments) always produces the same outputs.
// The same args or the same values for the given args always produce the same output.
// It also doesn't trigger any side effect - meaning doesn't change anything outside the function.

// We got an HTML file which is empty.
// We create a pure function.
// We can use any function expression here.

function add(num1, num2) {
  return num1 + num2;
}
console.log(add(1,5));
console.log(add(12,15));
// Now as we open our page - we see the answers in the console and no matter how many times we reload the results stays the same.
// There is no randomness in this function.

// For the same values we input - 1,5 = we will always get the same result - 6 & 12,15 = 27.
// This the perfect example for the pure function as it doesn't change anything outside of the function and always produces the same result for the same input.

// What would be an example for Impure function?

function addRandom(num1){
  return num1 + Math.random();
}
console.log(addRandom(5));
// Here we see we get different results every time we relaod the page.
// Therefore if we can't predict the given output for the given input, the function would be an impure function.

// Also any function that changes anything outside of itself is also an impure function - side effects.
// This could be an HTTP request or data stored in the server or maybe a variable which is stored outside of the function and we change the variable somewhere else..

let previousResult = 0;
function addMoreNumbers (num1, num2){
  const sum = num1 + num2;
  previousResult = sum;
  return sum;
}
// The side effect the function introduces is the change of previousResult variable.

// Function that changes an object or an array - side effects for it...
const hobbies = ['Sports', 'Cooking'];
function printHobbies(h){
  h.push('New Hobby');
  console.log(h)
}
printHobbies(hobbies);
// Here we push a new hobby into the hobbies array.
// We change the array as arrays are objects and objects are reference.
// Here we work with the exact same object in the memory.


-------------------------------------------------------------------------------------------------


// 2. Impure VS Pure Functions...

// It's a good practice to work with pure functions without any side effects.
// But it's hard not to introduce side effects as we might wanna set up EL or send data to a server. And that is fine.

// The goal is to minimize the impure / side-effects functions.
// Try to keep the functions predictable and pure.
// It's okay that there are side-effects of the functions. 
// Keep appropriate names for side-effected functions - for eg function sendDataToServer(){} - is a function which is expected to send data to a server.
// Function with no side effects should be named accordingly.


---------------------------------------------------------------------------------------------------


// 3. Factory Functions...

// Idea behind Factory Functions is that we have a function which produces another function.

// For example we have various types of taxes we wanna calculate - so we create a function for it in which we can use those tax values. 
function calculateTax(amount, tax){
  return amount * tax;
};
const vatAmount = calculateTax(100, 0.25);
const incomeTax = calculateTax(100, 0.15);
// Now as this function is trivial but what if it were to be used in different parts of the software with the particular amount.
// Then we would have to call this function with these tax rates on the different parts.

// Here's where we can use a factory function.
// We move the above function in it.
// The main function will take our tax parameter.
// We can remove it from internal function cause of scope - the function in a function can access everything from the outer one.
// 
function createTaxCalculator(tax){
  function calculateTax(amount){
    return amount * tax;
  };

  return calculateTax;
}

// We return pointer to the calculate tax cause now we return a function which expects an amount as an input which doesn't need tax percentage as an input..
// We can create const of vat amount and income tax which holds the tax amount inside of the createTaxCalculator function.

const calculateVatAmount = createTaxCalculator(0.20);
const calculateIncomeTaxAmount = createTaxCalculator(0.30);

// As we call the outer function 2 times with different values - it's created twice and therefore the inner function is also created twice.
// So now tax amount is set in the functions.
// Now if we call the consts as consoles - with the amount values :::

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(200));
// This will calculate the amount twice.
// The values for amount is passed in.
// We get 2 different answers.

// That's the idea of a factory function as we can use it multiple times in our app and it can be preconfigured in a certain way so that calling it would be easy...


-----------------------------------------------------------------------------------------------------


// 4. Closures....

// Every function in JS is a Closure...
// What's a concept of being a closure then?
// It is closely related to the idea of having scopes for our variables.

// Block scopes for variables created with const or let.
// The function inside of a function can use all the variables of the outer function as well as the variables defined globally.
// the outer function can't access the inner functions specific consts or variables.

// We have lexical environment for each function and we have global environment as well.
// The variables and consts are registered in these environments.

// The function createTaxCalculator when created with tax parameter has it's own lexical environment and registers any variables it has access to inside - tax.

// The global environment should have the hobbies const.

// Inner function has it's own environment with the amount parameter but also has access to the outer funtion's environment.
// When we call the createTaxCalculator then the inner function is created.

// Therefore the outer function is created when the script parses but the inner function is created when the outer function is called.

// When the outer function runs, the inner function locks in the tax value.
// And when we call the outer function with a brand new tax value - and as we execute a brand new function - the inner function receives the brand new tax value.

// On other hand if we have some other variable in the global scope - and we use the variable inside the inner function. And then change that variable after we call the outer function - the changed variable value will be updated in the inner function and the value which was created before it will be removed...

// It tells us that we do lock in the value of tax as it's inside of the specific environment - but we don't lock in the value of that variable created on the global scope.

// Each function registers it's surrounding environment and the variables which are defined in there.
// And if the variable changes - the function takes the latest value. 
// But here the tax parameter never changes so the inner function won't take the new value. Yes the function is executed with different tax values - as the function is new itself and not just the value.

// Why is it called a Closure?
// Because every function closes OVER the surrounding environment which means it registers the surrounding environment and the variables registered there and memorizes the values of these variables.

// Every function in JS is a closure because it closes over the variables defined in it's environment and kinda memorizes them.
// So that they're not thrown away when we don't need them in the surrounding context.


---------------------------------------------------------------------------------------------------


// 5. Closures in Practice....

let userName = 'Max';
function greetUser(){
  console.log('Hi ' + userName)
}
greetUser();
// The function has it's own lexical environment in which we have a pointer to the outer environment which points to the user name.
// Since we do have access to the surrounding environment - we can access the username from inside of the function.
// We change the username to manuel before the function is called.
// We see Hi Manuel.

// The username is outside of the function environment. 
// The function closes over it and store it inside.
// But the variable is changed, the function reflects on that change.
// The function locks in the access to the variable and not the value of it.
// Hence we call the function, it gets the latest value of that variable and set it in there.

// What if we add a name variable and store username inside it and use it to console.
function greetUser(){
  let name = userName;
  console.log('Hi ' + name)
}
// Name is part of the lexical environment of the function itself which however points to the userName which is part of the outer lexical environment.

// We will see in the console, hi manuel.
// When the function executes - it reaches to the surrounding environment and gets the latest value from there.

// Now what happens if we store a value inside of the name variable and also change that variable's value outside of the function.
function greetUser(){
  let name = 'Anna';
  console.log('Hi ' + name)
}

let name = 'Maximilian';
// We see Hi Anna;
// Name is the variable inside of the function.
// We know the concept of Shadowing - the variable here with the same name inside and outside of the function.

// The inner environment wins over the outer environment.
// When the function is executed, it first checks the inner environment and if it doesn't find the variable there, then it goes to the next level - to the outer environment and checks the variable for that name.

// IMP - The special thing about functions is that they lock in the surrounding environment and it's variables so that they can remember it and use it when the function gets called even if that locked in variable wasn't used outside of the function before.
// So that JS doesn't dispose of these unused variables but keeps them so that function still can use them.
// Functions remember surrounding variables.


-------------------------------------------------------------------------------------------------------


// 6. Closures & Memory Management...

// If every function locks in surrounding variables - doesn't that leads to bad effect on the memory?

// What of the variables which function isn't interested in? Isn't that a memory issue?

// JS engines are smart - they optimize this.
// They track variable usage - so if variable isn't getting used by anything - then they will get rid of it in a safe way not crashing the application.


---------------------------------------------------------------------------------------------------------


// 7. Introducing "Recursion"...

// Recursion is a way of using functions.
// We create a function.
// It has x as the number and n as it's power - x=2 n=3, 2*2*2;
// We create a for loop.
function powerOf(x,n){
  let result = 1;
  for (let i = 0; i<n; i++){
    result *= x;
  }
  return result;
}
console.log(powerOf(2,3)); // 8 will be the answer.

// But with the concept of recursion we can write this in a short way.

// Idea behind recursion function is that the function calls itself.
function powerOf(x,n){
  return x * powerOf(x, n-1);
}
console.log(powerOf(2,3));
// We call the function inside the function with x, n-1. But obviously it would lead to an infinite loop.
// So we set an exit condition.

function powerOf(x,n){
  if(n===1){
    return x;
  }
  return x * powerOf(x, n-1);
}
console.log(powerOf(2,3)); // The answer is 8;

// This recursion functions works as -
// powerOf(2, 3) returns  2 * powerOf(2, 2)
// powerOf(2, 2) returns  2 * powerOf(5, 1)
// powerOf(2, 1) returns  2, and the recursion ends.
// So we can move back in this chain and see what will be returned in the end:
// Since powerOf(2, 1) returns  2, powerOf(2, 2) returns 2 * 2 = 4 , which means that powerOf(2, 3) returns  2 * 4 = 8.

// Refer the lecture for breakpoints and debugging.
// "In order to understand recursion, you have to understand recursion." - A Joke...

// The possible shortest way is to use the ternary expression.
function powerOf(x,n){
  return n === 1 ? x : x * powerOf(x, n - 1);
}
console.log(powerOf(2,3));


---------------------------------------------------------------------------------------------------


// 8. Advanced Recursion...

// Recursion can also solve problem which we couldn't solve with a for loop.
const myself = {
  name:'Max',
  friends:[
    {
      name: 'Manuel',
      friends: [
        {
          name: "Chris",
        }
      ]
    },
    {
      name: 'Julia'
    }
  ]
}
// So we have such nested data in various programmes.
// We know what the same kind of objects that are nested into eachother but we don't know how many it would be.
// We can't use for loop in the function to loop through all the friends.

// We can try it. We will accept the parameter of person in the function.
// We will use for loop with the person and go through all it's friends.
// But in the friends we also have friends nested in, so we go through them with a new nested for loop.
// Some friends might not have nested friends and some friends might have nested friends which then also would have nested friends for themselves.

// And even if we know the nested structure of how many friends are there - we would have tons of nested for loops - which is hard to read code.

function getFriendNames(person){
  for (const friends of person.friends){
    for (const friendsFriends of friends.friends){
      for(){}
    }
  }
}

// So in the best case, we would know how many nested loop we would need and that would be hard to read code.
// The worst case is that we don't know the levels of nesting we would need cause that data might be hardcoded by us which we would be downloading from a database which we create for users of our application.

// This is where recursion would shine!

// We create a const with empty array.
// We create a for loop and go through all the friends of the person.
// Then we will push friends.name into the collectedNames.
// Then we return the collectedNames.

function getFriendNames(person){
  const collectedNames = [];

  for (const friend of person.friends){
    collectedNames.push(friend.name);
  }
  return collectedNames;
}
console.log(getFriendNames(myself));
// We don't use recursion yet.
// console the getFriendNames with myself object const..
// We get Julia and Manuel.

// We will use recursion for all the nested friends of friends as well.

// We will use the function with friend parameter inside of the for loop.
// And the friend might not have nested friends - so for that we will first use if check to see.
// So we see if person.friend is a falsy value then it returns an empty array.
// And as we want the friends to appear in the collected friends names array - we will push the nested names into it.

function getFriendNames(person){
  const collectedNames = [];
  if(!person.friends){
    return [];
  }

  for (const friend of person.friends){
    collectedNames.push(friend.name);
    collectedNames.push(...getFriendNames(friend));
  }
  return collectedNames;
}

// We used ... spread operator for the getFriendNames cause it won't return a nested array inside the collected names array.
// We used spread to spread the array into multiple individual pieces. And since push takes multiple arguments as one, this will be added one by one to the array.

// So the nested friends will also be pushed in the array.
// We can also add nested friends to the nested friends and those names will also be pushed into the array.
const myself = {
  name: "Max",
  friends: [
    {
      name: "Manuel",
      friends: [
        {
          name: "Chris",
          friends: [
            {
              name: "Harry",
            },
            {
              name: "Amelia",
            },
          ],
        },
      ],
    },
    {
      name: "Julia",
    },
  ],
};

// getFriendNames(friend) - this is our Recursive call.
// This will go through as many levels of nested logic as we need cause it calls itself.
// The function dives into itself to find friends until there are no more friends.

// We have a function that calls itself and uses the return value of the internal function call.
// We will always need some exit condition or we will get an infinite call stack.


-------------------------------------------------------------------------------------------------------


// It's good to be aware of the different capabilities and different functionalities of JS Functions.

More on Closures (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures

Recursion (MDN): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions#Recursion