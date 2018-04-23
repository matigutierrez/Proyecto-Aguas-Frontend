(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarMedidor', {
    templateUrl: 'app/components/registroMedidor/actualizarMedidor.html',
    controller: actualizarMedidor,
    controllerAs: 'vm'
  });

  actualizarMedidor.$inject = ['MedidorService', 'EstadoMedidorService', 'ViviendaService', 'ComiteService', '$state', '$rootScope', '$mdDialog'];

  var medidorid = 0;
  function actualizarMedidor(MedidorService, EstadoMedidorService, ViviendaService, ComiteService, $state, $rootScope, $mdDialog) {
    var vm = this;

    vm.vivienda = [];
    ViviendaService.query().$promise.then(function (data) {
      vm.vivienda = data;
    });

    vm.estadoMedid = [];
    EstadoMedidorService.query().$promise.then(function (data) {
      vm.estadoMedid = data;
    });

    medidorid = $rootScope.id;

    vm.medid = $rootScope.dataMedidor;

    vm.actualizarmedidor = function (medidor) {
      vm.showAlert(
        MedidorService.update({id: medidorid}, medidor, function () {
          $state.go('medidores');
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
