/* eslint-disable no-restricted-properties */

class Do {
  static inputDom;
  static insertInputBox = () => {
    const parentDom = document.querySelector('.file-selector-bd');
    const refDom = document.querySelector('.bd-selector-path');
    if (document.querySelectorAll('.tampermonkey-search').length > 0 || !parentDom || !refDom) return;
    const input = document.createElement('input');
    input.style.borderTop = 'none';
    input.style.borderLeft = 'none';
    input.style.borderRight = 'none';
    input.style.width = '100%';
    input.style.padding = '0';
    input.className = 'tampermonkey-search';
    input.onkeyup = Do.handleKeyUp;
    parentDom.insertBefore(input, refDom);
    Do.inputDom = input;
  }

  static runWithInterval = (interval) => {
    setTimeout(() => {
      Do.insertInputBox();
      const expandableDoms = document.querySelectorAll('.file-selector-bd div.expandable:not(.expanded) > div.toggle');
      if (Do.inputDom) {
        Do.searchInDom(Do.inputDom.value);
      }
      if (expandableDoms.length > 0) {
        expandableDoms.forEach((v) => {
          v.click();
        });
        Do.runWithInterval(500);
      } else {
        Do.runWithInterval(3000);
      }
    }, interval);
  };

  static handleKeyUp = (e) => {
    const input = e.currentTarget.value.toLowerCase();
    Do.searchInDom(input);
  }

  static searchInDom = (searchWord) => {
    const allLeaves = document.querySelectorAll('.file-selector-bd div.tree-title');
    allLeaves.forEach((leaf) => {
      if (leaf.innerText && leaf.innerText.toLowerCase().indexOf(searchWord) >= 0) {
        leaf.style.display = '';
      } else {
        leaf.style.display = 'none';
      }
    });
  }
}

export default Do.runWithInterval;
