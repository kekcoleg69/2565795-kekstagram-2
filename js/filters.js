// import { renderMiniatures } from './render-miniatures.js';
// import { setupMiniaturesEvents } from './events.js';
// import { debounce } from './util.js';

// const filtersContainer = document.querySelector('.img-filters');
// const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

// let currentPhotos = [];

// function clearPictures() {
//   document.querySelectorAll('.picture').forEach((el) => el.remove());
// }

// function setActiveButton(clickedButton) {
//   filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
//   clickedButton.classList.add('img-filters__button--active');
// }

// function getRandomPhotos(photos) {
//   const shuffled = photos.slice().sort(() => Math.random() - 0.5);
//   return shuffled.slice(0, 10);
// }

// function getDiscussedPhotos(photos) {
//   return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
// }

// function applyFilter(filterId) {
//   clearPictures();

//   let filteredPhotos = [];

//   switch (filterId) {
//     case 'filter-default':
//       filteredPhotos = currentPhotos;
//       break;
//     case 'filter-random':
//       filteredPhotos = getRandomPhotos(currentPhotos);
//       break;
//     case 'filter-discussed':
//       filteredPhotos = getDiscussedPhotos(currentPhotos);
//       break;
//   }

//   renderMiniatures(filteredPhotos);
//   setupMiniaturesEvents(filteredPhotos);
// }

// const debouncedApplyFilter = debounce(applyFilter, 500);

// export function setupFilters(photos) {
//   currentPhotos = photos;

//   filtersContainer.classList.remove('img-filters--inactive');

//   filterButtons.forEach((button) => {
//     button.addEventListener('click', () => {
//       setActiveButton(button);
//       debouncedApplyFilter(button.id);
//     });
//   });
// }
import { renderMiniatures } from './render-miniatures.js';
import { setupMiniaturesEvents } from './events.js';
import { debounce } from './util.js';

const filtersContainer = document.querySelector('.img-filters');
const filterButtons = filtersContainer.querySelectorAll('.img-filters__button');

let currentPhotos = [];

const clearPictures = () => {
  document.querySelectorAll('.picture').forEach((el) => el.remove());
};

const setActiveButton = (clickedButton) => {
  filterButtons.forEach((btn) => btn.classList.remove('img-filters__button--active'));
  clickedButton.classList.add('img-filters__button--active');
};

const getRandomPhotos = (photos) => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
};

const getDiscussedPhotos = (photos) =>
  photos.slice().sort((a, b) => b.comments.length - a.comments.length);

const applyFilter = (filterId) => {
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
};

const debouncedApplyFilter = debounce(applyFilter, 500);

export const setupFilters = (photos) => {
  currentPhotos = photos;

  filtersContainer.classList.remove('img-filters--inactive');

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveButton(button);
      debouncedApplyFilter(button.id);
    });
  });
};
