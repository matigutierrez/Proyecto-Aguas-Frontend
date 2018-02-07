(function () {
  'use strict';

  angular
  .module('app')
  .component('allClientsActualizarCliente', {
    templateUrl: 'app/components/allClients/allClientsActualizarCliente.html',
    controller: allClientsActualizarCliente,
    controllerAs: 'vm'
  });

  allClientsActualizarCliente.$inject = ['UsuarioLogService', 'ClienteService', '$state', '$rootScope', '$mdDialog'];

  var clienteid = 0;
  function allClientsActualizarCliente(UsuarioLogService, ClienteService, $state, $rootScope, $mdDialog) {
    var vm = this;

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });

    clienteid = $rootScope.id;

    vm.actualizarcliente = function (cliente) {
      vm.showAlert(
        ClienteService.update({id: clienteid}, cliente, function () {
          $state.go('allClients');
        }, function () {}), cliente);
    };

    vm.showAlert = function (ev, cliente) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Cliente Actualizado Satisfactoriamente!')
          .textContent('Nombre: ' + cliente.nombre + ' ' + cliente.apellido_pater + ' ' + cliente.apellido_mater)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
