class FakeLoadingEvent {
  version = 1
  eventType = 'fake-loading'
  static new = () => new FakeLoadingEvent()
  constructor() {
    console.log('FakeLoadingEvent monitor start..');
  }
  action = (notePoint, loadingGif) => {
    setTimeout(() => {
      notePoint.removeAttribute('hidden');
      loadingGif.setAttribute('hidden', null);
    }, 2000);
  }
  detect = (trigger) => {
    const notePoint = document.querySelector('.note-detail .detail-bd');
    if (!notePoint) return;
    const loadingGif = document.querySelector('.content-container .loading-style');
    if (!loadingGif) return;
    if (notePoint.hasAttribute('hidden') &&
      !loadingGif.hasAttribute('hidden')
    ) {
      trigger(this.eventType, notePoint, loadingGif);
    }
  }
}

export default FakeLoadingEvent;
