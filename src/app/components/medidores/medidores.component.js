(function () {
  'use strict';

  angular
  .module('app')
  .component('medidores', {
    templateUrl: 'app/components/medidores/medidores.html',
    controller: medidoresCtr,
    controllerAs: 'vm'
  });

  medidoresCtr.$inject = ['MedidorService', '$state', '$rootScope', '$mdDialog'];

  function medidoresCtr(MedidorService, $state, $rootScope, $mdDialog) {
    var vm = this;

    vm.medidor = $rootScope.datosComite.medidores();

    vm.busqueda = function (dato) {
      var medidores = [];
      for (var i = 0; i < vm.medidor.length; i++) {
        if (vm.medidor[i].marca_medidor === dato) {
          medidores.push(vm.medidor[i]);
        }
      }
      vm.medidor = medidores;
    };

    vm.actualizarmedidor = function (id) {
      $rootScope.id = id;
      $state.go('actualizarMedidor');
    };

    vm.eliminarmedidor = function (id) {
      var confirm = $mdDialog.confirm()
            .title('Está seguro que desea ELIMINAR este MEDIDOR ?')
            .textContent('La acción no se podrá deshacer')
            .ok('SI')
            .cancel('NO');

      $mdDialog.show(confirm).then(function () {
        MedidorService.delete({id: id});
        vm.medidor = $rootScope.datosComite.medidores();
        $state.go('medidores');

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('MEDIDOR ELIMINADO!')
            .ok('Ok!')
        );
        vm.medidor = $rootScope.datosComite.medidores();
      }, function () {
        console.log('CANCEL');
      });
    };

    vm.vermedidor = function (index) {
      $rootScope.datosMedidor = vm.medidor[index];
      $state.go('medidorRegistrosMensuales');
    };
  }
})();
