const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content;
const picture = pictureTemplate.querySelector('.picture');

export const renderMiniatures = (photos) => {
  const fragment = document.createDocumentFragment();

  for (const [index, photo] of photos.entries()) {
    const newElement = picture.cloneNode(true);
    const newElemImage = newElement.querySelector('.picture__img');
    const newElemComments = newElement.querySelector('.picture__comments');
    const newElemLikes = newElement.querySelector('.picture__likes');

    newElemImage.src = photo.url;
    newElemImage.alt = photo.description;
    newElemComments.textContent = photo.comments.length;
    newElemLikes.textContent = photo.likes;

    newElement.dataset.index = index;

    fragment.appendChild(newElement);
  }

  picturesContainer.appendChild(fragment);
};
