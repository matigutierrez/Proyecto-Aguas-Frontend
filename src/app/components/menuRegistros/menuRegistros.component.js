(function () {
  'use strict';

  angular
  .module('app')
  .component('menuRegistros', {
    templateUrl: 'app/components/menuRegistros/menuRegistros.html',
    controller: menuRegistroCtr,
    controllerAs: 'vm'
  });

  menuRegistroCtr.$inject = ['UsuarioLogService', '$state', '$mdDialog'];

  function menuRegistroCtr(UsuarioLogService, $state, $mdDialog) {
    var vm = this;

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });

    vm.goToMedidores = function () {
      vm.showAlert($state.go('medidores'));
    };

    vm.showAlert = function (ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Para ingresar los datos de Lectura Mensual, SELECCIONE EL MEDIDOR QUE CORRESPONDA.')
          .textContent('Click en el icono de medidor')
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
