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
    vm.cliente = [];

    ClienteService.query().$promise.then(function (data) {
      vm.cliente = data;
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

    vm.vercliente = function (index) {
      var data = vm.cliente[index];
      $rootScope.datosCliente = data;
      $state.go('cliente');
      console.log(data);
    };

    vm.updatecliente = function (id) {
      $rootScope.id = id;
      $state.go('actualizarCliente');
    }

    vm.eliminarcliente = function (id) {
      ClienteService.delete({id: id});
      ClienteService.query().$promise.then(function (data) {
        vm.cliente = data;
      });
    };
  }
})();
