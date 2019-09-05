import MoveListExpander from './lib/MoveListExpander';

class Runner {
  run = () => {
    new MoveListExpander().runWithInterval(1000);
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
