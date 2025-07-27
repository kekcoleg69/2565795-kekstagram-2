import { generatePhotos } from './generate-photo.js';
import { renderMiniatures } from './render-miniatures.js';
import { setupMiniaturesEvents } from './events.js';
import { PhotoUploadForm } from './form.js';
import { setupImageEffects } from './effects-slider.js';
import {validationForm} from './form-validation.js';

const photos = generatePhotos();
renderMiniatures(photos);
setupMiniaturesEvents(photos);
PhotoUploadForm();
setupImageEffects();
validationForm();
