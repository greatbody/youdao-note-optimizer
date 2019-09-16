class TagPlugin {
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
  }
}

export default TagPlugin;
