(function () {
  'use strict';

  angular
  .module('app')
  .component('registroVivienda', {
    templateUrl: 'app/components/registroVivienda/registroVivienda.html',
    controller: registroViviendaCtr,
    controllerAs: 'vm'
  });

  registroViviendaCtr.$inject = ['RegionService', 'EstadoService', 'ComunaService', 'ViviendaService', '$state'];

  function registroViviendaCtr(RegionService, EstadoService, ComunaService, ViviendaService, $state) {
    var vm = this;

    vm.comuna = [];
    ComunaService.query().$promise.then(function (data) {
      vm.comuna = data;
    });

    vm.estado = [];
    EstadoService.query().$promise.then(function (data) {
      vm.estado = data;
    });

    vm.region = [];
    RegionService.query().$promise.then(function (data) {
      vm.region = data;
    });

    vm.crearvivienda = function (vivienda) {
      var viviend = {
        direccion: vivienda.direccion,
        estado_id: parseInt(vivienda.estado_id, 10),
        comuna_id: parseInt(vivienda.comuna_id, 10),
        // region_id: parseInt(region.id),
        subsidio_id: parseInt(vivienda.subsidio_id, 10)
      };

      ViviendaService.save(viviend);
      $state.go('viviendas');
    };
  }
})();
