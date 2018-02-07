(function () {
  'use strict';

  angular
  .module('app')
  .component('allClientsActualizarVivienda', {
    templateUrl: 'app/components/allClients/allClientsActualizarVivienda.html',
    controller: allClientsActualizarVivienda,
    controllerAs: 'vm'
  });

  allClientsActualizarVivienda.$inject = ['SubsidioService', 'EstadoService', 'ComunaService', 'ViviendaService', '$state', '$rootScope', '$mdDialog'];

  var viviendaid = 0;
  function allClientsActualizarVivienda(SubsidioService, EstadoService, ComunaService, ViviendaService, $state, $rootScope, $mdDialog) {
    var vm = this;

    vm.comuna = [];
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    vm.estado = [];
    EstadoService.query().$promise.then(function (data) {
      vm.estado = data;
    });

    vm.subsidio = [];
    SubsidioService.query().$promise.then(function (data) {
      vm.subsidio = data;
    });

    viviendaid = $rootScope.id;

    vm.actualizarvivienda = function (vivienda) {
      vm.showAlert(
        ViviendaService.update({id: viviendaid}, vivienda, function () {
          $state.go('allClients');
        }, function () {}), vivienda);
    };

    vm.showAlert = function (ev, vivienda) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Vivienda Actualizada Satisfactoriamente!')
          .textContent('Dirección: ' + vivienda.direccion)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
