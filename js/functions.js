function checkLengthString(string, length) {
  return string.length === length;
}
checkLengthString('string', 5);

function checkPolindrome(string) {
  let palindrome = '';
  for(let i = string.length - 1;i >= 0; i--){
    palindrome += string[i];
  }
  return palindrome.replaceAll(' ', '').toUpperCase() === string.replaceAll(' ', '').toUpperCase();
}
checkPolindrome('string');
function returnNumber(string){
  string = String(string);
  let newNum = '';
  for(let i = 0; i < string.length;i++){
    if(!isNaN(Number(string[i])) && string[i] !== ' '){
      newNum += string[i];
    }
  }
  return newNum === '' ? NaN : Number(newNum);
}
returnNumber('42');
