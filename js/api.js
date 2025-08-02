const SERVER_URL = 'https://32.javascript.htmlacademy.pro/kekstagram/';

export async function getPhotos() {
  try {
    const response = await fetch(`${SERVER_URL}data`);
    if (!response.ok) {
      throw new Error(`Ошибка загрузки данных: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error('Не удалось загрузить фотографии с сервера');
  }
}

export async function sendFormData(formData) {
  try {
    const response = await fetch(SERVER_URL, {
      method: 'POST',
      body: formData,
    });
    return response;
  } catch (error) {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз.');
  }
}
