import Slide from './Slide';
import mySwiper from './swiper';
import keyboard from './keyboard/Entry';
// 9d3591e0;

const contentWrapper = document.querySelector('.content');
const footer = document.querySelector('.footer');
const startRequest = 'dream';
const mainLink = document.querySelector('.logo-link');
const sliderWrapper = document.querySelector('.swiper-wrapper');
const form = document.getElementById('searchForm');
const revealKeyboard = document.querySelector('.form-button-keyboard');
const apiKey = 'a93abca6';
const input = document.getElementById('movie-search');
const searchButton = document.getElementById('submit');
const translateApiKey = 'trnsl.1.1.20200506T082702Z.aac0a5a6e2461b41.433078d322a3ca6678f569df72150ce9a6f96114';
const warning = document.querySelector('span');
const formButton = document.querySelector('.form-button-clear');
const closeKeyboardButton = document.createElement('button');
const changeLang = document.createElement('button');
const testIputLang = /[А-Яа-я]/gi;

closeKeyboardButton.classList.add('close-keyboard');
closeKeyboardButton.innerHTML = '<i class="fas fa-times">';
changeLang.classList.add('change-lang');
changeLang.innerText = 'RU/ENG';
keyboard.append(changeLang, closeKeyboardButton);

let pageNumber = 1;

async function getTranslate(word, page = 1, clear = true, callback) {
  fetch(`https://translate.yandex.net/api/v1.5/tr.json/translate?key=${translateApiKey}&text=${word}&lang=ru-en`)
    .then((res) => res.json()).then((data) => {
      const { text } = data;
      const translate = text.join('');
      return callback(translate, page, clear);
    });
}

async function getRating(id, key) {
  let rating;
  await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${key}`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((info) => {
      rating = info.Ratings[0].Value.slice(0, 3);
    })
    .catch((error) => window.console.error('Рейтинг не найден', error));
  return rating;
}

async function removeCurrentSlides() {
  return new Promise((resolve) => setTimeout(() => resolve([...sliderWrapper.children]), 300))
    .then((arr) => {
      arr.forEach((slide) => slide.classList.remove('slide-fade'));
      arr.forEach((slide) => slide.remove());
    });
}

async function animateSlideChanging() {
  [...sliderWrapper.children].forEach((slide) => slide.classList.add('slide-fade'));
  await removeCurrentSlides();
}

async function getData(val, page, clear) {
  await fetch(`https://www.omdbapi.com/?s=${val}&page=${page}&apikey=${apiKey}`)
    .then((response) => (response.ok ? response.json() : Promise.reject(response)))
    .then(async (data) => {
      if (data.Error) {
        warning.classList.remove('unvisible');
        warning.innerText = `No results were found for ${val}`;
        formButton.innerHTML = '<i class="fas fa-times icon-clear"></i>';
        return;
      }
      warning.classList.remove('unvisible');
      warning.innerText = `Showing results for ${val}`;
      if (clear) {
        await animateSlideChanging();
      }
      const ratings = await Promise.all(data.Search.map((obj) => getRating(obj.imdbID, apiKey)));
      data.Search.forEach(async (obj, i) => {
        sliderWrapper.append(Slide.createSlide(obj.imdbID, obj.Title, obj.Poster, obj.Year, ratings[i]));
        mySwiper.update();
      });
      formButton.innerHTML = '<i class="fas fa-times icon-clear"></i>';
    }).catch((error) => {
      window.console.error('Исчерпан лимит запросов для текущего ключа', error);
      formButton.innerHTML = '<i class="fas fa-times icon-clear"></i>';
    });
}

async function changeSlides() {
  if (!input.value) {
    warning.innerText = 'Enter something';
    return;
  }
  formButton.innerHTML = '<i class="fas fa-redo icon-loader"></i>';
  if (input.value.match(testIputLang)) {
    getTranslate(input.value, 1, true, getData);
  } else {
    getData(input.value, 1, true);
  }
}

window.onload = () => {
  getData(startRequest, 1, true);
};

mainLink.onclick = (event) => {
  event.preventDefault();
  getData(startRequest, 1, true);
};

mySwiper.on('slideChange', () => {
  if (mySwiper.progress >= 0.5) {
    pageNumber += 1;
    if (input.value.match(/[А-Яа-я0-9\s]/gi)) {
      getTranslate(input.value, pageNumber, false, getData);
    } else {
      getData(input.value || startRequest, pageNumber, false);
    }
  }
});

form.onsubmit = () => false;
searchButton.addEventListener('click', () => {
  pageNumber = 1;
  changeSlides();
});

formButton.addEventListener('click', () => {
  input.value = '';
  input.focus();
});

revealKeyboard.addEventListener('click', () => {
  if (document.documentElement.clientWidth > 768 && document.querySelector('.keyboard') !== null) {
    keyboard.remove();
    return;
  }

  if (document.documentElement.clientWidth <= 768 && document.querySelector('.keyboard') === null) {
    contentWrapper.append(keyboard);
    keyboard.children[13].innerText = '◀';
    keyboard.style.top = `${document.documentElement.clientHeight - (keyboard.clientHeight + footer.clientHeight)}px`;
    keyboard.classList.add('open-keyboard');
    setTimeout(() => {
      keyboard.classList.remove('open-keyboard');
    }, 500);
    return;
  }

  contentWrapper.append(keyboard);

  if (document.documentElement.clientWidth <= 768 && document.querySelector('.keyboard') !== null) {
    keyboard.classList.add('closed-keyboard');
    setTimeout(() => {
      keyboard.classList.remove('closed-keyboard');
      keyboard.remove();
    }, 400);
  }
});

closeKeyboardButton.addEventListener('click', () => {
  if (document.documentElement.clientWidth <= 768) {
    keyboard.classList.add('closed-keyboard');
    setTimeout(() => {
      keyboard.classList.remove('closed-keyboard');
      keyboard.remove();
    }, 500);
  } else {
    keyboard.remove();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    pageNumber = 1;
    changeSlides();
  }
  if (e.key === 'ArrowRight') {
    mySwiper.slideNext();
  }
  if (e.key === 'ArrowLeft') {
    mySwiper.slidePrev();
  }
});

document.addEventListener('click', (e) => {
  if (e.target.getAttribute('data-code') !== 'Enter') {
    return;
  }
  pageNumber = 1;
  changeSlides();
});

document.addEventListener('mousedown', (event) => {
  const { target } = event;
  if (target.className !== 'keyboard') {
    return;
  }
  event.preventDefault();

  if (document.documentElement.clientWidth <= 1024) {
    return;
  }

  const shiftX = event.clientX - keyboard.getBoundingClientRect().left;
  const shiftY = event.clientY - keyboard.getBoundingClientRect().top;
  keyboard.style.cursor = 'grabbing';

  function onMouseMove(e) {
    let newLeft = e.clientX - shiftX;
    let newTop = e.clientY - shiftY;

    if (newLeft > document.documentElement.clientWidth - keyboard.clientWidth) {
      newLeft = document.documentElement.clientWidth - keyboard.clientWidth;
    }
    if (newLeft < 0) {
      newLeft = 0;
    }
    if (newTop > document.documentElement.clientHeight - keyboard.clientHeight - footer.clientHeight) {
      newTop = document.documentElement.clientHeight - keyboard.clientHeight - footer.clientHeight;
    }
    if (newTop < 0) {
      newTop = 0;
    }

    keyboard.style.left = `${newLeft}px`;
    keyboard.style.top = `${newTop}px`;
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    keyboard.style.cursor = 'grab';
  }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
