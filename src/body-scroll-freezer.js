(function() {
  'use strict';
  /*
   * Dependency-free module to freeze body scroll when opening modal components.
   * @module body-scroll-freezer
   */
  var API = {};
  var body = document.body;
  var scrollWidth;
  var resizeWait = false;
  var supportsEventListener = ('addEventListener' in Element.prototype);

  /**
   * Init module by getting browser scroll width.
   * @public
   * @return {Number} Browser scroll bar width
   */
  function init() {
    /* jshint validthis:true */
    if (typeof scrollWidth !== 'undefined') {
      return scrollWidth;
    }
    return (this.scrollWidth = scrollWidth = getScrollWidth());
  }

  /**
   * Freeze body scroll.
   * @public
   */
  function freeze() {
    body.style.overflow = 'hidden';

    if (!scrollWidth) {
      return;
    }

    if (windowHasScroll()) {
      body.style.paddingRight = scrollWidth + 'px';
    }

    if (supportsEventListener) {
      toggleResizeListener(true);
    }
  }

  /**
   * Unfreeze body scroll.
   * @public
   */
  function unfreeze() {
    body.style.overflow = '';

    if (!scrollWidth) {
      return;
    }

    body.style.paddingRight = '';

    if (supportsEventListener) {
      toggleResizeListener(false);
    }
  }

  /**
   * Append/remove `<div>` to measure browser's scrollbar width.
   * Props to {@link https://davidwalsh.name/detect-scrollbar-width|@davidwalshblog}.
   * @private
   * @return {Number} Browser scroll bar width
   */
  function getScrollWidth() {
    var div = document.createElement('div');
    var scrollBarWidth;

    div.setAttribute('style', [
      'width: 100px',
      'height: 100px',
      'overflow: scroll',
      'position: absolute',
      'top: -9999px'
    ].join(';'));

    body.appendChild(div);
    scrollBarWidth = div.offsetWidth - div.clientWidth;
    body.removeChild(div);

    return scrollBarWidth;
  }

  /**
   * Check whether window scroll is visible or not.
   * @private
   * @return {Boolean}
   */
  function windowHasScroll() {
    return (
      body.scrollHeight > document.documentElement.clientHeight
    );
  }

  /**
   * Switch resize listener on/off depending on freeze state.
   * @private
   */
  function toggleResizeListener(isFrozen) {
    if (isFrozen) {
      window.addEventListener('resize', onWindowResize, false);
    } else {
      window.removeEventListener('resize', onWindowResize, false);
    }
  }

  /**
   * Throttled logic to update body padding based on window scroll visibility.
   * @private
   */
  function onWindowResize() {
    if (resizeWait) {
      return;
    }

    if (windowHasScroll()) {
      body.style.paddingRight = scrollWidth + 'px';
    } else {
      body.style.paddingRight = '';
    }

    resizeWait = true;
    window.setTimeout(function() { resizeWait = false; }, 150);
  }

  /**
   * Public api.
   */
  API.init = init;
  API.freeze = freeze;
  API.unfreeze = unfreeze;

  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = API;
  } else if (typeof define === "function" && define.amd) {
    define([], function () {
      return API;
    });
  } else if (typeof window !== 'undefined') {
    window.bodyScrollFreezer = API;
  }
})();
