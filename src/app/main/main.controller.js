(function() {
  'use strict';

  angular
    .module('tticketmac')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($location) {
    var vm = this;

    vm.stations1 = ['DARTFORD', 'DARTMOUTH', 'TOWER HILL', 'DERBY'];
    vm.stations2 = ['LIVERPOOL', 'LIVERPOOL LIME STREET', 'PADDINGTON'];
    vm.stations3 = ['EUSTON', 'LONDON BRIDGE', 'VICTORIA'];
    vm.station = vm.stations1;

    vm.currentStationName = "Lisbon - Portugal";
    vm.callSearchStation = callSearchStation;

    function callSearchStation() {
      $location.path('/searchStation');
    }

  }
})();
