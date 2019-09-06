class MarkdownViewerPlugin {
  active = false;
  iframe = null;

  constructor() {
    console.log('Markdown增强插件启动.');
  }

  handleIframeOnload = () => {
    const iframe = document.querySelector('#mdEditor');
    document.querySelector('.content-container .loading-style').setAttribute('hidden', null);
    iframe.removeAttribute('hidden');
  }

  switchToView = () => {
    const iframe = document.querySelector('#mdEditor');
    iframe.setAttribute('hidden', null);
    iframe.src = iframe.src;
    document.querySelector('.content-container .loading-style').removeAttribute('hidden');
    if (!iframe.onload) {
      iframe.onload = this.handleIframeOnload;
    }
  }

  insertViewButton = () => {
    const parentDom = document.querySelector('.file-detail .hd');
    const refDom = document.querySelector('.file-detail .btn-wrap');
    if (!parentDom || !refDom) {
      return;
    }
    if (document.querySelectorAll('.tampermonkey-view').length > 0 || !parentDom || !refDom) return;
    const btnSwitchToView = document.createElement('div');
    btnSwitchToView.innerText = '查看';
    btnSwitchToView.className = 'hd-btn tampermonkey-view';
    btnSwitchToView.onclick = this.switchToView;
    parentDom.insertBefore(btnSwitchToView, refDom);
  }

  removeButton = () => {
    document.querySelectorAll('.tampermonkey-view').forEach((button) => {
      button.remove();
    });
  }

  detect = () => {
    this.iframe = document.querySelector('#mdEditor');
    const currentActive = this.iframe != null;
    if (!this.active && currentActive) {
      console.log('检测到markdonw编辑状态');
    }
    if (this.active && !currentActive) {
      console.log('退出markdonw编辑状态');
    }
    this.active = currentActive;
    if (this.active) {
      // 检测当前是不是编辑状态
      const iframeDoc = this.iframe.contentDocument;
      if (iframeDoc && iframeDoc.querySelector('body') && iframeDoc.querySelector('body').getAttribute('data-mode') === 'edit') {
        this.insertViewButton();
      } else {
        this.removeButton();
      }
    }
    setTimeout(() => {
      this.detect();
    }, 300);
  }
}

export default MarkdownViewerPlugin;
