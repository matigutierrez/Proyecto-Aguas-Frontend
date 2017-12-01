(function () {
  'use strict';

  angular
  .module('app')
  .component('mytoolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtr,
    controllerAs: 'vm'
  });

  toolbarCtr.$inject = ['CredentialsService', 'UsuarioLogService', '$mdSidenav', '$state', '$rootScope'];

  function toolbarCtr(CredentialsService, UsuarioLogService, $mdSidenav, $state, $rootScope) {
    var vm = this;
    vm.isLogged = CredentialsService.isLogged();
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');
    vm.isOpen = false;

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });

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
