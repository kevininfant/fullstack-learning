// class User{
//     firstName:string;
//     lastName:string;
//     age:number;

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

class person {
    name: string;
    age: number;
    lastName: string;
    middleName: string;
    

    constructor(name: string, age: number, lastName: string, middleName: string) {
        this.name = name;
        this.age = age;
        this.lastName = lastName;
        this.middleName = middleName;
        
    }

    greetUser() {
        console.log(`Hello ${this.name}${this.middleName}, you are ${this.age} years old.`);
    }

    LoggreetUser() {
        return`Hello ${this.name} ${this.lastName}, you are ${this.age} years old.`;
    }
    getAge() {
        return this.age;
    }
    
}

class User extends person {
    constructor(name: string, age: number, lastName: string, middleName: string) {
        super(name, age, lastName, middleName);
    }
}
class Admin extends person {
    role: string;
    constructor(name: string, age: number, lastName: string, middleName: string,role:string) {
        super(name, age, lastName, middleName);
        this.role=role;
    }
    greetUser() {
       console.log(`Hello ${this.name}${this.middleName}, you are ${this.age} years old.Role : ${this.role}`);
    }
    manageUsers() {
        return `managing users with role ${this.role}`;
    }
}

let user1 = new User("kevin",20,"john","rio");
let admin1 = new Admin("rio",25,"john","kevin","admin");


console.log(user1.LoggreetUser());
console.log(user1.getAge());
console.log(admin1.getAge());
console.log(admin1.manageUsers());