import { sendFormData } from './api.js';

const form = document.querySelector('.img-upload__form');
const hashtagsInput = form.querySelector('.text__hashtags');
const commentInput = form.querySelector('.text__description');
const fileInput = document.querySelector('.img-upload__input');
const scaleInput = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');
const submitBtn = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'pristine-error img-upload__field-wrapper--error'
});

export function resetForm() {
  form.reset();
  pristine.reset();

  previewImg.style.transform = 'scale(1)';
  scaleInput.value = '100%';

  previewImg.style.filter = '';
  document.querySelector('#effect-none').checked = true;

  fileInput.value = '';
}

export function validationForm() {
  const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;
  const getHashtags = (value) => value.trim().toLowerCase().split(/\s+/).filter(Boolean);

  pristine.addValidator(
    hashtagsInput,
    (value) => getHashtags(value).length > 0,
  );

  pristine.addValidator(
    hashtagsInput,
    (value) => getHashtags(value).every((tag) => tag.length > 1),
    'Хэштег не может состоять только из символа #'
  );

  pristine.addValidator(
    hashtagsInput,
    (value) => getHashtags(value).every((tag) => HASHTAG_REGEX.test(tag)),
    'Хэштег должен начинаться с # и содержать только буквы и цифры, максимум 20 символов'
  );

  pristine.addValidator(
    hashtagsInput,
    (value) => getHashtags(value).length <= 5,
    'Можно указать не более 5 хэштегов'
  );

  pristine.addValidator(
    hashtagsInput,
    (value) => {
      const tags = getHashtags(value);
      return new Set(tags).size === tags.length;
    },
    'Хэштеги не должны повторяться'
  );

  pristine.addValidator(
    commentInput,
    (value) => value.length <= 140,
    'Комментарий не должен превышать 140 символов'
  );

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (isValid) {
      const formData = new FormData(form);

      submitBtn.disabled = true;
      submitBtn.textContent = 'Публикую...';

      sendFormData(formData)
        .then(() => {
          showSuccessMessage();
          resetForm();
        })
        .catch(() => {
          showErrorMessage();
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Опубликовать';
        });

    } else {
      showErrorMessage();
    }
  });
}

function showSuccessMessage() {
  const success = document.querySelector('#success');
  const fragment = success.content.cloneNode(true);
  const successBtn = fragment.querySelector('.success__button');

  document.body.appendChild(fragment);

  function removeSuccessMessage() {
    const successElement = document.querySelector('.success');
    successElement?.remove();
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onClickOutside);
  }

  successBtn.addEventListener('click', removeSuccessMessage);

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      removeSuccessMessage();
    }
  }

  function onClickOutside(evt) {
    if (!evt.target.closest('.success__inner')) {
      removeSuccessMessage();
    }
  }

  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onClickOutside);
}

function showErrorMessage() {
  const errorTemplate = document.querySelector('#error');
  const fragment = errorTemplate.content.cloneNode(true);
  const errorBtn = fragment.querySelector('.error__button');

  document.body.appendChild(fragment);

  function removeErrorMessage() {
    const errorElement = document.querySelector('.error');
    errorElement?.remove();
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onClickOutside);
  }

  errorBtn.addEventListener('click', removeErrorMessage);

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      removeErrorMessage();
    }
  }

  function onClickOutside(evt) {
    if (!evt.target.closest('.error__inner')) {
      removeErrorMessage();
    }
  }

  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onClickOutside);
}
