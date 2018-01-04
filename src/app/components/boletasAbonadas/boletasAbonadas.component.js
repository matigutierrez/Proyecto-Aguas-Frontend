(function () {
  'use strict';

  angular
  .module('app')
  .component('boletasAbonadas', {
    templateUrl: 'app/components/boletasAbonadas/boletasAbonadas.html',
    controller: boletasAbonadasCtrl,
    controllerAs: 'vm'
  });

  boletasAbonadasCtrl.$inject = ['BoletaEmitidaService', 'AbonoService', '$state', '$rootScope'];

  function boletasAbonadasCtrl(BoletaEmitidaService, AbonoService) {
    var vm = this;
    vm.abonadas = [];

    AbonoService.query().$promise.then(function (data) {
      vm.abonadas = data;
    });

    vm.boletaEmitida = [];
    BoletaEmitidaService.query().$promise.then(function (data) {
      vm.boletaEmitida = data;
    });

    vm.busqueda = function (dato) {
      var abonado = [];
      for (var i = 0; i < vm.abonadas.length; i++) {
        if (vm.abonadas[i].cod_abono === dato) {
          abonado.push(vm.abonadas[i]);
        }
      }
      vm.abonadas = abonado;
    };
  }
})();
