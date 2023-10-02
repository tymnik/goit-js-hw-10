import { fetchBreeds, fetchCatByBreed, breedSelect } from './cat-api.js';

document.addEventListener('DOMContentLoaded', async () => {
  const breedSelect = document.querySelector('.breed-select');
  const catInfoContainer = document.querySelector('.cat-info');
  const loader = document.querySelector('.loader');
  const error = document.querySelector('.error');

  function showLoader() {
    loader.style.display = 'block';
    breedSelect.style.display = 'none';
    catInfoContainer.style.display = 'none';
    error.style.display = 'none';
  }

  function hideLoader() {
    loader.style.display = 'none';
    breedSelect.style.display = 'block';
    catInfoContainer.style.display = 'block';
  }

  function showError(errorMessage) {
    error.textContent = errorMessage;
    error.style.display = 'block';
  }

  try {
    showLoader();

    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    hideLoader();

    breedSelect.addEventListener('change', async event => {
      const selectedBreedId = event.target.value;

      try {
        showLoader();

        const catData = await fetchCatByBreed(selectedBreedId);

        catInfoContainer.innerHTML = `
          <h2>${catData.breedName}</h2>
          <p><strong>Description:</strong> ${catData.description}</p>
          <p><strong>Temperament:</strong> ${catData.temperament}</p>
          <img src="${catData.imageUrl}" width="100%" height="auto" alt="${catData.breedName}" />
        `;

        hideLoader();

        error.style.display = 'none';
      } catch (error) {
        console.error(error.message);
        showError('Oops! Something went wrong. Try reloading the page.');
        loader.style.display = 'none';
      }
    });
  } catch (error) {
    console.error(error.message);
    showError('Oops! Something went wrong. Try reloading the page.');
    loader.style.display = 'none';
  }
});
