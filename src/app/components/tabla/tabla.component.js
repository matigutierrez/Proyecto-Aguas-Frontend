(function () {
  'use strict';

  angular
  .module('app')
  .component('tabla', {
    templateUrl: 'app/components/tabla/tabla.html',
    controller: tablaCtr,
    controllerAs: 'vm'
  });

  tablaCtr.$inject = ['ClienteService', '$state', '$rootScope', '$mdDialog'];

  function tablaCtr(ClienteService, $state, $rootScope, $mdDialog) {
    var vm = this;

    vm.cliente = $rootScope.datosComite.clientes();

    vm.busqueda = function (dato) {
      var clientes = [];
      for (var i = 0; i < vm.cliente.length; i++) {
        if (vm.cliente[i].nombre === dato) {
          clientes.push(vm.cliente[i]);
        }
      }
      vm.cliente = clientes;
    };

    vm.vercliente = function (index) {
      $rootScope.datosCliente = vm.cliente[index];
      console.log($rootScope.datosCliente);
      $state.go('cliente');
    };

    vm.updatecliente = function (id) {
      $rootScope.id = id;
      console.log(id);
      $state.go('actualizarCliente');
    };

    vm.eliminarcliente = function (id) {
      var confirm = $mdDialog.confirm()
            .title('Está seguro que desea ELIMINAR a este CLIENTE ?')
            .textContent('La acción no se podrá deshacer')
            .ok('SI')
            .cancel('NO');

      $mdDialog.show(confirm).then(function () {
        ClienteService.delete({id: id});
        ClienteService.query().$promise.then(function (data) {
          vm.cliente = data;
        });
        $state.go('allClients');

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Cliente ELIMINADO!')
            .ok('Ok!')
        );
        ClienteService.query().$promise.then(function (data) {
          vm.cliente = data;
        });
      }, function () {
        console.log('CANCEL');
      });
    };
  }
})();
