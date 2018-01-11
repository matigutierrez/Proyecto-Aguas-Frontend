(function () {
  'use strict';

  angular
  .module('app')
  .component('actualizarVivienda', {
    templateUrl: 'app/components/registroVivienda/actualizarVivienda.html',
    controller: actualizarVivienda,
    controllerAs: 'vm'
  });

  actualizarVivienda.$inject = ['RegionService', 'EstadoService', 'ComunaService', 'ViviendaService', '$state', '$rootScope', '$scope'];

  var viviendaid = 0;
  function actualizarVivienda(RegionService, EstadoService, ComunaService, ViviendaService, $state, $scope) {
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

    $scope.$on('id', function ($event, data) {
      viviendaid = data;
      console.log(data);
    });

    vm.actualizarvivienda = function (vivienda) {
      ViviendaService.update({id: viviendaid}, vivienda, function () {
        $state.go('viviendas');
      }, function () {});
    };
  }
})();
