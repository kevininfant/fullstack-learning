var conCatStrings = function (str1, str2, str3) {
    if (str3 === void 0) { str3 = 'hi'; }
    return str1 + str2 + str3;
};
console.log(conCatStrings('Hello', ' World')); // Output: Hello World
console.log(conCatStrings('Hello', 'test')); // Output: Hello       
