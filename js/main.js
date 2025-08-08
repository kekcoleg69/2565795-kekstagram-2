import { getPhotos } from './api.js';
import { renderMiniatures } from './render-miniatures.js';
import { setupMiniaturesEvents } from './events.js';
import { setupFilters } from './filters.js';
import { validateForm } from './form-validation.js';
import { uploadPhotoForm } from './form.js';
import { setupImageEffects } from './effects-slider.js';

getPhotos()
  .then((photos) => {
    renderMiniatures(photos);
    setupMiniaturesEvents(photos);
    setupFilters(photos);
  })
  .catch(() => {
    const errorTemplate = document.querySelector('#data-error');
    if (errorTemplate) {
      const error = errorTemplate.content.cloneNode(true);
      document.body.appendChild(error);
      setTimeout(() => {
        const shownError = document.querySelector('.data-error');
        if (shownError) {
          shownError.remove();
        }
      }, 5000);
    }
  });

uploadPhotoForm();
validateForm();
setupImageEffects();
