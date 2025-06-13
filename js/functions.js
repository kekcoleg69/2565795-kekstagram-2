//Задания 2 модуля.

// function checkLengthString(string, length) {
//   return string.length === length;
// }
// checkLengthString('string', 5);

// function checkPolindrome(string) {
//   let palindrome = '';
//   for(let i = string.length - 1;i >= 0; i--){
//     palindrome += string[i];
//   }
//   return palindrome.replaceAll(' ', '').toUpperCase() === string.replaceAll(' ', '').toUpperCase();
// }
// checkPolindrome('string');
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
// returnNumber('42');

//Задание модуля 5.

function isMeetingInWorkHours(startWorkTime, endWorkTime,startMeetingTime, endMeetingTime){
  startWorkTime = startWorkTime.split(':');
  const startWorkTimeMinutes = +startWorkTime[0] * 60 + +startWorkTime[1];
  endWorkTime = endWorkTime.split(':');
  const endWorkTimeMinutes = +endWorkTime[0] * 60 + +endWorkTime[1];
  startMeetingTime = startMeetingTime.split(':');
  const startMeetingTimeMinutes = +startMeetingTime[0] * 60 + +startMeetingTime[1];
  return ((startMeetingTimeMinutes >= startWorkTimeMinutes && startMeetingTimeMinutes < endWorkTimeMinutes) && (startMeetingTimeMinutes + endMeetingTime) <= endWorkTimeMinutes);

}
isMeetingInWorkHours('08:00', '17:30', '14:00', 90); // true
isMeetingInWorkHours('8:0', '10:0', '8:0', 120); // true
isMeetingInWorkHours('08:00', '14:30', '14:00', 90); // false
isMeetingInWorkHours('14:00', '17:30', '08:0', 90); // false
isMeetingInWorkHours('8:00', '17:30', '08:00', 900); // false
