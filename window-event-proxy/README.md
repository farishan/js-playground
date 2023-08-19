See: https://www.dofactory.com/javascript/design-patterns/proxy

My browser game needs to add event listener to `window` object, and needs to monitor all listener key and value.

This module is exactly for that requirements. Other usage is not encouraged.

---

## Methods

- `.addEventListener(eventKey, listenerKey, func)`
- `.removeEventListener(eventKey, listenerKey)`
- `.debug()`

### NPM Scripts:
- `npm run build` to make a distributable ESM module, check `/dist` folder after run this script.
- `npm run build-example` to make an example bundle. Open `example/index.html` on your browser after run this script.

---

How to preview:
Open `example/index.html` in browser

How to developing:
- Modify `index.js`
- Use NPM Scripts to build the source
- Use `/example` folder to watch the changes