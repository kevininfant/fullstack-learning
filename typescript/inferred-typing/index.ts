// Inferred Typing – Simple Explanation
// --------------------------------------------------
// Inferred typing means the language automatically understands the type of a variable based on the value you assign to it, so you don’t need to explicitly mention the type.

// Simple example (TypeScript)
let count = 10;
// // TypeScript infers: count is number

count = 20;      // ✅ allowed
// count = "ten";   // ❌ error (string not allowed)

// Another simple example
let name = "Novac";
// // inferred as string

name = "Shravan"; // ✅
// name = 123;       // ❌ error

// Why this is inferred typing

// You did not write the type

// TypeScript figures it out automatically

// Type safety is still maintained

// One-line summary

// Inferred typing means the compiler automatically determines a variable’s type from its assigned value.