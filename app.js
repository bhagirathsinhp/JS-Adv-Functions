function add(num1, num2) {
  return num1 + num2;
}
console.log(add(1, 5));
console.log(add(12, 15));

function addRandom(num1) {
  return num1 + Math.random();
}
console.log(addRandom(5));

const hobbies = ["Sports", "Cooking"];
function printHobbies(h) {
  h.push("New Hobby");
  console.log(h);
}
printHobbies(hobbies);

function createTaxCalculator(tax) {
  function calculateTax(amount) {
    return amount * tax;
  }
  return calculateTax;
}
const calculateVatAmount = createTaxCalculator(0.2);
const calculateIncomeTaxAmount = createTaxCalculator(0.3);

console.log(calculateVatAmount(100));
console.log(calculateVatAmount(200));

let userName = "Max";
function greetUser() {
  // let name = userName;
  let name = "Anna";
  console.log("Hi " + name);
}
let name = "Maximilian";
userName = "Manuel";
greetUser();

// function powerOf(x, n) {
//   let result = 1;
//   for (let i = 0; i < n; i++) {
//     result *= x;
//   }
//   return result;
// }
// console.log(powerOf(2, 3));

// function powerOf(x, n) {
//   if (n === 1) {
//     return x;
//   }
//   return x * powerOf(x, n - 1);
// }

function powerOf(x, n) {
  return n === 1 ? x : x * powerOf(x, n - 1);
}
console.log(powerOf(2, 3));

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
function getFriendNames(person) {
  const collectedNames = [];
  if (!person.friends) {
    return [];
  }

  for (const friend of person.friends) {
    collectedNames.push(friend.name);
    collectedNames.push(...getFriendNames(friend));
  }
  return collectedNames;
}
console.log(getFriendNames(myself));
