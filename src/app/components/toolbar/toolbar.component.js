(function () {
  'use strict';

  angular
  .module('app')
  .component('mytoolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtr,
    controllerAs: 'vm'
  });

  toolbarCtr.$inject = ['CredentialsService', '$mdSidenav', '$state', '$rootScope'];

  function toolbarCtr(CredentialsService, $mdSidenav, $state, $rootScope) {
    var vm = this;
    vm.isLogged = CredentialsService.isLogged();
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');
    vm.isOpen = false;

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }

    vm.logout = function () {
      CredentialsService.clearCredentials();
      vm.isLogged = false;
      $state.go('login');
    };

    $rootScope.$on('isLogin', function () {
      vm.isLogged = true;
    });
  }
})();
