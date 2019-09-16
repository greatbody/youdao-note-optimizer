class TagPlugin {
  currentIndex = -1;
  currentLabel = '';
  constructor() {
    console.log('TagPlugin is running.');
  }

  detect = () => {
    setInterval(() => {
      const fileTagCtl = document.querySelector('div.tools-item .tag-icon');
      const fileTags = document.querySelectorAll('.file-tag');
      if (fileTags.length > 0) {
        return;
      }
      if (fileTagCtl) {
        fileTagCtl.click();
      }
    }, 1000);
    $(document).delegate('.tag-add-container input', 'keydown', (event) => {
      const list = document.querySelectorAll('.tag-candidate-list .tag-candidate');
      if (list[this.currentIndex] && list[this.currentIndex].hasAttribute('style')) {
        list[this.currentIndex].removeAttribute('style');
      }
      switch (event.key) {
      case 'ArrowDown':
        if (this.currentIndex >= list.length - 1) {
          this.currentIndex = list.length - 1;
        } else {
          this.currentIndex += 1;
        }
        this.currentLabel = list[this.currentIndex].getAttribute('title');
        event.currentTarget.value = this.currentLabel;
        break;
      case 'ArrowUp':
        if (this.currentIndex <= 0) {
          this.currentIndex = 0;
        } else {
          this.currentIndex -= 1;
        }
        this.currentLabel = list[this.currentIndex].getAttribute('title');
        event.currentTarget.value = this.currentLabel;
        break;
      case 'Tab':
        if (this.currentIndex < 0) {
          return;
        }
        list[this.currentIndex].click();
        event.currentTarget.value = this.currentLabel;
        this.currentIndex = -1;
        event.preventDefault();
        event.stopPropagation();
        break;
      default:
        this.currentIndex = -1;
        break;
      }
      if (list[this.currentIndex]) {
        list[this.currentIndex].setAttribute('style', 'color: #fff;background:#398dee;');
      }
    });
  }
}

export default TagPlugin;
