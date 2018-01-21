(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarVivienda', {
    templateUrl: 'app/components/registroVivienda/actualizarVivienda.html',
    controller: actualizarVivienda,
    controllerAs: 'vm'
  });

  actualizarVivienda.$inject = ['SubsidioService', 'EstadoService', 'ComunaService', 'ViviendaService', '$state', '$rootScope'];

  var viviendaid = 0;
  function actualizarVivienda(SubsidioService, EstadoService, ComunaService, ViviendaService, $state, $rootScope) {
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

    viviendaid = $rootScope.id;

    vm.actualizarvivienda = function (vivienda) {
      ViviendaService.update({id: viviendaid}, vivienda, function () {
        $state.go('viviendas');
      }, function () {});
    };
  }
})();
