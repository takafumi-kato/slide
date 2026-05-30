'use strict';

const slider = document.querySelector('.slider');
const sliders = document.querySelectorAll('.img');
const prev = document.getElementById('prevButton');
const next = document.getElementById('nextButton');
const page = document.querySelector('.page');

const width = 600;

/* =========================
   クローン作成
========================= */

const firstClone = sliders[0].cloneNode(true);
const lastClone = sliders[sliders.length - 1].cloneNode(true);

slider.appendChild(firstClone);
slider.prepend(lastClone);

/* =========================
   初期位置
========================= */

let current = 1;
let timer;

slider.style.transform = `translateX(-${width}px)`;

updatePage();

/* =========================
   共通関数
========================= */

function slideIndex(index) {
  slider.style.transform = `translateX(-${width * index}px)`;
}

function updatePage() {
  page.textContent =
    `${(current - 1) % sliders.length + 1} / ${sliders.length}`;
}

function moveNext() {
  current++;
  slider.style.transition = 'transform 0.5s ease';

  slideIndex(current);

  updatePage();

    if (current === sliders.length + 1) {

      setTimeout(() => {

        slider.style.transition = 'none';

        current = 1;

        slideIndex(current);

      }, 500);

    }
}

function movePrev() {
  current--;

  slider.style.transition = 'transform 0.5s ease';

  slideIndex(current);

  page.textContent =
    `${((current - 1 + sliders.length) % sliders.length) + 1} / ${sliders.length}`;

  if (current === 0) {

    setTimeout(() => {

      slider.style.transition = 'none';

      current = sliders.length;

      slideIndex(current);

    }, 500);

  }
}

function startAutoSlide() {

  clearInterval(timer);

  timer = setInterval(() => {

    moveNext();

  }, 3000);

}

/* =========================
   自動再生開始
========================= */

startAutoSlide();

/* =========================
   ホバーで停止
========================= */

slider.addEventListener('mouseenter', () => {
  clearInterval(timer);
});

slider.addEventListener('mouseleave', () => {
  startAutoSlide();
});

/* =========================
   次へ
========================= */

next.addEventListener('click', () => {

  moveNext();

});

/* =========================
   戻る
========================= */

prev.addEventListener('click', () => {

  movePrev();

});