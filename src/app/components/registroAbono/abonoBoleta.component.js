(function () {
  'use strict';

  angular
  .module('app')
  .component('abonoBoleta', {
    templateUrl: 'app/components/registroAbono/abonoBoleta.html',
    controller: abonoBoletaCtrl,
    controllerAs: 'vm'
  });

  abonoBoletaCtrl.$inject = ['AbonoService', '$state', '$rootScope'];

  function abonoBoletaCtrl(AbonoService, $state) {
    var vm = this;

    vm.registrarAbono = function (abono) {
      var abonoBoleta = {
        cod_abono: abono.cod_abono,
        monto_abonado: abono.monto_abonado,
        boleta_emitida_id: abono.boleta_emitida_id
      };

      AbonoService.save(abonoBoleta);
      $state.go('boletasAbonadas');
    };
  }
})();
