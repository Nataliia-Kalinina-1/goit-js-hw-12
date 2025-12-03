import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import { getImagesByQuery } from './js/pixabay-api.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');
const input = document.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
const per_page = 15;
let totalHits = 0;

form.addEventListener('submit', handleSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

async function handleSubmit(e) {
  e.preventDefault();

  query = input.value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query!',
      position: 'topCenter',
    });
    return;
  }

  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    hideLoader();

    if (data.hits.length === 0) {
      iziToast.error({
        message: 'No images found. Try another query!',
        position: 'topCenter',
      });
      return;
    }

    createGallery(data.hits);

    if (page * per_page < totalHits) {
      showLoadMoreButton();
    }
  } catch (error) {
    console.error(error);
    iziToast.error({
      message: 'Something went wrong, please try again later.',
      position: 'topCenter',
    });
  }
}

async function handleLoadMore() {
  page += 1;
  showLoader();
  hideLoadMoreButton();

  try {
    const data = await getImagesByQuery(query, page);

    createGallery(data.hits);
    hideLoader();

    if (page * per_page >= totalHits) {
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topCenter',
      });
      hideLoadMoreButton();
      return;
    }

    showLoadMoreButton();
    smoothScroll();
  } catch (error) {
    hideLoader();
    console.error(error);
    iziToast.error({
      message: 'Something went wrong',
      position: 'topCenter',
    });
  }
}

function smoothScroll() {
  const card = document.querySelector('.gallery-item');
  const cardHeight = card.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
