// ==UserScript==
// @name         优化有道云笔记增强
// @namespace    rollup-react
// @version      0.0.5
// @description  优化有道云笔记网页版
// @author       sunrui
// @include     https://note.youdao.com/web/*
// @grant       unsafeWindow
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_listValues
// ==/UserScript==

'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/* eslint-disable no-restricted-properties */

var MoveListExpander = function MoveListExpander() {
  var _this = this;

  classCallCheck(this, MoveListExpander);

  this.insertInputBox = function () {
    var parentDom = document.querySelector('.file-selector-bd');
    var refDom = document.querySelector('.bd-selector-path');
    if (document.querySelectorAll('.tampermonkey-search').length > 0 || !parentDom || !refDom) return;
    var input = document.createElement('input');
    input.style.borderTop = 'none';
    input.style.borderLeft = 'none';
    input.style.borderRight = 'none';
    input.style.width = '100%';
    input.style.padding = '0';
    input.className = 'tampermonkey-search';
    input.onkeyup = _this.handleKeyUp;
    parentDom.insertBefore(input, refDom);
    _this.inputDom = input;
  };

  this.runWithInterval = function (interval) {
    setTimeout(function () {
      _this.insertInputBox();
      var expandableDoms = document.querySelectorAll('.file-selector-bd div.expandable:not(.expanded) > div.toggle');
      if (_this.inputDom) {
        _this.searchInDom(_this.inputDom.value);
      }
      if (expandableDoms.length > 0) {
        expandableDoms.forEach(function (v) {
          v.click();
        });
        _this.runWithInterval(500);
      } else {
        _this.runWithInterval(3000);
      }
    }, interval);
  };

  this.handleKeyUp = function (e) {
    var input = e.currentTarget.value.toLowerCase();
    _this.searchInDom(input);
  };

  this.searchInDom = function (searchWord) {
    var allLeaves = document.querySelectorAll('.file-selector-bd div.tree-title');
    allLeaves.forEach(function (leaf) {
      if (leaf.innerText && leaf.innerText.toLowerCase().indexOf(searchWord) >= 0) {
        leaf.style.display = '';
      } else {
        leaf.style.display = 'none';
      }
    });
  };
};

var Runner = function Runner() {
  classCallCheck(this, Runner);

  this.run = function () {
    new MoveListExpander().runWithInterval(1000);
  };
};

// eslint-disable-next-line


(function () {

  var runner = new Runner();
  runner.run();
  // eslint-disable-next-line
})();
