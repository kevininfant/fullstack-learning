var User = /** @class */ (function () {
    function User(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }
    User.prototype.getFullName = function () {
        return "Hello , ".concat(this.firstName, " ").concat(this.lastName);
    };
    User.prototype.getAge = function () {
        return this.age;
    };
    return User;
}());
//Creating instance of User class
var user1 = new User("Shravan", "Kumar", 25);
console.log(user1.getFullName());
console.log(user1.getAge());
