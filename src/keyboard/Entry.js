
import {
  keyCodes, engUnshiftedKeys, engShiftedKeys, ruUnshiftedKeys, ruShiftedKeys,
} from './Keys.js';
import { Keyboard } from './Keyboard.js';

const lang = ['eng', 'ru'];
const keysCollection = new Keyboard(lang[0]);

const keyboard = keysCollection.init();

for (let i = 0; i < keyCodes.length; i++) {
  keyboard.children[i].setAttribute('data-code', keyCodes[i]);
}

export default keyboard;

const textarea = document.getElementById('movie-search');
const details = document.createElement('p');
const changeLang = document.querySelector('.change-lang');
details.classList.add('info');
details.innerText = 'Клавиатура создана в операционной системе Windows \n Для переключения языка комбинация: "левые Ctrl + Alt"';

const keyboardChildren = [...keyboard.children];
const capsKey = keyboardChildren[29];

function addActiveState(e) {
  keyboardChildren.forEach((key) => {
    if (key.getAttribute('data-code') === e.code) key.classList.add('active');
    if (key.classList.contains('caps') && e.code === 'CapsLock') {
      key.classList.remove('caps');
      return;
    }
    if (key.innerText === 'Caps Lock' && e.code === 'CapsLock') key.classList.add('caps');
  });
}

function removeActiveState(e) {
  keyboardChildren.forEach((key) => {
    if (key.getAttribute('data-code') === e.code) key.classList.remove('active');
  });
}

function changeLanguage(e) {
  if ((e.ctrlKey && e.altKey) || e.target.className === 'change-lang') {
    if (capsKey.classList.contains('caps')) {
      for (let i = 0; i < keyboardChildren.length; i++) {
        if (keyboardChildren[i].innerText.match(/^[А-ЯЁ.{1}]$/)) {
          keyboardChildren[i].innerText = engUnshiftedKeys[i];
          if (keyboardChildren[i].innerText.match(/^[a-zа-яё{1}]$/)) {
            keyboardChildren[i].innerText = keyboardChildren[i].innerText.toUpperCase();
          }
        } else {
          keyboardChildren[i].innerText = ruUnshiftedKeys[i];
          if (keyboardChildren[i].innerText.match(/^[а-яё.{1}]$/)) {
            keyboardChildren[i].innerText = keyboardChildren[i].innerText.toUpperCase();
          }
        }
      }
    } else {
      for (let i = 0; i < keyboardChildren.length; i++) {
        if (keyboardChildren[i].innerText !== ruUnshiftedKeys[i]) {
          keyboardChildren[i].innerText = ruUnshiftedKeys[i];
        } else {
          keyboardChildren[i].innerText = engUnshiftedKeys[i];
        }
      }
    }
  }
}

const keyQ = keyboardChildren[15];
const regexUp = /^[A-ZА-ЯЁ{1}]$/;
const regexLow = /^[a-zа-яё{1}]$/;
const regexRus = /^[Йй{1}]$/;
const regexEng = /^[Qq{1}]$/;

function enableShift(e) {
  if (keyQ.innerText.match(regexEng)
  && ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') || e.target.innerText === 'Shift')) {
    if (capsKey.classList.contains('caps')) {
      for (let i = 0; i < keyboardChildren.length; i++) {
        keyboardChildren[i].innerText = engShiftedKeys[i];
        if (keyboardChildren[i].innerText.match(regexUp)) {
          keyboardChildren[i].innerText = keyboardChildren[i].innerText.toLowerCase();
        }
      }
    } else {
      for (let i = 0; i < keyboardChildren.length; i++) {
        keyboardChildren[i].innerText = engShiftedKeys[i];
      }
    }
  } else if (keyQ.innerText.match(regexRus)
  && ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') || e.target.innerText === 'Shift')) {
    if (capsKey.classList.contains('caps')) {
      for (let i = 0; i < keyboardChildren.length; i++) {
        keyboardChildren[i].innerText = ruShiftedKeys[i];
        if (keyboardChildren[i].innerText.match(regexUp)) {
          keyboardChildren[i].innerText = keyboardChildren[i].innerText.toLowerCase();
        }
      }
    } else {
      for (let i = 0; i < keyboardChildren.length; i++) {
        keyboardChildren[i].innerText = ruShiftedKeys[i];
      }
    }
  }
}

function disableShift(e) {
  if (keyQ.innerText.match(regexEng)
  && ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') || e.target.innerText === 'Shift')) {
    if (capsKey.classList.contains('caps')) {
      for (let i = 0; i < keyboardChildren.length; i++) {
        keyboardChildren[i].innerText = engUnshiftedKeys[i];
        if (keyboardChildren[i].innerText.match(regexLow)) {
          keyboardChildren[i].innerText = keyboardChildren[i].innerText.toUpperCase();
        }
      }
    } else {
      for (let i = 0; i < keyboardChildren.length; i++) {
        keyboardChildren[i].innerText = engUnshiftedKeys[i];
      }
    }
  } else if (keyQ.innerText.match(regexRus)
  && ((e.code === 'ShiftLeft' || e.code === 'ShiftRight') || e.target.innerText === 'Shift')) {
    if (capsKey.classList.contains('caps')) {
      for (let i = 0; i < keyboardChildren.length; i++) {
        keyboardChildren[i].innerText = ruUnshiftedKeys[i];
        if (keyboardChildren[i].innerText.match(regexLow)) {
          keyboardChildren[i].innerText = keyboardChildren[i].innerText.toUpperCase();
        }
      }
    } else {
      for (let i = 0; i < keyboardChildren.length; i++) {
        keyboardChildren[i].innerText = ruUnshiftedKeys[i];
      }
    }
  }
}

function enableCapsLock(e) {
  if (e.code === 'CapsLock' || e.target.innerText === 'Caps Lock') {
    for (let i = 0; i < keyboardChildren.length; i++) {
      if (keyboardChildren[i].innerText.match(regexLow)) {
        keyboardChildren[i].innerText = keyboardChildren[i].innerText.toUpperCase();
      }
    }
  }
}

function disableCapsLock(e) {
  if (e.code === 'CapsLock' && !capsKey.classList.contains('caps')
  || e.target.innerText === 'Caps Lock' && !capsKey.classList.contains('caps')) {
    for (let i = 0; i < keyboardChildren.length; i++) {
      if (keyboardChildren[i].innerText.match(regexUp)) {
        keyboardChildren[i].innerText = keyboardChildren[i].innerText.toLowerCase();
      }
    }
  }
}

function addKeysClickableBehavior(e) {
  const { target } = e;
  if (!target.getAttribute('data-code') || target.innerText === 'Ctrl' || target.innerText === 'Win' || target.innerText === 'Alt') return;
  switch (target.innerText) {
    case 'Backspace' || '◀':
      if (textarea.selectionStart !== 0 && textarea.selectionStart === textarea.selectionEnd) {
        textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, 'end');
        textarea.focus();
      } else if (textarea.selectionStart !== textarea.selectEnd) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
      } else if (textarea.selectionStart === 0) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
      }
      break;
    case '◀':
      if (textarea.selectionStart !== 0 && textarea.selectionStart === textarea.selectionEnd) {
        textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, 'end');
        textarea.focus();
      } else if (textarea.selectionStart !== textarea.selectEnd) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
      } else if (textarea.selectionStart === 0) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
      }
      break;
    case 'Del':
      if (textarea.selectionStart !== textarea.value.length) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd + 1, 'end');
        textarea.focus();
      }
      break;
    case 'Tab':
      textarea.setRangeText('   ', textarea.selectionStart, textarea.selectionEnd, 'end');
      textarea.focus();
      break;
    case 'Caps Lock':
      if (target.classList.contains('caps')) {
        target.classList.remove('caps');
        disableCapsLock(e);
        return;
      }
      target.classList.add('caps');
      enableCapsLock(e);
      break;
    case 'Shift':
      break;
    case 'Enter':
      textarea.value += '\n';
      break;
    case '':
      textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, 'end');
      textarea.focus();
      break;
    case '←':
      textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd - 1, 'end');
      textarea.focus();
      break;
    case '→':
      textarea.setRangeText('', textarea.selectionStart + 1, textarea.selectionEnd + 1, 'end');
      textarea.focus();
      break;
    case '↑':
      textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
      textarea.focus();
      break;
    case '↓':
      textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
      textarea.focus();
      break;
    default:
      textarea.setRangeText(target.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
      textarea.focus();
  }
}

function addKeysOnRealKeyboardPressBehavior(e) {
  switch (e.code) {
    case 'Backspace':
      if (textarea.selectionStart !== 0 && textarea.selectionStart === textarea.selectionEnd) {
        textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd, 'end');
        textarea.focus();
      } else if (textarea.selectionStart !== textarea.selectionEnd) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
      } else if (textarea.selectionStart === 0) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
        textarea.focus();
      }
      break;
    case 'Delete':
      if (textarea.selectionStart !== textarea.value.length) {
        textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd + 1, 'end');
        textarea.focus();
      }
      break;
    case 'Tab':
      textarea.setRangeText('   ', textarea.selectionStart, textarea.selectionEnd, 'end');
      textarea.focus();
      break;
    case 'CapsLock':
      break;
    case 'ShiftLeft':
      break;
    case 'ShiftRight':
      break;
    case 'Enter':
      textarea.value += '\n';
      break;
    case 'Space':
      textarea.setRangeText(' ', textarea.selectionStart, textarea.selectionEnd, 'end');
      textarea.focus();
      break;
    case 'ArrowLeft':
      textarea.setRangeText('', textarea.selectionStart - 1, textarea.selectionEnd - 1, 'end');
      textarea.focus();
      break;
    case 'ArrowRight':
      textarea.setRangeText('', textarea.selectionStart + 1, textarea.selectionEnd + 1, 'end');
      textarea.focus();
      break;
    case 'ArrowUp':
      textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
      textarea.focus();
      break;
    case 'ArrowDown':
      textarea.setRangeText('', textarea.selectionStart, textarea.selectionEnd, 'end');
      textarea.focus();
      break;
    default:
      keyboardChildren.forEach((el) => {
        if (el.getAttribute('data-code') === e.code && el.getAttribute('data-code').slice(0, 7) !== 'Control'
        && el.getAttribute('data-code').slice(0, 3) !== 'Alt' && el.getAttribute('data-code').slice(0, 4) !== 'Meta') {
          textarea.setRangeText(el.innerText, textarea.selectionStart, textarea.selectionEnd, 'end');
          textarea.focus();
        }
      });
  }
}

keyboard.onmousedown = () => false;
document.addEventListener('keydown', (e) => {
  if (document.querySelector('.keyboard') === null) {
    return;
  }
  e.preventDefault();
  addActiveState(e);
  changeLanguage(e);
  enableShift(e);
  enableCapsLock(e);
  disableCapsLock(e);
  addKeysOnRealKeyboardPressBehavior(e);
});
document.addEventListener('keyup', (e) => {
  if (document.querySelector('.keyboard') === null) {
    return;
  }
  disableShift(e);
  removeActiveState(e);
});
document.addEventListener('click', changeLanguage);
document.addEventListener('click', addKeysClickableBehavior);
document.addEventListener('mousedown', (e) => {
  if (e.target.innerText !== 'Shift') return;
  enableShift(e);
});
document.addEventListener('mouseup', (e) => {
  if (e.target.innerText !== 'Shift') return;
  disableShift(e);
});

window.onload = () => {
  const keysStorage = localStorage.getItem('keysLang');

  if (keysStorage[0] === engUnshiftedKeys[0]) {
    for (let i = 0; i < keyboardChildren.length; i++) {
      keyboardChildren[i].innerText = engUnshiftedKeys[i];
    }
  } else {
    for (let i = 0; i < keyboardChildren.length; i++) {
      keyboardChildren[i].innerText = ruUnshiftedKeys[i];
    }
  }
};

window.addEventListener('unload', () => {
  const keysStorage = [];
  keyboardChildren.forEach((key) => keysStorage.push(key.innerText));
  localStorage.setItem('keysLang', keysStorage);
});
