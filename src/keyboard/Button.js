export class Button {
  constructor(type) {
    this.type = type;
  }

  createButton(value) {
    const button = document.createElement('button');
    button.innerText = value;
    button.classList.add('keyboard__button');

    switch (this.type) {
      case 'spec':
        button.classList.add('button-special');
        break;
      case 'long':
        button.classList.add('button-long');
        break;
      default:
        button.classList.add('keyboard__button');
    }

    return button;
  }
}
