import { renderMiniatures } from './render-miniatures.js';
import { setupMiniaturesEvents } from './events.js';
import { debounce } from './util.js';

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

let currentPhotos = [];

function clearPictures() {
  document.querySelectorAll('.picture').forEach((el) => el.remove());
}

function setActiveButton(clickedButton) {
  filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  clickedButton.classList.add('img-filters__button--active');
}

function getRandomPhotos(arr) {
  const shuffled = arr.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}

function getDiscussedPhotos(arr) {
  return arr.slice().sort((a, b) => b.comments.length - a.comments.length);
}

function applyFilter(filterId) {
  clearPictures();

  let filteredPhotos = [];

  switch (filterId) {
    case 'filter-default':
      filteredPhotos = currentPhotos;
      break;
    case 'filter-random':
      filteredPhotos = getRandomPhotos(currentPhotos);
      break;
    case 'filter-discussed':
      filteredPhotos = getDiscussedPhotos(currentPhotos);
      break;
  }

  renderMiniatures(filteredPhotos);
  setupMiniaturesEvents(filteredPhotos);
}

const debouncedApplyFilter = debounce(applyFilter, 500);

// 👉 Основной экспорт
export function setupFilters(photos) {
  currentPhotos = photos;

  filtersContainer.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveButton(button); // вызывается сразу
      debouncedApplyFilter(button.id); // а фильтрация — с задержкой
    });
  });
}
