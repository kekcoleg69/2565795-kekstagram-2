
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Артём', 'Ольга', 'Дмитрий', 'Екатерина', 'Иван', 'София', 'Максим', 'Анна'];


function getRandomInt(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomArrayElem(array){
  const indexElem = Math.floor(Math.random() * array.length);
  return array[indexElem];
}
function createComment(idComment){
  const messageCount = getRandomInt(1, 2);
  let commentText = '';
  for(let i = 0; i < messageCount; i++){
    commentText += `${getRandomArrayElem(messages)} `;
  }
  commentText = commentText.trim();
  return {
    id: idComment,
    avatar: `img/avatar-${getRandomInt(1, 6)}.svg`,
    message: commentText,
    name: getRandomArrayElem(names)
  };
}

function createComments(){
  const comments = [];
  const commentsCount = getRandomInt(1,30);
  let commentId = 1;
  for(let i = 0; i < commentsCount; i++){
    comments.push(createComment(commentId));
    commentId++;
  }
  return comments;
}

function generatePhoto(id){
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание фотографии с id ${id}`,
    likes: getRandomInt(15,200),
    comments: createComments()
  };
}
function generatePhotos(){
  const photos = [];
  const countPhotos = 25;
  for(let i = 1; i <= countPhotos; i++){
    photos.push(generatePhoto(i));
  }
  return photos;
}
generatePhotos();
