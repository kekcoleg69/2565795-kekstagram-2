
// export function getRandomInt(min, max){
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// export function getRandomArrayElem(arrayElements){
//   const indexElem = Math.floor(Math.random() * arrayElements.length);
//   return arrayElements[indexElem];
// }
// export function debounce(callback, timeoutDelay = 500) {
//   let timeoutId;
//   return (...rest) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
//   };
// }
export const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomArrayElem = (arrayElements) => {
  const indexElem = Math.floor(Math.random() * arrayElements.length);
  return arrayElements[indexElem];
};

export const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(...rest), timeoutDelay);
  };
};
