// function checkLengthString(string, length) {
//   return string.length === length;
// }
// console.log(checkLengthString('string', 12));

// function checkPolindrome(string) {
//   let palindrome = '';
//   for(let i = string.length - 1;i >= 0; i--){
//     palindrome += string[i];
//   }
//   return palindrome.replaceAll(' ', '').toUpperCase() === string.replaceAll(' ', '').toUpperCase();
// }

// function returnNumber(string){
//   string = String(string);
//   let newNum = '';
//   for(let i = 0; i < string.length;i++){
//     if(!isNaN(Number(string[i])) && string[i] !== ' '){
//       newNum += string[i];
//     }
//   }
//   return newNum === '' ? NaN : Number(newNum);
// }
