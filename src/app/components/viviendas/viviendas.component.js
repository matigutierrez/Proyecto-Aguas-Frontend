(function () {
  'use strict';

  angular
  .module('app')
  .component('viviendas', {
    templateUrl: 'app/components/viviendas/viviendas.html',
    controller: viviendasCtrl,
    controllerAs: 'vm'
  });

  viviendasCtrl.$inject = ['ViviendaService', '$state', '$rootScope', '$mdDialog'];

  function viviendasCtrl(ViviendaService, $state, $rootScope, $mdDialog) {
    var vm = this;

    vm.vivienda = $rootScope.datosComite.viviendas();

    vm.busqueda = function (dato) {
      var viviendas = [];
      for (var i = 0; i < vm.vivienda.length; i++) {
        if (vm.vivienda[i].direccion === dato) {
          viviendas.push(vm.vivienda[i]);
        }
      }
      vm.vivienda = viviendas;
    };

    vm.actualizarvivienda = function (id) {
      $rootScope.id = id;
      $state.go('actualizarVivienda');
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
        $state.go('viviendas');

        $mdDialog.show(
          $mdDialog.alert()
            .clickOutsideToClose(true)
            .title('VIVIENDA ELIMINADA!')
            .ok('Ok!')
        );
        ViviendaService.query().$promise.then(function (data) {
          vm.vivienda = data;
        });
      }, function () {
        console.log('CANCEL');
      });
    };
  }
})();
