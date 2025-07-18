const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureAllQuantityComments = bigPicture.querySelector('.social__comment-total-count');
// const bigPictureShownQuantityComments = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureDescription = bigPicture.querySelector('.social__caption');

export function showBigPicture(photo) {
  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');
  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureAllQuantityComments.textContent = photo.comments.length;
  bigPictureDescription.textContent = photo.description;
  bigPictureCommentsContainer.innerHTML = '';
  for(const comment of photo.comments){
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
  }
}

export function closeBigPicture(){
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
}
