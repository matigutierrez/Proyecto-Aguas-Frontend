(function () {
  'use strict';

  angular
  .module('app')
  .component('viviendas', {
    templateUrl: 'app/components/viviendas/viviendas.html',
    controller: viviendasCtrl,
    controllerAs: 'vm'
  });

  viviendasCtrl.$inject = ['ViviendaService', '$state', '$rootScope'];

  function viviendasCtrl(ViviendaService) {
  	var vm = this;
    vm.vivienda = [];

    ViviendaService.query().$promise.then(function (data) {
      vm.vivienda = data;
    });

    vm.busqueda = function (dato) {
      var viviendas = [];
      for (var i = 0; i < vm.vivienda.length; i++) {
        if (vm.vivienda[i].direccion === dato) {
          viviendas.push(vm.vivienda[i]);
        }
      }
      vm.vivienda = viviendas;
    };
  }
})();
