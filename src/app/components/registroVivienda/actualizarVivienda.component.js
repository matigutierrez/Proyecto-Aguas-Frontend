(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarVivienda', {
    templateUrl: 'app/components/registroVivienda/actualizarVivienda.html',
    controller: actualizarVivienda,
    controllerAs: 'vm'
  });

  actualizarVivienda.$inject = ['EstadoService', 'ComunaService', 'ViviendaService', '$state', '$rootScope', '$mdDialog'];

  var viviendaid = 0;
  function actualizarVivienda(EstadoService, ComunaService, ViviendaService, $state, $rootScope, $mdDialog) {
    var vm = this;

    vm.comuna = [];
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    vm.estado = [];
    EstadoService.query().$promise.then(function (data) {
      vm.estado = data;
    });

    viviendaid = $rootScope.id;

    vm.viviend = $rootScope.dataVivienda;

    vm.actualizarvivienda = function (vivienda) {
      vm.showAlert(
        ViviendaService.update({id: viviendaid}, vivienda, function () {
          $state.go('viviendas');
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
