function greetUser(user) {
    console.log("Hello ".concat(user.name).concat(user.middleName, ", you are ").concat(user.age, " years old."));
}
var user = { name: "Alice", age: 30, middleName: "John" };
greetUser(user); // Output: Hello Alice, you are 30 years old.  
function LoggreetUser(user) {
    console.log("Hello ".concat(user.name, " ").concat(user.lastName, ", you are ").concat(user.age, " years old."));
}
var user1 = { name: "Alice", lastName: "Smith", age: 30, };
LoggreetUser(user1); // Output: Hello Alice, you are 30 years old.
