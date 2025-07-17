import { generatePhotos } from './data.js';
import { renderMiniatures } from './render-miniatures.js';
const photos = generatePhotos();
renderMiniatures(photos);
