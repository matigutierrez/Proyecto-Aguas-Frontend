(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarCliente', {
    templateUrl: 'app/components/registro/actualizarCliente.html',
    controller: actualizarCliente,
    controllerAs: 'vm'
  });

  actualizarCliente.$inject = ['SubsidioService', 'UsuarioLogService', 'ClienteService', '$state', '$rootScope', '$mdDialog'];

  var clienteid = 0;
  function actualizarCliente(SubsidioService, UsuarioLogService, ClienteService, $state, $rootScope, $mdDialog) {
    var vm = this;

    UsuarioLogService.get().$promise.then(function (data) {
      vm.usuario = data;
    });

    vm.subsidio = [];
    SubsidioService.query().$promise.then(function (data) {
      vm.subsidio = data;
    });

    clienteid = $rootScope.id;

    vm.actualizarcliente = function (cliente) {
      vm.showAlert(
        ClienteService.update({id: clienteid}, cliente, function () {
          if (vm.usuario.superadmin === 1) {
            $state.go('comiteView');
          } else if (vm.usuario.superadmin === 0) {
            $state.go('tabla');
          }
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
