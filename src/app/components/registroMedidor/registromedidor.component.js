(function () {
  'use strict';

  angular
  .module('app')
  .component('registromedidor', {
    templateUrl: 'app/components/registroMedidor/registromedidor.html',
    controller: registromedidor,
    controllerAs: 'vm'
  });

  registromedidor.$inject = ['MedidorService', 'EstadoMedidorService', 'ViviendaService', 'ComiteService', '$state'];

  function registromedidor(MedidorService, EstadoMedidorService, ViviendaService, ComiteService, $state) {
    var vm = this;

    vm.comites = [];
    ComiteService.query().$promise.then(function (data) {
      vm.comites = data;
    });

    vm.vivienda = [];
    ViviendaService.query().$promise.then(function (data) {
      vm.vivienda = data;
    });

    vm.estadoMedid = [];
    EstadoMedidorService.query().$promise.then(function (data) {
      vm.estadoMedid = data;
    });

    vm.crearmedidor = function (medidor) {
      var medid = {
        num_medidor: medidor.num_medidor,
        marca_medidor: medidor.marca_medidor,
        lectura_inicial: 0,
        vivienda_id: parseInt(medidor.vivienda_id, 10),
        estado_medidor_id: parseInt(medidor.estado_medidor_id, 10),
        comite_id: parseInt(medidor.comite_id, 10)
      };
      MedidorService.save(medid);
      $state.go('medidores');
    };
  }
})();
