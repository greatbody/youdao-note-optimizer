import expandMoveList from './lib/expandMoveList';

class Win {
  run = () => {
    expandMoveList();
  }
}

// eslint-disable-next-line
(function () {
  // eslint-disable-next-line
  'use strict';
  const w = new Win();
  w.run();
  // eslint-disable-next-line
}());
