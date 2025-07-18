import { generatePhotos } from './generate-photo.js';
import { renderMiniatures } from './render-miniatures.js';
import { setupMiniaturesEvents } from './events.js';

const photos = generatePhotos();
renderMiniatures(photos);
setupMiniaturesEvents(photos);
