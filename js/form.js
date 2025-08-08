import { resetForm } from './form-validation.js';
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const buttonDownload = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const buttonCancel = document.querySelector('.img-upload__cancel');
const previewImg = document.querySelector('.img-upload__preview img');
const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const defaultEffectRadio = document.querySelector('#effect-none');
const effectLevel = document.querySelector('.img-upload__effect-level');
const hashtagsInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');

let scale = 100;

const updateScale = () => {
  scaleInput.value = `${scale}%`;
  previewImg.style.transform = `scale(${scale / 100})`;
};

const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  previewImg.style.filter = 'none';
  defaultEffectRadio.checked = true;
  effectLevel.classList.add('hidden');

  scale = 100;
  updateScale();
};

const closeUploadModal = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  resetForm();
};

export const uploadPhotoForm = () => {
  smallerBtn.addEventListener('click', () => {
    if (scale > SCALE_MIN) {
      scale -= SCALE_STEP;
      updateScale();
    }
  });

  biggerBtn.addEventListener('click', () => {
    if (scale < SCALE_MAX) {
      scale += SCALE_STEP;
      updateScale();
    }
  });

  buttonDownload.addEventListener('change', () => {
    const file = buttonDownload.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      previewImg.src = imageURL;

      const effectPreviews = document.querySelectorAll('.effects__preview');
      effectPreviews.forEach((preview) => {
        preview.style.backgroundImage = `url(${imageURL})`;
      });

      openUploadModal();
    }
  });

  buttonCancel.addEventListener('click', () => {
    closeUploadModal();
  });

  uploadOverlay.addEventListener('click', (evt) => {
    const inner = uploadOverlay.querySelector('.img-upload__wrapper');
    if (!inner.contains(evt.target)) {
      closeUploadModal();
    }
  });

  document.addEventListener('keydown', (evt) => {
    const isInputFocused =
      document.activeElement === hashtagsInput ||
      document.activeElement === commentInput;

    const isErrorMessageShown = !!document.querySelector('.error');

    if (evt.key === 'Escape' && !isInputFocused && !isErrorMessageShown) {
      closeUploadModal();
    }
  });
};

export { closeUploadModal };
