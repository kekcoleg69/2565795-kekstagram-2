export function setupImageEffects() {
  const previewImage = document.querySelector('.img-upload__preview img');
  const sliderContainer = document.querySelector('.img-upload__effect-level');
  const sliderElement = document.querySelector('.effect-level__slider');
  const effectValue = document.querySelector('.effect-level__value');
  const effects = document.querySelectorAll('.effects__radio');

  const effectSettings = {
    none:    { range: [0, 100], start: 100, step: 1, unit: '', filter: '' },
    chrome:  { range: [0, 1], start: 1, step: 0.1, unit: '', filter: 'grayscale' },
    sepia:   { range: [0, 1], start: 1, step: 0.1, unit: '', filter: 'sepia' },
    marvin:  { range: [0, 100], start: 100, step: 1, unit: '%', filter: 'invert' },
    phobos:  { range: [0, 3], start: 3, step: 0.1, unit: 'px', filter: 'blur' },
    heat:    { range: [1, 3], start: 3, step: 0.1, unit: '', filter: 'brightness' }
  };

  noUiSlider.create(sliderElement, {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    connect: 'lower'
  });

  function updateSlider(effectName) {
    const settings = effectSettings[effectName];
    sliderElement.noUiSlider.updateOptions({
      range: { min: settings.range[0], max: settings.range[1] },
      start: settings.start,
      step: settings.step
    });
    effectValue.value = settings.start;
    updatePreviewStyle(effectName, settings.start);
  }

  function updatePreviewStyle(effectName, value) {
    const settings = effectSettings[effectName];
    if (effectName === 'none') {
      previewImage.style.filter = 'none';
      sliderContainer.classList.add('hidden');
    } else {
      previewImage.style.filter = `${settings.filter}(${value}${settings.unit})`;
      sliderContainer.classList.remove('hidden');
    }
  }

  sliderElement.noUiSlider.on('update', (values, handle) => {
    const currentEffect = document.querySelector('.effects__radio:checked').value;
    const value = values[handle];
    effectValue.value = value;
    updatePreviewStyle(currentEffect, value);
  });

  effects.forEach((effect) => {
    effect.addEventListener('change', () => {
      updateSlider(effect.value);
    });
  });

  updateSlider('none');
}
