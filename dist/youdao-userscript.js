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

  console.log('移动笔记增强功能已启动.');
};

var MarkdownViewerPlugin = function MarkdownViewerPlugin() {
  var _this = this;

  classCallCheck(this, MarkdownViewerPlugin);
  this.active = false;
  this.iframe = null;

  this.handleIframeOnload = function () {
    var iframe = document.querySelector('#mdEditor');
    document.querySelector('.content-container .loading-style').setAttribute('hidden', null);
    iframe.removeAttribute('hidden');
  };

  this.switchToView = function () {
    var iframe = document.querySelector('#mdEditor');
    iframe.setAttribute('hidden', null);
    iframe.src = iframe.src;
    document.querySelector('.content-container .loading-style').removeAttribute('hidden');
    if (!iframe.onload) {
      iframe.onload = _this.handleIframeOnload;
    }
  };

  this.insertViewButton = function () {
    var parentDom = document.querySelector('.file-detail .hd');
    var refDom = document.querySelector('.file-detail .btn-wrap');
    if (!parentDom || !refDom) {
      return;
    }
    if (document.querySelectorAll('.tampermonkey-view').length > 0 || !parentDom || !refDom) return;
    var btnSwitchToView = document.createElement('div');
    btnSwitchToView.innerText = '查看';
    btnSwitchToView.className = 'hd-btn tampermonkey-view';
    btnSwitchToView.onclick = _this.switchToView;
    parentDom.insertBefore(btnSwitchToView, refDom);
  };

  this.removeButton = function () {
    document.querySelectorAll('.tampermonkey-view').forEach(function (button) {
      button.remove();
    });
  };

  this.detect = function () {
    _this.iframe = document.querySelector('#mdEditor');
    var currentActive = _this.iframe != null;
    if (!_this.active && currentActive) {
      console.log('检测到markdonw编辑状态');
    }
    if (_this.active && !currentActive) {
      console.log('退出markdonw编辑状态');
    }
    _this.active = currentActive;
    if (_this.active) {
      // 检测当前是不是编辑状态
      var iframeDoc = _this.iframe.contentDocument;
      if (iframeDoc && iframeDoc.querySelector('body') && iframeDoc.querySelector('body').getAttribute('data-mode') === 'edit') {
        _this.insertViewButton();
      } else {
        _this.removeButton();
      }
    }
    setTimeout(function () {
      _this.detect();
    }, 300);
  };

  console.log('Markdown增强插件启动.');
};

var Runner = function Runner() {
  classCallCheck(this, Runner);

  this.run = function () {
    new MoveListExpander().runWithInterval(1000);
    new MarkdownViewerPlugin().detect();
  };
};

// eslint-disable-next-line


(function () {

  var runner = new Runner();
  runner.run();
  // eslint-disable-next-line
})();
