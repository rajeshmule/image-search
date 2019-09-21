const API_CLIENTID = 'd9b5a3b42f84c22557279038f984f3fa5a437179330e7b4901a2c4420bcff785';
const form = document.querySelector('form');
const input = document.querySelector('input');
const imageSection = document.querySelector('.images');
const nextPage = document.getElementById('nextPage');
const previousPage = document.getElementById('previousPage');
const count = document.getElementById('count');

let currentPage = 1;

form.addEventListener('submit', formSubmitted);

function formSubmitted(event) {
  event.preventDefault();
  let searchTerm = input.value;

  searchStart();
  search(searchTerm, currentPage)
    .then(displayImages)
}

nextPage.onclick = function () {
  currentPage += 1;
  let searchTerm = input.value;
  searchStart();
  search(searchTerm, currentPage)
    .then(displayImages)
};


previousPage.onclick = function () {
  if (currentPage > 1) {
    currentPage -= 1;
    let searchTerm = input.value;
    searchStart();
    search(searchTerm, currentPage)
      .then(displayImages)
  }
};

function searchStart() {
  imageSection.innerHTML = '';
}

function search(searchTerm, currentPage) {
  let url = `https://api.unsplash.com/search/photos?page=${currentPage}&per_page=30&client_id=${API_CLIENTID}&query=${searchTerm}`;
  return fetch(url)
    .then(response => response.json())
    .then(result => {
      return result;
    });
}


function displayImages(result) {
  const images = result.results;
  if(images.length == 0){
  imageSection.innerHTML = `<h2>Image not found</h2>`;
 }
  images.forEach(image => {

    let imageContainer = document.createElement('div');
    imageContainer.className = 'ImageResult'
    imageContainer.innerHTML = `<img src="${image.urls.regular}">
    <a href="${image.links.html}" target="_blank" class="view_link">View on Unsplash</a>`;
    imageSection.appendChild(imageContainer);

  });
  const totalPages = result.total_pages;
  count.innerText = `${currentPage}/${totalPages}`;

}
