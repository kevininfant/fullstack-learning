// Reverse a String
function reverseString(value) {
    return value.split('').reverse().join('');
}

const ans = reverseString("Hi Kevin How Are You ?");
console.log("🚀 ~ ans:", ans);



//Palindrome

function isPalindrome(str) {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    console.log("🚀 ~ isPalindrome ~ cleanedStr:", cleanedStr)
    
    return cleanedStr === cleanedStr.split('').reverse().join('');
}
console.log(isPalindrome("A man, a plan, a canal, Panama")); // Output: true


//3. FizzBuzz
// Write a function fizzBuzz(n) that prints numbers from 1 to n. For multiples of 3, print "Fizz" instead of the number, for multiples of 5 print "Buzz", and for numbers which are multiples of both 3 and 5, print "FizzBuzz".

function fizzBuzz(n) {
    for (let i = 1; i <= n; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            console.log("FizzBuzz");
        } else if (i % 3 === 0) {
            console.log("Fizz");
        } else if (i % 5 === 0) {
            console.log("Buzz");
        } else {
            console.log(i);
        }
    }
}
fizzBuzz(0); 


// find the longest words in the text
function longestWord(sentence) {
    const words = sentence.split(' ');
    console.log("🚀 ~ longestWord ~ words:", words)
    let longest = '';

    for (let word of words) {
        if (word.length > longest.length) {
            longest = word;
        }
    }

    return longest;
}
console.log(longestWord("The quick brown fox jumps over the lazy dog")); // Output: "jumps"



//remove dublicate array

function duplicateremover(array) {
    const single = [...new Set(array)];   
   return single;
}
console.log(duplicateremover([1, 2, 3, 2, 4, 1, 5]));


// Flatten a Nested Array

function flattenArray(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        // console.log("🚀 ~ flattenArray ~ arr[i]:", arr[i])
        if (Array.isArray(arr[i])) {
            console.log("🚀 ~ flattenArray ~ arr[i]:", arr[i])
        
            // If element is an array,
            //  recursively flatten it
            result = result
                .concat(flattenArray(arr[i]));
        } else {
            console.log("🚀 ~ flattenArray ~ arr[i]:", arr[i])
        
            // Otherwise add the element 
            // to the flattened array
            result
                .push(arr[i]);
        }
    }

    return result;
}

const nestedArray = [[1, 2], [3, [4, 5]]];
console.log(flattenArray(nestedArray));





//Sum of All Odd Numbers in an Array

function sumOfOdds(array) {
    // let result = 0;
//     for (let i = 0; i < array.length; i++) {
//         const element = array[i];
// if (array[i] % 2 != 0) {
//     result = result + array[i];
// } else {
//     console.log('not a odd number' + array[i])
// }    
//     }
//     return result; 
return array.filter(num => num % 2 !== 0).reduce((sum, num) => sum + num, 0);
}
console.log(sumOfOdds([1, 2, 3, 4, 5]));



//Count Vowels in a String

function countVowels(params) {
    let string ;
    string = Array.from(params);
    // console.log("🚀 ~ countVowels ~ string:", string)
    vowelsArr = 'aeiou';//['a','e','i','o','u'];
    let result = 0;
    for (let I = 0; I < string.length; I++) {
        if (vowelsArr.includes(string[I])) {
        result ++;
        }
        
    }
   return result;
    
}

console.log(countVowels("hello world"))