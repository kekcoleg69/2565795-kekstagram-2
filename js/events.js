// import { showBigPicture, closeBigPicture, renderComments } from './full-screen-picture.js';

// export function setupMiniaturesEvents(photos) {
//   const picturesContainer = document.querySelector('.pictures');
//   const cancelButton = document.querySelector('.big-picture__cancel');
//   const commentsLoader = document.querySelector('.social__comments-loader');
//   const bigPicture = document.querySelector('.big-picture');
//   const commentInput = bigPicture.querySelector('.social__footer-text');

//   picturesContainer.addEventListener('click', (evt) => {
//     const pictureElement = evt.target.closest('.picture');

//     if (pictureElement) {
//       evt.preventDefault();
//       const index = Number(pictureElement.dataset.index);
//       showBigPicture(photos[index]);
//     }
//   });

//   function onCancelButtonClick() {
//     closeBigPicture();
//   }

//   cancelButton.addEventListener('click', onCancelButtonClick);

//   document.addEventListener('keydown', (evt) => {
//     const isTextInputFocused = document.activeElement === commentInput;
//     if (evt.key === 'Escape' && !isTextInputFocused) {
//       closeBigPicture();
//     }
//   });

//   commentsLoader.addEventListener('click', () => {
//     renderComments();
//   });
// }
import { showBigPicture, closeBigPicture, renderComments } from './full-screen-picture.js';

export const setupMiniaturesEvents = (photos) => {
  const picturesContainer = document.querySelector('.pictures');
  const cancelButton = document.querySelector('.big-picture__cancel');
  const commentsLoader = document.querySelector('.social__comments-loader');
  const bigPicture = document.querySelector('.big-picture');
  const commentInput = bigPicture.querySelector('.social__footer-text');

  picturesContainer.addEventListener('click', (evt) => {
    const pictureElement = evt.target.closest('.picture');

    if (pictureElement) {
      evt.preventDefault();
      const index = Number(pictureElement.dataset.index);
      showBigPicture(photos[index]);
    }
  });

  const onCancelButtonClick = () => {
    closeBigPicture();
  };

  cancelButton.addEventListener('click', onCancelButtonClick);

  document.addEventListener('keydown', (evt) => {
    const isTextInputFocused = document.activeElement === commentInput;
    if (evt.key === 'Escape' && !isTextInputFocused) {
      closeBigPicture();
    }
  });

  commentsLoader.addEventListener('click', () => {
    renderComments();
  });
};
