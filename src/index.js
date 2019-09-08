import MoveListExpander from './lib/MoveListExpander';
import MarkdownViewerPlugin from './lib/MarkdownViewerPlugin';
import EventMng from './shared/EventMng';
import FakeLoadingEvent from './events/FakeLoadingEvent';

class Runner {
  run = () => {
    const eventMng = new EventMng();
    eventMng.use(FakeLoadingEvent.new());
    new MoveListExpander().runWithInterval(1000);
    new MarkdownViewerPlugin().detect();
  }
}

// eslint-disable-next-line
(function () {
  // eslint-disable-next-line
  'use strict';
  const runner = new Runner();
  runner.run();
  // eslint-disable-next-line
}());
