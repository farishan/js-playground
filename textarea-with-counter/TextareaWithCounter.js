class TextareaWithCounter extends HTMLDivElement {
  constructor() {
    super();

    const textarea = document.createElement('textarea');
    textarea.setAttribute('rows', 10);
    textarea.style.display = 'block';
    textarea.style.boxSizing = 'border-box';
    textarea.style.width = '100%';

    const countDisplay = document.createElement('span');

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(textarea);
    shadow.appendChild(countDisplay);

    // charcter count, word count
    let result = [0, 0];

    function update(node) {
      const value = node.value;
      // source: https://github.com/mdn/web-components-examples/blob/main/word-count-web-component/main.js
      result = [value.length, value.trim().split(/\s+/g).filter(a => a.trim().length > 0).length];
    }

    function render() {
      countDisplay.textContent = `Characters: ${result[0]} | Words: ${result[1]}`;
    }

    const listener = (e) => {
      update(e.target);
      render();
    }

    textarea.addEventListener('keyup', listener);
    textarea.addEventListener('blur', listener);

    render();
  }
}

export default TextareaWithCounter