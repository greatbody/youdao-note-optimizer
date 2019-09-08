import MoveListExpander from './lib/MoveListExpander';
import MarkdownViewerPlugin from './lib/MarkdownViewerPlugin';
import EventMng from './shared/EventMng';

class Runner {
  run = () => {
    const eventMng = new EventMng();
    eventMng.on('fake-loadding', (note, loading) => {
      setTimeout(() => {
        note.removeAttribute('hidden');
        loading.setAttribute('hidden', null);
      }, 1000);
    });
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
