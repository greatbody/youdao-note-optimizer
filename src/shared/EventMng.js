class EventMng {
  stateCallbacks = {}
  detectors = []
  plugins = []
  constructor() {
    console.log('状态管理上线...');
    this.monitorState();
  }

  monitorState = () => {
    setInterval(() => {
      this.detectAll();
    }, 1000);
  }

  detectAll = () => {
    const dets = this.detectors;
    for (let i = 0; i < dets.length; i += 1) {
      const det = dets[i];
      det(this.trigger);
    }
  }

  on = (eventType, cb) => {
    if (this.stateCallbacks[eventType]) {
      this.stateCallbacks[eventType].push(cb);
    } else {
      this.stateCallbacks[eventType] = [cb];
    }
  }

  use = (eventPlugin) => {
    if (eventPlugin && eventPlugin.version > 0) {
      this.on(eventPlugin.eventType, eventPlugin.action);
      this.detectors.push(eventPlugin.detect);
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
