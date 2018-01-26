(function () {
  'use strict';

  angular
  .module('app')
  .component('mytoolbar', {
    templateUrl: 'app/components/toolbar/toolbar.html',
    controller: toolbarCtr,
    controllerAs: 'vm'
  });

  toolbarCtr.$inject = ['ComiteService', 'CredentialsService', 'UsuarioLogService', '$mdSidenav', '$state', '$rootScope', '$scope'];

  function toolbarCtr(ComiteService, CredentialsService, UsuarioLogService, $mdSidenav, $state, $rootScope, $scope) {
    var vm = this;
    vm.isLogged = CredentialsService.isLogged();
    vm.toggleLeft = buildToggler('left');
    vm.toggleRight = buildToggler('right');
    vm.isOpen = false;
    vm.vista = CredentialsService.getSide() || false;

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
      vm.vista = false;
      $rootScope.datosComite = null;
      $state.go('login');
    };

    $rootScope.$on('isLogin', function () {
      vm.isLogged = true;
      UsuarioLogService.get().$promise.then(function (data) {
        vm.usuario = data;
        if (vm.usuario.comite_id){
          $rootScope.datosComite = ComiteService.get({id: vm.usuario.comite_id});
        }
      });
    });

    if (vm.isLogged) {
      UsuarioLogService.get().$promise.then(function (data) {
        vm.usuario = data;
        if (vm.usuario.comite_id){
          $rootScope.datosComite = ComiteService.get({id: vm.usuario.comite_id});
        }
      });
    }

    $scope.$on('side', function ($event, message) {
      vm.vista = message;
    });
  }
})();
