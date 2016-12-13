(function() {
  'use strict';

  angular
    .module('tticketmac')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
