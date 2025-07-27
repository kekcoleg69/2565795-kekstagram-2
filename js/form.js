import { resetForm } from './form-validation.js';

export function PhotoUploadForm() {
  const buttonDownload = document.querySelector('.img-upload__input');
  const uploadOverlay = document.querySelector('.img-upload__overlay');
  const buttonCancel = document.querySelector('.img-upload__cancel');
  const previewImg = document.querySelector('.img-upload__preview img');
  const smallerBtn = document.querySelector('.scale__control--smaller');
  const biggerBtn = document.querySelector('.scale__control--bigger');
  const scaleInput = document.querySelector('.scale__control--value');
  const defaultEffectRadio = document.querySelector('#effect-none');
  const effectLevel = document.querySelector('.img-upload__effect-level');

  let scale = 100;
  const SCALE_STEP = 25;
  const SCALE_MIN = 25;
  const SCALE_MAX = 100;

  function updateScale() {
    scaleInput.value = `${scale}%`;
    previewImg.style.transform = `scale(${scale / 100})`;
  }

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
      previewImg.src = URL.createObjectURL(file);

      uploadOverlay.classList.remove('hidden');
      document.body.classList.add('modal-open');

      previewImg.style.filter = 'none';
      if (defaultEffectRadio) {
        defaultEffectRadio.checked = true;
      }
      if (effectLevel) {
        effectLevel.classList.add('hidden');
      }

      scale = 100;
      updateScale();
    }
  });

  buttonCancel.addEventListener('click', () => {
    uploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    resetForm();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      uploadOverlay.classList.add('hidden');
      document.body.classList.remove('modal-open');
      resetForm();
    }
  });
}
