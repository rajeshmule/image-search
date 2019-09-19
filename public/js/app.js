const API_CLIENTID = 'd9b5a3b42f84c22557279038f984f3fa5a437179330e7b4901a2c4420bcff785'
const form = document.querySelector('form');
const input = document.querySelector('input');
const imageSection = document.querySelector('.images');
const API_URL = `https://api.unsplash.com/search/photos?page=1&per_page=20&client_id=${API_CLIENTID}`

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  let searchTerm = input.value;

  searchStart();
  search(searchTerm)
    .then(displayImages)
}

function searchStart() {
  imageSection.innerHTML = '';
}

function search(searchTerm) {
  let url = `${API_URL}&query=${searchTerm}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result.results;
    });
}

function displayImages(images) {
  images.forEach(image => {
    let imageContainer = document.createElement('div');
    imageContainer.className = 'ImageResult'
    imageContainer.innerHTML = `<img src="${image.urls.regular}">
    <a href="${image.links.html}" target="_blank" class="view_link">View on Unsplash</a>`;
    imageSection.appendChild(imageContainer);

  });
}