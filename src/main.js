import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

import { getImagesByQuery } from './js/pixabay-api';

const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalPages = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', loadMore);

async function handleSubmit(event) {
  event.preventDefault();

  query = event.target.elements.query.value.trim();
  page = 1;

  if (!query) {
    iziToast.error({ message: 'Please enter a search query!' });
    return;
  }

  clearGallery();
  hideLoadMoreButton();

  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    if (!data.hits.length) {
      iziToast.error({ message: 'No images found' });
      hideLoader();
      return;
    }

    createGallery(data.hits);

    totalPages = Math.ceil(data.totalHits / 15);
    if (page < totalPages) showLoadMoreButton();
  } catch (error) {
    iziToast.error({ message: 'Error loading images' });
  }

  hideLoader();
}

async function loadMore() {
  page++;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    smoothScroll();

    if (page >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
      });
    }
  } catch (error) {
    iziToast.error({ message: 'Error loading more images' });
  }

  hideLoader();
}

function smoothScroll() {
  const cardHeight = document
    .querySelector('.gallery-item')
    .getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
