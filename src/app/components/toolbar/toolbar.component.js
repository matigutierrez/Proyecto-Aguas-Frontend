(function () {
  'use strict';

  angular
  .module('app')
  .component('mytoolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtr,
    controllerAs: 'vm'
  });

  toolbarCtr.$inject = ['CredentialsService', 'UsuarioLogService', '$mdSidenav', '$state', '$rootScope', '$scope'];

  function toolbarCtr(CredentialsService, UsuarioLogService, $mdSidenav, $state, $rootScope, $scope) {
    var vm = this;
    vm.isLogged = CredentialsService.isLogged();
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');
    vm.isOpen = false;
    vm.vista = CredentialsService.getSide() || false;

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;

      console.log(data);

      /*if (vm.usuario.superadmin == 1){
        vm.rol = "Super Administrador";
      }else if (vm.usuario.superadmin == 0) {
        vm.rol = "Administrador Comité"
      }*/
    });

    function buildToggler(componentId) {
      return function () {
        $mdSidenav(componentId).toggle();
      };
    }

    vm.logout = function () {
      CredentialsService.clearCredentials();
      vm.isLogged = false;
      vm.vista = false;
      $state.go('login');
    };

    $rootScope.$on('isLogin', function () {
      vm.isLogged = true;
    });

    $scope.$on('side', function ($event, message) {
      vm.vista = message;
    });
  }
})();
