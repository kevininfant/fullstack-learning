var complexType = { name : "John", age : 25 }
// complexType ={id : 2};
// complexType = {name : "john", id : 2, age :10};

console.log(complexType);


// its like any value missing its throing error its call duck-typing 



// Duck typing means the program does not care about the object’s type.
// It only checks whether the object has the required properties or methods.

// If the object has what the code needs → ✅ it works

// If the object is missing something → ❌ it throws an error (usually at runtime)

// 🦆 “If it looks like a duck and acts like a duck, it is treated as a duck.”

// Very simple example
function printName(user) {
  console.log(user.name);
}

printName({ name: "Novac" }); // ✅ works
// printName({ age: 25 });      // ❌ error (name not found)

// Why this is duck typing

// No type checking

// Only behavior / properties matter

// Missing required data causes an error

// One-line summary

// Duck typing allows objects to be used based on their structure, not their declared type.