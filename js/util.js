
export function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getRandomArrayElem(array){
  const indexElem = Math.floor(Math.random() * array.length);
  return array[indexElem];
}
