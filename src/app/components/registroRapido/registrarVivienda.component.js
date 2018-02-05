(function () {
  'use strict';

  angular
  .module('app')
  .component('registroRapidoVivienda', {
    templateUrl: 'app/components/registroRapido/registroRapidoVivienda.html',
    controller: registroRapidoCtr,
    controllerAs: 'vm'
  });

  registroRapidoCtr.$inject = ['SubsidioService', 'EstadoService', 'ComunaService', 'ViviendaService', '$state', '$mdDialog'];

  function registroRapidoCtr(SubsidioService, EstadoService, ComunaService, ViviendaService, $state, $mdDialog) {
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

    vm.crearvivienda = function (vivienda) {
      var viviend = {
        direccion: vivienda.direccion,
        estado_id: parseInt(vivienda.estado_id, 10),
        comuna_id: parseInt(vivienda.comuna_id, 10),
        subsidio_id: parseInt(vivienda.subsidio_id, 10)
      };

      vm.showAlert(ViviendaService.save(viviend), vivienda);
      //ViviendaService.save(viviend);
      $state.go('registroRapidoMedidor');
    };

    vm.showAlert = function(ev, vivienda) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Vivienda Creada!')
          .textContent('Dirección: ' + vivienda.direccion)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
