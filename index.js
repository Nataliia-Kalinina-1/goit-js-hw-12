import{S,a as m,i as s}from"./assets/vendor-DcJ-KoJm.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function o(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=o(e);fetch(e.href,r)}})();const p=document.querySelector(".gallery"),y=document.querySelector(".load-more"),h=document.querySelector(".loader"),q=new S(".gallery a",{captionsData:"alt",captionDelay:250});function g(n){const t=n.map(o=>`
      <li class="gallery-item">
        <a class="gallery-link" href="${o.largeImageURL}">
          <img
            class="gallery-image"
            src="${o.webformatURL}"
            alt="${o.tags}"
            loading="lazy"
          />
        </a>
        <div class="info">
          <p class="info-item"><b>Likes</b> ${o.likes}</p>
          <p class="info-item"><b>Views</b> ${o.views}</p>
          <p class="info-item"><b>Comments</b> ${o.comments}</p>
          <p class="info-item"><b>Downloads</b> ${o.downloads}</p>
        </div>
      </li>`).join("");p.insertAdjacentHTML("beforeend",t),q.refresh()}function C(){p.innerHTML=""}function L(){h.classList.remove("hidden")}function l(){h.classList.add("hidden")}function b(){y.classList.remove("hidden")}function d(){y.classList.add("hidden")}m.defaults.baseURL="https://pixabay.com/api/";const M="53387402-0d41fff9de6c167d2f24d7858";async function w(n,t){const o={key:M,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t},{data:i}=await m.get("/",{params:o});return i}const $=document.querySelector(".form"),B=document.querySelector("input[name='search-text']"),P=document.querySelector(".load-more");let c="",a=1;const v=15;let f=0;$.addEventListener("submit",O);P.addEventListener("click",x);async function O(n){if(n.preventDefault(),c=B.value.trim(),a=1,!c){s.warning({message:"Please enter a search query!",position:"topCenter"});return}C(),d(),L();try{const t=await w(c,a);if(f=t.totalHits,l(),t.hits.length===0){s.error({message:"No images found. Try another query!",position:"topCenter"});return}if(g(t.hits),f<=v){s.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}),d();return}b()}catch{l(),s.error({message:"Something went wrong. Please try again later.",position:"topCenter"})}}async function x(){a+=1,d(),L();try{const n=await w(c,a);if(l(),g(n.hits),a*v>=f){s.info({message:"We're sorry, but you've reached the end of search results.",position:"topCenter"}),d();return}b(),E()}catch{l(),s.error({message:"Something went wrong. Try again later.",position:"topCenter"})}}function E(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
