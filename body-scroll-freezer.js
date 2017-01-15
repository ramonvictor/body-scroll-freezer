(function() {
	'use strict';
	/*
	 * Dependency-free module to freeze body scroll when opening modal components.
	 * @module body-scroll-freezer
	 */
	var API = {};
	var MEASURE_SCROLL_CLASS = 'js-scrollbar-measure';
	var body = document.body;
	var scrollWidth;

	/**
	 * Init module by getting browser scroll width.
	 * @public
	 * @return {Number} Browser scroll bar width
	 */
	function init() {
		return (this.scrollWidth = scrollWidth = getScrollWidth());
	}

	/**
	 * Freeze body scroll.
	 * @public
	 */
	function freeze() {
		if (scrollWidth === 0) {
			return;
		}
		body.style.overflow = 'hidden';
		body.style.paddingRight = scrollWidth + 'px';
	}

	/**
	 * Unfreeze body scroll.
	 * @public
	 */
	function unfreeze() {
		if (scrollWidth === 0) {
			return;
		}
		body.style.overflow = '';
		body.style.paddingRight = '0';
	}

	/**
	 * Append/remove `div.js-scrollbar-measure` just to measure scroll bar width.
	 * @private
	 * @return {Number} Browser scroll bar width
	 */
	function getScrollWidth() {
		var div = document.createElement('div');
		var scrollBarWidth;

		div.className = MEASURE_SCROLL_CLASS;
		body.appendChild(div);
		scrollBarWidth = div.offsetWidth - div.clientWidth;
		body.removeChild(div);

		return scrollBarWidth;
	}

	/**
	 * Public api.
	 */
	API.init = init;
	API.freeze = freeze;
	API.unfreeze = unfreeze;

	if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
		module.exports = API;
	} else if (typeof window !== 'undefined') {
		window.bodyScrollFreezer = API;
	}
})();
