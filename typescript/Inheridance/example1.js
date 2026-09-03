// class User{
//     firstName:string;
//     lastName:string;
//     age:number;
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//     constructor(firstName:string,lastName:string,age:number){
//         this.firstName=firstName;
//         this.lastName=lastName;
//         this.age=age;
//     }
//     getFullName():string{
//         return `Hello , ${this.firstName} ${this.lastName}`;
//     }
//     getAge():number{
//         return this.age;
//     }
// }
// class Admin{
//     firstName:string;
//     lastName:string;
//     age:number;
//     role:string;
//     constructor(firstName:string,lastName:string,age:number,role:string){
//         this.firstName=firstName;
//         this.lastName=lastName;
//         this.age=age;
//         this.role=role;
//     }
//     getFullName():string{
//         return `Hello , ${this.firstName} ${this.lastName} Role : ${this.role}`;
//     }
//     getAge():number{
//         return this.age;
//     }
//     getRole():string{
//         return this.role;
//     }
//     manageUsers(){
//         return `managing users with role ${this.role}`;
//     }
// }
// let user1 = new User("kevin","john",25);
// let admin1 = new Admin("rio","john",25,"admin");
// console.log(user1.getFullName());
// console.log(user1.getAge());
// console.log(admin1.getFullName());
// console.log(admin1.getAge());
// console.log(admin1.manageUsers());
var person = /** @class */ (function () {
    function person(name, age, lastName, middleName) {
        this.name = name;
        this.age = age;
        this.lastName = lastName;
        this.middleName = middleName;
    }
    person.prototype.greetUser = function () {
        console.log("Hello ".concat(this.name).concat(this.middleName, ", you are ").concat(this.age, " years old."));
    };
    person.prototype.LoggreetUser = function () {
        return "Hello ".concat(this.name, " ").concat(this.lastName, ", you are ").concat(this.age, " years old.");
    };
    person.prototype.getAge = function () {
        return this.age;
    };
    return person;
}());
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(name, age, lastName, middleName) {
        return _super.call(this, name, age, lastName, middleName) || this;
    }
    return User;
}(person));
var Admin = /** @class */ (function (_super) {
    __extends(Admin, _super);
    function Admin(name, age, lastName, middleName, role) {
        var _this = _super.call(this, name, age, lastName, middleName) || this;
        _this.role = role;
        return _this;
    }
    Admin.prototype.greetUser = function () {
        console.log("Hello ".concat(this.name).concat(this.middleName, ", you are ").concat(this.age, " years old.Role : ").concat(this.role));
    };
    Admin.prototype.manageUsers = function () {
        return "managing users with role ".concat(this.role);
    };
    return Admin;
}(person));
var user1 = new User("kevin", 20, "john", "rio");
var admin1 = new Admin("rio", 25, "john", "kevin", "admin");
console.log(user1.LoggreetUser());
console.log(user1.getAge());
console.log(admin1.getAge());
console.log(admin1.manageUsers());
