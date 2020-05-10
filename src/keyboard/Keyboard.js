import {
  keyCodes, engUnshiftedKeys, engShiftedKeys, ruUnshiftedKeys, ruShiftedKeys,
} from './Keys.js';
import { Button } from './Button.js';

const charButton = new Button('char');
const specButton = new Button('spec');
const longButton = new Button('long');

export class Keyboard {
  constructor(language) {
    this.language = language;
  }

  init() {
    let arr = [];
    this.language === 'eng' ? arr = engUnshiftedKeys : arr = ruUnshiftedKeys;

    const keyboard = document.createElement('div');
    keyboard.classList.add('keyboard');

    for (let i = 0; i < arr.length; i++) {
      switch (arr[i]) {
        case 'Backspace':
          keyboard.append(specButton.createButton(arr[i]));
          break;
        case 'Caps Lock':
          keyboard.append(specButton.createButton(arr[i]));
          break;
        case 'Shift':
          keyboard.append(specButton.createButton(arr[i]));
          break;
        case 'Enter':
          keyboard.append(specButton.createButton(arr[i]));
          break;
        case '':
          keyboard.append(longButton.createButton(arr[i]));
          break;
        default:
          keyboard.append(charButton.createButton(arr[i]));
      }
    }
    return keyboard;
  }
}
