
console.log(a); // undefined

var a = 5;

console.log(a); // 5


// Explanation:

// Step 1: During the creation phase, JavaScript hoists variable declarations (but not their values).
// So internally, the code looks like this:

// var a;        // declaration hoisted
// console.log(a); // a exists but is undefined
// a = 5;        // assignment happens here
// console.log(a);


// Step 2: The first console.log(a) runs before a is assigned → outputs undefined.

// Step 3: Then a = 5; assigns 5 to a.

// Step 4: The second console.log(a) prints 5.


// ------------------------------------------------------

console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");

// Execution Flow (Event Loop order)

// Synchronous code runs first (top to bottom).
// ✅ console.log("1") → prints 1
// ✅ setTimeout(...) is scheduled (callback goes to macrotask queue)
// ✅ Promise.resolve().then(...) is scheduled (callback goes to microtask queue)
// ✅ console.log("4") → prints 4

// After synchronous code finishes,

// Microtasks (Promises) run before macrotasks (like setTimeout).

// 🔁 Step-by-step output order:

// 1️⃣ console.log("1") → 1
// 2️⃣ console.log("4") → 4
// 3️⃣ Promise callback ("3") → 3
// 4️⃣ setTimeout callback ("2") → 2

// -----------------------------------------------------------------------

let a = 5;
console.log(a);
{
  let a = 10;
  console.log(a);
}
console.log(a);


// 🔍 Step-by-Step Explanation

// 1️⃣ let a = 5;
// → A variable a is declared in the global (outer) scope and assigned 5.

// 2️⃣ console.log(a);
// → Prints 5.

// 3️⃣ { let a = 10; console.log(a); }
// → A new block scope is created.
// → Inside this block, a different a is declared (this shadows the outer one).
// → Prints 10.

// 4️⃣ console.log(a); (after the block)
// → The inner a is gone (its scope ended).
// → The outer a is still 5.
// → Prints 5 again.


console.log(typeof null);
console.log(typeof undefined);


// 🧠 Explanation

// 1️⃣ typeof null
// → Returns "object" 😮

// This is actually a well-known JavaScript bug — a historical mistake from the first JS implementation.

// In the early days, values were stored as “type tags”.

// The tag for objects was 0.

// Unfortunately, null also used the same tag — so it was misclassified as an object.

// This behavior was never fixed to preserve backward compatibility.

// ✅ So:

// typeof null === "object"


// 2️⃣ typeof undefined
// → Returns "undefined" (as expected).

// ✅ Final Output:
// object
// undefined


//--------------------------------------

var x = 10;
function test() {
  console.log(x);
  var x = 20;
}
test();

// 🔍 Step-by-step Execution
// 1️⃣ var x = 10;
// → A global variable x is declared and initialized to 10.

// 2️⃣ Function test() is defined (but not run yet).

// 3️⃣ test() is called — execution enters the function scope.

//---------------------------------------------------
