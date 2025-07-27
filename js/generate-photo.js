import { getRandomInt, getRandomArrayElem } from './util.js';
import { messages, names } from './constants.js';

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

export function generatePhotos(){
  const photos = [];
  const countPhotos = 25;
  for(let i = 1; i <= countPhotos; i++){
    photos.push(generatePhoto(i));
  }
  return photos;
}

