// function reverseStr(str){
// let result = "";
// for(let i=str.length-1;i>=0;i--){
// result +=str[i];
// }
// return result;
// }

// console.log(reverseStr("Kevin hena"));

function revstr(val){
let res = "";
for(let i=val.length-1;i>=0;i--){
res +=val[i];
}
return res;
}

console.log(revstr("test data"))


function spsrmvres(val){
    let element;
    for (let i =val.length-1;i>=0; i--) {
        if(val[i] !== " ")
         element +=val[i]   
    }
    return element;
}

console.log(spsrmvres("Infant jenifer"));


// function revsstr2(str){
//     let ans="";
//     for(let j=str.length-1;j>=0;j--){
// ans +=str[j];
//     }
//     return ans;
// }

// console.log(revsstr2("Infant jenifer"));



// function Palindrome(val){
// let str = "";
// for(let i=val.length-1;i>=0;i--){
//     str +=val[i];
// }
// return str==val;
// }

// console.log(Palindrome("madam"));
// console.log(Palindrome("kevin"));


// function Palindrom2(val){
//     let ans = "";
//     for(j=val.length-1;j>=0;j--){
// ans +=val[j];
//     }
//     return ans ==val;
// }

// console.log(Palindrom2("madam"));
// console.log(Palindrom2("kevin"));




// function lrgfind(arr){

// let large = arr[0];

// for(let i=1; i<arr.length;i++){
//     if(arr[i]<large)
//         large=arr[i];
// }
// return large;
// }



// function lowestNum(arrval){
//     let lowval =arrval[0];
//     for(j=0;j-arrval-length;)

// }

// console.log(lrgfind([23,54,65,16,74,98,78,87,55,55,99,99]));


