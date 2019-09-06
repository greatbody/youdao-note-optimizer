import MoveListExpander from './lib/MoveListExpander';
import MarkdownViewerPlugin from './lib/MarkdownViewerPlugin';

class Runner {
  run = () => {
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
