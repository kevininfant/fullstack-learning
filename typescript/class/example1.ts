//without class
let user1={
    name:"Shravan",
    age:25,
    email:"123"}

    let user2={
    name:"Shravan Kumar",
    age:28,
    email:" 123"}
    function getUserDetails(user:{name:string,age:number,email:string}){
        console.log(`Name : ${user.name} , Age : ${user.age} , Email : ${user.email}`);
    }
function getUserAge(user:{age:number}){
    console.log(` , Age : ${user.age} `);
}


    getUserDetails(user1);
    getUserAge(user2);