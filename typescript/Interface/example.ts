interface User {
    name: string;
    age: number;
    lastName?:string
    middleName? :string
}


function greetUser(user: User) {
    console.log(`Hello ${user.name}${user.middleName}, you are ${user.age} years old.`);
}

const user = { name: "Alice", age: 30 ,middleName:"John" };
greetUser(user); // Output: Hello Alice, you are 30 years old.  

function LoggreetUser(user: User) {
    console.log(`Hello ${user.name} ${user.lastName}, you are ${user.age} years old.`);
}

const user1 = { name: "Alice", lastName: "Smith", age: 30,};
LoggreetUser(user1); // Output: Hello Alice, you are 30 years old.