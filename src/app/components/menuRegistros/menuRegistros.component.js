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

    vm.goToMedidoresRegistroMensual = function () {
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

    vm.goToMedidoresEmitirBoleta = function () {
      vm.showAlert2($state.go('medidores'));
    };

    vm.showAlert2 = function (ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Para EMITIR BOLETA, SELECCIONE EL MEDIDOR QUE CORRESPONDA, luego ubique el registro.')
          .textContent('Click en el icono de medidor')
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
