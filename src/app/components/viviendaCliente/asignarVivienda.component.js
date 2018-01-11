(function () {
  'use strict';

  angular
  .module('app')
  .component('asignarVivienda', {
    templateUrl: 'app/components/viviendaCliente/asignarVivienda.html',
    controller: asignarViviendaCtr,
    controllerAs: 'vm'
  });

  asignarViviendaCtr.$inject = ['ClienteService', 'ViviendaService', 'ViviendaClienteService', '$state'];

  function asignarViviendaCtr(ClienteService, ViviendaService, ViviendaClienteService, $state) {
    var vm = this;
 
    vm.cliente = [];
    ClienteService.query().$promise.then(function (data) {
      vm.cliente = data;
    });

    vm.vivienda = [];
    ViviendaService.query().$promise.then(function (data) {
      vm.vivienda = data;
    });

    /*vm.viviendacli = [];
    ViviendaClienteService.query().$promise.then(function (data) {
      vm.viviendacli = data;
    });*/

    vm.asignarvivienda = function (viviendacliente) {
      var viviencli = {
        cliente_id: parseInt(viviendacliente.cliente_id, 10),
        vivienda_id: parseInt(viviendacliente.vivienda_id, 10)
      };

      ViviendaClienteService.save(viviencli);
      $state.go('viviendaCliente');
    };
  }
})();
