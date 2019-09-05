/* eslint-disable no-restricted-properties */

class MoveListExpander {
  inputDom;

  insertInputBox = () => {
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
    input.onkeyup = this.handleKeyUp;
    parentDom.insertBefore(input, refDom);
    this.inputDom = input;
  }

  runWithInterval = (interval) => {
    setTimeout(() => {
      this.insertInputBox();
      const expandableDoms = document.querySelectorAll('.file-selector-bd div.expandable:not(.expanded) > div.toggle');
      if (this.inputDom) {
        this.searchInDom(this.inputDom.value);
      }
      if (expandableDoms.length > 0) {
        expandableDoms.forEach((v) => {
          v.click();
        });
        this.runWithInterval(500);
      } else {
        this.runWithInterval(3000);
      }
    }, interval);
  };

  handleKeyUp = (e) => {
    const input = e.currentTarget.value.toLowerCase();
    this.searchInDom(input);
  }

  searchInDom = (searchWord) => {
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

export default MoveListExpander;
