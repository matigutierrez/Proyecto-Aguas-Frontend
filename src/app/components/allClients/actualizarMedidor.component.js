(function () {
  'use strict';

  angular
  .module('app')
  .component('allClientsActualizarMedidor', {
    templateUrl: 'app/components/allClients/allClientsActualizarMedidor.html',
    controller: allClientsActualizarMedidor,
    controllerAs: 'vm'
  });

  allClientsActualizarMedidor.$inject = ['MedidorService', 'EstadoMedidorService', 'ViviendaService', 'ComiteService', '$state', '$rootScope', '$mdDialog'];

  var medidorid = 0;
  function allClientsActualizarMedidor(MedidorService, EstadoMedidorService, ViviendaService, ComiteService, $state, $rootScope, $mdDialog) {
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

    medidorid = $rootScope.id;

    vm.actualizarmedidor = function (medidor) {
      vm.showAlert(
        MedidorService.update({id: medidorid}, medidor, function () {
          $state.go('allClients');
        }, function () {}), medidor);
    };

    vm.showAlert = function (ev, medidor) {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('¡Medidor Actualizado Satisfactoriamente!')
          .textContent('Nro: ' + medidor.num_medidor + ', Marca: ' + medidor.marca_medidor)
          .ok('Ok!')
          .targetEvent(ev)
      );
    };
  }
})();
