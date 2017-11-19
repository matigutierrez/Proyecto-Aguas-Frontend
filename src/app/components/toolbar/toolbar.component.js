(function () {
  'use strict';

  angular
  .module('app')
  .component('mytoolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtr,
    controllerAs: 'vm'
  });

  function toolbarCtr($mdSidenav) {
    var vm = this;
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');
    vm.isOpen = false;

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }
  }
})();
