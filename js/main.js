import { getPhotos } from './api.js';
import { renderMiniatures } from './render-miniatures.js';
import { setupMiniaturesEvents } from './events.js';
import { PhotoUploadForm } from './form.js';
import { setupImageEffects } from './effects-slider.js';
import { validationForm } from './form-validation.js';

PhotoUploadForm();
setupImageEffects();
validationForm();

getPhotos()
  .then((photos) => {
    renderMiniatures(photos);
    setupMiniaturesEvents(photos);
  })
  .catch(() => {
    const errorTemplate = document.querySelector('#data-error');
    const fragment = errorTemplate.content.cloneNode(true);
    document.body.appendChild(fragment);
    setTimeout(() => {
      const errorElement = document.querySelector('.data-error');
      errorElement?.remove();
    }, 5000);
  });
