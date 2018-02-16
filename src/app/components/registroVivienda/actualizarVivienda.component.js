(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarVivienda', {
    templateUrl: 'app/components/registroVivienda/actualizarVivienda.html',
    controller: actualizarVivienda,
    controllerAs: 'vm'
  });

  actualizarVivienda.$inject = ['EstadoService', 'ComunaService', 'ViviendaService', '$state', '$rootScope'];

  var viviendaid = 0;
  function actualizarVivienda(EstadoService, ComunaService, ViviendaService, $state, $rootScope) {
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
