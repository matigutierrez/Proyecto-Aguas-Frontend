(function () {
  'use strict';

  angular
  .module('app')
  .component('boletasEmitidas', {
    templateUrl: 'app/components/boletasEmitidas/boletasEmitidas.html',
    controller: boletasEmitidasCtrl,
    controllerAs: 'vm'
  });

  boletasEmitidasCtrl.$inject = ['BoletaEmitidaService', '$state', '$rootScope'];

  function boletasEmitidasCtrl(BoletaEmitidaService) {
    var vm = this;
    vm.emitidas = [];

    BoletaEmitidaService.query().$promise.then(function (data) {
      vm.emitidas = data;
    });

    vm.busqueda = function (dato) {
      var emitido = [];
      for (var i = 0; i < vm.emitidas.length; i++) {
        if (vm.emitidas[i].nro_boleta === dato) {
          emitido.push(vm.emitidas[i]);
        }
      }
      vm.emitidas = emitido;
    };

    vm.eliminarBoletaEmitida = function (id) {
      BoletaEmitidaService.delete({id: id});
      BoletaEmitidaService.query().$promise.then(function (data) {
        vm.emitidas = data;
      });
    };
  }
})();
