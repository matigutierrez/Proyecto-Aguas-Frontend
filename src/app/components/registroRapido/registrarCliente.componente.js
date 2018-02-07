(function () {
  'use strict';

  angular
  .module('app')
  .component('registroRapidoCliente', {
    templateUrl: 'app/components/registroRapido/registroRapidoCliente.html',
    controller: registroRapidoCtr,
    controllerAs: 'vm'
  });

  registroRapidoCtr.$inject = ['ClienteService', '$state', '$mdDialog'];

  function registroRapidoCtr(ClienteService, $state, $mdDialog) {
    var vm = this;

    vm.crearcliente = function (cliente) {
      var client = {
        rut_cliente: parseInt(cliente.rut_cliente, 10),
        nombre: cliente.nombre,
        apellido_pater: cliente.apellido_pater,
        apellido_mater: cliente.apellido_mater,
        telefono: cliente.telefono,
        email: cliente.email,
        residencia: cliente.residencia
      };

      vm.showAlert(ClienteService.save(client), cliente);
      $state.go('registroRapidoAsignarVivienda');
    };

    vm.showAlert = function(ev, cliente) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Cliente Creado Satisfactoriamente!')
          .textContent('Nombre: ' + cliente.nombre + ' ' + cliente.apellido_pater + ' ' + cliente.apellido_mater)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
