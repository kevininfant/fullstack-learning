//without class
var user1 = {
    name: "Shravan",
    age: 25,
    email: "123"
};
var user2 = {
    name: "Shravan Kumar",
    age: 28,
    email: " 123"
};
function getUserDetails(user) {
    console.log("Name : ".concat(user.name, " , Age : ").concat(user.age, " , Email : ").concat(user.email));
}
function getUserAge(user) {
    console.log(" , Age : ".concat(user.age, " "));
}
getUserDetails(user1);
getUserAge(user2);
