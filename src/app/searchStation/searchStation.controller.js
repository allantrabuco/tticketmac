(function() {
  'use strict';

  angular
    .module('tticketmac')
    .controller('SearchStationController', SearchStationController);

  /** @ngInject */
  function SearchStationController($location, $interval) {
    var vm = this, tempHome = "";

    // lists of stations
    vm.stations1 = ['DARTFORD', 'DARTMOUTH', 'TOWER HILL', 'DERBY'];
    vm.stations2 = ['LIVERPOOL', 'LIVERPOOL LIME STREET', 'PADDINGTON'];
    vm.stations3 = ['EUSTON', 'LONDON BRIDGE', 'VICTORIA'];
    vm.stationsA = ['DARTFORD', 'DARTMOUTH', 'TOWER HILL', 'DERBY', 'LIVERPOOL', 'LIVERPOOL LIME STREET', 'PADDINGTON', 'EUSTON', 'LONDON BRIDGE', 'VICTORIA'];

    vm.stations = vm.stations1; // station list in use

    vm.showList = false; // show/hide suggestion list of stations 
    vm.showBtnBuy = false;  // show/hide "BUY" button

    vm.currentStationName = "Lisbon - Portugal";

    // virtual keyboard (qwerty layout)
    vm.keyLine1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    vm.keyLine2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    vm.keyLine3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'RET'];

    suggestionIniti(); // initialize the keys suggestion list

    var qwerty = vm.keyLine1.concat(vm.keyLine2, vm.keyLine3); // used to get the key position to use in suggestions keys
    qwerty.push(" ");

    vm.keySpaces = false;  // space key suggestion

    vm.toStation = "";
    vm.goBack = goBack;
    vm.eraseStation = eraseStation;
    vm.keypressed = keypressed;
    vm.inputKeyUp = inputKeyUp;
    vm.selected = selected;
    vm.thanksAlert = thanksAlert;

    // Go to the last page when you finish
    function thanksAlert() {
      tempHome = $interval(goBack, 5000);
      $location.path('/finish');      
    }

    // Go back to the first page
    function goBack() {
      $interval.cancel(tempHome);
      tempHome = null;
      $location.path('/');
    }

    // Button to clear station input content
    function eraseStation() {
      vm.toStation = "";
      vm.showList = false;
      vm.showBtnBuy = false;
      suggestionIniti();
    }

    // Key event from virtual keyboard
    function keypressed(key) {
      var k = key;
      if (k !== 'RET') {
        if (k === 'spc') vm.toStation += ' ';
        else vm.toStation += key;
      } else {
        vm.toStation = vm.toStation.substring(0, vm.toStation.length-1);
      }
      inputKeyUp("undefined", k);
    }

    // KeyUp event from physical keyboard call to from 'keypressed'' function. 
    function inputKeyUp(ev, key) {
      var toStation = vm.toStation.toUpperCase(),
          k = (ev !== "undefined")?ev.key:key;

      if (toStation.length > 0) {

        suggestionIniti();

        if (k === " ") toStation = toStation + " ";

        vm.showList = true;

        vm.stations.forEach(function(item) {
          if (typeof(item.split(toStation)[1]) !== "undefined") {
            
            var alphaItem = item.split(toStation)[1].charAt(0);

            if (alphaItem) {
              var pos = qwerty.indexOf(alphaItem);
            }
            if (pos <= 9) {
              vm.keyLine1s[pos] = true;
            } else if (pos > 9 && pos < 19) {
              pos -= 10;
              vm.keyLine2s[pos] = true;
            } else if (pos > 18 && pos < 26) {
              pos -= 19;
              vm.keyLine3s[pos] = true;
            } else if (alphaItem === " ") {
                vm.keySpaces = true;
            }
          }          
        }, vm);
      } else {
        vm.showList = false;
        vm.showBtnBuy = false;
        suggestionIniti();
      }
    }

    // Get selected item from the list of stations
    function selected(sel) {
      vm.toStation = sel;
      suggestionIniti();
      vm.showList = false;
      vm.showBtnBuy = true;
    }

    // Initialize the keys suggestion list
    function suggestionIniti() {
      vm.keyLine1s = [false, false, false, false, false, false, false, false, false, false];
      vm.keyLine2s = [false, false, false, false, false, false, false, false, false];
      vm.keyLine3s = [false, false, false, false, false, false, false];
      vm.keySpaces = false;
    }
  }
})();

