const previewImg = document.querySelector('.img-upload__preview img');
const effectList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');

const EFFECTS = {
  none: {
    filter: 'none',
    unit: '',
    slider: { min: 0, max: 100, step: 1, start: 100 },
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    slider: { min: 0, max: 1, step: 0.1, start: 1 },
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    slider: { min: 0, max: 1, step: 0.1, start: 1 },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    slider: { min: 0, max: 100, step: 1, start: 100 },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    slider: { min: 0, max: 3, step: 0.1, start: 3 },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    slider: { min: 1, max: 3, step: 0.1, start: 3 },
  },
};

let currentEffect = 'none';

noUiSlider.create(sliderElement, {
  range: {
    min: EFFECTS.none.slider.min,
    max: EFFECTS.none.slider.max,
  },
  start: EFFECTS.none.slider.start,
  step: EFFECTS.none.slider.step,
  connect: 'lower',
});

function updateEffect(effectName) {
  const effect = EFFECTS[effectName];
  if (effectName === 'none') {
    previewImg.style.filter = 'none';
    effectLevel.classList.add('hidden');
  } else {
    effectLevel.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: effect.slider.min,
        max: effect.slider.max,
      },
      start: effect.slider.start,
      step: effect.slider.step,
    });
    previewImg.style.filter = `${effect.filter}(${effect.slider.start}${effect.unit})`;
    effectValue.value = effect.slider.start;
  }
}

sliderElement.noUiSlider.on('update', () => {
  const value = sliderElement.noUiSlider.get();
  effectValue.value = Number(value).toFixed(1).replace(/\.0$/, '');
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    previewImg.style.filter = 'none';
  } else {
    previewImg.style.filter = `${effect.filter}(${value}${effect.unit})`;
  }
});

effectList.addEventListener('change', (evt) => {
  if (evt.target.name === 'effect') {
    currentEffect = evt.target.value;
    updateEffect(currentEffect);
  }
});

export function resetEffect() {
  currentEffect = 'none';
  previewImg.style.filter = 'none';
  effectLevel.classList.add('hidden');
  sliderElement.noUiSlider.set(EFFECTS.none.slider.start);
  effectValue.value = EFFECTS.none.slider.start;
  document.querySelector('#effect-none').checked = true;
}

export function setupImageEffects() {
  updateEffect('none');
}
