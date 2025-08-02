import { sendFormData } from './api.js';
import { closeUploadModal } from './form.js';

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
  errorTextClass: 'pristine-error img-upload__field-wrapper--error',
});

export function resetForm() {
  form.reset();
  pristine.reset();

  previewImg.style.transform = 'scale(1)';
  scaleInput.value = '100%';
  previewImg.style.filter = '';
  fileInput.value = '';
  document.querySelector('#effect-none').checked = true;
}

export function validationForm() {
  const HASHTAG_REGEX = /^#[a-zа-яё0-9]{1,19}$/i;

  const getHashtags = (value) => {
    if (!value.trim()) {
      return [];
    }
    return value.trim().split(/\s+/).filter(Boolean).map((tag) => tag.toLowerCase());
  };

  pristine.addValidator(
    hashtagsInput,
    (value) => {
      const tags = getHashtags(value);
      return tags.length === 0 || tags.every((tag) => tag.length > 1);
    },
    'Хэштег не может состоять только из символа #'
  );

  pristine.addValidator(
    hashtagsInput,
    (value) => {
      const tags = getHashtags(value);
      return tags.length === 0 || tags.every((tag) => HASHTAG_REGEX.test(tag));
    },
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
    if (!isValid) {
      return;
    }

    const formData = new FormData(form);
    submitBtn.disabled = true;
    submitBtn.textContent = 'Публикую...';

    sendFormData(formData)
      .then((response) => {
        if (response.ok) {
          showSuccessMessage();
          closeUploadModal();
          resetForm();
        } else {
          showErrorMessage();
        }
      })
      .catch(showErrorMessage)
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Опубликовать';
      });
  });
}

function showSuccessMessage() {
  const template = document.querySelector('#success').content.cloneNode(true);
  const section = template.querySelector('.success');
  const button = section.querySelector('.success__button');

  document.body.appendChild(section);

  function removeSuccessMessage() {
    section.remove();
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onOutsideClick);
  }

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      removeSuccessMessage();
    }
  }

  function onOutsideClick(evt) {
    if (evt.target === section) {
      removeSuccessMessage();
    }
  }

  button.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onOutsideClick);
}

function showErrorMessage() {
  const template = document.querySelector('#error').content.cloneNode(true);
  const section = template.querySelector('.error');
  const button = section.querySelector('.error__button');

  document.body.appendChild(section);

  function removeErrorMessage() {
    section.remove();
    document.removeEventListener('keydown', onEsc);
    document.removeEventListener('click', onOutsideClick);
  }

  function onEsc(evt) {
    if (evt.key === 'Escape') {
      removeErrorMessage();
    }
  }

  function onOutsideClick(evt) {
    if (evt.target === section) {
      removeErrorMessage();
    }
  }

  button.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', onEsc);
  document.addEventListener('click', onOutsideClick);
}
