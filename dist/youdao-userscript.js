// ==UserScript==
// @name         youdao-note-optimizer
// @namespace    rollup-react
// @version      0.0.1
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

var Do = function Do() {
  classCallCheck(this, Do);
};

Do.insertInputBox = function () {
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
  input.onkeyup = Do.handleKeyUp;
  parentDom.insertBefore(input, refDom);
  Do.inputDom = input;
};

Do.runWithInterval = function (interval) {
  setTimeout(function () {
    Do.insertInputBox();
    var expandableDoms = document.querySelectorAll('.file-selector-bd div.expandable:not(.expanded) > div.toggle');
    if (Do.inputDom) {
      Do.searchInDom(Do.inputDom.value);
    }
    if (expandableDoms.length > 0) {
      expandableDoms.forEach(function (v) {
        v.click();
      });
      Do.runWithInterval(500);
    } else {
      Do.runWithInterval(3000);
    }
  }, interval);
};

Do.handleKeyUp = function (e) {
  var input = e.currentTarget.value.toLowerCase();
  Do.searchInDom(input);
};

Do.searchInDom = function (searchWord) {
  var allLeaves = document.querySelectorAll('.file-selector-bd div.tree-title');
  allLeaves.forEach(function (leaf) {
    if (leaf.innerText && leaf.innerText.toLowerCase().indexOf(searchWord) >= 0) {
      leaf.style.display = '';
    } else {
      leaf.style.display = 'none';
    }
  });
};

var expandMoveList = Do.runWithInterval;

var Win = function Win() {
  classCallCheck(this, Win);

  this.run = function () {
    expandMoveList();
  };
};

// eslint-disable-next-line


(function () {

  var w = new Win();
  w.run();
  // eslint-disable-next-line
})();
