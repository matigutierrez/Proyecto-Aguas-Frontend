(function () {
  'use strict';

  angular
  .module('app')
  .component('allClients', {
    templateUrl: 'app/components/allClients/allClients.html',
    controller: tablaCtr,
    controllerAs: 'vm'
  });

  tablaCtr.$inject = ['ClienteService', 'ViviendaService', 'MedidorService', '$state'];

  function tablaCtr(ClienteService, ViviendaService, MedidorService, $state) {
    var vm = this;

    vm.cliente = [];
    ClienteService.query().$promise.then(function (data) {
      vm.cliente = data;
    });

    vm.vivienda = [];
    ViviendaService.query().$promise.then(function (data) {
      vm.vivienda = data;
    });

    vm.medidor = [];
    MedidorService.query().$promise.then(function (data) {
      vm.medidor = data;
    });

    vm.busqueda = function (dato) {
      var clientes = [];
      for (var i = 0; i < vm.cliente.length; i++) {
        if (vm.cliente[i].nombre === dato) {
          clientes.push(vm.cliente[i]);
        }
      }
      vm.cliente = clientes;
    };
  }
})();
