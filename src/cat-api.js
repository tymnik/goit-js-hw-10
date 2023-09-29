import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_HbIFh9cbhKGfdMHg6tnGBwIXK2jpKe6m7EWJh4gG7bkVCjxfoLmvZbLjHkFABpGf';

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch cat breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );

    if (response.data.length === 0) {
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
    throw new Error('Failed to fetch cat information');
  }
}