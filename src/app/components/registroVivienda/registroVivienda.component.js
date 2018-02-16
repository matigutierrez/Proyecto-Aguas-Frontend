(function () {
  'use strict';

  angular
  .module('app')
  .component('registroVivienda', {
    templateUrl: 'app/components/registroVivienda/registroVivienda.html',
    controller: registroViviendaCtr,
    controllerAs: 'vm'
  });

  registroViviendaCtr.$inject = ['EstadoService', 'ComunaService', 'ViviendaService', '$state', '$mdDialog'];

  function registroViviendaCtr(EstadoService, ComunaService, ViviendaService, $state, $mdDialog) {
    var vm = this;

    vm.comuna = [];
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    vm.estado = [];
    EstadoService.query().$promise.then(function (data) {
      vm.estado = data;
    });

    vm.crearvivienda = function (vivienda) {
      var viviend = {
        direccion: vivienda.direccion,
        estado_id: parseInt(vivienda.estado_id, 10),
        comuna_id: parseInt(vivienda.comuna_id, 10)
      };

      vm.showAlert(ViviendaService.save(viviend), vivienda);
      $state.go('viviendas');
    };

    vm.showAlert = function (ev, vivienda) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Vivienda Creada Satisfactoriamente!')
          .textContent('Dirección: ' + vivienda.direccion)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
