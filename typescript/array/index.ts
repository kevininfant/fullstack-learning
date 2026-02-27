 var arrayOfNumber : number[] = [1,2,3,4,5,6,7,8,9,10];

 arrayOfNumber = [11,12,13];

//  arrayOfNumber = ["one","two"]


// In TypeScript, when you define an array type like number[], it means the array can store only numbers.
// TypeScript checks this at compile time to prevent mistakes.

// Simple Example
// let numbers: number[] = [1, 2, 3];

// numbers = [4, 5, 6];        // ✅ allowed
// numbers = ["one", "two"];  // ❌ error (string not allowed)


// Why error happens

// numbers is declared as number[]

// Strings are not numbers

// TypeScript stops the error before running the code

// One-line summary

// Once an array is typed in TypeScript, only that data type is allowed inside it.