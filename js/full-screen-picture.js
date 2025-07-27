const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureAllQuantityComments = bigPicture.querySelector('.social__comment-total-count');
const bigPictureShownQuantityComments = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const commentsLoader = document.querySelector('.social__comments-loader');

let archiveComments = [];

export function showBigPicture(photo) {
  bigPicture.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureAllQuantityComments.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;
  bigPictureCommentsContainer.innerHTML = '';


  archiveComments = [...photo.comments];

  renderComments();
}

export function closeBigPicture(){
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
}

export function renderComments(){
  const comments = archiveComments.splice(0,5);


  if(archiveComments.length === 0){
    commentsLoader.classList.add('hidden');
  }

  for(const comment of comments){
    const com = document.createElement('li');
    const comImg = document.createElement('img');
    const comText = document.createElement('p');
    com.appendChild(comImg);
    com.appendChild(comText);
    com.classList.add('social__comment');
    comImg.src = comment.avatar;
    comImg.alt = comment.name;
    comImg.classList.add('social__picture');
    comImg.width = 35;
    comImg.height = 35;

    comText.classList.add('social__text');
    comText.textContent = comment.message;

    bigPictureCommentsContainer.appendChild(com);

    bigPictureShownQuantityComments.textContent = bigPictureCommentsContainer.children.length;

  }
}
