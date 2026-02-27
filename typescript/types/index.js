// types
var myString = "test";
var myNumber = 1;
var myBoolean = true;
myString = myNumber;
myString = myBoolean;
myNumber = myString;
myNumber = myBoolean;
myBoolean = myString;
myBoolean = myNumber;
console.log(myString, myBoolean, myNumber);
