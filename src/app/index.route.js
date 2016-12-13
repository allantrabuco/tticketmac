(function() {
  'use strict';

  angular
    .module('tticketmac')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/searchStation', {
        templateUrl: 'app/searchStation/searchStation.html',
        controller: 'SearchStationController',
        controllerAs: 'sstation'
      })
      .when('/finish', {
        templateUrl: 'app/finish/finish.html',
        controller: 'FinishController',
        controllerAs: 'theend'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
