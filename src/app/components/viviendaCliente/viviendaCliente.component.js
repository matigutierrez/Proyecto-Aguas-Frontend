(function () {
  'use strict';

  angular
  .module('app')
  .component('viviendaCliente', {
    templateUrl: 'app/components/viviendaCliente/viviendaCliente.html',
    controller: viviendaClienteCtrl,
    controllerAs: 'vm'
  });

  viviendaClienteCtrl.$inject = ['ClienteService', 'ViviendaClienteService', '$state', '$rootScope'];

  function viviendaClienteCtrl(ClienteService, ViviendaClienteService, $state, $rootScope) {
    var vm = this;
    vm.viviendacli = [];

    /*
    ViviendaClienteService.query().$promise.then(function (data) {
      vm.viviendacli = data;
    });*/

    ClienteService.query().$promise.then(function (data) {
      for (var i = 0; i < data.length; i++) {
        var cliente = data[i];
        var viviendas = cliente.viviendas;
        for (var j = 0; j < viviendas.length; j++) {
          vm.viviendacli[vm.viviendacli.length] = {
            id: viviendas[j].id, //id no debe ser de vivienda, es el código de la tabla vivienda_cliente
            vivienda: viviendas[j],
            cliente: cliente
          };
        }
      }
    });

    vm.busqueda = function (dato) {
      var viviencli = [];
      for (var i = 0; i < vm.viviendacli.length; i++) {
        if (vm.viviendacli[i].cliente_id === dato) {
          viviencli.push(vm.viviendacli[i]);
        }
      }
      vm.viviendacli = viviencli;
    };
  }
})();
