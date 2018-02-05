(function () {
  'use strict';

  angular
  .module('app')
  .component('registroRapidoAsignarVivienda', {
    templateUrl: 'app/components/registroRapido/registroRapidoAsignarVivienda.html',
    controller: asignarViviendaCtr,
    controllerAs: 'vm'
  });

  asignarViviendaCtr.$inject = ['ClienteService', 'ViviendaService', '$state', '$rootScope', '$mdDialog'];

  function asignarViviendaCtr(ClienteService, ViviendaService, $state, $rootScope, $mdDialog) {
    var vm = this;

    vm.cliente = [];
    ClienteService.query().$promise.then(function (data) {
      vm.cliente = data;
    });

    vm.vivienda = [];
    ViviendaService.query().$promise.then(function (data) {
      vm.vivienda = data;
    });

    vm.viviendacliente = [];
    /*vm.cliente = $rootScope.datosComite.clientes();
    vm.vivienda = $rootScope.datosComite.viviendas();*/

    vm.asignarvivienda = function (viviendacliente) {
      var cliente = new ClienteService({id: viviendacliente.cliente_id});
      //cliente.addVivienda(viviendacliente.vivienda_id);

      vm.showAlert(cliente.addVivienda(viviendacliente.vivienda_id));

      $state.go('tabla');
    };

    vm.showAlert = function(ev) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Asignación Exitosa!')
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
