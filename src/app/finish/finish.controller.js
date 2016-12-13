(function() {
  'use strict';

  angular
    .module('tticketmac')
    .controller('FinishController', FinishController);

  /** @ngInject */
  function FinishController($location) {
    var vm = this;

    vm.goHome = goHome;

    function goHome() {
      $location.path('/');
    }

  }
})();
