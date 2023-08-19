(function () {
  'use strict';

  class TextareaWithPersistence extends HTMLDivElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.STORAGE_KEY = `_textarea${this.id ? '_' + this.id : ''}`;

      const textarea = document.createElement('textarea');
      textarea.setAttribute('rows', 10);
      textarea.style.display = 'block';
      textarea.style.boxSizing = 'border-box';
      textarea.style.width = '100%';
      this.node = textarea;
      this.lastSavedDisplay = document.createElement('span');
      this.lastSaved = new Date().toLocaleString();

      this.init();
    }

    init() {
      const listener = () => {
        this.update();
        this.render();
      };

      this.node.addEventListener('keyup', listener);
      this.node.addEventListener('blur', listener);

      const savedValue = localStorage.getItem(this.STORAGE_KEY);
      if (savedValue) {
        this.node.value = savedValue;
      }

      const shadow = this.attachShadow({ mode: 'open' });
      shadow.appendChild(this.node);
      shadow.appendChild(this.lastSavedDisplay);

      this.update();
      this.render();
    }

    update() {
      localStorage.setItem(this.STORAGE_KEY, this.node.value);
      this.lastSaved = new Date().toLocaleString();
    }

    render() {
      this.lastSavedDisplay.innerText = `Last saved at: ${this.lastSaved}`;
    }
  }

  customElements.define('textarea-with-persistence', TextareaWithPersistence, { extends: 'div' });

})();
