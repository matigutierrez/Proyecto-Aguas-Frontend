(function () {
  'use strict';

  angular
  .module('app')
  .component('registroRapidoMedidor', {
    templateUrl: 'app/components/registroRapido/registroRapidoMedidor.html',
    controller: registroRapidoCtr,
    controllerAs: 'vm'
  });

  registroRapidoCtr.$inject = ['MedidorService', 'EstadoMedidorService', 'ViviendaService', 'ComiteService', '$state', '$mdDialog'];

  function registroRapidoCtr(MedidorService, EstadoMedidorService, ViviendaService, ComiteService, $state, $mdDialog) {
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

      vm.showAlert(MedidorService.save(medid), medidor);
      $state.go('registroRapidoCliente');
    };

    vm.showAlert = function(ev, medidor) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Medidor Creado Satisfactoriamente!')
          .textContent('Número: ' + medidor.num_medidor, 'Marca: ' + medidor.marca_medidor)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
