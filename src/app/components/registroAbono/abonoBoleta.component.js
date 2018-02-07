(function () {
  'use strict';

  angular
  .module('app')
  .component('abonoBoleta', {
    templateUrl: 'app/components/registroAbono/abonoBoleta.html',
    controller: abonoBoletaCtrl,
    controllerAs: 'vm'
  });

  abonoBoletaCtrl.$inject = ['AbonoService', '$state', '$mdDialog'];

  function abonoBoletaCtrl(AbonoService, $state, $mdDialog) {
    var vm = this;

    vm.registrarAbono = function (abono) {
      var abonoBoleta = {
        cod_abono: abono.cod_abono,
        monto_abonado: abono.monto_abonado,
        boleta_emitida_id: abono.boleta_emitida_id
      };

      vm.showAlert(AbonoService.save(abonoBoleta), abono);
      $state.go('boletasAbonadas');
    };

    vm.showAlert = function (ev, abono) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Abono Registrado Satisfactoriamente!')
          .textContent('Monto Abonado: ' + abono.monto_abonado)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
