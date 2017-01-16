# body-scroll-freezer

Dependency-free JS module to freeze body scroll when opening modal box.

Useful for modal, sliding-panel and lightbox interfaces.

> <1kb [minified](https://raw.githubusercontent.com/ramonvictor/body-scroll-freezer/master/docs/js/body-scroll-freezer.min.js).

<a href="https://ramonvictor.github.io/body-scroll-freezer/"><img src="https://raw.githubusercontent.com/ramonvictor/body-scroll-freezer/master/docs/assets/online-demo.png" alt="body-scroll-freezer: online demo" /></a>

## Usage

```js
var bodyScroll = require('body-scroll-freezer'); // If no AMD/CommonJS: window.bodyScrollFreezer;
```

1 - Init to calculate scroll bar width.

```js
// Note: store init() return in a variable is optional.
var scrollWidth = bodyScroll.init();
```

2 - Turn scroll freeze **ON** when closing modal. Example:

```js
document.querySelector('.modal-open').addEventListener('click', function() {
  modal.style.display = 'block';
  // Freeze on modal open
  bodyScroll.freeze();
}, false);
```

3 - Turn scroll freeze **OFF** when closing modal. Example:

```js
document.querySelector('.modal-close').addEventListener('click', function() {
  modal.style.display = 'none';
  // Unfreeze on modal open
  bodyScroll.unfreeze();
}, false);
```

## Required [CSS](/src/body-scroll-freezer.css)

```css
/*
 * Props to https://davidwalsh.name/detect-scrollbar-width
 */
.js-scrollbar-measure {
  width: 100px;
  height: 100px;
  overflow: scroll;
  position: absolute;
  top: -9999px;
}
```
