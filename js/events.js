import { showBigPicture, closeBigPicture } from './full-screen-picture.js';

export function setupMiniaturesEvents(photos) {
  const picturesContainer = document.querySelector('.pictures');
  const cancelButton = document.querySelector('.big-picture__cancel');

  picturesContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
      evt.preventDefault();
      const index = Number(pictureElement.dataset.index);
      showBigPicture(photos[index]);
    }
  });

  cancelButton.addEventListener('click', closeBigPicture);

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeBigPicture();
    }
  });
}
