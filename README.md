# body-scroll-freezer

[![npm version](https://badge.fury.io/js/body-scroll-freezer.svg)](https://badge.fury.io/js/body-scroll-freezer)

Dependency-free JS module to freeze body scroll when opening modal box.

Useful for modal, sliding-panel and lightbox interfaces.

> <1kb [minified](https://raw.githubusercontent.com/ramonvictor/body-scroll-freezer/master/docs/js/body-scroll-freezer.min.js).

<a href="https://ramonvictor.github.io/body-scroll-freezer/"><img src="https://raw.githubusercontent.com/ramonvictor/body-scroll-freezer/master/docs/assets/online-demo.png" alt="body-scroll-freezer: online demo" /></a>

## A note on performance

Many other alternatives to this module listen to both `mousewheel` and `DOMMouseScroll` events in order to get some information from the DOM, which usually includes: `Element.scrollTop`, `event.deltaY`, `Element.scrollHeight` or `Element.clientHeight`. Check this [StackOverflow answer](http://stackoverflow.com/questions/5802467/prevent-scrolling-of-parent-element#answer-16324762) as an example.

The problem is that most of those DOM operations (`.scrollTop` and `.scrollHeight`, for example) are expensive because they [force layout/reflow](https://gist.github.com/paulirish/5d52fb081b3570c81e3a). For more info on scrolling performance [check out this article](https://www.html5rocks.com/en/tutorials/speed/scrolling/).

So, to avoid all that, **body-scroll-freezer** just assigns `overflow: hidden;` and `padding-right: [scrollWidth]px;` to the `<body>`.
The `overflow` avoids vertical move on the background when users are scrolling within the modal box. The `padding-right` prevents horizontal jumps when hiding/showing the scrollbar.

## Usage

```js
// If no AMD/CommonJS: window.bodyScrollFreezer;
var bodyScroll = require('body-scroll-freezer'); 
```

1\.  Init to calculate scroll bar width.

```js
// Note: declaring variable to store init() return is optional.
var scrollWidth = bodyScroll.init();
```

2\. Turn scroll freeze **ON** when closing modal. Example:

```js
document.querySelector('.modal-open').addEventListener('click', function() {
  // Logic to show modal goes here
  bodyScroll.freeze();
}, false);
```

3\. Turn scroll freeze **OFF** when closing modal. Example:

```js
document.querySelector('.modal-close').addEventListener('click', function() {
  // Logic to hide modal goes here
  bodyScroll.unfreeze();
}, false);
```
