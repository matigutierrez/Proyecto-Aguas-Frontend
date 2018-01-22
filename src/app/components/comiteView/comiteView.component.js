(function () {
  'use strict';

  angular
  .module('app')
  .component('comiteView', {
    templateUrl: 'app/components/comiteView/comiteView.html',
    controller: comiteViewCtrl,
    controllerAs: 'vm'
  });

  comiteViewCtrl.$inject = ['$rootScope', 'ComiteService', 'ClienteService', '$state'];

  var dataComit = {};

  function comiteViewCtrl($rootScope, ComiteService, ClienteService, $state) {
    var vm = this;

    ComiteService.query().$promise.then(function (data) {
      dataComit = $rootScope.datosComite;
      vm.nombre = dataComit.nombre;
      vm.comuna_id = dataComit.comuna.des_comu;
    });

    vm.datosCliente = [];

    ClienteService.query().$promise.then(function (data) {
      vm.datosCliente = dataComit.clientes();
    });

    vm.busqueda = function (dato) {
      var clientes = [];
      for (var i = 0; i < vm.datosCliente.length; i++) {
        if (vm.datosCliente[i].nombre === dato) {
          clientes.push(vm.datosCliente[i]);
        }
      }
      vm.datosCliente = clientes;
    };

    vm.vercliente = function (index) {
      var data = vm.datosCliente[index];
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
        vm.datosCliente = data;
      });
    };
  }
})();
