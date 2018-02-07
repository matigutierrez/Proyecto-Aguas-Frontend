(function () {
  'use strict';

  angular
  .module('app')
  .component('allClients', {
    templateUrl: 'app/components/allClients/allClients.html',
    controller: tablaCtr,
    controllerAs: 'vm'
  });

  tablaCtr.$inject = ['ClienteService', 'ViviendaService', 'MedidorService', '$state', '$rootScope', '$mdDialog'];

  function tablaCtr(ClienteService, ViviendaService, MedidorService, $state, $rootScope, $mdDialog) {
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

    vm.busquedaCliente = function (dato) {
      var clientes = [];
      for (var i = 0; i < vm.cliente.length; i++) {
        if (vm.cliente[i].nombre === dato) {
          clientes.push(vm.cliente[i]);
        }
      }
      vm.cliente = clientes;
    };

    vm.busquedaVivienda = function (dato) {
      var viviendas = [];
      for (var i = 0; i < vm.vivienda.length; i++) {
        if (vm.vivienda[i].direccion === dato) {
          viviendas.push(vm.vivienda[i]);
        }
      }
      vm.vivienda = viviendas;
    };

    vm.busquedaMedidor = function (dato) {
      var medidores = [];
      for (var i = 0; i < vm.medidor.length; i++) {
        if (vm.medidor[i].marca_medidor === dato) {
          medidores.push(vm.medidor[i]);
        }
      }
      vm.medidor = medidores;
    };

    vm.updatecliente = function (id) {
      $rootScope.id = id;
      $state.go('allClientsActualizarCliente');
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

    vm.actualizarvivienda = function (id) {
      $rootScope.id = id;
      console.log(id);
      $state.go('allClientsActualizarVivienda');
    };

    vm.eliminarvivienda = function (id) {
      var confirm = $mdDialog.confirm()
            .title('Está seguro que desea ELIMINAR esta VIVIENDA ?')
            .textContent('La acción no se podrá deshacer')
            .ok('SI')
            .cancel('NO');

      $mdDialog.show(confirm).then(function () {
        ViviendaService.delete({id: id});
        ViviendaService.query().$promise.then(function (data) {
          vm.vivienda = data;
        });
        $state.go('allClients');

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Vivienda ELIMINADA!')
            .ok('Ok!')
        );
        ClienteService.query().$promise.then(function (data) {
          vm.cliente = data;
        });
      }, function () {
        console.log('CANCEL');
      });
    };

    vm.actualizarmedidor = function (id) {
      $rootScope.id = id;
      $state.go('allClientsActualizarMedidor');
    };

    vm.eliminarmedidor = function (id) {
      var confirm = $mdDialog.confirm()
            .title('Está seguro que desea ELIMINAR este MEDIDOR ?')
            .textContent('La acción no se podrá deshacer')
            .ok('SI')
            .cancel('NO');

      $mdDialog.show(confirm).then(function () {
        MedidorService.delete({id: id});
        MedidorService.query().$promise.then(function (data) {
          vm.medidor = data;
        });
        $state.go('allClients');

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('Medidor ELIMINADO!')
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
