import axios from 'axios';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';

axios.defaults.headers.common['x-api-key'] =
  'live_HbIFh9cbhKGfdMHg6tnGBwIXK2jpKe6m7EWJh4gG7bkVCjxfoLmvZbLjHkFABpGf';

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
    const breedSelect = new SlimSelect({
    select: document.querySelector('.breed-select',)
  });
  } catch (error) {
    Notiflix.Notify.failure('Failed to fetch cat breeds');
    throw new Error('Failed to fetch cat breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );

    if (response.data.length === 0) {
      Notiflix.Notify.warning('No cat found for the selected breed ID');
      throw new Error('No cat found for the selected breed ID');
    }

    const catData = {
      breedName: response.data[0].breeds[0].name,
      description: response.data[0].breeds[0].description,
      temperament: response.data[0].breeds[0].temperament,
      imageUrl: response.data[0].url,
    };

    return catData;
  } catch (error) {
    Notiflix.Notify.failure('Failed to fetch cat information');
    throw new Error('Failed to fetch cat information');
  }
}

export { breedSelect };