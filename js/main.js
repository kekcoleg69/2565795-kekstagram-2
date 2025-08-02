const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureAllQuantityComments = bigPicture.querySelector('.social__comment-total-count');
const bigPictureShownQuantityComments = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureCommentsContainer = bigPicture.querySelector('.social__comments');
const bigPictureDescription = document.querySelector('.social__caption');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');

let archiveComments = [];
let renderedCount = 0;
const COMMENTS_STEP = 5;

function updateLoaderVisibility() {
  if (renderedCount >= archiveComments.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
}

export function renderComments() {
  const nextComments = archiveComments.slice(renderedCount, renderedCount + COMMENTS_STEP);
  let added = 0;

  for (const comment of nextComments) {
    if (comment && typeof comment.message === 'string') {
      bigPictureCommentsContainer.appendChild(createComment(comment));
      added++;
    }
  }

  renderedCount += added;

  bigPictureShownQuantityComments.textContent = bigPictureCommentsContainer.children.length;
  bigPictureAllQuantityComments.textContent = archiveComments.length;

  updateLoaderVisibility();
}

function createComment(comment) {
  const li = document.createElement('li');
  li.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  img.width = 35;
  img.height = 35;

  const text = document.createElement('p');
  text.classList.add('social__text');
  text.textContent = comment.message;

  li.appendChild(img);
  li.appendChild(text);

  return li;
}

export function showBigPicture(photo) {
  bigPictureImg.src = photo.url;
  bigPictureImg.alt = photo.description;
  bigPictureLikes.textContent = photo.likes;
  bigPictureDescription.textContent = photo.description;

  archiveComments = photo.comments;
  renderedCount = 0;
  bigPictureCommentsContainer.innerHTML = '';

  renderComments();

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export function closeBigPicture() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  archiveComments = [];
  renderedCount = 0;
  bigPictureCommentsContainer.innerHTML = '';
}

closeButton.addEventListener('click', closeBigPicture);

document.addEventListener('keydown', (evt) => {
  const isHashtagFocus = document.activeElement.classList.contains('text__hashtags');
  const isCommentFocus = document.activeElement.classList.contains('text__description');

  if (evt.key === 'Escape' && !isHashtagFocus && !isCommentFocus) {
    closeBigPicture();
  }
});