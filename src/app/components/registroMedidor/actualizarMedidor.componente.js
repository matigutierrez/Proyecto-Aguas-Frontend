(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarMedidor', {
    templateUrl: 'app/components/registroMedidor/actualizarMedidor.html',
    controller: actualizarMedidor,
    controllerAs: 'vm'
  });

  actualizarMedidor.$inject = ['MedidorService', 'EstadoMedidorService', 'ViviendaService', 'ComiteService', '$state', '$rootScope'];

  var medidorid = 0;
  function actualizarMedidor(MedidorService, EstadoMedidorService, ViviendaService, ComiteService, $state, $rootScope) {
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
      MedidorService.update({id: medidorid}, medidor, function () {
        $state.go('medidores');
      }, function () {});
    };
  }
})();
