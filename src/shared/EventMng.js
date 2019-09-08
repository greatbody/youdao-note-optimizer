class EventMng {
  stateCallbacks = {}
  constructor() {
    console.log('状态管理上线...');
    this.monitorState();
  }

  monitorState = () => {
    setInterval(() => {
      this.checkCopyPasteIssue();
    }, 1000);
  }

  on = (state, cb) => {
    if (this.stateCallbacks[state]) {
      this.stateCallbacks[state].push(cb);
    } else {
      this.stateCallbacks[state] = [cb];
    }
  }

  checkCopyPasteIssue = () => {
    const notePoint = document.querySelector('.note-detail .detail-bd');
    if (!notePoint) return;
    const loadingGif = document.querySelector('.content-container .loading-style');
    if (!loadingGif) return;
    if (notePoint.hasAttribute('hidden') &&
      !loadingGif.hasAttribute('hidden')
    ) {
      this.trigger('fake-loadding', notePoint, loadingGif);
    }
  }

  trigger = (stateType, ...params) => {
    console.log(`[StateEvent] ${stateType} is triggered.`);
    const callbacks = this.stateCallbacks[stateType];
    for (let i = 0; i < callbacks.length; i += 1) {
      const cb = callbacks[i];
      cb(...params);
    }
  }
}

export default EventMng;
