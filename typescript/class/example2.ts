class User{
    firstName:string;
    lastName:string;
    age:number;

    constructor(firstName:string,lastName:string,age:number){
        this.firstName=firstName;
        this.lastName=lastName;
        this.age=age;
    }

    getFullName():string{
        return `Hello , ${this.firstName} ${this.lastName}`;
    }
    getAge():number{
        return this.age;
    }
}

//Creating instance of User class
let user1=new User("Shravan","Kumar",25);
console.log(user1.getFullName());
console.log(user1.getAge());