import { getPhotos } from './api.js';
import { renderMiniatures } from './render-miniatures.js';
import { setupMiniaturesEvents } from './events.js';
import { PhotoUploadForm } from './form.js';
import { setupImageEffects } from './effects-slider.js';
import { validationForm } from './form-validation.js';
import { setupFilters } from './filters.js';

PhotoUploadForm();
setupImageEffects();
validationForm();

getPhotos()
  .then((photos) => {
    renderMiniatures(photos);
    setupMiniaturesEvents(photos);
    setupFilters(photos); // 👈 включаем фильтры
  })
  .catch(() => {
    const template = document.querySelector('#data-error');
    const fragment = template.content.cloneNode(true);
    document.body.appendChild(fragment);
    setTimeout(() => {
      document.querySelector('.data-error')?.remove();
    }, 5000);
  });
