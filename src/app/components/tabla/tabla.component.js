(function () {
  'use strict';

  angular
  .module('app')
  .component('tabla', {
    templateUrl: 'app/components/tabla/tabla.html',
    controller: tablaCtr,
    controllerAs: 'vm'
  });

  tablaCtr.$inject = ['ClienteService', '$state', '$rootScope'];

  function tablaCtr(ClienteService, $state, $rootScope) {
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
      $state.go('cliente');
    };

    vm.updatecliente = function (id) {
      $rootScope.id = id;
      console.log(id);
      $state.go('actualizarCliente');
    };

    vm.eliminarcliente = function (id) {
      ClienteService.delete({id: id});
      ClienteService.query().$promise.then(function (data) {
        vm.cliente = data;
      });
    };
  }
})();
